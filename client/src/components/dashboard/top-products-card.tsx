import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TopProduct {
  name: string;
  quantity: number;
  revenue: number;
}

interface TopProductsCardProps {
  products: TopProduct[];
  title?: string;
  testId?: string;
}

const colors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-amber-500",
];

export function TopProductsCard({ products, title = "محصولات پرفروش", testId }: TopProductsCardProps) {
  const maxRevenue = Math.max(...products.map((p) => p.revenue));

  return (
    <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="space-y-2" data-testid={`product-item-${index}`}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{product.name}</span>
              <span className="text-muted-foreground font-mono">
                {(product.revenue / 1000000).toFixed(1)}M تومان
              </span>
            </div>
            <div className="relative">
              <Progress
                value={(product.revenue / maxRevenue) * 100}
                className={cn(
                  "h-2",
                  `[&>div]:${colors[index % colors.length]}`
                )}
                style={{
                  "--progress-color": colors[index % colors.length].replace("bg-", ""),
                } as React.CSSProperties}
              />
              <style>{`
                [data-testid="product-item-${index}"] .relative > div > div {
                  background-color: ${
                    index === 0
                      ? "#3b82f6"
                      : index === 1
                      ? "#a855f7"
                      : index === 2
                      ? "#06b6d4"
                      : index === 3
                      ? "#10b981"
                      : "#f59e0b"
                  };
                }
              `}</style>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{product.quantity.toLocaleString()} واحد فروخته شده</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
