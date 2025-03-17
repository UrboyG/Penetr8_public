// Part Scan Page
//Download button
import React from "react";

const CustomBtnload = ({ text, onClick, iconSrc }) => {
  return (
    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-dark_kpurple_7 rounded-lg group bg-gradient-to-br from-Fuchsia_pink_5 to-dark_purple_5 group-hover:from-Fuchsia_pink_5 group-hover:to-dark_purple_5 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue_0 dark:focus:ring-dark_kpurple_7">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 18.004h-5.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.38 0 2.573 .813 3.13 1.99" />
          <path d="M19 16v6" />
          <path d="M22 19l-3 3l-3 -3" />
        </svg>
        Download
      </span>
    </button>
  );
};

export default CustomBtnload;
