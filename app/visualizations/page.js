"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

// const ScatterPlotWithEllipses = ({ data }) => {
//   const chartRef = useRef();

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const width = 800;
//     const height = 600;
//     const margin = { top: 50, right: 50, bottom: 50, left: 50 };

//     const svg = d3.select(chartRef.current);
//     svg.selectAll("*").remove(); // Clear existing content

//     svg
//       .attr("viewBox", `0 0 ${width} ${height}`)
//       .attr("width", width)
//       .attr("height", height);

//     const x = d3
//       .scaleLinear()
//       .domain([2000, 1000]) // Reverse scale for F2
//       .range([margin.left, width - margin.right]);

//     const y = d3
//       .scaleLinear()
//       .domain([1300, 400]) // Reverse scale for F1
//       .range([margin.top, height - margin.bottom]);

//     const color = d3
//       .scaleOrdinal()
//       .domain(["Mandarin Speaker", "American Speaker"])
//       .range(["darkgoldenrod", "black"]);

//     // Axes
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height - margin.bottom})`)
//       .call(d3.axisBottom(x));

//     svg
//       .append("g")
//       .attr("transform", `translate(${margin.left},0)`)
//       .call(d3.axisLeft(y));

//     // Group data by speaker
//     const groupedData = d3.group(data, (d) => d.speaker);

//     // Plot points
//     groupedData.forEach((group, key) => {
//       svg
//         .append("g")
//         .selectAll("circle")
//         .data(group)
//         .join("circle")
//         .attr("cx", (d) => x(d.f2))
//         .attr("cy", (d) => y(d.f1))
//         .attr("r", 3)
//         .attr("fill", color(key))
//         .attr("opacity", 0.5);
//     });

//     // Compute and draw ellipses for each group
//     groupedData.forEach((group, key) => {
//       const meanF1 = d3.mean(group, (d) => d.f1);
//       const meanF2 = d3.mean(group, (d) => d.f2);

//       const covMatrix = d3.transpose([
//         group.map((d) => d.f2 - meanF2),
//         group.map((d) => d.f1 - meanF1),
//       ]);

//       const covariance = d3.transpose(covMatrix).map((row) => {
//         return d3.mean(row.map((value, i) => value * row[i]));
//       });

//       const [eigenValues, eigenVectors] = numeric.eig(covariance);
//       const angle = Math.atan2(eigenVectors[1][0], eigenVectors[0][0]);

//       svg
//         .append("ellipse")
//         .attr("cx", x(meanF2))
//         .attr("cy", y(meanF1))
//         .attr("rx", eigenValues[0] * 2)
//         .attr("ry", eigenValues[1] * 2)
//         .attr(
//           "transform",
//           `rotate(${(angle * 180) / Math.PI},${x(meanF2)},${y(meanF1)})`
//         )
//         .attr("stroke", color(key))
//         .attr("fill", "none")
//         .attr("stroke-width", 1.5);
//     });
//   }, [data]);

//   return <svg ref={chartRef}></svg>;
// };

// export default function VizPage() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       const csvData = await d3.csv("/static/csv/em.csv", (d) => ({
//         f1: +d.mel_F1_2tier,
//         f2: +d.mel_F2_2tier,
//         speaker: d.speaker,
//       }));
//       setData(csvData);
//     };

//     loadData();
//   }, []);

//   return (
//     <div>
//       <h1>Vowel Space (Mels)</h1>
//       <ScatterPlotWithEllipses data={data} />
//     </div>
//   );
// }

export default function VizPage() {
  return (
    <div>
      <h1>Vowel Space (Mels)</h1>
    </div>
  );
}
