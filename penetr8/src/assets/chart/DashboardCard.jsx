import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardCard = ({ title, count, data, textColor, icon }) => {
  return (
    <div className="flex flex-col px-6 py-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col items-center space-y-4">
        <span className="flex items-center justify-center w-20 h-20 text-Fuchsia_pink_5 transition duration-75 dark:text-dark_purple_5 group-hover:text-dark_purple_8_5 dark:group-hover:text-white">
          {icon}
        </span>
        <div
          className={`text-3xl font-bold tracking-tight leading-none pb-1 ${textColor}`}
        >
          {/* Total count */}
          {count}
        </div>
        <div className="flex justify-between w-full text-sm bg-gray-50 p-2 rounded-md shadow-inner">
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-700">Low</span>
            <span className="text-gray-900">{data.LOW}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-700">Medium</span>
            <span className="text-gray-900">{data.MEDIUM}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-gray-700">High</span>
            <span className="text-gray-900">{data.HIGH}</span>
          </div>
        </div>

        <div className={`text-sm font-normal ${textColor}`}>{title}</div>
      </div>
    </div>
  );
};


const Dashboards = () => {
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
      const response = await axios.get(
        "http://localhost:8080/dashboard/maintainabilityIssues"
      );

      if (response.status === 200) {
        // Use the new backend structure directly
        const {
          securityIssues,
          reliabilityIssues,
          securityHotspots,
          maintainabilityIssues,
        } = response.data;

        setData({
          securityIssues,
          reliabilityIssues,
          securityHotspots: parseInt(securityHotspots, 10) || 0,
          maintainabilityIssues,
        });
      } else {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
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
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <DashboardCard
          title="Security Issues"
          count={data.securityIssues.total}
          data={data.securityIssues}
          textColor="text-Black_test_5"
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
        />
        <DashboardCard
          title="Reliability Issues"
          count={data.reliabilityIssues.total}
          data={data.reliabilityIssues}
          textColor="text-Black_test_5"
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
              className="icon icon-tabler icon-tabler-shield-x"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13.252 20.601c-.408 .155 -.826 .288 -1.252 .399a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.19 7.357" />
              <path d="M22 22l-5 -5" />
              <path d="M17 22l5 -5" />
            </svg>
          }
        />
        <DashboardCard
          title="Security Hotspots"
          count={data.securityHotspots}
          data={{ LOW: 0, MEDIUM: 0, HIGH: 0 }} // No breakdown for hotspots
          textColor="text-Black_test_5"
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
              className="icon icon-tabler icon-tabler-lock"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
              <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
              <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
            </svg>
          }
        />
        <DashboardCard
          title="Maintainability Issues"
          count={data.maintainabilityIssues.total}
          data={data.maintainabilityIssues}
          textColor="text-Black_test_5"
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
              className="icon icon-tabler icon-tabler-brand-debian"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 17c-2.397 -.943 -4 -3.153 -4 -5.635c0 -2.19 1.039 -3.14 1.604 -3.595c2.646 -2.133 6.396 -.27 6.396 3.23c0 2.5 -2.905 2.121 -3.5 1.5c-.595 -.621 -1 -1.5 -.5 -2.5" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Dashboards;
