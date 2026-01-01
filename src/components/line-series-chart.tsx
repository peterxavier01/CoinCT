import {
  ColorType,
  createChart,
  LineData,
  LineSeries,
  Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

interface LineSeriesChartProps {
  data: LineData<Time>[];
  height?: number;
  lineColor?: string;
  backgroundColor?: string;
}

const LineSeriesChart = ({
  data,
  height = 360,
  lineColor = "#1b254b",
  backgroundColor = "transparent",
}: LineSeriesChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    // Get computed background color from the parent container
    const parentElement = container.parentElement;
    const computedBgColor =
      backgroundColor === "transparent" && parentElement
        ? getComputedStyle(parentElement).backgroundColor || "#1a2027"
        : backgroundColor !== "transparent"
        ? backgroundColor
        : "#1a2027";

    const chartOptions = {
      layout: {
        textColor: "transparent", // Hide text/axes for minimal chart
        background: { type: ColorType.Solid, color: computedBgColor },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
    };

    const chart = createChart(container, chartOptions);
    const lineSeries = chart.addSeries(LineSeries, { color: lineColor });
    lineSeries.setData(data);
    chart.timeScale().fitContent();

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({ width: entries[0].contentRect.width });
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      chart.remove();
    };
  }, [data, height, lineColor, backgroundColor]);

  return <div ref={chartContainerRef} className="chart" style={{ height }} />;
};

export default LineSeriesChart;
