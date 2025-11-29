import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Activity, 
  Beaker, 
  Database, 
  Server, 
  Shield, 
  Thermometer,
  Cpu,
  HardDrive
} from "lucide-react";

interface SystemModule {
  name: string;
  status: "online" | "warning" | "offline";
  icon: string;
  lastUpdate?: string;
}

interface SystemStatusProps {
  modules?: SystemModule[];
  title?: string;
  testId?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HPLC: Beaker,
  ERP: Database,
  SCADA: Activity,
  QMS: Shield,
  DCS: Cpu,
  LIMS: Server,
  PLM: HardDrive,
  ENV: Thermometer,
};

const statusStyles = {
  online: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/30",
    dot: "bg-emerald-500",
    text: "text-emerald-400",
    label: "آنلاین",
  },
  warning: {
    bg: "bg-amber-500/20",
    border: "border-amber-500/30",
    dot: "bg-amber-500",
    text: "text-amber-400",
    label: "هشدار",
  },
  offline: {
    bg: "bg-rose-500/20",
    border: "border-rose-500/30",
    dot: "bg-rose-500",
    text: "text-rose-400",
    label: "آفلاین",
  },
};

const defaultModules: SystemModule[] = [
  { name: "HPLC", status: "online", icon: "HPLC", lastUpdate: "2 دقیقه پیش" },
  { name: "ERP", status: "online", icon: "ERP", lastUpdate: "1 دقیقه پیش" },
  { name: "SCADA", status: "online", icon: "SCADA", lastUpdate: "30 ثانیه پیش" },
  { name: "QMS", status: "warning", icon: "QMS", lastUpdate: "5 دقیقه پیش" },
  { name: "DCS", status: "online", icon: "DCS", lastUpdate: "1 دقیقه پیش" },
  { name: "LIMS", status: "online", icon: "LIMS", lastUpdate: "3 دقیقه پیش" },
];

export function SystemStatus({ 
  modules = defaultModules, 
  title = "وضعیت سیستم‌ها", 
  testId 
}: SystemStatusProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {modules.map((module, index) => {
            const IconComponent = iconMap[module.icon] || Activity;
            const style = statusStyles[module.status];
            
            return (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-lg border",
                  style.bg,
                  style.border
                )}
                data-testid={`system-module-${module.name}`}
              >
                <div className="absolute top-2 right-2">
                  <div className={cn("h-2 w-2 rounded-full animate-pulse", style.dot)} />
                </div>
                <IconComponent className={cn("h-6 w-6 mb-2", style.text)} />
                <span className="text-sm font-medium">{module.name}</span>
                <span className={cn("text-xs", style.text)}>{style.label}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
