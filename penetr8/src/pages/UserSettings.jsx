import React, { useState } from "react";

import SideUserSetting from "../assets/slidebarmenu/SideUserSetting";

const UserSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="h-screen w-screen">
      <div className="max-w-7xl mx-auto pb-10">
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
          className={`fixed top-0 left-0 z-40 w-72 h-screen pt-10 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-grey_3 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <SideUserSetting
            onSelect={(key) => setActiveTable(key)}
            onClose={() => setIsSidebarOpen(false)} // Pass the close function
          />
        </aside>

        {/* Main Content */}
        <div className="sm:ml-64 pt-10 px-4 sm:px-6 md:px-8 lg:px-10 ">
          <h1 className="text-3xl font-bold text-black_text_7 mb-6">
            User Settings
          </h1>

          {/* Profile Settings */}

          <section
            id="profile"
            className="mb-10 text-Black_text_5  max-w-4xl mt-8"
          >
            <h2 className="text-2xl font-semibold text-Black_text_5  mb-4 flex items-center">
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
                className="w-6 h-6 mr-2 text-Black_text_5 "
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
              Personal Information
            </h2>
            <p className="text-sm text-Black_text_4 mb-6">
              Use a permanent address where you can receive mail.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
              {/* Profile Image and Button */}
              <div className="flex-shrink-0">
                <img
                  src="https://via.placeholder.com/96" // Replace with user image URL
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border border-gray-600"
                />
              </div>
              <div>
                <button className="px-4 py-2 text-white bg-Black_text_5  hover:bg-black_text_7 rounded font-medium">
                  Change Avatar
                </button>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>
            <form className="space-y-6">
              {/* First and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full  text-Black_text_5 bg-white  hover:bg-gray-100 border border-gray-700 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full  text-Black_text_5 bg-white  hover:bg-gray-100 border border-gray-700 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Last name"
                  />
                </div>
              </div>
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full  text-Black_text_5 bg-white  hover:bg-gray-100 border border-gray-700 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="example@domain.com"
                />
              </div>
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full  text-Black_text_5 bg-white  hover:bg-gray-100 border border-gray-700 rounded py-2 px-3 focus:outline-none"
                  placeholder="example.com/username"
                  disabled
                />
              </div>

              {/* Save Button */}
              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 text-white bg-Black_text_5  hover:bg-black_text_7  rounded  transition"
                >
                  Save
                </button>
              </div>
            </form>
          </section>

          {/* Security and Privacy */}
          <section
            id="security"
            className="mb-10 text-Black_text_5 max-w-4xl mt-8"
          >
            <h2 className="text-2xl font-semibold text-Black_text_5 mb-4 flex items-center">
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
                className="w-6 h-6 mr-2 text-Black_text_5"
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
              Security and Privacy
            </h2>
            <div className="space-y-4">
              {/* Two-Factor Authentication */}
              <label
                htmlFor="2fa"
                className="inline-flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="2fa"
                  className="w-5 h-5 text-Black_text_4 border-gray-300 rounded focus:ring-0 focus:outline-none"
                />
                <span className="text-Black_text_5 text-sm">
                  Enable Two-Factor Authentication
                </span>
              </label>
              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button className="px-4 py-2 bg-Black_text_5 text-white font-medium rounded hover:bg-black_text_7 focus:outline-none focus:ring-0 transition">
                  Save Changes
                </button>
                <button className="px-4 py-2 bg-gray-100 text-Black_text_5 font-medium rounded border border-Black_text_7 hover:bg-gray-100 focus:outline-none focus:ring-0 transition">
                  Read Security and Privacy
                </button>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section
            id="notifications"
            className="mb-10 text-Black_text_5 max-w-4xl mt-8"
          >
            <h2 className="text-2xl font-semibold text-Black_text_5 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-Black_text_5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 00-5-5.91V4a1 1 0 10-2 0v1.09A6 6 0 006 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-5a4 4 0 018 0v5z" />
              </svg>
              Notification Preferences
            </h2>
            <div className="space-y-4">
              {/* Weekly Security Reports */}
              <label
                htmlFor="weekly-reports"
                className="flex items-center space-x-3"
              >
                <input
                  type="checkbox"
                  id="weekly-reports"
                  className="w-5 h-5 text-dark_purple_5 border-gray-300 rounded focus:ring-0 focus:outline-none"
                />
                <span className="text-gray-700 text-sm">
                  Weekly Security Reports
                </span>
              </label>
              {/* New Vulnerability Updates */}
              <label
                htmlFor="vulnerability-updates"
                className="flex items-center space-x-3"
              >
                <input
                  type="checkbox"
                  id="vulnerability-updates"
                  className="w-5 h-5 text-dark_purple_5 border-gray-300 rounded focus:ring-0 focus:outline-none"
                />
                <span className="text-gray-700 text-sm">
                  New Vulnerability Updates
                </span>
              </label>
              {/* Save Changes Button */}
              <div className="mt-6">
                <button className="px-4 py-2 bg-Black_text_5 text-white font-medium rounded hover:bg-black_text_7 focus:outline-none focus:ring-0 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* Scan Preferences */}
          <section
            id="scan"
            className="mb-10 text-Black_text_5 max-w-4xl mt-8 "
          >
            <h2 className="text-2xl font-semibold text-Black_text_5 mb-4 flex items-center">
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
                className="w-6 h-6 mr-2 text-Black_text_5"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20.993 11.646a9 9 0 1 0 -9.318 9.348" />
                <path d="M12 7v5l1 1" />
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M20.2 20.2l1.8 1.8" />
              </svg>
              Scan Preferences
            </h2>
            <div className="space-y-4">
              {/* Scan Frequency */}
              <div>
                <label
                  htmlFor="scan-frequency"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Scan Frequency
                </label>
                <select
                  id="scan-frequency"
                  className="w-full bg-white text-gray-700 border border-gray-300 rounded py-2 px-3 shadow-sm focus:outline-none focus:ring focus:ring-black_text_7 focus:border-Black_text_5"
                >
                  <option>Manual</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              {/* Save Changes Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-Black_text_5 text-white font-medium rounded hover:bg-black_text_7 focus:outline-none focus:ring-0 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* Educational Resources */}
          <section
            id="resources"
            className="mb-10 p-6 bg-grey_5 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-Fuchsia_pink_5 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-Fuchsia_pink_5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2a7 7 0 00-7 7v6h14V9a7 7 0 00-7-7zm0 2a5 5 0 015 5v6H7V9a5 5 0 015-5zm-6 8v2h12v-2H6zm3 4v4h2v-4H9zm4 0v4h2v-4h-2zm-3.5 5c0 .55-.45 1-1 1h-1a1 1 0 01-1-1c0-.55.45-1 1-1h1c.55 0 1 .45 1 1zm8.5 0c0 .55-.45 1-1 1h-1a1 1 0 01-1-1c0-.55.45-1 1-1h1c.55 0 1 .45 1 1z" />
              </svg>
              Educational Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-dark_purple_5 mb-2">
                    Beginner Tutorials
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get started with step-by-step guides and easy-to-follow
                    tutorials.
                  </p>
                </div>
                <button className="w-full py-2 bg-dark_purple_5 text-white rounded hover:bg-dark_kpurple_7">
                  Access Tutorials
                </button>
              </div>
              <div className="p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-dark_purple_5 mb-2">
                    Advanced Articles
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Dive deeper into advanced concepts and techniques.
                  </p>
                </div>
                <button className="w-full py-2 bg-dark_purple_5 text-white rounded hover:bg-dark_kpurple_7">
                  View Articles
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
