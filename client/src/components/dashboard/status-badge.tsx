import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "production" | "inventory" | "order";
}

const statusConfig = {
  production: {
    in_progress: { label: "در حال تولید", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    quality_check: { label: "کنترل کیفیت", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    completed: { label: "تکمیل شده", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    shipped: { label: "ارسال شده", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  },
  inventory: {
    active: { label: "فعال", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    low_stock: { label: "کمبود موجودی", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    out_of_stock: { label: "ناموجود", className: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
    inactive: { label: "غیرفعال", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  },
  order: {
    pending: { label: "در انتظار", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    processing: { label: "در حال پردازش", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    shipped: { label: "ارسال شده", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    delivered: { label: "تحویل شده", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    cancelled: { label: "لغو شده", className: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  },
};

export function StatusBadge({ status, variant = "production" }: StatusBadgeProps) {
  const config = statusConfig[variant][status as keyof typeof statusConfig[typeof variant]] || {
    label: status,
    className: "bg-muted text-muted-foreground",
  };

  return (
    <Badge
      variant="outline"
      className={cn("border font-medium", config.className)}
    >
      {config.label}
    </Badge>
  );
}
