"use client";

import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { co2Data } from "@/data/climate-data";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function CO2Chart() {
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
      .domain(d3.extent(co2Data, (d) => d.year) as [number, number])
      .range([0, innerW]);

    const y = d3
      .scaleLinear()
      .domain([300, 440])
      .range([innerH, 0]);

    // Gradient definition
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "co2-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#06b6d4").attr("stop-opacity", 0.6);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#06b6d4").attr("stop-opacity", 0.05);

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

    // Labels
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
      .text("CO₂ Concentration (PPM)");

    // Area
    const area = d3
      .area<(typeof co2Data)[0]>()
      .x((d) => x(d.year))
      .y0(innerH)
      .y1((d) => y(d.ppm))
      .curve(d3.curveMonotoneX);

    // Clip path for animation
    const clip = defs
      .append("clipRect")
      .attr("id", "co2-clip");

    // We'll use a rect clip animation
    defs
      .append("clipPath")
      .attr("id", "co2-clip-path")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", innerH)
      .attr("width", 0)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicInOut)
      .attr("width", innerW);

    g.append("path")
      .datum(co2Data)
      .attr("fill", "url(#co2-gradient)")
      .attr("d", area)
      .attr("clip-path", "url(#co2-clip-path)");

    // Line on top
    const line = d3
      .line<(typeof co2Data)[0]>()
      .x((d) => x(d.year))
      .y((d) => y(d.ppm))
      .curve(d3.curveMonotoneX);

    const linePath = g
      .append("path")
      .datum(co2Data)
      .attr("fill", "none")
      .attr("stroke", "#06b6d4")
      .attr("stroke-width", 2.5)
      .attr("d", line);

    const totalLength = (linePath.node() as SVGPathElement).getTotalLength();
    linePath
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicInOut)
      .attr("stroke-dashoffset", 0);

    // End label
    const lastPoint = co2Data[co2Data.length - 1];
    g.append("text")
      .attr("x", x(lastPoint.year))
      .attr("y", y(lastPoint.ppm) - 12)
      .attr("fill", "#06b6d4")
      .attr("text-anchor", "end")
      .attr("font-size", "13px")
      .attr("font-weight", "bold")
      .attr("opacity", 0)
      .text(`${lastPoint.ppm} PPM`)
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
      .text("Atmospheric CO₂ Concentration (1960–2024)");
  }

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4">
      <svg ref={svgRef} role="img" aria-label="Area chart showing CO2 concentration increase from 1960 to 2024">
        <title>CO₂ Concentration Chart</title>
      </svg>
      <table className="sr-only" aria-label="CO2 concentration data">
        <thead>
          <tr>
            <th>Year</th>
            <th>CO₂ (PPM)</th>
          </tr>
        </thead>
        <tbody>
          {co2Data.map((d) => (
            <tr key={d.year}>
              <td>{d.year}</td>
              <td>{d.ppm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
