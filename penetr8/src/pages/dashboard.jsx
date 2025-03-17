import React, { useState, useEffect } from "react";
import SidebarMenu from "../assets/slidebarmenu/SidebarMenu.jsx";
import Issuscrad from "../assets/chart/Issuscrad.jsx";
import ChartSer from "../assets/chart/ChartSer.jsx";
import ChartEasytofix from "../assets/chart/ChartEasytofix.jsx";
import OverallcodeCard from "../assets/chart/OverallcodeCard.jsx";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";


function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalVuln, setTotalVuln] = useState(0);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState([]);
  const [filters, setFilters] = useState({ softwareQuality: [], severity: [] });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [scanResult, setScanResult] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchVulnerabilityData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get("http://localhost:8080/dashboard/scanResult?userId=" + userId + "&scanId=" + searchParams.get('scanId'));

      if (!response.data) {
        console.error("Invalid API response format", response.data);
        return;
      }

      setScanResult(response.data);

      const vuln = response.data.vulnerabilities || [];

      setTotalVuln(vuln.TotalVuln || 0);

      const formattedData = vuln.mergedData?.map((item, index) => ({
        Order: index + 1,
        title: item.Vulnerability || "N/A",
        badges: (item.impacts || []).map((impact) => ({
          type: impact.softwareQuality || "Unknown Quality",
          level: impact.severity || "Unknown Severity",
        })),
        types: item.types || "N/A",
        fileName: item.component,
        fileLocation: item.component ? item.component.split(":").pop() : "N/A",
        effort: item.effort || "N/A",
        message: item.message || "No message available",
        resources: item.resources || null,
        description: item.Description || null,
        solution: item.Solution || null,
        Introduction: item.Introduction || "No introduction available",
        Severity: item.Severity || "Unknown",
        Type: item.Type || "Unknown",
        impacts: item.impacts || [],
        category: item.category,
      })) || [];
      setVulnerabilities(formattedData);
      setFilteredVulnerabilities(formattedData);
    } catch (error) {
      console.error("Error fetching vulnerability data:", error);
    }
  };

  useEffect(() => {
    fetchVulnerabilityData();
  }, []);

  useEffect(() => {
    const filtered = vulnerabilities.filter((vuln) => {
      const impacts = vuln.impacts || [];

      const matchesQuality =
        !filters.softwareQuality?.length ||
        impacts.some((impact) =>
          filters.softwareQuality.includes(impact.softwareQuality)
        );

      const matchesSeverity =
        !filters.severity?.length || filters.severity.includes(vuln.Severity);

      const matchesLevel =
        !filters.level?.length ||
        impacts.some((impact) => filters.level.includes(impact.severity));

      const matchesTypes =
        !filters.types?.length || filters.types.includes(vuln.types);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(vuln.category);

      return (
        matchesQuality &&
        matchesSeverity &&
        matchesTypes &&
        matchesLevel &&
        matchesCategory
      );
    });

    setFilteredVulnerabilities(filtered);
  }, [filters, vulnerabilities, selectedCategories]);

  const [groupedIssues, setGroupedIssues] = useState(filteredVulnerabilities.reduce((acc, issue) => {
    const key = issue.fileName.split("/").pop();
    if (!acc[key]) acc[key] = [];
    acc[key].push(issue);
    return acc;
  }, {}));

  const [fileNames, setFileNames] = useState(Object.keys(groupedIssues));

  useEffect(() => {
    console.log(filteredVulnerabilities)
    const groupedIs = filteredVulnerabilities.reduce((acc, issue) => {
      const key = issue.fileName.split("/").pop();
      if (!acc[key]) acc[key] = [];
      acc[key].push(issue);
      return acc;
    }, {});
    setGroupedIssues(groupedIs);
    setFileNames(Object.keys(groupedIs));
  }, [filteredVulnerabilities]);

  const handleFileSelection = (fileName) => {
    setSelectedFiles((prev) =>
      prev.includes(fileName)
        ? prev.filter((f) => f !== fileName)
        : [...prev, fileName]
    );
  };

  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen ">
      <div className="max-w-8xl mx-auto pb-10">
        {/* Toggle Button */}
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="default-sidebar"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </div>

        {/* Sidebar */}
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } bg-grey_3 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <SidebarMenu
            searchParams={() => searchParams.get('scanId')}
            onFilterChange={setFilters}
            onSelect={(key) => setActiveTable(key)}
            onClose={() => setIsSidebarOpen(false)} // Pass the close function
          />
        </aside>

        {/* Main Content */}
        <div className="sm:ml-64 pt-10  sm:px-8 md:pr-14 lg:pr-16 ">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold pb-4 flex gap-4">
            Vulnerability Result

          </p>
          {scanResult.overallCode && <OverallcodeCard overallCode={scanResult.overallCode} />}
          <div className="bg-blue_0 rounded-lg shadow-lg p-2 m-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-start">
              <div className="flex justify-center items-center">
                {scanResult.vulnerabilities && <ChartSer vuln={scanResult.vulnerabilities} />}
              </div>
              <div className="flex justify-center items-center">
                {scanResult.easyToFix && <ChartEasytofix easyToFix={scanResult.easyToFix} />}
              </div>
            </div>
          </div>
          {/* <p className="text-lg font-bold text-red-500">
            Total Vulnerabilities: {totalVuln}
          </p> */}

          {/* Combined Filters */}

          <div className="relative flex flex-col min-w-0 break-words rounded mb-3 xl:mb-0  mx-1 my-1 p-3">
            <div className="flex items-center justify-start space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-file-code"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M10 13l-1 2l1 2" />
                <path d="M14 13l1 2l-1 2" />
              </svg>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                All Issues
              </p>
            </div>

            {/* Filter Sections */}
            <div className="flex space-x-4">
              {/* Filter by File (Dropdown) */}
              <div className="relative">
                <button
                  id="dropdownCheckboxFileButton"
                  data-dropdown-toggle="dropdownCheckboxFile"
                  className="text-white bg-dark_purple_5 hover:bg-dark_kpurple_7 focus:ring-4 focus:outline-none focus:ring-Fuchsia_pink_1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-dark_purple_6 dark:hover:bg-dark_purple_7 dark:focus:ring-Fuchsia_pink_5"
                  type="button"
                >
                  Filename
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownCheckboxFile"
                  className="z-10 hidden bg-gray-100 divide-y divide-gray-100 rounded-lg shadow-sm w-60 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                    {Array.from(
                      new Set(fileNames.map((file) => file.split("/").pop()))
                    ).map((uniqueFile) => (
                      <label
                        key={uniqueFile}
                        className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(uniqueFile)}
                          onChange={() => handleFileSelection(uniqueFile)}
                          className="w-4 h-4 text-dark_purple_5 bg-gray-100 border-gray-300 focus:ring-Fuchsia_pink_1 dark:focus:ring-Fuchsia_pink_5 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <span className="ms-2 text-sm">{uniqueFile}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter by Category (Dropdown) */}
              <div className="relative">
                <button
                  id="dropdownCheckboxCategoryButton"
                  data-dropdown-toggle="dropdownCheckboxCategory"
                  className="text-white bg-dark_purple_5 hover:bg-dark_kpurple_7 focus:ring-4 focus:outline-none focus:ring-Fuchsia_pink_1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-dark_purple_6 dark:hover:bg-dark_purple_7 dark:focus:ring-Fuchsia_pink_5"
                  type="button"
                >
                  Fix Difficulty
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownCheckboxCategory"
                  className="z-10 hidden bg-gray-100 divide-y divide-gray-100 rounded-lg shadow-sm w-60 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                    {["Easy", "Moderate", "Complex"].map((category) => (
                      <label
                        key={category}
                        className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => {
                            setSelectedCategories((prev) =>
                              prev.includes(category)
                                ? prev.filter((c) => c !== category)
                                : [...prev, category]
                            );
                          }}
                          className="w-4 h-4 text-dark_purple_5 bg-gray-100 border-gray-300 focus:ring-Fuchsia_pink_1 dark:focus:ring-Fuchsia_pink_5 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <span className="ms-2 text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {Object.keys(groupedIssues)
            .filter(
              (fileName) =>
                selectedFiles.length === 0 || selectedFiles.includes(fileName)
            )
            .map((fileName) => {
              const fileLocation =
                groupedIssues[fileName]?.[0]?.fileName?.split(":").pop() ||
                "N/A";

              return (
                <div key={fileName} className="mb-8">
                  <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mx-4 my-2">
                    File: {fileLocation}
                  </h2>
                  <div className="space-y-4">
                    {groupedIssues[fileName].map((vulnerability, index) => (
                      <Issuscrad
                        key={vulnerability.title + index}
                        title={vulnerability.title}
                        severity={vulnerability.Severity}
                        badges={vulnerability.badges}
                        types={vulnerability.types}
                        filenName={vulnerability.fileName.split("/").pop()}
                        effort={vulnerability.effort}
                        message={vulnerability.message}
                        description={vulnerability.description}
                        solution={vulnerability.solution}
                        resources={vulnerability.resources}
                        category={vulnerability.category}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          {/* Render Table */}
          {/* <div className="w-full">{renderTable()}</div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
