import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AlertTriangle, Package } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  code: string;
  category: string;
  stock: number;
  minStock: number;
  unit: string;
  price: number;
}

interface InventoryTableProps {
  items: InventoryItem[];
  title?: string;
  testId?: string;
  isLoading?: boolean;
}

export function InventoryTable({ items, title = "وضعیت موجودی انبار", testId, isLoading }: InventoryTableProps) {
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { label: "ناموجود", className: "bg-rose-500/20 text-rose-400 border-rose-500/30" };
    if (stock < minStock) return { label: "کم", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" };
    return { label: "موجود", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" };
  };

  if (isLoading) {
    return (
      <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10" data-testid={testId}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
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
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>{items.length} محصول</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium text-right">کد</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">محصول</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">دسته‌بندی</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">موجودی</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">حداقل</TableHead>
                <TableHead className="text-muted-foreground font-medium text-right">وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    هیچ محصولی موجود نیست
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => {
                  const status = getStockStatus(item.stock, item.minStock);
                  const isLowStock = item.stock < item.minStock;
                  
                  return (
                    <TableRow
                      key={item.id}
                      className={cn(
                        "border-border/20 hover:bg-muted/30 transition-colors",
                        isLowStock && "bg-amber-500/5"
                      )}
                      data-testid={`row-inventory-${item.id}`}
                    >
                      <TableCell className="font-mono text-sm">{item.code}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {isLowStock && (
                            <AlertTriangle className="h-4 w-4 text-amber-400" />
                          )}
                          <span>{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{item.category}</TableCell>
                      <TableCell className="font-mono">
                        {item.stock.toLocaleString()} {item.unit}
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground">
                        {item.minStock.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("border font-medium", status.className)}>
                          {status.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
