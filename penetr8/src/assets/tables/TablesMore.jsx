import React, { useState, useEffect } from "react";
import Search from "../Search.jsx";
import axios from "axios";

const fetchVulnerabilityData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/dashboard/vulnerabilities"
    );
    return response.data.map((item, index) => ({
      Order: index + 1,
      Vulnerability: item.Vulnerability || "N/A",
      resources: item.resources || "N/A",
      Score: item.Score || "N/A",
      Severity: item.Severity || "N/A",
      Description: item.Description || "No description available",
      Solution: item.Solution || "No solution provided",
    }));
  } catch (error) {
    console.error("Error fetching vulnerability data:", error);
    return [];
  }
};
const TableRow = ({ data }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.Order}
      </td>
      <td className="px-4 sm:px-6 py-4">{data.Vulnerability}</td>
      <td
        className="px-4 sm:px-6 py-4 flex-grow"
        style={{ width: "100%", maxWidth: "100%" }}
        dangerouslySetInnerHTML={{ __html: data.Description }}
      ></td>
      {/* <td className="px-4 sm:px-6 py-4">{data.Solution}</td> */}
    </tr>
  );
};

const Tables = ({ data }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Order
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Vulnerability
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Description
            </th>
            {/* <th scope="col" className="px-4 sm:px-6 py-3">
              Solution
            </th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={index} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TablesMore = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data when component mounts
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchVulnerabilityData();
      setData(fetchedData);
    };
    loadData();
  }, []);

  const filteredData = data.filter((item) => {
    const lowerCasedQuery = searchQuery.toLowerCase();
    return (
      item.Vulnerability.toLowerCase().includes(lowerCasedQuery) ||
      item.Description.toLowerCase().includes(lowerCasedQuery) ||
      item.Solution.toString().includes(lowerCasedQuery) ||
      item.Order.toString().includes(lowerCasedQuery)
    );
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6">
        Unreferenced Vulnerability
      </h1>
      <div className="mb-6">
        <Search onSearch={handleSearch} width="w-full" />
      </div>
      <Tables data={filteredData} />
    </div>
  );
};

export default TablesMore;
