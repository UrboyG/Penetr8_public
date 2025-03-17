import React from "react";

const CustomGithubLoginButton = () => {
  return (
    <div>
      <button className="flex items-center justify-center w-full bg-gray-800 text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-lg hover:bg-gray-900 transition">
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.478 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.012-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.031 1.532 1.031.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.34-2.221-.252-4.555-1.112-4.555-4.947 0-1.092.39-1.986 1.03-2.686-.103-.253-.447-1.268.098-2.644 0 0 .841-.269 2.75 1.025a9.548 9.548 0 012.5-.336c.849.004 1.705.115 2.5.336 1.909-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.391.1 2.644.64.7 1.029 1.594 1.029 2.686 0 3.843-2.337 4.692-4.566 4.94.359.309.678.919.678 1.852 0 1.337-.012 2.417-.012 2.745 0 .268.181.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.478-10-10-10z"
            clipRule="evenodd"
          />
        </svg>
        Log In with GitHub
      </button>
    </div>
  );
};

export default CustomGithubLoginButton;
