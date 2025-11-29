import { useQuery } from "@tanstack/react-query";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { GaugeChart } from "@/components/dashboard/gauge-chart";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { BatchTable } from "@/components/dashboard/batch-table";
import { SystemStatus } from "@/components/dashboard/system-status";
import { ValidationProgress } from "@/components/dashboard/validation-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/mock-data";
import type { DashboardSummary, ProductionBatch } from "@shared/schema";
import {
  Factory,
  Package,
  Activity,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
} from "lucide-react";

export default function Production() {
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardSummary>({
    queryKey: ["/api/dashboard"],
  });

  const { data: batchesData, isLoading: isBatchesLoading } = useQuery<(ProductionBatch & { productName: string })[]>({
    queryKey: ["/api/batches"],
  });

  const production = dashboardData?.production;

  const monthlyProductionData = production?.monthlyProduction?.map((value, index) => ({
    month: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر"][index] || `ماه ${index + 1}`,
    production: value,
  })) || [];

  const batches = batchesData?.map(batch => ({
    id: batch.id,
    batchNumber: batch.batchNumber,
    product: batch.productName,
    status: batch.status as "in_progress" | "quality_check" | "completed" | "shipped",
    progress: batch.efficiency ? parseFloat(batch.efficiency) : 0,
    startDate: new Date(batch.startDate).toLocaleDateString("fa-IR"),
    estimatedEnd: batch.endDate ? new Date(batch.endDate).toLocaleDateString("fa-IR") : "-",
  })) || [];

  const statusCounts = {
    in_progress: batches.filter(b => b.status === "in_progress").length,
    quality_check: batches.filter(b => b.status === "quality_check").length,
    completed: batches.filter(b => b.status === "completed").length,
    shipped: batches.filter(b => b.status === "shipped").length,
  };

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
        <h1 className="text-2xl font-bold tracking-tight" data-testid="text-production-title">مدیریت تولید</h1>
        <p className="text-muted-foreground" data-testid="text-production-subtitle">
          نظارت و کنترل بر فرآیندهای تولید و بچ‌ها
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="تولید روزانه"
          value={formatNumber(production?.activeBatches ? production.activeBatches * 12500 : 0)}
          subtitle="واحد"
          trend={{ value: 8.2, isPositive: true }}
          icon={<Factory className="h-5 w-5" />}
          variant="primary"
          testId="kpi-daily-production"
        />
        <KpiCard
          title="کل بچ‌ها"
          value={production?.totalBatches || 0}
          subtitle="بچ در سال جاری"
          trend={{ value: 15.3, isPositive: true }}
          icon={<Package className="h-5 w-5" />}
          variant="info"
          testId="kpi-total-batches"
        />
        <KpiCard
          title="تکمیل امروز"
          value={production?.completedToday || 0}
          subtitle="بچ تکمیل شده"
          trend={{ value: 2, isPositive: true }}
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="success"
          testId="kpi-completed-today"
        />
        <KpiCard
          title="کارایی میانگین"
          value={`${production?.averageEfficiency || 0}%`}
          subtitle="درصد کارایی"
          trend={{ value: 3.5, isPositive: true }}
          icon={<Activity className="h-5 w-5" />}
          variant="warning"
          testId="kpi-avg-efficiency"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ProductionChart
            data={monthlyProductionData}
            title="روند تولید ماهانه"
            testId="chart-production"
          />
        </div>
        <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">کارایی خطوط تولید</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-6">
            <GaugeChart
              value={production?.averageEfficiency || 0}
              label="خط ۱"
              sublabel="کپسول‌سازی"
              size="sm"
              testId="gauge-line-1"
            />
            <GaugeChart
              value={92}
              label="خط ۲"
              sublabel="بسته‌بندی"
              size="sm"
              testId="gauge-line-2"
            />
            <GaugeChart
              value={78}
              label="خط ۳"
              sublabel="قرص‌سازی"
              size="sm"
              testId="gauge-line-3"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">وضعیت بچ‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Clock className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold font-mono" data-testid="count-in-progress">{statusCounts.in_progress}</p>
                <p className="text-sm text-muted-foreground">در حال تولید</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="h-8 w-8 text-amber-400" />
              <div>
                <p className="text-2xl font-bold font-mono" data-testid="count-quality-check">{statusCounts.quality_check}</p>
                <p className="text-sm text-muted-foreground">کنترل کیفیت</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              <div>
                <p className="text-2xl font-bold font-mono" data-testid="count-completed">{statusCounts.completed}</p>
                <p className="text-sm text-muted-foreground">تکمیل شده</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Truck className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold font-mono" data-testid="count-shipped">{statusCounts.shipped}</p>
                <p className="text-sm text-muted-foreground">ارسال شده</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active" data-testid="tab-active-batches">بچ‌های فعال</TabsTrigger>
              <TabsTrigger value="completed" data-testid="tab-completed-batches">تکمیل شده</TabsTrigger>
              <TabsTrigger value="all" data-testid="tab-all-batches">همه بچ‌ها</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <BatchTable
                batches={batches.filter(b => b.status === "in_progress" || b.status === "quality_check")}
                title="بچ‌های در حال تولید"
                testId="batch-table-active"
                isLoading={isBatchesLoading}
              />
            </TabsContent>
            <TabsContent value="completed">
              <BatchTable
                batches={batches.filter(b => b.status === "completed" || b.status === "shipped")}
                title="بچ‌های تکمیل شده"
                testId="batch-table-completed"
                isLoading={isBatchesLoading}
              />
            </TabsContent>
            <TabsContent value="all">
              <BatchTable
                batches={batches}
                title="همه بچ‌ها"
                testId="batch-table-all"
                isLoading={isBatchesLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-4">
          <SystemStatus testId="system-status" />
          <ValidationProgress testId="validation-progress" />
        </div>
      </div>
    </div>
  );
}
