
import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
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

interface LineChartProps {
  data: any[];
  xAxisKey: string;
  lineKey: string;
  lineColor?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xAxisKey,
  lineKey,
  lineColor = "#cf2e2e",
  height = 300,
}) => {
  return (
    <ChartContainer
      config={{
        [lineKey]: { color: lineColor },
      }}
      className="w-full h-full"
    >
      <RechartsLineChart
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
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey={lineKey}
          stroke={lineColor}
          strokeWidth={2}
          dot={{ strokeWidth: 0, fill: lineColor, r: 3 }}
          activeDot={{ r: 5 }}
        />
      </RechartsLineChart>
    </ChartContainer>
  );
};

