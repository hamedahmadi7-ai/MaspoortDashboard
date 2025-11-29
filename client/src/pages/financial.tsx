import { useQuery } from "@tanstack/react-query";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { FinancialChart } from "@/components/dashboard/financial-chart";
import { ExpenseBreakdown } from "@/components/dashboard/expense-breakdown";
import { DonutChart } from "@/components/dashboard/donut-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/mock-data";
import type { DashboardSummary } from "@shared/schema";
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  CircleDollarSign,
  Receipt,
  Banknote,
  BarChart3,
} from "lucide-react";

const incomeSourceData = [
  { name: "فروش مستقیم", value: 45, color: "#3b82f6" },
  { name: "توزیع‌کنندگان", value: 30, color: "#8b5cf6" },
  { name: "صادرات", value: 15, color: "#06b6d4" },
  { name: "سایر", value: 10, color: "#10b981" },
];

const budgetItems = [
  { name: "بودجه تولید", allocated: 25000000000, spent: 18500000000 },
  { name: "بودجه بازاریابی", allocated: 3000000000, spent: 1800000000 },
  { name: "بودجه تحقیقات", allocated: 5000000000, spent: 2500000000 },
  { name: "بودجه نیروی انسانی", allocated: 12000000000, spent: 8200000000 },
];

export default function Financial() {
  const { data: dashboardData, isLoading } = useQuery<DashboardSummary>({
    queryKey: ["/api/dashboard"],
  });

  const financial = dashboardData?.financial;

  if (isLoading) {
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

  const monthlyIncome = financial?.totalIncome ? financial.totalIncome / 9 : 0;
  const monthlyExpenses = financial?.totalExpenses ? financial.totalExpenses / 9 : 0;
  const cashFlow = (financial?.totalIncome || 0) - (financial?.totalExpenses || 0);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="text-financial-title">مدیریت مالی</h1>
        <p className="text-muted-foreground" data-testid="text-financial-subtitle">
          گزارش درآمد، هزینه‌ها و سود شرکت
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="کل درآمد"
          value={formatNumber(financial?.totalIncome || 0)}
          subtitle="تومان"
          trend={{ value: 18.2, isPositive: true }}
          icon={<CircleDollarSign className="h-5 w-5" />}
          variant="success"
          testId="kpi-total-income"
        />
        <KpiCard
          title="کل هزینه‌ها"
          value={formatNumber(financial?.totalExpenses || 0)}
          subtitle="تومان"
          trend={{ value: 8.5, isPositive: false }}
          icon={<Receipt className="h-5 w-5" />}
          variant="warning"
          testId="kpi-total-expenses"
        />
        <KpiCard
          title="سود خالص"
          value={formatNumber(financial?.netProfit || 0)}
          subtitle="تومان"
          trend={{ value: 12.8, isPositive: true }}
          icon={<PiggyBank className="h-5 w-5" />}
          variant="primary"
          testId="kpi-net-profit"
        />
        <KpiCard
          title="حاشیه سود"
          value={`${financial?.profitMargin || 0}%`}
          subtitle="درصد سودآوری"
          trend={{ value: 2.3, isPositive: true }}
          icon={<BarChart3 className="h-5 w-5" />}
          variant="info"
          testId="kpi-profit-margin"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">درآمد ماهانه</p>
                <p className="text-3xl font-bold font-mono mt-1" data-testid="value-monthly-income">
                  {formatNumber(monthlyIncome)}
                </p>
                <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>15.2% نسبت به ماه قبل</span>
                </div>
              </div>
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-rose-500/10 to-rose-600/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">هزینه‌های ماهانه</p>
                <p className="text-3xl font-bold font-mono mt-1" data-testid="value-monthly-expenses">
                  {formatNumber(monthlyExpenses)}
                </p>
                <div className="flex items-center gap-1 mt-2 text-rose-400 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>8.5% نسبت به ماه قبل</span>
                </div>
              </div>
              <div className="h-16 w-16 rounded-full bg-rose-500/20 flex items-center justify-center">
                <TrendingDown className="h-8 w-8 text-rose-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">جریان نقدی</p>
                <p className="text-3xl font-bold font-mono mt-1" data-testid="value-cash-flow">
                  {formatNumber(cashFlow)}
                </p>
                <div className="flex items-center gap-1 mt-2 text-blue-400 text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>22.1% نسبت به ماه قبل</span>
                </div>
              </div>
              <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Banknote className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FinancialChart
          data={financial?.monthlyFinancials || []}
          title="روند درآمد و هزینه‌ها"
          testId="chart-financial"
        />
        <ExpenseBreakdown
          data={financial?.expenseBreakdown || []}
          testId="expense-breakdown"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DonutChart
          data={incomeSourceData}
          title="منابع درآمد"
          testId="chart-income-sources"
        />
        <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">وضعیت بودجه</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {budgetItems.map((item, index) => {
              const percentage = (item.spent / item.allocated) * 100;
              const isOverBudget = percentage > 90;
              
              return (
                <div key={index} className="space-y-2" data-testid={`budget-item-${index}`}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground font-mono">
                      {formatNumber(item.spent)} / {formatNumber(item.allocated)}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={percentage}
                      className={`h-2 ${
                        isOverBudget
                          ? "[&>div]:bg-rose-500"
                          : percentage > 70
                          ? "[&>div]:bg-amber-500"
                          : "[&>div]:bg-emerald-500"
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage.toFixed(1)}% مصرف شده</span>
                    <span>{formatNumber(item.allocated - item.spent)} باقیمانده</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
