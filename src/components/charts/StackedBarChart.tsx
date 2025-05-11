
import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface StackedBarChartProps {
  data: any[];
  xAxisKey: string;
  bars: Array<{ key: string; color: string }>;
  height?: number;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  xAxisKey,
  bars,
  height = 300,
}) => {
  // Create config object for the ChartContainer
  const config = bars.reduce((acc, bar) => {
    acc[bar.key] = { color: bar.color };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer config={config} className="w-full h-full">
      <RechartsBarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {bars.map((bar, index) => (
          <Bar key={bar.key} dataKey={bar.key} stackId="a" radius={index === bars.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};

