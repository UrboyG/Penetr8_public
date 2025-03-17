import React from "react";
import MenuItem from "./MenuItem.jsx";
import { NavLink } from "react-router-dom";
import LetterP from "/letter-p.png";
import { useAuth } from "../../AuthContext.jsx";

const SideUserSetting = ({ onClose }) => {
  const { logout } = useAuth();

  const handleButtonClicked = () => {
    logout();
  };

  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  return (
    <div className="space-y-2 font-medium h-full flex flex-col justify-between overflow-y-auto px-4 pb-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
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
          className="w-6 h-6"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Logo */}

      {/* Navigation Menu */}
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
          User Settings
        </p>
        <li>
          <a href="#profile">
            <MenuItem
              label="Profile"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-file-settings"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5" />
                  <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M19.001 15.5v1.5" />
                  <path d="M19.001 21v1.5" />
                  <path d="M22.032 17.25l-1.299 .75" />
                  <path d="M17.27 20l-1.3 .75" />
                  <path d="M15.97 17.25l1.3 .75" />
                  <path d="M20.733 20l1.3 .75" />
                </svg>
              }
            />
          </a>
        </li>
        <p className="text-xs pt-3 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
          Privacy
        </p>
        <li>
          <a href="#security">
            <MenuItem
              label="Security and Privacy"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-file-settings"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M12 10.5v1.5" />
                  <path d="M12 16v1.5" />
                  <path d="M15.031 12.25l-1.299 .75" />
                  <path d="M10.268 15l-1.3 .75" />
                  <path d="M15 15.803l-1.285 -.773" />
                  <path d="M10.285 12.97l-1.285 -.773" />
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                </svg>
              }
            />
          </a>
        </li>
        <p className="text-xs pt-3 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
          System settings
        </p>
        <li>
          <a href="#notifications">
            <MenuItem
              label="Notification Preferences"
              icon={
                <svg
                  className="icon icon-tabler icons-tabler-outline icon-tabler-file-settings"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 00-5-5.91V4a1 1 0 10-2 0v1.09A6 6 0 006 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-5a4 4 0 018 0v5z" />
                </svg>
              }
            />
          </a>
        </li>

        <li>
          <a href="#scan">
            <MenuItem
              label="Scan Preferences"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-clock-search"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20.993 11.646a9 9 0 1 0 -9.318 9.348" />
                  <path d="M12 7v5l1 1" />
                  <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M20.2 20.2l1.8 1.8" />
                </svg>
              }
            />
          </a>
        </li>
        <li>
          <a href="#resources">
            <MenuItem
              label="Educational Resources"
              icon={
                <svg
                  className="icon icon-tabler icons-tabler-outline icon-tabler-clock-search"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2a7 7 0 00-7 7v6h14V9a7 7 0 00-7-7zm0 2a5 5 0 015 5v6H7V9a5 5 0 015-5zm-6 8v2h12v-2H6zm3 4v4h2v-4H9zm4 0v4h2v-4h-2zm-3.5 5c0 .55-.45 1-1 1h-1a1 1 0 01-1-1c0-.55.45-1 1-1h1c.55 0 1 .45 1 1zm8.5 0c0 .55-.45 1-1 1h-1a1 1 0 01-1-1c0-.55.45-1 1-1h1c.55 0 1 .45 1 1z" />
                </svg>
              }
            />
          </a>
        </li>
      </ul>

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

export default SideUserSetting;
