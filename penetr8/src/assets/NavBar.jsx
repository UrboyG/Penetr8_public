import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Btnuserdropdown from "./Btnuserdropdown.jsx";
import LetterP from "/letter-p.png";
import DropdownMenu from "../assets/DropdownMenu.jsx";

const NavBar = ({ bgColor }) => {
  const { logout } = useAuth();
  const handleButtonClicked = () => {
    logout();
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: (
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
          className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
          <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
          <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
          <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
        </svg>
      ),
      path: "/dashboard",
    },
    {
      label: "Past Scan",
      icon: (
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
      ),
      path: "/report",
    },
    {
      label: "Log Out",
      icon: (
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
      ),
      onClick: handleButtonClicked,
    },
  ];

  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  return (
    <nav
      className={`z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 fixed top-0 w-full transition-colors duration-1000 ease-in-out ${bgColor}`}
    >
      {/* Logo */}
      <ul className="flex items-center space-x-4">
        <li>
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
        </li>
      </ul>

      {/* Menu for larger screens */}
      <ul className="hidden md:flex items-center space-x-6">
        <li>
          <NavLink to="/dashboard">
            <div className="relative inline cursor-pointer text-xl  text-Black_text_5 font-semibold before:bg-dark_purple_5  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
              Dashboard
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/report">
            <div className="relative inline cursor-pointer text-xl text-Black_text_5 font-semibold before:bg-dark_purple_5  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
              Past scan
            </div>
          </NavLink>
        </li>
        <Btnuserdropdown items={menuItems} user={user} />
      </ul>

      {/* Menu for smaller screens */}
      <div className="flex md:hidden">
        <DropdownMenu items={menuItems} user={user} />
      </div>
    </nav>
  );
};

export default NavBar;
