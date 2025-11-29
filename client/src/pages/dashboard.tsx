import { useQuery } from "@tanstack/react-query";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { GaugeChart } from "@/components/dashboard/gauge-chart";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { FinancialChart } from "@/components/dashboard/financial-chart";
import { BatchTable } from "@/components/dashboard/batch-table";
import { TopProductsCard } from "@/components/dashboard/top-products-card";
import { RegionalSales } from "@/components/dashboard/regional-sales";
import { SystemStatus } from "@/components/dashboard/system-status";
import { ValidationProgress } from "@/components/dashboard/validation-progress";
import { formatNumber } from "@/lib/mock-data";
import type { DashboardSummary, ProductionBatch } from "@shared/schema";
import {
  Factory,
  TrendingUp,
  Wallet,
  Package,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardSummary>({
    queryKey: ["/api/dashboard"],
  });

  const { data: batches, isLoading: isBatchesLoading } = useQuery<(ProductionBatch & { productName: string })[]>({
    queryKey: ["/api/batches"],
  });

  if (isDashboardLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-12 w-full mb-2" />
              <Skeleton className="h-4 w-24" />
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 p-4">
            <Skeleton className="h-64 w-full" />
          </Card>
          <Card className="p-4">
            <Skeleton className="h-64 w-full" />
          </Card>
        </div>
      </div>
    );
  }

  const production = dashboardData?.production;
  const sales = dashboardData?.sales;
  const financial = dashboardData?.financial;

  const monthlyProductionData = production?.monthlyProduction?.map((value, index) => ({
    month: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر"][index] || `ماه ${index + 1}`,
    production: value,
  })) || [];

  const activeBatches = batches?.map(batch => ({
    id: batch.id,
    batchNumber: batch.batchNumber,
    product: batch.productName,
    status: batch.status as "in_progress" | "quality_check" | "completed" | "shipped",
    progress: batch.efficiency ? parseFloat(batch.efficiency) : 0,
    startDate: new Date(batch.startDate).toLocaleDateString("fa-IR"),
    estimatedEnd: batch.endDate ? new Date(batch.endDate).toLocaleDateString("fa-IR") : "-",
  })) || [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-dashboard-title">داشبورد مدیریت</h1>
          <p className="text-muted-foreground" data-testid="text-dashboard-subtitle">
            خلاصه وضعیت تولید، فروش و مالی شرکت دارویی مصپورت
          </p>
        </div>
        <div className="text-sm text-muted-foreground" data-testid="text-last-update">
          آخرین به‌روزرسانی: {new Date().toLocaleDateString("fa-IR")}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="تولید امروز"
          value={formatNumber(production?.activeBatches ? production.activeBatches * 12500 : 0)}
          subtitle="واحد تولید شده"
          trend={{ value: 8.2, isPositive: true }}
          icon={<Factory className="h-5 w-5" />}
          variant="primary"
          testId="kpi-daily-production"
        />
        <KpiCard
          title="فروش ماهانه"
          value={formatNumber(sales?.totalRevenue || 0)}
          subtitle="تومان"
          trend={{ value: 12.5, isPositive: true }}
          icon={<TrendingUp className="h-5 w-5" />}
          variant="success"
          testId="kpi-monthly-sales"
        />
        <KpiCard
          title="سود خالص"
          value={formatNumber(financial?.netProfit || 0)}
          subtitle="تومان"
          trend={{ value: 5.8, isPositive: true }}
          icon={<Wallet className="h-5 w-5" />}
          variant="info"
          testId="kpi-net-profit"
        />
        <KpiCard
          title="بچ‌های فعال"
          value={production?.activeBatches || 0}
          subtitle="در حال تولید"
          trend={{ value: 2, isPositive: false }}
          icon={<Package className="h-5 w-5" />}
          variant="warning"
          testId="kpi-active-batches"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ProductionChart
            data={monthlyProductionData}
            testId="chart-production"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <GaugeChart
              value={production?.averageEfficiency || 0}
              label="کارایی تولید"
              size="sm"
              testId="gauge-efficiency"
            />
            <GaugeChart
              value={78}
              label="هدف ماهانه"
              size="sm"
              testId="gauge-target"
            />
          </div>
          <SystemStatus testId="system-status" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesChart data={sales?.monthlySales || []} testId="chart-sales" />
        <FinancialChart
          data={financial?.monthlyFinancials || []}
          testId="chart-financial"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TopProductsCard
          products={sales?.topProducts || []}
          testId="top-products"
        />
        <RegionalSales data={sales?.regionalSales || []} testId="regional-sales" />
        <ValidationProgress testId="validation-progress" />
      </div>

      <BatchTable
        batches={activeBatches}
        testId="batch-table"
        isLoading={isBatchesLoading}
      />
    </div>
  );
}
