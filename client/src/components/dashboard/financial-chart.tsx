import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

interface FinancialChartProps {
  data: { month: string; income: number; expenses: number }[];
  title?: string;
  testId?: string;
}

const chartConfig = {
  income: {
    label: "درآمد",
    color: "hsl(var(--chart-4))",
  },
  expenses: {
    label: "هزینه‌ها",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function FinancialChart({ data, title = "درآمد و هزینه‌ها", testId }: FinancialChartProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--chart-4))" />
                <stop offset="100%" stopColor="hsl(var(--chart-4))" />
              </linearGradient>
              <linearGradient id="expenseLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--chart-5))" />
                <stop offset="100%" stopColor="hsl(var(--chart-5))" />
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
            <Line
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--chart-4))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="hsl(var(--chart-5))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-5))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
