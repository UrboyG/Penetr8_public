import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardCard = ({
  title,
  count,
  data,

  icon,
  bgColor,
}) => {
  return (
    <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4 rounded-lg ">
      <div className="relative flex flex-col min-w-0 break-words rounded mb-3 xl:mb-0 shadow-lg bg-white">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-Black_text_5 uppercase font-semibold text-xs pb-1 ">
                {title}
              </h5>
              <span className="font-bold text-2xl  text-Black_text_5">
                {count}
              </span>

            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${bgColor}`}
              >
                {icon}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 h-[40px]">
            {data.HIGH || data.MEDIUM || data.LOW ? (
              <>
                <span
                  className={`min-w-[50px] px-9 py-1 rounded-md text-xs font-bold flex items-center justify-center ${data.HIGH
                      ? "text-error bg-light_error"
                      : "text-blueGray-500 bg-grey_5"
                    }`}
                >
                  {data.HIGH > 999
                    ? `${(data.HIGH / 1000).toFixed(1)}k`
                    : data.HIGH || 0}{" "}
                  H
                </span>
                <span
                  className={`min-w-[50px] px-5 py-1 rounded-md text-xs font-bold flex items-center justify-center ${data.MEDIUM
                      ? "text-warning bg-light_warning"
                      : "text-blueGray-500 bg-grey_5"
                    }`}
                >
                  {data.MEDIUM > 999
                    ? `${(data.MEDIUM / 1000).toFixed(1)}k`
                    : data.MEDIUM || 0}{" "}
                  M
                </span>
                <span
                  className={`min-w-[50px] px-5 py-1 rounded-md text-xs font-bold flex items-center justify-center ${data.LOW
                      ? "text-firm bg-light_firm"
                      : "text-blueGray-500 bg-grey_5"
                    }`}
                >
                  {data.LOW > 999
                    ? `${(data.LOW / 1000).toFixed(1)}k`
                    : data.LOW || 0}{" "}
                  L
                </span>
              </>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const OverallcodeCard = ({ overallCode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    securityIssues: { LOW: 0, MEDIUM: 0, HIGH: 0, total: 0 },
    reliabilityIssues: { LOW: 0, MEDIUM: 0, HIGH: 0, total: 0 },
    securityHotspots: 0,
    maintainabilityIssues: { LOW: 0, MEDIUM: 0, HIGH: 0, total: 0 },
  });

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      // Use the new backend structure directly
      const {
        securityIssues,
        reliabilityIssues,
        securityHotspots,
        maintainabilityIssues,
      } = overallCode;

      setData({
        securityIssues,
        reliabilityIssues,
        securityHotspots: parseInt(securityHotspots, 10) || 0,
        maintainabilityIssues,
      });
    } catch (error) {
      console.error("Error fetching overall code data:", error);
      setError("Failed to load overall code data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    // <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
    //   <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
    <div className="flex flex-wrap bg-blue_0 rounded-lg shadow-lg p-2 m-4 w-full">
      <DashboardCard
        title="Security"
        count={data.securityIssues.total}
        data={data.securityIssues}
        icon={
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-shield-lock"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
            <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 12l0 2.5" />
          </svg>
        }
        bgColor="bg-dark_purple_5"
      />
      <DashboardCard
        title="Reliability"
        count={data.reliabilityIssues.total}
        data={data.reliabilityIssues}
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-augmented-reality"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
            <path d="M4 16v2a2 2 0 0 0 2 2h2" />
            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
            <path d="M12 12.5l4 -2.5" />
            <path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5z" />
            <path d="M8 10v4.5l4 2.5" />
          </svg>
        }
        bgColor="bg-Fuchsia_pink_5"
      />

      <DashboardCard
        title="Maintainability"
        count={data.maintainabilityIssues.total}
        data={data.maintainabilityIssues}
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-tool"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" />
          </svg>
        }
        bgColor="bg-blue_2"
      />
      <DashboardCard
        title="Security Hotspots"
        count={data.securityHotspots}
        data={{ LOW: 0, MEDIUM: 0, HIGH: 0 }} // No breakdown for hotspots
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icon-tabler-bug"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 9v-1a3 3 0 0 1 6 0v1" />
            <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" />
            <path d="M3 13l4 0" />
            <path d="M17 13l4 0" />
            <path d="M12 20l0 -6" />
            <path d="M4 19l3.35 -2" />
            <path d="M20 19l-3.35 -2" />
            <path d="M4 7l3.75 2.4" />
            <path d="M20 7l-3.75 2.4" />
          </svg>
        }
        bgColor="bg-blue_4"
      />
    </div>
  );
};

export default OverallcodeCard;
