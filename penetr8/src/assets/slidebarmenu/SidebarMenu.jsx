import React, { useState } from "react";
import MenuItem from "./MenuItem.jsx";
import { NavLink } from "react-router-dom";
import LetterP from "/letter-p.png";

import { useAuth } from "../../AuthContext.jsx";

const SidebarMenu = ({searchParams, onSelect, onClose, onFilterChange }) => {
  const { logout } = useAuth();
  const handleButtonClicked = () => {
    logout();
  };

  const [filters, setFilters] = useState({
    softwareQuality: [],
    severity: [],
    level: [],
    types: [],
  });

  const qualityLevels = ["SECURITY", "RELIABILITY", "MAINTAINABILITY"];
  const levels = [
    { label: "H", text: "High Issue", value: "HIGH", color: "text-red-500" },
    {
      label: "M",
      text: "Medium Issue",
      value: "MEDIUM",
      color: "text-yellow-500",
    },
    { label: "L", text: "Low Issue", value: "LOW", color: "text-green-500" },
  ];

  const severityLevels = [
    {
      label: "C",
      text: "Critical",
      value: "BLOCKER",
      color: "text-purple-500",
    },
    { label: "H", text: "High", value: "CRITICAL", color: "text-red-500" },
    { label: "M", text: "Medium", value: "MAJOR", color: "text-yellow-500" },
    { label: "L", text: "Low", value: "MINOR", color: "text-green-500" },
    { label: "N", text: "None", value: "INFO", color: "text-blue-500" },
  ];

  const typesAll = ["BUG", "CODE_QUALITY", "VULNERABILITY"];

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [category]: prevFilters[category]
          ? prevFilters[category].includes(value)
            ? prevFilters[category].filter((item) => item !== value)
            : [...prevFilters[category], value]
          : [value],
      };

      if (onFilterChange) {
        onFilterChange(updatedFilters);
      }

      return updatedFilters;
    });
  };

  const [isSoftwareDropdownOpen, setSoftwareDropdownOpen] = useState(false);
  const [isSeverityDropdownOpen, setSeverityDropdownOpen] = useState(false);
  const [isIssueTypesOpen, setIssueTypesOpen] = useState(false);
  const [isSeverityOpen, setSeverityOpen] = useState(false);
  return (
    <div className="space-y-2 font-medium h-full flex flex-col justify-between overflow-y-auto px-4 pb-4">
      <div>
        <li
          onClick={onClose}
          className="absolute top-10 right-4 p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600  block md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </li>
        <ul className="space-y-2 font-medium">
          <NavLink to="/home" className="flex items-center">
            <img
              src={LetterP}
              className="h-[2em] sm:h-[2.5em] w-auto"
              alt="Logo"
            />
            <p className="bg-transparent border-none text-black_text_7 font-bold sm:text-2xl lg:text-3xl">
              enetr8
            </p>
          </NavLink>
          <p className="text-xs pt-3 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            History
          </p>
          <li>
            <NavLink to="/report">
              <MenuItem
                label="report"
                href="#report"
                icon={
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
                    className="icon icon-tabler icons-tabler-outline icon-tabler-history"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 8l0 4l2 2" />
                    <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                  </svg>
                }
              />
            </NavLink>
          </li>
          <li>
           {searchParams && <NavLink to="/dashboard">
              <MenuItem
                label="Latest Scan"
                href="#dashboard"
                icon={
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-code"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M10 13l-1 2l1 2" /><path d="M14 13l1 2l-1 2" /></svg>
                }
              />
            </NavLink>}
          </li>
          <li>
            <div
              onClick={() => setSoftwareDropdownOpen(!isSoftwareDropdownOpen)}
              className="flex items-center justify-between w-full p-2 text-gray-900 focus:outline-none focus:ring-0 transition duration-75 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="text-xs  text-gray-600">Software Quality</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </div>

            {isSoftwareDropdownOpen && (
              <ul className="pl-4 py-2 space-y-2">
                {qualityLevels.map((quality) => (
                  <label key={quality} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.softwareQuality.includes(quality)}
                      onChange={() =>
                        handleCheckboxChange("softwareQuality", quality)
                      }
                      className="cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{quality}</span>
                  </label>
                ))}

                {/* Severity - Nested Dropdown */}
                <li>
                  <div
                    onClick={() =>
                      setSeverityDropdownOpen(!isSeverityDropdownOpen)
                    }
                    className="flex items-center justify-between w-full p-2 text-gray-900 focus:outline-none focus:ring-0 transition duration-75 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <span className="text-xs  text-gray-600">Severity</span>

                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>

                  {isSeverityDropdownOpen && (
                    <ul className="pl-4 py-2 space-y-2">
                      {levels.map(({ label, text, value, color }) => (
                        <label
                          key={value}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={filters.level.includes(value)}
                            onChange={() =>
                              handleCheckboxChange("level", value)
                            }
                            className="cursor-pointer"
                          />
                          <span className={`text-sm font-semibold ${color}`}>
                            {label}
                          </span>
                          <span className="text-sm text-gray-700">{text}</span>
                        </label>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Issue Types - Dropdown */}
          <li>
            <div
              onClick={() => setIssueTypesOpen(!isIssueTypesOpen)}
              className="flex items-center justify-between w-full p-2 text-gray-900 focus:outline-none focus:ring-0 transition duration-75 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="text-xs  text-gray-600">Issue Types</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </div>

            {isIssueTypesOpen && (
              <ul className="pl-4 py-2 space-y-2">
                {typesAll.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => handleCheckboxChange("types", type)}
                      className="cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </ul>
            )}
          </li>
          {/* Severity - Dropdown */}
          <li>
            <div
              onClick={() => setSeverityOpen(!isSeverityOpen)}
              className="flex items-center justify-between w-full p-2 text-gray-900 focus:outline-none focus:ring-0 transition duration-75 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="text-xs  text-gray-600">Issue Severity</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path stroke="currentColor" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </div>

            {isSeverityOpen && (
              <ul className="pl-4 py-2 space-y-2">
                {severityLevels.map(({ label, text, value, color }) => (
                  <label key={value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.severity.includes(value)}
                      onChange={() => handleCheckboxChange("severity", value)}
                      className="cursor-pointer"
                    />
                    <span className={`text-sm font-semibold ${color}`}>
                      {label}
                    </span>
                    <span className="text-sm text-gray-700">{text}</span>
                  </label>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div>
        <button
          className="   p-2  shadow-gradient flex items-center w-full mt-4 rounded-md text-white hover:opacity-90 hover:text-gray-400  transition-opacity"
          style={{
            background: "linear-gradient(to right, #A3346B, #632C61)", // Use inline style for gradient
          }}
          onClick={handleButtonClicked}
        >
          <span className="mr-4">
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
              <path d="M15 12h-12l3 -3" />
              <path d="M6 15l-3 -3" />
            </svg>
          </span>
          log out
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
