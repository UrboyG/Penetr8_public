import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LetterP from "/letter-p.png";
import ContactUs from "../assets/ContactUs";
const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <footer className="bg-blue_0 rounded-t-lg shadow md:flex md:items-center md:justify-between md:p-6 flex-col">
      <div className="w-full flex justify-between items-center">
        <span className="text-sm text-gray-500 sm:text-left dark:text-gray-400">
          © 2024{" "}
          <a
            href="#"
            className="text-gray-500 hover:underline hover:decoration-dark_kpurple_7 hover:text-dark_kpurple_7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Penetr8
          </a>
          . All Rights Reserved.
        </span>

        <ul className="flex flex-wrap items-center text-sm">
          <li>
            <a
              href="#"
              className="mr-4 text-gray-500 hover:underline hover:decoration-dark_kpurple_7 md:mr-6 hover:text-dark_kpurple_7"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-gray-500 hover:underline hover:decoration-dark_kpurple_7 md:mr-6 hover:text-dark_kpurple_7"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <div
              onClick={toggleModal}
              className="mr-4 text-gray-500 hover:underline hover:decoration-dark_kpurple_7 md:mr-6 hover:text-dark_kpurple_7"
            >
              Contact Us
            </div>
          </li>
        </ul>
      </div>

      <div className="w-full">
        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />

        <div className="flex items-center justify-between">
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

          <div className="flex -mx-2">{/* Social Media Icons */}</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-lg w-full">
            <ContactUs onClose={toggleModal} />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
