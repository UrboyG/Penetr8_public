import { Elysia, t } from 'elysia';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import AdmZip from 'adm-zip';
import 'dotenv/config';
import { connect } from 'http2';
import { log } from 'console';
import { getEasyToFix, getOverallIssues, getVulnerabilities } from './dashboard';


const prisma = new PrismaClient();

// SonarQube API URL and credentials
export const SONARQUBE_URL = process.env.SONARQUBE_URL;
export const SONARQUBE_API = '/api/measures/component';
export const SONARQUBE_USERNAME = process.env.SONARQUBE_USERNAME ?? "";
export const SONARQUBE_PASSWORD = process.env.SONARQUBE_PASSWORD ?? "";
export const SONAR_PROJECT_TOKEN = process.env.SONAR_PROJECT_TOKEN;
export const SONAR_PROJECT_NAME = process.env.SONAR_PROJECT_NAME;
export const BADGE_TOKEN = process.env.BADGE_TOKEN; 

export const sonarqube = new Elysia();

const FILES_DIR = path.join(__dirname, 'files');

// Ensure the `files` directory exists
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
}

sonarqube.get('/sonarqube/scanResult/:fileId', async ({ params: { fileId }, error }) => {
    try {
        if (!fileId) {
            throw new Error('File ID is required');
        }
        const scanRecord = await prisma.scan.findFirst({
            where: { fileId: Number(fileId) },
        });
        return scanRecord;
    } catch (error: any) {
        console.error('Error scanning file:', error);
        return {
            message: 'Error scanning file',
            error: error.message,
        };
    }
});

// API route to fetch code coverage with Basic Authentication
export const getCoverage = async () => {
    try {
        // Make the request to SonarQube with Basic Authentication
        const response = await axios.get(`${SONARQUBE_URL}${SONARQUBE_API}`, {
            params: {
                additionalFields: 'period,metrics',
                component: SONAR_PROJECT_NAME,  // Use the projectName from the URL or the default COMPONENT
                metricKeys: 'alert_status,quality_gate_details,new_violations,accepted_issues,new_accepted_issues,high_impact_accepted_issues,maintainability_issues,reliability_issues,security_issues,bugs,new_bugs,reliability_rating,new_reliability_rating,vulnerabilities,new_vulnerabilities,security_rating,new_security_rating,security_hotspots,new_security_hotspots,security_hotspots_reviewed,new_security_hotspots_reviewed,security_review_rating,new_security_review_rating,code_smells,new_code_smells,sqale_rating,new_maintainability_rating,sqale_index,new_technical_debt,coverage,new_coverage,lines_to_cover,new_lines_to_cover,tests,duplicated_lines_density,new_duplicated_lines_density,duplicated_blocks,ncloc,ncloc_language_distribution,projects,lines,new_lines'
            },
            auth: {
                username: SONARQUBE_USERNAME,
                password: SONARQUBE_PASSWORD
            },
            headers: {
                'Accept': 'application/json',
            },
        });

        return response.data;
    } catch (error: any) {
        console.error('Error fetching data from SonarQube:', error);
        return {
            message: 'Error fetching data from SonarQube',
            error: error.message,
        };
    }
};

