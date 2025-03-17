import React, { useEffect, useState } from "react";
import axios from "axios";

// AmCharts imports
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const ChartEasytofix = ({easyToFix}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categoryCount } = easyToFix;

        if (!categoryCount) {
          throw new Error("Invalid data format from API");
        }

        const formattedData = [
          { Difficulty: "Easy", Count: categoryCount.easyToFix },
          { Difficulty: "Medium", Count: categoryCount.moderatelyDifficult },
          { Difficulty: "Hard", Count: categoryCount.complexToFix },
        ];


        setData(formattedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalVuln = data.length;
  useEffect(() => {
    if (!data.length) {
      console.warn("No data available to render the chart.");
      return;
    }

    // Create the AmCharts chart
    let root = am5.Root.new("chartdiv2");

    // Apply a theme
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the XY chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
      })
    );

    // Transform data into the format required by AmCharts
    const chartData = data.map((item) => ({
      category: `${item.Difficulty} to Fix`,
      value: item.Count,
    }));

    // Create X-axis (categories for difficulty levels)
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Dynamically set xAxis data to match chartData
    xAxis.data.setAll(chartData);

    // Create Y-axis (values showing counts)
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create the series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Fix Difficulty",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{categoryX}: {valueY}",
        }),
      })
    );

    // Apply custom colors directly to the column template
    series.columns.template.setAll({
      fill: am5.color("#414273"), // Default color for Easy
      tooltipText: "{categoryX}: {valueY}",
      strokeOpacity: 0,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
    });

    // Apply custom colors dynamically for each column
    series.columns.template.adapters.add("fill", function (fill, target) {
      const category = target.dataItem?.dataContext?.category;

      if (category?.includes("Easy")) return am5.color("#414273"); // Easy
      if (category?.includes("Medium")) return am5.color("#B55D89"); // Medium
      if (category?.includes("Hard")) return am5.color("#632C61"); // Hard

      return fill; // Fallback to the default fill
    });

    // Apply stroke colors dynamically
    series.columns.template.adapters.add("stroke", function (stroke, target) {
      const category = target.dataItem?.dataContext?.category;

      if (category?.includes("Easy")) return am5.color("#414273");
      if (category?.includes("Medium")) return am5.color("#B55D89");
      if (category?.includes("Hard")) return am5.color("#632C61");

      return stroke; // Fallback to the default stroke
    });

    // Set data to the series
    series.data.setAll(chartData);

    // Add a legend (optional)
    chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15,
      })
    );

    // Animate chart appearance
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div className="bg-grey_1 rounded-lg shadow-lg p-6 flex-grow w-full h-[300px] flex justify-center items-center m-4 flex-col">
    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
      <h5 className="text-Black_text_5 uppercase font-semibold text-xs pb-1 ">
      Fix Difficulty
      </h5>
      <span className="font-bold text-2xl  text-Black_text_5">
        {totalVuln}
      </span>
    </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div id="chartdiv2" className="w-full h-full"></div>
      )}
    </div>
  );
};

export default ChartEasytofix;
