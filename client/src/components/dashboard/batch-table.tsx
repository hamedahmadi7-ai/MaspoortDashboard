import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./status-badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Batch {
  id: string;
  batchNumber: string;
  product: string;
  status: "in_progress" | "quality_check" | "completed" | "shipped";
  progress: number;
  startDate: string;
  estimatedEnd: string;
}

interface BatchTableProps {
  batches: Batch[];
  title?: string;
  testId?: string;
  isLoading?: boolean;
}

export function BatchTable({ batches, title = "بچ‌های در حال تولید", testId, isLoading }: BatchTableProps) {
  if (isLoading) {
    return (
      <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium text-right">شماره بچ</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">محصول</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">تاریخ شروع</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">وضعیت</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">پیشرفت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    هیچ بچی موجود نیست
                  </TableCell>
                </TableRow>
              ) : (
                batches.map((batch) => (
                  <TableRow
                    key={batch.id}
                    className="border-border/20 hover:bg-muted/30 transition-colors"
                    data-testid={`row-batch-${batch.id}`}
                  >
                    <TableCell className="font-mono text-sm">{batch.batchNumber}</TableCell>
                    <TableCell>{batch.product}</TableCell>
                    <TableCell className="font-mono">{batch.startDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={batch.status} variant="production" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={batch.progress}
                          className={cn(
                            "h-2 w-16",
                            batch.progress >= 80
                              ? "[&>div]:bg-emerald-500"
                              : batch.progress >= 50
                              ? "[&>div]:bg-amber-500"
                              : "[&>div]:bg-rose-500"
                          )}
                        />
                        <span className="text-sm font-mono text-muted-foreground">
                          {batch.progress}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
