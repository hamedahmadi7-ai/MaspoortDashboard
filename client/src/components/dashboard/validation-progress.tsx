import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

interface ValidationItem {
  name: string;
  status: "completed" | "in_progress" | "pending" | "failed";
  progress: number;
}

interface ValidationProgressProps {
  items?: ValidationItem[];
  title?: string;
  testId?: string;
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    progressColor: "[&>div]:bg-emerald-500",
    label: "تکمیل شده",
  },
  in_progress: {
    icon: Clock,
    color: "text-blue-400",
    progressColor: "[&>div]:bg-blue-500",
    label: "در حال انجام",
  },
  pending: {
    icon: AlertCircle,
    color: "text-amber-400",
    progressColor: "[&>div]:bg-amber-500",
    label: "در انتظار",
  },
  failed: {
    icon: XCircle,
    color: "text-rose-400",
    progressColor: "[&>div]:bg-rose-500",
    label: "ناموفق",
  },
};

const defaultItems: ValidationItem[] = [
  { name: "System Validation", status: "completed", progress: 100 },
  { name: "Process Validation", status: "in_progress", progress: 75 },
  { name: "Cleaning Validation", status: "in_progress", progress: 45 },
  { name: "Method Validation", status: "pending", progress: 20 },
];

export function ValidationProgress({
  items = defaultItems,
  title = "Validation",
  testId,
}: ValidationProgressProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => {
          const config = statusConfig[item.status];
          const IconComponent = config.icon;
          
          return (
            <div key={index} className="space-y-2" data-testid={`validation-item-${index}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className={cn("h-4 w-4", config.color)} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className={cn("text-xs", config.color)}>{item.progress}%</span>
              </div>
              <Progress
                value={item.progress}
                className={cn("h-2", config.progressColor)}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
