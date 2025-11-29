import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RegionalSale {
  region: string;
  amount: number;
}

interface RegionalSalesProps {
  data: RegionalSale[];
  title?: string;
  testId?: string;
}

const regionColors = {
  "تهران": "#3b82f6",
  "اصفهان": "#8b5cf6",
  "مشهد": "#06b6d4",
  "شیراز": "#10b981",
  "تبریز": "#f59e0b",
  "اهواز": "#ef4444",
  "کرج": "#ec4899",
  "سایر": "#6b7280",
};

export function RegionalSales({ data, title = "فروش منطقه‌ای", testId }: RegionalSalesProps) {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const maxAmount = Math.max(...data.map((item) => item.amount));

  return (
    <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item, index) => {
          const percentage = ((item.amount / totalAmount) * 100).toFixed(1);
          const color = regionColors[item.region as keyof typeof regionColors] || "#6b7280";
          
          return (
            <div key={index} className="space-y-2" data-testid={`region-item-${index}`}>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-medium">{item.region}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground font-mono text-xs">
                    {percentage}%
                  </span>
                  <span className="font-mono text-sm">
                    {(item.amount / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${(item.amount / maxAmount) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