function isPathInside(parent: string, child: string) {
    const relative = path.relative(parent, child);
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

async function extractZipFile(zipFilePath: string, extractTo: string) {
    const zip = new AdmZip(zipFilePath);
    const zipEntries = zip.getEntries();

    for (const zipEntry of zipEntries) {
        const entryPath = path.join(extractTo, zipEntry.entryName);
        if (!isPathInside(extractTo, entryPath)) {
            throw new Error('Zip file contains invalid paths');
        }

        if (zipEntry.isDirectory) {
            await fs.promises.mkdir(entryPath, { recursive: true });
        } else {
            await fs.promises.mkdir(path.dirname(entryPath), { recursive: true });
            await fs.promises.writeFile(entryPath, new Uint8Array(zipEntry.getData()));
        }
    }
}

sonarqube.post(
    "/upload",
    async ({ body }) => {
        try {
            const { file, data } = body;
            const parsedData = JSON.parse(data);

            const userId = parsedData.userId;

            // Determine the original filename and extension
            const originalFilename = file.name;
            const extension = path.extname(originalFilename);

            // Create a new file record in the database
            const newFile = await prisma.file.create({
                data: {
                    title: parsedData.title || "Uploaded File",
                    filename: originalFilename,
                    filesize: file.size,
                    filedata: Buffer.from(await file.arrayBuffer()),
                    User: {
                        connect: {
                            id: parseInt(userId),
                        }
                    }
                },
            });

            // Create a subdirectory in FILES_DIR for this file
            const fileDir = path.join(FILES_DIR, `${newFile.id}`);
            await fs.promises.mkdir(fileDir, { recursive: true });

            // Define file path
            const filePath = path.join(fileDir, originalFilename);

            // Write the file into the fileDir
            await fs.promises.writeFile(filePath, new Uint8Array(await file.arrayBuffer()));

            // If the uploaded file is a zip file, extract it
            if (extension === '.zip') {
                await extractZipFile(filePath, fileDir);

                // Optionally, remove the zip file after extraction
                await fs.promises.unlink(filePath);
            }

            // Start the scanning process
            scanFile(newFile.id);

            return {
                status: 200,
                message: 'File uploaded successfully',
                fileId: newFile.id,
            };

        } catch (error: any) {
            console.error("Error uploading file:", error);
            return new Response(
                JSON.stringify({
                    message: "Error uploading file",
                    error: error.message,
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    },
    {
        body: t.Object({
            file: t.File({ description: "Uploaded file (any format)" }),
            data: t.String(),
        }),
        // type: "formdata",
        // required: ["file", "data"],
    }
);

export const scanFile = async (fileId: number) => {
    try {
        // Retrieve the file record
        const fileRecord = await prisma.file.findUnique({
            where: { id: fileId },
        });

        if (!fileRecord) {
            throw new Error('File not found');
        }

        const fileDir = path.join(FILES_DIR, `${fileId}`);
        const sourcePath = path.join(fileDir, 'src');
        const binayPath = path.join(fileDir, 'bin');

        // Create the directory if it doesn't exist
        await fs.promises.mkdir(FILES_DIR, { recursive: true });

        // Create a new Scan entry and set the status to 'pending'
        const scanRecord = await prisma.scan.create({
            data: {
                fileId: fileId,
                scanStatus: 'pending',
            },
        });
        
        //Beware: This command is for Windows AND Sonarqube Community version 10.6 ONLY, adjust for other setups BE CAREFUL!!!!
        const sonarCommand = `sonar-scanner.bat -D"sonar.projectKey=${SONAR_PROJECT_NAME}" -D"sonar.exclusions=**/*.java" -D"sonar.sources=." -D"sonar.scm.exclusions.disabled=true" -D"sonar.host.url=${SONARQUBE_URL}" -D"sonar.token=${SONAR_PROJECT_TOKEN}"`;

        return new Promise(async (resolve, reject) => {
            // Execute SonarQube scan
            exec(sonarCommand, { cwd: fileDir }, async (error, stdout, stderr) => {
                if (error) {
                    // Update the Scan status to 'error' on failure
                    await prisma.scan.update({
                        where: { id: scanRecord.id },
                        data: {
                            scanStatus: 'error',
                        },
                    });
                    console.error(`SonarQube scan failed: ${error.message}`);
                    return reject({
                        message: 'SonarQube scan failed',
                        error: error.message,
                    });
                }

                if (stderr) {
                    console.error(`SonarQube scan stderr: ${stderr}`);
                }

                // Parse the output from SonarQube if needed 
                let jsonReport;
                try {
                    jsonReport = { output: stdout, projectName: SONAR_PROJECT_NAME }; // Adjust if necessary for your output
                } catch (parseError) {
                    console.error('Failed to parse SonarQube output:', parseError);
                    jsonReport = {};
                }

                const coverage = await getCoverage();
                const overallCode = await getOverallIssues(coverage);
                const easyToFix = await getEasyToFix();
                const vuln = await getVulnerabilities(easyToFix);

                // Update the Scan status to 'success' and save the report and issue count
                await prisma.scan.update({
                    where: { id: scanRecord.id },
                    data: {
                        scanStatus: 'success',
                        jsonReport: jsonReport,
                        overallCode: overallCode,
                        vulnerabilities: vuln,
                        easyToFix: easyToFix,
                        coverage: coverage,
                        issuesDetected: (jsonReport as any)?.issues?.length || 0,
                    },
                });

                resolve({
                    message: 'SonarQube scan completed successfully',
                    output: jsonReport,
                });
            });
        });
    } catch (error: any) {
        console.error('Error during scanning process:', error);
        return {
            message: 'Error during scanning process',
            error: error.message,
        };
    }
};

sonarqube.get('/sonarqube/badge/:projectName', async ({ params, set}) => {
    const { projectName } = params;
    
    try{
        const badgeUrl = `${SONARQUBE_URL}/api/project_badges/measure?project=${projectName}&metric=alert_status&token=${BADGE_TOKEN}`; 

        const response = await axios.get(badgeUrl, {
            params: {
                project: projectName,
                metric: 'alert_status',
                token: BADGE_TOKEN,
            },
            auth: {
                username: SONARQUBE_USERNAME,
                password: SONARQUBE_PASSWORD,
            },
            responseType: 'arraybuffer'
        })
        
        if (response.status !== 200) {
            set.status = response.status;
            return response.statusText;
        }

        set.headers['Content-Type'] = 'image/svg+xml';

        return new Uint8Array(response.data); //binary data

    }catch(error: any){
        set.status = 500;
        return {
            message: 'Error fetching badge',
            error: error.message,
        };
    }
});