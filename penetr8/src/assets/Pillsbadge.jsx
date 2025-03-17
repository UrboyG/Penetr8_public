import React from "react";

const Pillsbadge = ({
  type,
  level,
  overallType,
  severity,
  dotColor,
  category,
}) => {
  const badgeColors = {
    BLOCKER: "bg-purple-100 text-purple-800",
    CRITICAL: "bg-red-100 text-red-800",
    MAJOR: "bg-yellow-100 text-yellow-800",
    MINOR: "bg-green-100 text-green-800",
    INFO: "bg-blue-100 text-blue-800",

    SECURITY_LOW: "bg-green-100 text-green-800",
    SECURITY_MEDIUM: "bg-yellow-100 text-yellow-800",
    SECURITY_HIGH: "bg-red-100 text-red-800",

    RELIABILITY_LOW: "bg-green-100 text-green-800",
    RELIABILITY_MEDIUM: "bg-yellow-100 text-yellow-800",
    RELIABILITY_HIGH: "bg-red-100 text-red-800",

    MAINTAINABILITY_LOW: "bg-green-100 text-green-800",
    MAINTAINABILITY_MEDIUM: "bg-yellow-100 text-yellow-800",
    MAINTAINABILITY_HIGH: "bg-red-100 text-red-800",

    CODE_QUALITY: "bg-indigo-100 text-indigo-800",
    VULNERABILITY: "bg-red-200 text-red-900",
    Easy: "bg-teal-100 text-teal-800",
    Moderate: "bg-orange-100 text-orange-800",
    Complex: "bg-rose-100 text-rose-800",

    default: "bg-gray-200 text-gray-800",
  };
  const mapSeverityName = (severity) =>
    ({
      BLOCKER: "CRITICAL",
      CRITICAL: "HIGH",
      MAJOR: "MEDIUM",
      MINOR: "LOW",
      INFO: "NONE",
    }[severity] || severity);
  const mappedSeverity = mapSeverityName(severity);
  const adjustedOverallType =
    overallType === "CODE_SMELL" ? "CODE_QUALITY" : overallType;

  const typeLevelKey =
    type && level ? `${type}_${level}` : adjustedOverallType || mappedSeverity;
  const badgeColor = badgeColors[typeLevelKey] || badgeColors.default;

  const computedDotColor =
    dotColor ||
    {
      BLOCKER: "bg-purple-500",
      CRITICAL: "bg-red-500",
      MAJOR: "bg-yellow-500",
      MINOR: "bg-green-500",
      INFO: "bg-blue-500",
      HIGH: "bg-red-500",
      MEDIUM: "bg-yellow-500 ",
      LOW: "bg-green-500",
      CODE_QUALITY: "bg-indigo-500",
      VULNERABILITY: "bg-red-500",
      Easy: "bg-teal-500",
      Moderate: "bg-orange-500",
      Complex: "bg-rose-100",
    }[mappedSeverity || adjustedOverallType || level || category] ||
    "bg-gray-300";

  return (
    <span
      className={`inline-flex items-center ${badgeColor} text-xs font-medium px-3 py-0.5 rounded-full mr-2`}
    >
      {/* จุดสี */}
      <span
        className={`inline-block w-2 h-2 mr-2 rounded-full ${computedDotColor}`}
      ></span>
      {mapSeverityName(
        adjustedOverallType || type || severity || level || category
      )}
    </span>
  );
};

export default Pillsbadge;
