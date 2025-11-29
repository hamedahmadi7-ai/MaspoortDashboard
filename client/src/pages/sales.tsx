import { useQuery } from "@tanstack/react-query";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { TopProductsCard } from "@/components/dashboard/top-products-card";
import { RegionalSales } from "@/components/dashboard/regional-sales";
import { DonutChart } from "@/components/dashboard/donut-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/mock-data";
import type { DashboardSummary, Sale } from "@shared/schema";
import {
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Users,
  ArrowUpRight,
} from "lucide-react";

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "در انتظار", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  processing: { label: "در حال پردازش", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  shipped: { label: "ارسال شده", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  delivered: { label: "تحویل شده", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
};

const categoryData = [
  { name: "ویتامین‌ها", value: 35, color: "#3b82f6" },
  { name: "مکمل‌ها", value: 28, color: "#8b5cf6" },
  { name: "مینرال‌ها", value: 22, color: "#06b6d4" },
  { name: "اسیدهای چرب", value: 15, color: "#10b981" },
];

export default function Sales() {
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardSummary>({
    queryKey: ["/api/dashboard"],
  });

  const { data: salesData, isLoading: isSalesLoading } = useQuery<(Sale & { productName: string })[]>({
    queryKey: ["/api/sales"],
  });

  const sales = dashboardData?.sales;

  const recentOrders = salesData?.map((sale, index) => ({
    id: `ORD-2024-${5421 - index}`,
    customer: sale.customerName,
    product: sale.productName,
    quantity: sale.quantity,
    amount: parseFloat(sale.totalPrice),
    status: ["delivered", "shipped", "processing", "pending"][index % 4] as string,
    date: new Date(sale.saleDate).toLocaleDateString("fa-IR"),
  })) || [];

  if (isDashboardLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-12 w-full mb-2" />
              <Skeleton className="h-4 w-24" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="text-sales-title">مدیریت فروش</h1>
        <p className="text-muted-foreground" data-testid="text-sales-subtitle">
          تحلیل و گزارش فروش محصولات
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="فروش ماهانه"
          value={formatNumber(sales?.monthlyRevenue || 0)}
          subtitle="تومان"
          trend={{ value: 12.5, isPositive: true }}
          icon={<TrendingUp className="h-5 w-5" />}
          variant="success"
          testId="kpi-monthly-revenue"
        />
        <KpiCard
          title="کل فروش"
          value={formatNumber(sales?.totalRevenue || 0)}
          subtitle="تومان"
          trend={{ value: 18.2, isPositive: true }}
          icon={<DollarSign className="h-5 w-5" />}
          variant="primary"
          testId="kpi-total-revenue"
        />
        <KpiCard
          title="سفارشات ماه"
          value={(sales?.totalOrders || 0).toLocaleString()}
          subtitle="سفارش"
          trend={{ value: 8.7, isPositive: true }}
          icon={<ShoppingCart className="h-5 w-5" />}
          variant="info"
          testId="kpi-monthly-orders"
        />
        <KpiCard
          title="میانگین سفارش"
          value={formatNumber(sales?.totalOrders ? (sales.totalRevenue / sales.totalOrders) : 0)}
          subtitle="تومان"
          trend={{ value: 3.2, isPositive: true }}
          icon={<Users className="h-5 w-5" />}
          variant="warning"
          testId="kpi-avg-order"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SalesChart data={sales?.monthlySales || []} testId="chart-sales" />
        </div>
        <DonutChart
          data={categoryData}
          title="فروش بر اساس دسته‌بندی"
          testId="chart-category"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TopProductsCard
          products={sales?.topProducts || []}
          testId="top-products"
        />
        <RegionalSales
          data={sales?.regionalSales || []}
          testId="regional-sales"
        />
        <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">رشد فروش</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "رشد ماهانه", value: 12.5, positive: true },
              { label: "رشد فصلی", value: 28.3, positive: true },
              { label: "رشد سالانه", value: 45.8, positive: true },
              { label: "نسبت به هدف", value: 8.2, positive: true },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                data-testid={`growth-item-${index}`}
              >
                <span className="text-sm">{item.label}</span>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono font-medium text-emerald-400">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">سفارشات اخیر</CardTitle>
        </CardHeader>
        <CardContent>
          {isSalesLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-medium text-right">شماره سفارش</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">مشتری</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">محصول</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">تعداد</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">مبلغ</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">وضعیت</TableHead>
                    <TableHead className="text-muted-foreground font-medium text-right">تاریخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        هیچ سفارشی موجود نیست
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentOrders.map((order) => {
                      const status = statusConfig[order.status];
                      return (
                        <TableRow
                          key={order.id}
                          className="border-border/20 hover:bg-muted/30 transition-colors"
                          data-testid={`row-order-${order.id}`}
                        >
                          <TableCell className="font-mono text-sm">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell className="font-mono">{order.quantity.toLocaleString()}</TableCell>
                          <TableCell className="font-mono">
                            {(order.amount / 1000000).toFixed(1)}M
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={status.className}>
                              {status.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{order.date}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
