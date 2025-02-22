"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface Node {
  name: string;
  children?: Node[];
}

interface RadialClusterProps {
  data: Node;
  width?: number;
  height?: number;
  className?: string;
}

export function RadialCluster({
  data,
  width = 932,
  height = 932,
  className,
}: RadialClusterProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data) return;

    // 1. 设置画布
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // 先清空，避免重复绘制

    // 2. 创建层级数据
    const root = d3.hierarchy<Node>(data);

    // 3. 使用 d3.tree() + 径向布局
    // d3.tree() 可以通过 .size() 来控制布局范围
    // 通常我们传 [2π, r] 来生成极坐标
    const radius = Math.min(width, height) / 2; 
    const treeLayout = d3
      .tree<Node>()
      .size([2 * Math.PI, radius - 100]); // 留点边距

    const treeRoot = treeLayout(root);

    // 4. 将极坐标转换成 x, y
    //    x 是角度(0~2π)，y 是半径
    const nodes = treeRoot.descendants();
    const links = treeRoot.links();

    // 这里将极坐标映射到平面坐标
    function project(d: { x: number; y: number }) {
      const r = d.y;
      const a = d.x;
      return [r * Math.cos(a), r * Math.sin(a)];
    }

    // 5. 绘制链接（edges）
    svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`) // 原点放在画布中心
      .attr("fill", "none")
      .attr("stroke", "#c0c0c0")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", (d) => {
        const start = project(d.source);
        const end = project(d.target);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return d3.line<any>()
          .curve(d3.curveBundle.beta(0.5))
          ([start, end]);
      });

    // 6. 绘制节点
    const nodeGroup = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("transform", (d) => {
        const [x, y] = project(d);
        return `translate(${x},${y})`;
      });

    // 节点圆
    nodeGroup
      .append("circle")
      .attr("r", 4)
      .attr("fill", "#69b3a2");

    // 节点文字
    nodeGroup
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
      .attr("text-anchor", (d) =>
        d.x < Math.PI === !d.children ? "start" : "end"
      )
      // .attr("transform", (d) =>
      //   d.x >= Math.PI ? "rotate(180)" : "rotate(0)"
      // )
      .text((d) => d.data.name)
      .style("font-family", "sans-serif")
      .style("font-size", "12px")
      // .style("fill", "white");
  }, [data, width, height]);

  return (
    <div className={cn("w-full h-full", className)}>
      <svg
        ref={ref}
        width={width}
        height={height}
        className="mx-auto text-foreground *:fill-foreground"
      />
    </div>
  );
}
