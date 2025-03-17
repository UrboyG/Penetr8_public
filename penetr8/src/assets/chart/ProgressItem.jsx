import React from "react";

function ProgressItem({ fileName, fileSize, progress, onRemove }) {
  return (
    <div className="relative flex items-center p-4 bg-white rounded-lg shadow-md h-28 w-full border-2 border-gray-300 my-4">
      {/* Delete Icon */}
      <button
        type="button"
        className=" absolute top-5 right-3 text-white bg-Black_text_5 hover:bg-black_text_7 focus:ring-4 focus:outline-none focus:ring-Black_text_4 font-medium rounded-lg text-sm p-1.5 text-center inline-flex items-center me-2 dark:bg-Black_text_5 dark:hover:bg-black_text_7 dark:focus:ring-Black_text_4"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-x"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>

      {/* File Details */}
      <div className="ml-4 flex-1">
        <p className="text-gray-900 font-medium">{fileName}</p>
        <p className="text-sm text-gray-500">{fileSize}</p>
        <div className="flex items-center mt-2">
          <div className="bg-gray-200 rounded-full h-3 flex-1">
            <div
              className="bg-Fuchsia_pink_5 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs font-bold text-black_text_7 mx-2">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressItem;
