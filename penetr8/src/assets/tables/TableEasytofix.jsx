import React, { useState } from "react";
import Search from "../Search.jsx";
import { mockEasytofixVulnerabilityData } from "../../database/Mockdata.jsx";

const TableRow = ({ data }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.Order}
      </td>
      <td className="px-4 sm:px-6 py-4">{data.Vulnerability}</td>
      <td className="px-4 sm:px-6 py-4">{data.EasyToFix}</td>
      <td className="px-4 sm:px-6 py-4">{data.Solution}</td>
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
              Easy to Fix
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Solution
            </th>
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

const TableEasytofix = () => {
  const data = mockEasytofixVulnerabilityData();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((item) => {
    const lowerCasedQuery = searchQuery.toLowerCase();
    return (
      item.Vulnerability.toLowerCase().includes(lowerCasedQuery) ||
      item.EasyToFix.toLowerCase().includes(lowerCasedQuery) ||
      item.Solution.toString().includes(lowerCasedQuery) ||
      item.Order.toString().includes(lowerCasedQuery)
    );
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
        Easy to Fix
      </h1>
      <div className="mb-6">
        <Search onSearch={handleSearch} width="w-full" />
      </div>
      <Tables data={filteredData} />
    </div>
  );
};

export default TableEasytofix;
