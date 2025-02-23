"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMobile";

export interface Node {
  name: string;
  children?: Node[];
}

interface RadialClusterProps {
  data: Node[];
  size?: number;
  className?: string;
}

export const RadialCluster = ({
  data,
  size = 900,
  className,
}: RadialClusterProps) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!data || isMobile) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const root = d3.hierarchy<Node>(data[0]);
    const radius = size / 2;

    // 使用 cluster 布局替代 tree 布局
    const cluster = d3.cluster<Node>().size([2 * Math.PI, radius - 60]);

    const clusterData = cluster(root);

    // 新的座標映射函數
    const project = (d: d3.HierarchyPointNode<Node>) => {
      const r = d.depth * (radius / 4);
      const a = d.x - Math.PI / 1;
      // const a = d.x - Math.PI / 2;
      return [r * Math.cos(a), r * Math.sin(a)];
    };

    // 繪製連接線（使用自然曲線）
    svg
      .append("g")
      .attr("transform", `translate(${size / 2},${size / 2})`)
      .selectAll("path")
      .data(clusterData.links())
      .join("path")
      .attr("d", (d) => {
        const source = project(d.source) as [number, number];
        const target = project(d.target) as [number, number];
        return d3.line().curve(d3.curveBumpX)([source, target] as [
          number,
          number
        ][]);
      })
      .attr("fill", "none")
      .attr("stroke", "#d08a20")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

    // 繪製節點
    const nodes = svg
      .append("g")
      .attr("transform", `translate(${size / 2},${size / 2})`)
      .selectAll("g")
      .data(clusterData.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${project(d)})`);

    nodes
      .append("circle")
      .attr("r", 5)
      .attr("fill", "#f0a946")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);

    nodes
      .append("text")
      .attr("dy", (d) => (d.x > Math.PI ? "1.5em" : "-1.5em"))
      .attr("text-anchor", "middle")
      // .attr("text-anchor", (d) => (d.x < Math.PI ? "start" : "end"))
      // .attr("transform", (d) => `rotate(${(d.x * 180) / Math.PI - 90}))`)
      .text((d) => d.data.name)
      // .style("font-size", "14px")
      .style("text-align", "center");
  }, [data, size, isMobile]);

  if (isMobile) return null;  
  return (
    <div
      className={cn(
        "overflow-hidden flex justify-center items-center",
        className
      )}
    >
      <svg
        ref={ref}
        width={size}
        height={size}
        className="mx-auto text-foreground *:fill-foreground *:text-md"
      />
    </div>
  );
};
