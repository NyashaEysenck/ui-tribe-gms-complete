
import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  colors = ["#cf2e2e", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#6b7280"],
  height = 300,
  innerRadius = 0,
  outerRadius = 80,
}) => {
  const config = data.reduce((acc, item, index) => {
    acc[item.name] = { color: colors[index % colors.length] };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer config={config} className="w-full h-full">
      <RechartsPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent />} />
      </RechartsPieChart>
    </ChartContainer>
  );
};

