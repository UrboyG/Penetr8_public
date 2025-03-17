import { Elysia, t } from "elysia";
import { PrismaClient, Scan } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import {
  SONARQUBE_API,
  SONARQUBE_PASSWORD,
  SONARQUBE_URL,
  SONARQUBE_USERNAME,
  SONAR_PROJECT_NAME,
} from "./sonarqube";
import { log } from "console";

const prisma = new PrismaClient();
//Check API GET results at Elysia
export const dashboard = new Elysia();

//GET Vuln result
// async function getCoverage(projectName: string) {
//   try {
//     const response = await axios.get(`${SONARQUBE_URL}${SONARQUBE_API}`, {
//       params: {
//         additionalFields: "period,metrics",
//         component: projectName,
//         metricKeys:
//           "maintainability_issues,coverage,new_coverage,lines_to_cover,new_lines_to_cover",
//       },
//       auth: {
//         username: SONARQUBE_USERNAME,
//         password: SONARQUBE_PASSWORD,
//       },
//       headers: {
//         Accept: "application/json",
//       },
//     });
//     return response.data;
//   } catch (error: any) {
//     console.error(
//       "Error fetching coverage data:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

// dashboard.get("/dashboard/severity", async () => {
//   try {
//     const scanRecords = await prisma.scan.findMany();
//     const maintainabilityIssues = await Promise.all(
//       scanRecords
//         .filter(
//           (record) => record.jsonReport && typeof record.jsonReport === "object"
//         ) // Ensure jsonReport exists and is an object
//         .map(async (scanRecord) => {
//           const jsonReport = scanRecord.jsonReport as { projectName?: string }; // Explicit type
//           if (jsonReport.projectName === `${SONAR_PROJECT_NAME}`) {
//             // Fetch data only for 'penetr8_development'
//             const data = await getCoverage(jsonReport.projectName);
//             const measure = data.component?.measures?.find(
//               (m: any) => m.metric === "maintainability_issues"
//             );
//             return measure ? JSON.parse(measure.value) : null;
//           } else {
//             console.log(
//               `Skipping project: ${jsonReport.projectName}` // Debug log for skipped projects
//             );
//             return null;
//           }
//         })
//     );
//     return maintainabilityIssues.filter(Boolean); // Filter out null values
//   } catch (error: any) {
//     console.error("Error retrieving severity data:", error);
//     return {
//       message: "Error retrieving severity data",
//       error: error.message,
//     };
//   }
// });

dashboard.get("/dashboard/scanResult", async ({ query }) => {
  try {
    const userId = Number(query.userId);
    const scanId = Number(query.scanId);

    if (isNaN(userId) || userId <= 0) {
      console.log("Invalid userId:", query.userId); // Debugging statement
      return { message: "UserId is invalid" };
    }

    if (!userId) {
      return { message: "UserId is invalid" };
    }
    // Fetch scan records and join with the related file data
    const scanRecord = await prisma.scan.findFirst({
      where: {
        file: { userId: userId },
        ...(scanId && { id: scanId }),
        scanStatus: "success",
      },
      select: {
        id: true,
        overallCode: true,
        easyToFix: true,
        vulnerabilities: true,
      },
      orderBy: {
        id: "desc",
      }
    });
console.log(scanRecord)
    return scanRecord;
  } catch (error: any) {
    console.error("Error retrieving scanResult data:", error);
    return {
      message: "Error retrieving scanResult data",
      error: error.message,
    };
  }
});

//Required: userId as query parameter
dashboard.get("/dashboard/timestamps", async ({ query }) => {
  try {
    const userId = Number(query.userId);

    if (isNaN(userId) || userId <= 0) {
      console.log("Invalid userId:", query.userId); // Debugging statement
      return { message: "UserId is invalid" };
    }

    if (!userId) {
      return { message: "UserId is invalid" };
    }
    // Fetch scan records and join with the related file data
    const scanRecords = await prisma.scan.findMany({
      where: {
        file: { userId: userId },
      },
      include: {
        file: {
          // Join with the File table
          select: {
            title: true, // Include the file title
          },
        },
      },
    });

    const timestamps = scanRecords.map((scanRecord) => ({
      fileId: scanRecord.fileId,
      projectName: scanRecord.file?.title || "Unknown", // Use the file title as the projectName
      scanDate: scanRecord.scanDate
        ? format(new Date(scanRecord.scanDate), "d/M/yyyy, HH:mm") // Format the scanDate
        : null,
    }));

    return timestamps; // Return the transformed data
  } catch (error: any) {
    console.error("Error retrieving timestamp data:", error);
    return {
      message: "Error retrieving timestamp data",
      error: error.message,
    };
  }
});

