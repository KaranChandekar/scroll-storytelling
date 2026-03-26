"use client";

import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { regionalData } from "@/data/climate-data";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function RegionalBarChart() {
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
    const margin = { top: 40, right: 20, bottom: 60, left: 60 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("width", "100%");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(regionalData.map((d) => d.region))
      .range([0, innerW])
      .padding(0.3);

    const y = d3.scaleLinear().domain([0, 3.5]).range([innerH, 0]);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("fill", "#999")
      .attr("font-size", "11px")
      .attr("transform", "rotate(-25)")
      .attr("text-anchor", "end");

    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text, line, path")
      .attr("stroke", "#666")
      .attr("fill", "#666");

    // Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerH / 2)
      .attr("y", -45)
      .attr("fill", "#999")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text("Temperature Change (°C)");

    // Bars with staggered animation
    g.selectAll("rect")
      .data(regionalData)
      .join("rect")
      .attr("x", (d) => x(d.region) as number)
      .attr("width", x.bandwidth())
      .attr("y", innerH)
      .attr("height", 0)
      .attr("fill", (d) => d.color)
      .attr("rx", 3)
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.change))
      .attr("height", (d) => innerH - y(d.change));

    // Value labels
    g.selectAll(".value-label")
      .data(regionalData)
      .join("text")
      .attr("class", "value-label")
      .attr("x", (d) => (x(d.region) as number) + x.bandwidth() / 2)
      .attr("y", innerH)
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .text((d) => `${d.change}°C`)
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.change) - 8);

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 24)
      .attr("fill", "#eee")
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("Regional Temperature Changes");
  }

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      <svg ref={svgRef} role="img" aria-label="Bar chart comparing climate impacts by geographic region">
        <title>Regional Temperature Changes Chart</title>
      </svg>
      <table className="sr-only" aria-label="Regional temperature impact data">
        <thead>
          <tr>
            <th>Region</th>
            <th>Temperature Change (°C)</th>
          </tr>
        </thead>
        <tbody>
          {regionalData.map((d) => (
            <tr key={d.region}>
              <td>{d.region}</td>
              <td>{d.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
