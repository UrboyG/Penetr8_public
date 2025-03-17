import React, { useState } from "react";

const Search = ({ onSearch, width = "max-w-4xl" }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleButtonClicked = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className={`${width} my-6`}>
      <form className="flex items-center" onSubmit={handleButtonClicked}>
        <div className="relative flex-grow">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={query}
            onChange={handleInputChange}
            className="block w-full h-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-dark_purple_5 focus:border-dark_purple_5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark_purple_5 dark:focus:border-dark_purple_5"
            placeholder="Search Mockups, Logos..."
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
