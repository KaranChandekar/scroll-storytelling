"use client";

import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { temperatureData } from "@/data/climate-data";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function TemperatureChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { width: winWidth } = useWindowSize();

  useEffect(() => {
    if (hasAnimated || !svgRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          drawChart();
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, winWidth]);

  function drawChart() {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.min(rect.width, 800);
    const height = 400;
    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("width", "100%");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(temperatureData, (d) => d.year) as [number, number])
      .range([0, innerW]);

    const y = d3
      .scaleLinear()
      .domain([-0.5, 1.4])
      .range([innerH, 0]);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(8))
      .selectAll("text, line, path")
      .attr("stroke", "#666")
      .attr("fill", "#666");

    g.append("g")
      .call(d3.axisLeft(y).ticks(6))
      .selectAll("text, line, path")
      .attr("stroke", "#666")
      .attr("fill", "#666");

    // Axis labels
    g.append("text")
      .attr("x", innerW / 2)
      .attr("y", innerH + 40)
      .attr("fill", "#999")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text("Year");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2)
      .attr("y", -45)
      .attr("fill", "#999")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text("Temperature Anomaly (°C)");

    // Zero baseline
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerW)
      .attr("y1", y(0))
      .attr("y2", y(0))
      .attr("stroke", "#444")
      .attr("stroke-dasharray", "4,4");

    // Line
    const line = d3
      .line<(typeof temperatureData)[0]>()
      .x((d) => x(d.year))
      .y((d) => y(d.anomaly))
      .curve(d3.curveMonotoneX);

    const path = g
      .append("path")
      .datum(temperatureData)
      .attr("fill", "none")
      .attr("stroke", "#f87171")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    // Animate stroke
    const totalLength = (path.node() as SVGPathElement).getTotalLength();
    path
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicInOut)
      .attr("stroke-dashoffset", 0);

    // Dot at end
    const lastPoint = temperatureData[temperatureData.length - 1];
    g.append("circle")
      .attr("cx", x(lastPoint.year))
      .attr("cy", y(lastPoint.anomaly))
      .attr("r", 0)
      .attr("fill", "#f87171")
      .transition()
      .delay(1500)
      .duration(300)
      .attr("r", 5);

    // Legend
    g.append("text")
      .attr("x", innerW - 10)
      .attr("y", 0)
      .attr("fill", "#f87171")
      .attr("text-anchor", "end")
      .attr("font-size", "13px")
      .attr("font-weight", "bold")
      .attr("opacity", 0)
      .text(`+${lastPoint.anomaly}°C in ${lastPoint.year}`)
      .transition()
      .delay(1500)
      .duration(400)
      .attr("opacity", 1);

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 24)
      .attr("fill", "#eee")
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("Global Temperature Anomaly (1880–2024)");
  }

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      <svg ref={svgRef} role="img" aria-label="Line chart showing global temperature increase from 1880 to 2024">
        <title>Global Temperature Anomaly Chart</title>
      </svg>
      {/* Screen reader table */}
      <table className="sr-only" aria-label="Temperature anomaly data">
        <thead>
          <tr>
            <th>Year</th>
            <th>Temperature Anomaly (°C)</th>
          </tr>
        </thead>
        <tbody>
          {temperatureData.map((d) => (
            <tr key={d.year}>
              <td>{d.year}</td>
              <td>{d.anomaly}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
