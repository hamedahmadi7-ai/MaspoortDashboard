import { useQuery } from "@tanstack/react-query";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { InventoryTable } from "@/components/dashboard/inventory-table";
import { DonutChart } from "@/components/dashboard/donut-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/mock-data";
import type { DashboardSummary, Product } from "@shared/schema";
import {
  Package,
  AlertTriangle,
  Warehouse,
  TrendingUp,
} from "lucide-react";

const categoryColors: Record<string, string> = {
  "ویتامین‌ها": "#3b82f6",
  "مکمل‌ها": "#8b5cf6",
  "مینرال‌ها": "#06b6d4",
  "اسیدهای چرب": "#10b981",
};

export default function Inventory() {
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardSummary>({
    queryKey: ["/api/dashboard"],
  });

  const { data: productsData, isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const inventory = dashboardData?.inventory;

  const items = productsData?.map(product => ({
    id: product.id,
    name: product.name,
    code: product.code,
    category: product.category,
    stock: product.stock,
    minStock: product.minStock,
    unit: product.unit,
    price: parseFloat(product.price),
    status: product.stock < product.minStock ? "low" as const : "normal" as const,
  })) || [];

  const lowStockItems = items.filter(item => item.stock < item.minStock);

  const categoryChartData = inventory?.stockByCategory?.map((item) => ({
    name: item.category,
    value: item.value,
    color: categoryColors[item.category] || "#6b7280",
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
        <h1 className="text-2xl font-bold tracking-tight" data-testid="text-inventory-title">مدیریت موجودی</h1>
        <p className="text-muted-foreground" data-testid="text-inventory-subtitle">
          نظارت بر موجودی انبار و محصولات
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="کل محصولات"
          value={inventory?.totalProducts || 0}
          subtitle="نوع محصول"
          trend={{ value: 5, isPositive: true }}
          icon={<Package className="h-5 w-5" />}
          variant="primary"
          testId="kpi-total-products"
        />
        <KpiCard
          title="کمبود موجودی"
          value={inventory?.lowStockProducts || 0}
          subtitle="محصول با موجودی کم"
          trend={{ value: 1, isPositive: false }}
          icon={<AlertTriangle className="h-5 w-5" />}
          variant="warning"
          testId="kpi-low-stock"
        />
        <KpiCard
          title="ارزش موجودی"
          value={formatNumber(inventory?.totalStockValue || 0)}
          subtitle="تومان"
          trend={{ value: 12.3, isPositive: true }}
          icon={<Warehouse className="h-5 w-5" />}
          variant="success"
          testId="kpi-stock-value"
        />
        <KpiCard
          title="گردش موجودی"
          value="4.2"
          subtitle="بار در سال"
          trend={{ value: 8.5, isPositive: true }}
          icon={<TrendingUp className="h-5 w-5" />}
          variant="info"
          testId="kpi-turnover"
        />
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <CardTitle className="text-base font-medium text-amber-400">
                هشدار کمبود موجودی
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
                  data-testid={`low-stock-item-${item.id}`}
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.code}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-mono text-amber-400">
                      {item.stock.toLocaleString()} / {item.minStock.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <InventoryTable items={items} testId="inventory-table" isLoading={isProductsLoading} />
        </div>
        <div className="space-y-4">
          <DonutChart
            data={categoryChartData}
            title="ارزش موجودی بر اساس دسته‌بندی"
            testId="chart-category-value"
          />
          <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">خلاصه دسته‌بندی‌ها</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {inventory?.stockByCategory?.map((category, index) => (
                <div key={index} className="space-y-2" data-testid={`category-summary-${index}`}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{
                          backgroundColor:
                            categoryColors[category.category] || "#6b7280",
                        }}
                      />
                      <span className="font-medium">{category.category}</span>
                    </div>
                    <span className="text-muted-foreground font-mono">
                      {category.count} محصول
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>ارزش: {formatNumber(category.value)} تومان</span>
                    <span>
                      {inventory.totalStockValue > 0 
                        ? ((category.value / inventory.totalStockValue) * 100).toFixed(1)
                        : 0}%
                    </span>
                  </div>
                </div>
              )) || (
                <p className="text-muted-foreground text-center py-4">بدون داده</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
