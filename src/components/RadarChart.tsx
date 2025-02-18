"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "ポイント",
  },
} satisfies ChartConfig;

export default function RadarChartCard({ className }: { className?: string }) {
  const chartData: { name: string; value: number }[] = [
    { name: "クリエイティブ", value: 92 },
    { name: "デザイン", value: 99 },
    { name: "インタラクション", value: 84 },
    { name: "プロジェクト管理", value: 92 },
    { name: "バックエンド", value: 76 },
    { name: "フロントエンド", value: 90 },
  ];
  return (
    <Card className={cn("w-full h-full border-2 border-stone-950 bg-stone-50 flex flex-col justify-center items-center", className)}>
      <CardHeader className="items-center pb-4 text-stone-950">
        <CardTitle className="text-center text-3xl">
          自己分析
        </CardTitle>
        <CardDescription>Ability Analysis</CardDescription>
      </CardHeader>
      <CardContent className="p-2 w-full h-full flex justify-center items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            <Radar dataKey="value" fill="var(--accent)" fillOpacity={0.6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
