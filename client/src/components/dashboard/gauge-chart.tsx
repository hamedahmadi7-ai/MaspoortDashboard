import { cn } from "@/lib/utils";

interface GaugeChartProps {
  value: number;
  max?: number;
  label: string;
  sublabel?: string;
  size?: "sm" | "md" | "lg";
  colors?: {
    low: string;
    medium: string;
    high: string;
  };
  testId?: string;
}

const sizeConfig = {
  sm: { width: 120, strokeWidth: 8, fontSize: "text-lg" },
  md: { width: 160, strokeWidth: 10, fontSize: "text-2xl" },
  lg: { width: 200, strokeWidth: 12, fontSize: "text-3xl" },
};

export function GaugeChart({
  value,
  max = 100,
  label,
  sublabel,
  size = "md",
  colors = {
    low: "#ef4444",
    medium: "#f59e0b",
    high: "#22c55e",
  },
  testId,
}: GaugeChartProps) {
  const config = sizeConfig[size];
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (percent: number) => {
    if (percent < 33) return colors.low;
    if (percent < 66) return colors.medium;
    return colors.high;
  };

  return (
    <div className="flex flex-col items-center" data-testid={testId}>
      <div className="relative" style={{ width: config.width, height: config.width / 2 + 20 }}>
        <svg
          width={config.width}
          height={config.width / 2 + 10}
          className="transform -rotate-180"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id={`gauge-gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.low} />
              <stop offset="50%" stopColor={colors.medium} />
              <stop offset="100%" stopColor={colors.high} />
            </linearGradient>
          </defs>
          <path
            d={`M ${config.strokeWidth / 2}, ${config.width / 2}
                A ${radius}, ${radius} 0 0 1 ${config.width - config.strokeWidth / 2}, ${config.width / 2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className="text-muted/30"
            strokeLinecap="round"
          />
          <path
            d={`M ${config.strokeWidth / 2}, ${config.width / 2}
                A ${radius}, ${radius} 0 0 1 ${config.width - config.strokeWidth / 2}, ${config.width / 2}`}
            fill="none"
            stroke={`url(#gauge-gradient-${label})`}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span
            className={cn("font-bold font-mono", config.fontSize)}
            style={{ color: getColor(percentage) }}
            data-testid={`${testId}-value`}
          >
            {value}%
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-foreground mt-1">{label}</p>
      {sublabel && (
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      )}
    </div>
  );
}
