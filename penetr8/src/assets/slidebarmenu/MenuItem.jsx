import React from "react";

const SidebarMenuItem = ({ label, href, icon, badge }) => {
  return (
    <li>
      <a
        // href={href}
        className="flex items-center py-2 pr-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        <span className="flex items-center justify-center w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
          {icon}
        </span>
        <span className="ms-3 text-gray-600 text-sm">{label}</span>
        {badge && (
          <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {badge}
          </span>
        )}
      </a>
    </li>
  );
};

export default SidebarMenuItem;
