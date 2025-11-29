import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface SalesChartProps {
  data: { month: string; revenue: number; orders: number }[];
  title?: string;
  testId?: string;
}

const chartConfig = {
  revenue: {
    label: "درآمد",
    color: "hsl(var(--chart-2))",
  },
  orders: {
    label: "سفارشات",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function SalesChart({ data, title = "فروش ماهانه", testId }: SalesChartProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="ordersBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-3))" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickMargin={10}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="revenue"
              fill="url(#revenueBarGradient)"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="orders"
              fill="url(#ordersBarGradient)"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
