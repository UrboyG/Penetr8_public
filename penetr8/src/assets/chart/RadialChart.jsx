import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const RadialChart = () => {
  const getChartOptions = () => {
    return {
      series: [10, 50, 70],
      colors: ["#632C61", "#B55D89", "#414273"],
      chart: {
        height: "350px",
        width: "100%",
        type: "radialBar",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          track: {
            background: "#E5E7EB",
          },
          dataLabels: {
            show: true,
            name: {
              show: true,
              offsetY: 20,
            },
            value: {
              show: true,
              offsetY: -10,
            },
          },
          hollow: {
            margin: 0,
            size: "40%",
          },
        },
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -23,
          bottom: -20,
        },
      },
      labels: ["Hard", "Medium", "Easy"],
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
      },
      yaxis: {
        show: true,
        labels: {
          formatter: (value) => `${value}%`,
        },
      },
    };
  };

  useEffect(() => {
    const chart = new ApexCharts(
      document.querySelector("#radial-chart"),
      getChartOptions()
    );

    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div
      id="radial-chart"
      className="flex justify-center items-center w-full h-full"
    ></div>
  );
};

const RadialBar = () => {
  return (
    <div className="w-full mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-none text-gray-800 dark:text-white mb-4">
          Fix Difficulty
        </p>
        <div className="w-full">
          <RadialChart />
        </div>
      </div>
    </div>
  );
};

export default RadialBar;
