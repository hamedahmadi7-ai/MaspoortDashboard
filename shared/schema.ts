import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Products table
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  category: text("category").notNull(),
  unit: text("unit").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  stock: integer("stock").notNull().default(0),
  minStock: integer("min_stock").notNull().default(100),
  status: text("status").notNull().default("active"),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Production batches table
export const productionBatches = pgTable("production_batches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  batchNumber: text("batch_number").notNull().unique(),
  productId: varchar("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  status: text("status").notNull().default("in_progress"), // in_progress, quality_check, completed, shipped
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  efficiency: decimal("efficiency", { precision: 5, scale: 2 }),
});

export const insertProductionBatchSchema = createInsertSchema(productionBatches).omit({
  id: true,
});

export type InsertProductionBatch = z.infer<typeof insertProductionBatchSchema>;
export type ProductionBatch = typeof productionBatches.$inferSelect;

// Sales table
export const sales = pgTable("sales", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 12, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 12, scale: 2 }).notNull(),
  region: text("region").notNull(),
  customerName: text("customer_name").notNull(),
  saleDate: timestamp("sale_date").notNull(),
});

export const insertSaleSchema = createInsertSchema(sales).omit({
  id: true,
});

export type InsertSale = z.infer<typeof insertSaleSchema>;
export type Sale = typeof sales.$inferSelect;

// Financial transactions table
export const financialTransactions = pgTable("financial_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // income, expense
  category: text("category").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description"),
  transactionDate: timestamp("transaction_date").notNull(),
});

export const insertFinancialTransactionSchema = createInsertSchema(financialTransactions).omit({
  id: true,
});

export type InsertFinancialTransaction = z.infer<typeof insertFinancialTransactionSchema>;
export type FinancialTransaction = typeof financialTransactions.$inferSelect;

// Dashboard summary types (computed from storage)
export type DashboardSummary = {
  production: {
    totalBatches: number;
    activeBatches: number;
    completedToday: number;
    averageEfficiency: number;
    monthlyProduction: number[];
    batchStatuses: { status: string; count: number }[];
  };
  sales: {
    totalRevenue: number;
    monthlyRevenue: number;
    totalOrders: number;
    topProducts: { name: string; quantity: number; revenue: number }[];
    regionalSales: { region: string; amount: number }[];
    monthlySales: { month: string; revenue: number; orders: number }[];
  };
  financial: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
    profitMargin: number;
    monthlyFinancials: { month: string; income: number; expenses: number }[];
    expenseBreakdown: { category: string; amount: number }[];
  };
  inventory: {
    totalProducts: number;
    lowStockProducts: number;
    totalStockValue: number;
    stockByCategory: { category: string; count: number; value: number }[];
  };
};
