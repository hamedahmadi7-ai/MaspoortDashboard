import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "info";
  testId?: string;
}

const variantStyles = {
  default: "from-muted/50 to-muted/20",
  primary: "from-blue-500/20 to-blue-600/10",
  success: "from-emerald-500/20 to-emerald-600/10",
  warning: "from-amber-500/20 to-amber-600/10",
  info: "from-cyan-500/20 to-cyan-600/10",
};

const iconVariantStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-blue-500/20 text-blue-400",
  success: "bg-emerald-500/20 text-emerald-400",
  warning: "bg-amber-500/20 text-amber-400",
  info: "bg-cyan-500/20 text-cyan-400",
};

export function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = "default",
  testId,
}: KpiCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-visible bg-gradient-to-br border-0",
        variantStyles[variant]
      )}
      data-testid={testId}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight font-mono" data-testid={`${testId}-value`}>
                {value}
              </span>
              {trend && (
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    trend.isPositive ? "text-emerald-400" : "text-rose-400"
                  )}
                >
                  {trend.isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : trend.value === 0 ? (
                    <Minus className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(trend.value)}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              iconVariantStyles[variant]
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
