import React from "react";
import { getApiURL } from "../libs/apiRoute";

const ContactUs = ({ onClose }) => {
  return (
    <section className="bg-white dark:bg-gray-900 flex items-center justify-center ">
      <div className="relative py-6 px-4 sm:px-6 md:py-8 md:px-8 lg:py-10 lg:px-12 w-full max-w-lg">
        <div
          onClick={onClose}
          className="absolute top-2 right-4 p-2 text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600  block "
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
        </div>
        <h2 className="mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-2 sm:mb-4 lg:mb-6 font-light text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          Have questions or feedback? We are here to help!
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const payload = {
              user_email: formData.get("user_email"),
              subject: formData.get("subject"),
              message: formData.get("message"),
            };

            const res = await fetch(getApiURL() + "/contact", {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (result.success) {
              alert("Thank you for your feedback!");
              e.target.reset();
            } else {
              alert("Failed to send message.");
            }
          }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="You@domain.com"
              name="user_email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Let us know how we can help you"
              name="subject"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
              name="message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 shadow-gradient flex items-center justify-center rounded-md text-white hover:opacity-90 hover:text-gray-200 transition-opacity"
            style={{
              background: "linear-gradient(to right, #A3346B, #632C61)",
            }}
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
