import React, { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import Pillsbadge from "../Pillsbadge";

const Issuscrad = ({
  title,
  severity,
  badges,
  types,
  filenName,
  effort,
  description,
  solution,
  resources,
  category,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const renderContentWithCode = (content) => {
    if (!content) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Separate text paragraphs and <pre> code blocks
    const paragraphs = Array.from(doc.body.children).filter(
      (el) => el.tagName.toLowerCase() !== "pre"
    );
    const codeBlocks = Array.from(doc.body.getElementsByTagName("pre"));

    return (
      <div>
        {/* Render Text Content */}
        {paragraphs.map((para, index) => (
          <p
            key={`paragraph-${index}`}
            dangerouslySetInnerHTML={{ __html: para.outerHTML }}
            className="text-sm text-gray-600 dark:text-gray-400"
          />
        ))}

        {/* Render Code Blocks */}
        {codeBlocks.map((block, index) => (
          <div key={`codeblock-${index}`} className="mt-6">
            <p className="text-gray-600 text-sm font-bold mb-2">
              {block.previousElementSibling?.innerText || "Code Example:"}
            </p>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <LiveProvider code={block.textContent}>
                <LiveEditor className="mb-2 border rounded-lg p-2 text-sm bg-white dark:bg-gray-900" />
                <LiveError className="text-red-600 text-sm mt-2" />
                <LivePreview className="border-t border-gray-300 mt-4 pt-2" />
              </LiveProvider>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 m-4 rounded-lg shadow-lg relative">
      {/* Title and Badges */}
      <p className="flex items-center mb-4 space-x-4">
        <span className="text-gray-600 text-xl font-bold">{title}</span>
      </p>
      <p className="text-sm text-gray-500 mb-1">
        {/* From <span className="text-gray-600 mx-1">{filenName}</span> */}
        <span className="inline-flex items-center text-sm text-blueGray-500 ml-2">
          <span className="mr-2">{effort} effort</span>{" "}
          <span className="text-gray-400 mx-1">•</span>
          <div className="flex space-x-2">
            {badges?.map((badge, index) => {
              return (
                <Pillsbadge key={index} type={badge.type} level={badge.level} />
              );
            })}
            {types && (
              <>
                <Pillsbadge overallType={types} />
              </>
            )}
            {severity && (
              <>
                <Pillsbadge overallType={severity} />
              </>
            )}
            {category && (
              <>
                <Pillsbadge overallType={category} />
              </>
            )}
          </div>
        </span>
      </p>
      {/* Accordion Button */}
      <div
        onClick={toggleAccordion}
        className="flex items-center justify-end px-2 py-1 font-medium text-gray-500 border-b-2 cursor-pointer"
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="mt-6 space-y-8">
          {/* Description Section */}
          {description?.trim() && renderContentWithCode(description) && (
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-3">
                Description
              </p>
              <div className="p-5 md:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md leading-relaxed text-gray-700 dark:text-gray-300">
                {renderContentWithCode(description)}
              </div>
            </div>
          )}

          {/* Solution Section */}
          {solution?.trim() && renderContentWithCode(solution) && (
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-3">
                Solution
              </p>
              <div className="p-5 md:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md leading-relaxed text-gray-700 dark:text-gray-300">
                {renderContentWithCode(solution)}
              </div>
            </div>
          )}

          {/* Resources Section */}
          {resources?.trim() && renderContentWithCode(resources) && (
            <div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-3">
                Resources
              </p>
              <div className="p-5 md:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md leading-relaxed text-gray-700 dark:text-gray-300">
                {renderContentWithCode(resources)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Issuscrad;
