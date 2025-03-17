import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const useFetchVulnerabilities = (vuln) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const severityData = vuln.mergedData.map((item) => ({
          severity: item.Severity || "Unknown",
        }));

        setData(severityData);
      } catch (err) {
        console.error("Error fetching vulnerabilities:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, error, loading };
};

const ChartSer = ({vuln}) => {
  const [hasData, setHasData] = useState(false);
  const { data, error, loading } = useFetchVulnerabilities(vuln);

  const totalVuln = data.length;

  useEffect(() => {
    if (data.length) {
      const severityCount = {
        NONE: 0,
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        CRITICAL: 0,
      };

      data.forEach((item) => {
        const severity = item.severity;
        if (severity === "INFO") severityCount.NONE += 1;
        else if (severity === "MINOR") severityCount.LOW += 1;
        else if (severity === "MAJOR") severityCount.MEDIUM += 1;
        else if (severity === "CRITICAL") severityCount.HIGH += 1;
        else if (severity === "BLOCKER") severityCount.CRITICAL += 1;
      });
      const chartData = Object.entries(severityCount)
        .filter(([_, value]) => value > 0)
        .map(([key, value]) => ({ category: key, value }));

      if (chartData.length === 0) {
        console.warn("⚠️ Chart Data is empty!");
        setHasData(false);
        return;
      } else {
        setHasData(true);
      }

      let root = am5.Root.new("chartdiv1");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          endAngle: 270,
        })
      );

      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          endAngle: 270,
        })
      );

      series.set(
        "colors",
        am5.ColorSet.new(root, {
          colors: [
            am5.color("#414273"),
            am5.color("#B55D89"),
            am5.color("#632C61"),
            am5.color("#632c3e"),
            am5.color("#0f040e"),
          ],
          passOptions: {
            lightness: -0.3,
            saturation: 0.4,
          },
        })
      );

      series.states.create("hidden", {
        endAngle: -90,
      });

      series.data.setAll(chartData);
      series.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [data]);

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <div className="bg-grey_1 rounded-lg shadow-lg p-6 flex-grow w-full h-[300px] flex justify-center items-center m-4 flex-col">
      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
        <h5 className="text-Black_text_5 uppercase font-semibold text-xs pb-1 ">
          Total Vulnerabilities
        </h5>
        <span className="font-bold text-2xl  text-Black_text_5">
          {totalVuln}
        </span>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error.message}</p>
      ) : (
        <div id="chartdiv1" className="w-full h-full"></div>
      )}
    </div>
  );
};

export default ChartSer;
