import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../assets/NavBar';
import axios from 'axios';
import { getApiURL } from '../libs/apiRoute';
import { useNavigate } from 'react-router-dom';

function VulnScan() {
    const { fileId } = useParams(); // Get fileId from the URL
    const FileId = fileId;
    const [scanStatus, setScanStatus] = useState('pending');
    const [jsonReport, setJsonReport] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [coverageMeasures, setCoverageMeasures] = useState(null); // Add state for coverage data


    const navigate = useNavigate();


    // Function to fetch the scan result
    const fetchScanResult = async () => {
        try {
            const response = await axios.get(getApiURL() + `/sonarqube/scanResult/${FileId}`);
            const scanData = response.data;

            if (scanData.scanStatus) {
                setScanStatus(scanData.scanStatus); // Update scan status
                setJsonReport(scanData.jsonReport || null); // Set the report if available

                // If the scan is successful, fetch the coverage data
                if (scanData.scanStatus === 'success') {
                    const coverageData = scanData.coverage;
                    setCoverageMeasures(coverageData.component.measures || null); // Set coverage measures
                }
            }
        } catch (error) {
            console.error('Error fetching scan result:', error);
            setErrorMessage('Failed to fetch scan result.');
        }
    };

    useEffect(() => {
        // Set up polling to fetch scan results every 5 seconds
        const intervalId = setInterval(() => {
            fetchScanResult();
        }, 5000); // Poll every 5 seconds

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [FileId]);

    const coverageMeasureSort = coverageMeasures?.sort((a, b) => a.metric.localeCompare(b.metric));
    useEffect(() => {
        if (scanStatus === 'success') {
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000); // Redirect after 3 seconds
        }
    }, [scanStatus, navigate]);
    
    return (
        <div className="min-h-screen w-screen bg-gray-50">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Vulnerability Assessment
                </h1>

                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Scan Status:
                            <span
                                className={`ml-2 px-3 py-1 rounded-md text-white ${scanStatus === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                                    }`}
                            >
                                {scanStatus.charAt(0).toUpperCase() + scanStatus.slice(1)}
                            </span>
                        </h2>
                    </div>

                    {scanStatus === 'pending' && (
                        <div className="text-center text-gray-500">
                            <p>Scan in progress, please wait...</p>
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin mx-auto mt-4"></div>
                        </div>
                    )}

                    {/* {scanStatus === 'success' && jsonReport  && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Scan Output:</h3>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                                {jsonReport.output}
                            </pre>
                            <NavLink to="/dashboard"> </NavLink>
                        </div>
                    )}

                    {scanStatus === 'success' && coverageMeasures && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Coverage Measures:</h3>
                            <ul className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                                {coverageMeasureSort.map((measure, index) => (
                                    <li key={index} className="mb-2">
                                        <strong>{measure.metric}:</strong> {measure.value}
                                    </li>
                                ))}
                            </ul>
                            <NavLink to="/dashboard"> </NavLink> 
                        </div>
                    )} */}

{scanStatus === 'success' && (
    <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">
            Scan Completed Successfully!
        </h3>
    </div>
)}

                </div>
            </div>
        </div>
    );
}

export default VulnScan;
