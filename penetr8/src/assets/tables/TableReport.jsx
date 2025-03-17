import React, { useState, useEffect } from "react";
import Search from "../Search.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { getApiURL } from "../../libs/apiRoute.js";

const TableRow = ({ data }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

      <td className="px-4 sm:px-6 py-4">
        <input type="checkbox" />
      </td>

      <td className="px-6 py-4">
        {data.scanDate}
      </td>
      
      <td className="px-6 py-4">
        <Link
          to={`/dashboard?scanId=${data.fileId}`}
          className="text-blue-600 hover:underline"
        >
          {data.projectName}
        </Link>

      </td>
      <td className="px-6 py-4">
        <img 
          alt= "Quality Gate Status"
          src={`http://localhost:8080/sonarqube/badge/gg`}
          style={{ height: '20px' }}
        />
      </td>

      {/* <td className="px-6 py-4">
        {data.severity || "N/A"}
      </td>

      <td className="px-6 py-4">
        {data.programmingLanguage || "N/A"}
      </td> */}

    </tr>
  );
};

//Display the Collumn Titles
const Tables = ({ data }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Select
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Timestamp
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Report Name
            </th>
            <th title="Indicates whether the project meets the SonarQube quality criteria." scope="col" className="px-4 sm:px-6 py-3">
              Quality Gate Status
            </th>
            {/* <th scope="col" className="px-4 sm:px-6 py-3">
              Severity
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Programming Language
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

const App = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const userId = Number(localStorage.getItem("userId"));
        if(!userId) {
          console.error("User ID not found");
          return;
        }

        const response = await axios.get("http://localhost:8080/dashboard/timestamps", {
          params:{ userId }, 
        });

        // Sort data from newest to oldest
        const sortedData = response.data.sort((a, b) => new Date(b.scanDate) - new Date(a.scanDate));
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const lowerCasedQuery = searchQuery.toLowerCase();
    return (
      (item.projectName && item.projectName.toLowerCase().includes(lowerCasedQuery)) ||
      (item.penetrationPoint && item.penetrationPoint.toLowerCase().includes(lowerCasedQuery))
      // (item.severity && item.severity.toString().includes(lowerCasedQuery)) ||
      // (item.programmingLanguage && item.programmingLanguage.toString().includes(lowerCasedQuery)) ||
      (item.scanDate && item.scanDate.toString().includes(lowerCasedQuery))
    );
  });
  console.log(filteredData);
  

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <Search onSearch={handleSearch} width="w-full" />
      </div>
      <Tables data={filteredData} />
    </div>
  );
};

export default App;
