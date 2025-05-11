
import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartProps {
  data: any[];
  xAxisKey: string;
  barKey: string;
  barColor?: string;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xAxisKey,
  barKey,
  barColor = "#cf2e2e",
  height = 300,
}) => {
  return (
    <ChartContainer
      config={{
        [barKey]: { color: barColor },
      }}
      className="w-full h-full"
    >
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <ChartTooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          content={<ChartTooltipContent />}
        />
        <Bar dataKey={barKey} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ChartContainer>
  );
};

