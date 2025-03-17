import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import axios from "axios";

const useFetchVulnerabilities = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/dashboard/vulnerabilities"
        );

        setData(response.data);
      } catch (err) {
        console.error("Error fetching vulnerabilities:", err);
        setError(err);
      }
    };
    fetchData();
  }, []);

  return { data, error };
};

const PieChart = () => {
  const { data, error } = useFetchVulnerabilities();
  const [chartData, setChartData] = useState({
    series: [],
    labels: ["LOW", "MEDIUM", "HIGH"],
  });

  useEffect(() => {
    if (data.length) {
      const severityCount = {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
      };

      // Extract and count severity levels
      data.forEach((item) => {
        const severity = item.Severity; // Assuming `Severity` is directly available in the API response
        if (severity === "LOW") severityCount.LOW += 1;
        else if (severity === "MEDIUM") severityCount.MEDIUM += 1;
        else if (severity === "HIGH") severityCount.HIGH += 1;
      });

      setChartData({
        series: [severityCount.LOW, severityCount.MEDIUM, severityCount.HIGH],
        labels: ["LOW", "MEDIUM", "HIGH"],
      });
    }
  }, [data]);

  useEffect(() => {
    if (chartData.series.length && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(
        document.getElementById("pie-chart"),
        {
          series: chartData.series,
          labels: chartData.labels,
          chart: {
            type: "pie",
            height: 350,
            width: "100%",
          },
          colors: ["#632C61", "#B55D89", "#414273"],
          legend: { position: "bottom" },
          dataLabels: { enabled: true },
        }
      );
      chart.render();

      return () => chart.destroy();
    }
  }, [chartData]);

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  if (!chartData.series.length) {
    return <p>Loading...</p>;
  }

  return <div id="pie-chart" className="w-full"></div>;
};

const DashboardCard = () => {
  return (
    <div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-800 p-6 md:p-8 lg:max-w-4xl lg:p-12">
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white mb-4 lg:mb-6">
          Total Vulnerabilities
        </p>
        <div className="w-full">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
