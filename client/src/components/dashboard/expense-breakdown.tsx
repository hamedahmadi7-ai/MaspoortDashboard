import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

interface ExpenseItem {
  category: string;
  amount: number;
}

interface ExpenseBreakdownProps {
  data: ExpenseItem[];
  title?: string;
  testId?: string;
}

const categoryColors: Record<string, string> = {
  "مواد اولیه": "#3b82f6",
  "حقوق و دستمزد": "#8b5cf6",
  "تجهیزات": "#06b6d4",
  "انرژی": "#10b981",
  "بازاریابی": "#f59e0b",
  "حمل و نقل": "#ef4444",
  "تحقیق و توسعه": "#ec4899",
  "سایر": "#6b7280",
};

export function ExpenseBreakdown({ data, title = "توزیع هزینه‌ها", testId }: ExpenseBreakdownProps) {
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.amount,
    color: categoryColors[item.category] || "#6b7280",
  }));

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const chartConfig = chartData.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color: item.color,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-6">
          <div className="relative">
            <ChartContainer config={chartConfig} className="h-[180px] w-[180px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold font-mono">
                {(total / 1000000000).toFixed(1)}B
              </span>
              <span className="text-xs text-muted-foreground">کل هزینه‌ها</span>
            </div>
          </div>
          <div className="flex-1 space-y-2 pt-2">
            {data.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: categoryColors[item.category] || "#6b7280" }}
                  />
                  <span className="text-muted-foreground">{item.category}</span>
                </div>
                <span className="font-mono">
                  {((item.amount / total) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