//Full response of SONAR ISSUE
dashboard.get("/dashboard/issue", async () => {
  try {
    const hotspotResponse = await axios.get(
      `${SONARQUBE_URL}/api/issues/search`,
      {
        params: {},
        auth: {
          username: SONARQUBE_USERNAME,
          password: SONARQUBE_PASSWORD,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const hotspots = hotspotResponse.data;

    return hotspots;
  } catch (error) {
    console.error("Error!");
  }
});
//Full response of SONAR RULE
dashboard.get("/dashboard/rule", async () => {
  try {
    const { data } = await axios.get(
      `${SONARQUBE_URL}/api/rules/show?key=php:S4833`,
      {
        auth: {
          username: SONARQUBE_USERNAME,
          password: SONARQUBE_PASSWORD,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error fetching rule:", error);
    return { error: "Failed to fetch data" };
  }
});

// dashboard.get("/dashboard/vulnerabilities", async () => {
//   try {
//     // Step 1: Fetch data from /api/issues/search
//     const issuesResponse = await axios.get(
//       `${SONARQUBE_URL}/api/issues/search`,
//       {
//         params: {
//           ps: 100,
//         },
//         auth: {
//           username: SONARQUBE_USERNAME,
//           password: SONARQUBE_PASSWORD,
//         },
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     // Extract the rules from issues
//     const rules = issuesResponse.data.issues.map((issue: any) => issue.rule);

//     // Step 2: Fetch rule details for each rule from /api/rules/show
//     const ruleDetails = await Promise.all(
//       rules.map(async (rule: string) => {
//         try {
//           const ruleResponse = await axios.get(
//             `${SONARQUBE_URL}/api/rules/show`,
//             {
//               params: { key: rule },
//               auth: {
//                 username: SONARQUBE_USERNAME,
//                 password: SONARQUBE_PASSWORD,
//               },
//               headers: {
//                 Accept: "application/json",
//               },
//             }
//           );

//           // Extract descriptionSections content
//           const descriptionSections =
//             ruleResponse.data.rule?.descriptionSections || [];
//           const rootCause =
//             descriptionSections.find(
//               (section: any) => section.key === "root_cause"
//             )?.content || "No root cause information";
//           const resources =
//             descriptionSections.find(
//               (section: any) => section.key === "resources"
//             )?.content || "No resources available";
//           const howToFix =
//             descriptionSections.find(
//               (section: any) => section.key === "how_to_fix"
//             )?.content || "No fix information";

//           return {
//             key: ruleResponse.data.rule.key,
//             rootCause,
//             resources,
//             howToFix,
//           };
//         } catch (error: any) {
//           console.error(
//             `Error fetching rule details for ${rule}:`,
//             error.message
//           );
//           return null;
//         }
//       })
//     );

//     // Step 3: Combine issues with their corresponding rule details
//     const vulnerabilities = issuesResponse.data.issues
//       .filter((issue: any) => issue.project === `${SONAR_PROJECT_NAME}`) // Filter for project 'penetr8-development'
//       .map((issue: any, index: number) => ({
//         project: issue.project,
//         component: issue.component,
//         line: issue.line,
//         rule: issue.rule,
//         status: issue.status,
//         resolution: issue.resolution,
//         effort: issue.effort,
//         debt: issue.debt,
//         type: issue.type,
//         language: issue.language,
//         impacts: issue.impacts,
//         types: issue.type,
//         message: issue.message,
//         Order: index + 1, // Incremental order
//         Vulnerability: issue.message || "Unknown", // Issue message
//         resources: ruleDetails[index]?.resources || "Unknown", // CWE: resources
//         Score: issue.effort || 0, // Estimated effort or score
//         Severity: issue.impacts?.[0]?.severity || "Unknown", // Severity level
//         Description: ruleDetails[index]?.rootCause || "No root cause available", // RuleDescription: root_cause
//         Solution: ruleDetails[index]?.howToFix || "No fix information", // Solution: how_to_fix
//       }));

//     return vulnerabilities;
//   } catch (error: any) {
//     // Log the full error
//     console.error("Error details:", error.toJSON ? error.toJSON() : error);

//     // Return meaningful error message
//     return {
//       message: "Error retrieving vulnerabilities data",
//       error: error.response?.data?.errors || error.message,
//     };
//   }
// });


//For Dashboard Card
export const getOverallIssues = async (coverage: any) => {
  try {

    const sonarqubeData = coverage;

    // Validate and extract measures
    const measures = sonarqubeData?.component?.measures || [];
    const getMetricValue = (key: any) => {
      const metric = measures.find((m: any) => m.metric === key);
      return metric ? JSON.parse(metric.value || "{}") : null;
    };

    // Extract required metrics
    const maintainabilityIssues = getMetricValue("maintainability_issues") || {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      total: 0,
    };
    const securityIssues = getMetricValue("security_issues") || {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      total: 0,
    };
    const reliabilityIssues = getMetricValue("reliability_issues") || {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      total: 0,
    };
    const securityHotspots =
      measures.find((m: any) => m.metric === "security_hotspots")?.value || 0;

    // Construct the response
    return {
      projectName: sonarqubeData?.component?.name || "Unknown",
      maintainabilityIssues,
      securityIssues,
      reliabilityIssues,
      securityHotspots: parseInt(securityHotspots, 10),
    };
  } catch (error: any) {
    console.error("Error retrieving maintainability issues:", error);
    return {
      message: "Error retrieving maintainability issues",
      error: error.message,
    };
  }
};

dashboard.get("/dashboard/vulnall", async () => {
  try {
    // Step 1: Fetch data from /api/issues/search
    const issuesResponse = await axios.get(
      `${SONARQUBE_URL}/api/issues/search`,
      {
        params: {

          project: SONAR_PROJECT_NAME,
        },
        auth: { username: SONARQUBE_USERNAME, password: SONARQUBE_PASSWORD },
        headers: { Accept: "application/json" },
      }
    );

    let issues = issuesResponse.data.issues;

    issues = issues.filter((issue) => issue.project === SONAR_PROJECT_NAME);

    // Step 2: Fetch rule details from /api/rules/show
    const ruleKeys = [...new Set(issues.map((issue) => issue.rule))];

    const ruleDetailsResponses = await Promise.all(
      ruleKeys.map(async (ruleKey) => {
        try {
          const ruleResponse = await axios.get(
            `${SONARQUBE_URL}/api/rules/show`,
            {
              params: { key: ruleKey },
              auth: {
                username: SONARQUBE_USERNAME,
                password: SONARQUBE_PASSWORD,
              },
              headers: { Accept: "application/json" },
            }
          );
          return { key: ruleKey, details: ruleResponse.data.rule };
        } catch (error) {
          console.error(`Failed to fetch rule details for ${ruleKey}`, error);
          return null;
        }
      })
    );

    const ruleDetailsMap = Object.fromEntries(
      ruleDetailsResponses
        .filter(Boolean)
        .map((rule) => [rule!.key, rule!.details])
    );

    // Step 3: Merge issues with rule details
    const mergedData = issues.map((issue) => ({
      ...issue,
      ruleDetails: ruleDetailsMap[issue.rule] || null,
    }));

    return mergedData;
  } catch (error) {
    console.error("Error fetching vulnerabilities", error);
    return { error: "Failed to fetch vulnerabilities data" };
  }
});

export const getVulnerabilities = async (easyToFix: any) => {
  try {
    // Step 1: Fetch data from /api/issues/search
    const issuesResponse = await axios.get(
      `${SONARQUBE_URL}/api/issues/search`,
      {
        params: {
          // status: "OPEN,ACCEPTED,FALSE_POSITIVE,CONFIRMED",
          project: SONAR_PROJECT_NAME,
        },
        auth: { username: SONARQUBE_USERNAME, password: SONARQUBE_PASSWORD },
        headers: { Accept: "application/json" },
      }
    );

    let issues = issuesResponse.data.issues;

    issues = issues.filter(
      (issue: any) =>
        issue.project === SONAR_PROJECT_NAME && issue.status == "OPEN"
    );

    
    const easyToFixData = easyToFix.easyToFixData || [];

    const easyToFixMap = new Map(
      easyToFixData.map((item: any) => [item.key, item.category])
    );

    // Step 2: Fetch rule details from /api/rules/show
    const ruleKeys = [...new Set(issues.map((issue: any) => issue.rule))];

    const ruleDetailsResponses = await Promise.all(
      ruleKeys.map(async (ruleKey) => {
        try {
          const ruleResponse = await axios.get(
            `${SONARQUBE_URL}/api/rules/show`,
            {
              params: { key: ruleKey },
              auth: {
                username: SONARQUBE_USERNAME,
                password: SONARQUBE_PASSWORD,
              },
              headers: { Accept: "application/json" },
            }
          );

          const rule = ruleResponse.data.rule;

          const filteredRuleDetails = {
            createdAt: rule?.createdAt || null,
            langName: rule?.langName || null,
            Description: rule?.descriptionSections?.find(
              (section: any) => section.key === "root_cause"
            )?.content,
            Solution: rule?.descriptionSections?.find(
              (section: any) => section.key === "how_to_fix"
            )?.content,
            Introduction: rule?.descriptionSections?.find(
              (section: any) => section.key === "introduction"
            )?.content,
            resources: rule?.descriptionSections?.find(
              (section: any) => section.key === "resources"
            )?.content,
          };

          return { key: ruleKey, details: filteredRuleDetails };
        } catch (error) {
          console.error(`Failed to fetch rule details for ${ruleKey}`, error);
          return null;
        }
      })
    );

    const ruleDetailsMap = Object.fromEntries(
      ruleDetailsResponses
        .filter(Boolean)
        .map((rule) => [rule!.key, rule!.details])
    );

    // Step 3: Merge issues with rule details
    const mergedData = issues.map((issue: any, index: any) => ({
      Order: index + 1,
      key: issue.key,
      project: issue.project,
      component: issue.component,
      rule: issue.rule,
      Severity: issue.severity || "Unknown",
      status: issue.status,
      effort: issue.effort || "Unknown",
      debt: issue.debt || "Unknown",
      type: issue.type,
      impacts: issue.impacts,
      types: issue.type,

      Vulnerability: issue.message || "Unknown",
      createdAt: ruleDetailsMap[issue.rule]?.createdAt || "Unknown",
      langName: ruleDetailsMap[issue.rule]?.langName || "Unknown",
      resources: ruleDetailsMap[issue.rule]?.resources,
      Description: ruleDetailsMap[issue.rule]?.Description,
      Solution: ruleDetailsMap[issue.rule]?.Solution,
      Introduction: ruleDetailsMap[issue.rule]?.Introduction,

      category: easyToFixMap.get(issue.key) || "Unknown",
    }));

    return { TotalVuln: issues.length, mergedData };
  } catch (error) {
    console.error("Error fetching vulnerabilities", error);
    return { error: "Failed to fetch vulnerabilities data" };
  }
};




//easy-to-fix issues
const CWE_REGEX = /CWE-(\d{1,5})/g;
const CVE_REGEX = /CVE-\d{4}-\d{1,7}/g;

async function fetchCWEFromNVD() {
  try {
    const response = await axios.get(
      "https://services.nvd.nist.gov/rest/json/cwe/2.0"
    );
    const cweItems = response.data.vulnerabilities || [];

    
    const wellDocumentedCWE = new Set(cweItems.map((cwe) => cwe.id));

    console.log("📌 WELL_DOCUMENTED_CWE Loaded from NVD:", wellDocumentedCWE);
    return wellDocumentedCWE;
  } catch (error) {
    console.error("❌ Error fetching CWE data from NVD:", error);
    return new Set(); 
  }
}

let WELL_DOCUMENTED_CWE = await fetchCWEFromNVD();

// Function to fetch CWE details from MITRE
async function getCweDetails(cweId) {
  try {
    const response = await axios.get(
      `https://services.nvd.nist.gov/rest/json/cwe/2.0`
    );
    const cweItems = response.data.vulnerabilities || [];
    const cweData = cweItems.find((cwe) => cwe.id === `CWE-${cweId}`);

    return { cweId, cweName: cweData?.name ?? `CWE-${cweId}` };
  } catch (error) {
    console.error(`Error fetching CWE details for ${cweId}:`, error.message);
  }
  return { cweId, cweName: `CWE-${cweId}` };
}

// Function to fetch CVE details from NVD
async function getCveDetails(cveId) {
  try {
    const response = await axios.get(
      `https://services.nvd.nist.gov/rest/json/cve/1.0/${cveId}`
    );
    const cveData = response.data;
    if (cveData.result && cveData.result.CVE_Items.length > 0) {
      const cveInfo = cveData.result.CVE_Items[0];
      const cvssScore = cveInfo.impact?.baseMetricV3?.cvssV3?.baseScore ?? 0; 
      return {
        cveId,
        cveName:
          cveInfo.cve?.description?.description_data[0]?.value ||
          `CVE-${cveId}`,
        cvssScore,
        hasPatch: cveInfo.cve?.references?.reference_data?.some((ref) =>
          ref.tags?.includes("Patch")
        ),
      };
    }
  } catch (error) {
    console.error(`Error fetching CVE details for ${cveId}:`, error.message);
  }
  return { cveId, cveName: `CVE-${cveId}`, cvssScore: 0, hasPatch: false };
}

// Main API to get easy-to-fix issues
export const getEasyToFix = async () => {
  try {
    // Fetch issues from SonarQube
    const issuesResponse = await axios.get(
      `${SONARQUBE_URL}/api/issues/search`,
      {
        params: { project: SONAR_PROJECT_NAME, resolved: "false" },
        auth: { username: SONARQUBE_USERNAME, password: SONARQUBE_PASSWORD },
        headers: { Accept: "application/json" },
      }
    );

    let issues = issuesResponse.data.issues;
    if (!issues || issues.length === 0) {
      return { message: "No issues found in SonarQube" };
    }

    // Filter issues by project
    issues = issues.filter((issue) => issue.project === SONAR_PROJECT_NAME);

    // Fetch rule details from SonarQube
    const ruleKeys = [...new Set(issues.map((issue) => issue.rule))];
    const ruleDetailsResponses = await Promise.all(
      ruleKeys.map(async (ruleKey) => {
        try {
          const ruleResponse = await axios.get(
            `${SONARQUBE_URL}/api/rules/show`,
            {
              params: { key: ruleKey },
              auth: {
                username: SONARQUBE_USERNAME,
                password: SONARQUBE_PASSWORD,
              },
              headers: { Accept: "application/json" },
            }
          );
          return { key: ruleKey, details: ruleResponse.data.rule };
        } catch (error) {
          console.error(`Failed to fetch rule details for ${ruleKey}`, error);
          return null;
        }
      })
    );

    // Process issues and extract CWE & CVE
    let easyToFixCount = 0,
      moderatelyDifficultCount = 0,
      complexToFixCount = 0;

    const easyToFixData = await Promise.all(
      issues.map(async (issue) => {
        const ruleDetails = ruleDetailsResponses.find(
          (r) => r && r.key === issue.rule
        )?.details;

        let cweList = [],
          cveList = [],
          impactsList = [];

        let baseScore = 60,
          severityScore = 0,
          codeImpact = 0,
          impactScore = 0,
          cweCveScore = 0;
        let cvssScore = null;

        // Extract CWE & CVE from rule description
        if (ruleDetails && ruleDetails.descriptionSections) {
          const contentText = ruleDetails.descriptionSections
            .map((sec) => sec.content)
            .join("\n");

          // Extract CWE
          const cweMatches = [
            ...new Set(
              (contentText.match(CWE_REGEX) || []).map((match) =>
                match.replace("CWE-", "")
              )
            ),
          ];
          if (cweMatches.length > 0) {
            const cweDataResults = await Promise.all(
              cweMatches.map(getCweDetails)
            );
            cweList = cweDataResults.map((cwe) => ({
              cweId: cwe.cweId,
              cweName: cwe.cweName,
            }));

            cweDataResults.forEach((cwe) => {
              if (WELL_DOCUMENTED_CWE.has(cwe.cweId)) {
                cweCveScore += 10;
              } else {
                cweCveScore += 5;
              }
            });
          }

          // Extract CVE
          const cveMatches = [...new Set(contentText.match(CVE_REGEX) || [])];
          if (cveMatches.length > 0) {
            const cveDataResults = await Promise.all(
              cveMatches.map(getCveDetails)
            );
            cveList = cveDataResults.map((cve) => ({
              cveId: cve.cveId,
              cveName: cve.cveName,
              cvssScore: cve.cvssScore,
            }));

            if (cveList.some((cve) => cve.cvssScore > 0)) {
              cvssScore = Math.max(...cveList.map((cve) => cve.cvssScore));
            }

            cweCveScore -= cveList.length * 10;
          }
        }

        let sonarSeverityScore =
          issue.severity === "BLOCKER"
            ? -10
            : issue.severity === "CRITICAL"
              ? -5
              : issue.severity === "MAJOR"
                ? 0
                : issue.severity === "MINOR"
                  ? 5
                  : 10;

        let cvssSeverityScore = 0;
        if (typeof cvssScore === "number" && !isNaN(cvssScore)) {
          cvssSeverityScore =
            cvssScore >= 7.0
              ? -10 // High Severity
              : cvssScore >= 4.0
                ? 0 // Medium Severity
                : 10; // Low Severity
        }

        if (cvssScore && cvssScore > 7.0) {
          cweCveScore -= 5;
        }

        severityScore =
          (sonarSeverityScore * 0.3 + cvssSeverityScore * 0.7) / 2;

        // Code Impact (Lines of Code Affected)
        const affectedLines = issue.line ? parseInt(issue.line) : 0;

        codeImpact =
          affectedLines < 5
            ? 15
            : affectedLines < 10
              ? 10
              : affectedLines < 25
                ? 5
                : -10;

        //Impact Score (Security, Maintainability, Reliability)
        if (ruleDetails && ruleDetails.impacts) {
          ruleDetails.impacts.forEach((impact) => {
            impactsList.push({
              softwareQuality: impact.softwareQuality,
              severity: impact.severity,
            });

            //Adjust Impact Score Based on Software Quality
            if (impact.softwareQuality === "SECURITY") {
              impactScore +=
                impact.severity === "HIGH"
                  ? -20
                  : impact.severity === "MEDIUM"
                    ? -10
                    : impact.severity === "LOW"
                      ? -5
                      : 0;
            } else if (impact.softwareQuality === "MAINTAINABILITY") {
              impactScore +=
                impact.severity === "HIGH"
                  ? -5
                  : impact.severity === "MEDIUM"
                    ? -3
                    : impact.severity === "LOW"
                      ? 5
                      : 0;
            } else if (impact.softwareQuality === "RELIABILITY") {
              impactScore +=
                impact.severity === "HIGH"
                  ? -10
                  : impact.severity === "MEDIUM"
                    ? -5
                    : impact.severity === "LOW"
                      ? 0
                      : 0;
            }
          });
        }

        let complexityAdjustment = 0;
        if (ruleDetails && ruleDetails.remFnBaseEffort) {
          let estimatedTime = ruleDetails.remFnBaseEffort;

          let estimatedMinutes = 0;
          if (estimatedTime.includes("d")) {
            estimatedMinutes = parseInt(estimatedTime.replace("d", "")) * 1440;
          } else if (estimatedTime.includes("h")) {
            estimatedMinutes = parseInt(estimatedTime.replace("h", "")) * 60;
          } else if (estimatedTime.includes("min")) {
            estimatedMinutes = parseInt(estimatedTime.replace("min", ""));
          }

          complexityAdjustment =
            estimatedMinutes <= 10
              ? +10
              : estimatedMinutes <= 30
                ? 0
                : estimatedMinutes > 59
                  ? -10
                  : 0;
        }

        let automationBonus = ruleDetails?.tags?.includes("Autofix") ? 10 : 0;

        if (
          ruleDetails &&
          ruleDetails.tags &&
          ruleDetails.tags.includes("Autofix")
        ) {
          automationBonus = 10;
        }

        // Calculate Total & Final Scores with additional factors
        const totalScore =
          baseScore +
          severityScore +
          codeImpact +
          impactScore +
          cweCveScore +
          complexityAdjustment +
          automationBonus;

        // Ensure score does not exceed 100 and does not drop below 0
        const finalScore = Math.max(0, Math.min(100, totalScore));

        // Categorization
        let category =
          finalScore >= 60
            ? "Easy"
            : finalScore >= 40
              ? "Moderate"
              : "Complex";

        if (category === "Easy") easyToFixCount++;
        else if (category === "Moderate")
          moderatelyDifficultCount++;
        else complexToFixCount++;

        return {
          key: issue.key,
          rule: issue.rule,
          severity: issue.severity,
          component: issue.component,
          line: issue.line || "Unknown",
          cvssScore,
          totalScore,
          finalScore,
          category,
          cweList,
          cveList,
          impacts: impactsList,
        };
      })
    );

    return {
      totalIssues: issues.length,
      categoryCount: {
        easyToFix: easyToFixCount,
        moderatelyDifficult: moderatelyDifficultCount,
        complexToFix: complexToFixCount,
      },
      easyToFixData,
    };
  } catch (error) {
    console.error("Error retrieving easytofix data:", error);
    return {
      totalIssues: 0,
      categoryCount: {
        easyToFix: 0,
        moderatelyDifficult: 0,
        complexToFix: 0,
      },
      easyToFixData: [],
    };
  }
};
