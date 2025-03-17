import React from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";

const DropdownMenu = ({ items, user }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            {/* Menu Button */}
            <MenuButton className="text-white hover:text-gray-400 bg-black_text_7 p-2 rounded shadow-gradient">
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
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </MenuButton>

            {/* Menu Items */}
            {open && (
              <MenuItems
                static
                className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black_text_7 ring-opacity-5"
              >
                {/* User Profile Section */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <NavLink
                    to="/UserSettings"
                    className="mt-3 inline-block text-sm text-text-dark_purple_5 hover:underline"
                  >
                    Setting
                  </NavLink>
                </div>

                {/* Dropdown Menu Items */}
                <div className="py-2" role="menu" aria-orientation="vertical">
                  {items.map((item, index) => (
                    <MenuItems key={index}>
                      {({ active }) => (
                        <NavLink
                          to={item.path || "#"}
                          onClick={item.onClick || null}
                          className={`flex items-center rounded-md px-4 py-2 text-sm ${
                            active
                              ? "bg-gray-100 text-Fuchsia_pink_5"
                              : "text-gray-700"
                          } hover:bg-gray-100 hover:text-Fuchsia_pink_5 active:bg-dark_kpurple_7 active:text-white cursor-pointer`}
                        >
                          <span className="w-5 h-5 mr-2">{item.icon}</span>
                          {item.label}
                        </NavLink>
                      )}
                    </MenuItems>
                  ))}
                </div>
              </MenuItems>
            )}
          </>
        )}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
