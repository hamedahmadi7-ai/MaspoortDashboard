import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Factory,
  Package,
  FileSpreadsheet,
  FilePieChart,
} from "lucide-react";

const reportCategories = [
  {
    title: "گزارش‌های تولید",
    icon: Factory,
    reports: [
      { name: "گزارش تولید روزانه", type: "daily", format: "Excel" },
      { name: "گزارش کارایی خطوط تولید", type: "weekly", format: "PDF" },
      { name: "گزارش بچ‌های ماهانه", type: "monthly", format: "Excel" },
      { name: "تحلیل کیفیت تولید", type: "monthly", format: "PDF" },
    ],
  },
  {
    title: "گزارش‌های فروش",
    icon: TrendingUp,
    reports: [
      { name: "گزارش فروش ماهانه", type: "monthly", format: "Excel" },
      { name: "تحلیل محصولات پرفروش", type: "quarterly", format: "PDF" },
      { name: "گزارش فروش منطقه‌ای", type: "monthly", format: "Excel" },
      { name: "پیش‌بینی فروش", type: "quarterly", format: "PDF" },
    ],
  },
  {
    title: "گزارش‌های مالی",
    icon: BarChart3,
    reports: [
      { name: "صورت سود و زیان", type: "monthly", format: "PDF" },
      { name: "گزارش هزینه‌ها", type: "monthly", format: "Excel" },
      { name: "ترازنامه", type: "quarterly", format: "PDF" },
      { name: "گزارش جریان نقدی", type: "monthly", format: "Excel" },
    ],
  },
  {
    title: "گزارش‌های موجودی",
    icon: Package,
    reports: [
      { name: "وضعیت موجودی انبار", type: "daily", format: "Excel" },
      { name: "گزارش کمبود موجودی", type: "weekly", format: "PDF" },
      { name: "ارزش‌گذاری موجودی", type: "monthly", format: "Excel" },
      { name: "گردش موجودی", type: "monthly", format: "PDF" },
    ],
  },
];

const recentReports = [
  {
    name: "گزارش تولید آذر ۱۴۰۳",
    date: "1403/09/05",
    type: "تولید",
    format: "Excel",
    size: "2.4 MB",
  },
  {
    name: "صورت سود و زیان آبان ۱۴۰۳",
    date: "1403/09/02",
    type: "مالی",
    format: "PDF",
    size: "1.8 MB",
  },
  {
    name: "تحلیل فروش فصل پاییز",
    date: "1403/08/28",
    type: "فروش",
    format: "PDF",
    size: "3.2 MB",
  },
  {
    name: "وضعیت موجودی انبار",
    date: "1403/08/25",
    type: "موجودی",
    format: "Excel",
    size: "1.5 MB",
  },
];

const typeStyles: Record<string, string> = {
  daily: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  weekly: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  monthly: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  quarterly: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const typeLabels: Record<string, string> = {
  daily: "روزانه",
  weekly: "هفتگی",
  monthly: "ماهانه",
  quarterly: "فصلی",
};

const reportTypeStyles: Record<string, string> = {
  "تولید": "bg-blue-500/20 text-blue-400",
  "فروش": "bg-emerald-500/20 text-emerald-400",
  "مالی": "bg-purple-500/20 text-purple-400",
  "موجودی": "bg-amber-500/20 text-amber-400",
};

export default function Reports() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">گزارش‌ها</h1>
        <p className="text-muted-foreground">
          دسترسی به گزارش‌های جامع تولید، فروش، مالی و موجودی
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover-elevate cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
              <FileSpreadsheet className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-medium">گزارش سریع</h3>
            <p className="text-xs text-muted-foreground mt-1">تولید گزارش فوری</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 hover-elevate cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
              <Calendar className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-medium">برنامه‌ریزی</h3>
            <p className="text-xs text-muted-foreground mt-1">زمان‌بندی گزارش‌ها</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 hover-elevate cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
              <FilePieChart className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-medium">تحلیل داده</h3>
            <p className="text-xs text-muted-foreground mt-1">داشبورد تحلیلی</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 hover-elevate cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
              <Download className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="font-medium">آرشیو</h3>
            <p className="text-xs text-muted-foreground mt-1">گزارش‌های قبلی</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {reportCategories.map((category, index) => (
            <Card
              key={index}
              className="border-0 bg-gradient-to-br from-muted/30 to-muted/10"
              data-testid={`report-category-${index}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base font-medium">
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.reports.map((report, reportIndex) => (
                    <div
                      key={reportIndex}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                      data-testid={`report-item-${index}-${reportIndex}`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{report.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={`text-xs ${typeStyles[report.type]}`}
                            >
                              {typeLabels[report.type]}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {report.format}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10 h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">گزارش‌های اخیر</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentReports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                data-testid={`recent-report-${index}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      reportTypeStyles[report.type]
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
