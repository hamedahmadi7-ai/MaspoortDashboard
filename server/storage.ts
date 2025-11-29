import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type ProductionBatch,
  type InsertProductionBatch,
  type Sale,
  type InsertSale,
  type FinancialTransaction,
  type InsertFinancialTransaction,
  type DashboardSummary,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  
  getProductionBatches(): Promise<ProductionBatch[]>;
  getProductionBatch(id: string): Promise<ProductionBatch | undefined>;
  createProductionBatch(batch: InsertProductionBatch): Promise<ProductionBatch>;
  updateProductionBatch(id: string, batch: Partial<InsertProductionBatch>): Promise<ProductionBatch | undefined>;
  
  getSales(): Promise<Sale[]>;
  getSale(id: string): Promise<Sale | undefined>;
  createSale(sale: InsertSale): Promise<Sale>;
  
  getFinancialTransactions(): Promise<FinancialTransaction[]>;
  getFinancialTransaction(id: string): Promise<FinancialTransaction | undefined>;
  createFinancialTransaction(transaction: InsertFinancialTransaction): Promise<FinancialTransaction>;
  
  getDashboardSummary(): Promise<DashboardSummary>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private productionBatches: Map<string, ProductionBatch>;
  private sales: Map<string, Sale>;
  private financialTransactions: Map<string, FinancialTransaction>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.productionBatches = new Map();
    this.sales = new Map();
    this.financialTransactions = new Map();
    
    this.seedData();
  }

  private seedData() {
    const productsData: InsertProduct[] = [
      { name: "مصپورت 500", code: "MSP-001", category: "مکمل‌های دارویی", unit: "عدد", price: "45000", stock: 50000, minStock: 30000, status: "active" },
      { name: "زابوتریکس", code: "ZBT-002", category: "مکمل‌های دارویی", unit: "عدد", price: "38000", stock: 40000, minStock: 25000, status: "active" },
      { name: "مصتروپین", code: "MST-003", category: "مکمل‌های دارویی", unit: "عدد", price: "52000", stock: 35000, minStock: 20000, status: "active" },
    ];

    const createdProducts: Product[] = [];
    productsData.forEach(p => {
      const id = randomUUID();
      const product: Product = { ...p, id };
      this.products.set(id, product);
      createdProducts.push(product);
    });

    const batchesData: Omit<InsertProductionBatch, 'productId'>[] = [
      { batchNumber: "BTH-2024-0892", quantity: 50000, status: "in_progress", startDate: new Date("2024-11-26"), efficiency: "87" },
      { batchNumber: "BTH-2024-0893", quantity: 75000, status: "quality_check", startDate: new Date("2024-11-24"), efficiency: "92" },
      { batchNumber: "BTH-2024-0894", quantity: 40000, status: "completed", startDate: new Date("2024-11-22"), endDate: new Date("2024-11-25"), efficiency: "95" },
      { batchNumber: "BTH-2024-0895", quantity: 60000, status: "in_progress", startDate: new Date("2024-11-27"), efficiency: "78" },
      { batchNumber: "BTH-2024-0896", quantity: 80000, status: "shipped", startDate: new Date("2024-11-19"), endDate: new Date("2024-11-23"), efficiency: "94" },
    ];

    batchesData.forEach((b, index) => {
      const productId = createdProducts[index % createdProducts.length].id;
      const id = randomUUID();
      const batch: ProductionBatch = { ...b, id, productId };
      this.productionBatches.set(id, batch);
    });

    const salesData: Omit<InsertSale, 'productId'>[] = [
      { quantity: 800, unitPrice: "45000", totalPrice: "36000000", region: "تهران", customerName: "داروخانه دکتر احمدی", saleDate: new Date("2024-11-29") },
      { quantity: 1500, unitPrice: "45000", totalPrice: "67500000", region: "تهران", customerName: "شبکه بهداشت تهران", saleDate: new Date("2024-11-28") },
      { quantity: 600, unitPrice: "38000", totalPrice: "22800000", region: "اصفهان", customerName: "داروخانه شفا", saleDate: new Date("2024-11-28") },
      { quantity: 900, unitPrice: "38000", totalPrice: "34200000", region: "مشهد", customerName: "بیمارستان رازی", saleDate: new Date("2024-11-27") },
      { quantity: 1200, unitPrice: "52000", totalPrice: "62400000", region: "شیراز", customerName: "داروخانه پاستور", saleDate: new Date("2024-11-27") },
    ];

    salesData.forEach((s, index) => {
      const productId = createdProducts[index % createdProducts.length].id;
      const id = randomUUID();
      const sale: Sale = { ...s, id, productId };
      this.sales.set(id, sale);
    });

    const transactionsData: InsertFinancialTransaction[] = [
      { type: "income", category: "فروش مستقیم", amount: "7800000000", description: "درآمد فروش آذر ماه", transactionDate: new Date("2024-11-29") },
      { type: "expense", category: "مواد اولیه", amount: "2500000000", description: "خرید مواد اولیه", transactionDate: new Date("2024-11-28") },
      { type: "expense", category: "حقوق و دستمزد", amount: "1200000000", description: "پرداخت حقوق آذر", transactionDate: new Date("2024-11-27") },
      { type: "expense", category: "انرژی", amount: "350000000", description: "قبض برق و گاز", transactionDate: new Date("2024-11-26") },
      { type: "income", category: "صادرات", amount: "1200000000", description: "صادرات به عراق", transactionDate: new Date("2024-11-25") },
    ];

    transactionsData.forEach(t => {
      const id = randomUUID();
      const transaction: FinancialTransaction = { ...t, id };
      this.financialTransactions.set(id, transaction);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.products.set(id, updated);
    return updated;
  }

  async getProductionBatches(): Promise<ProductionBatch[]> {
    return Array.from(this.productionBatches.values());
  }

  async getProductionBatch(id: string): Promise<ProductionBatch | undefined> {
    return this.productionBatches.get(id);
  }

  async createProductionBatch(insertBatch: InsertProductionBatch): Promise<ProductionBatch> {
    const id = randomUUID();
    const batch: ProductionBatch = { ...insertBatch, id };
    this.productionBatches.set(id, batch);
    return batch;
  }

  async updateProductionBatch(id: string, updates: Partial<InsertProductionBatch>): Promise<ProductionBatch | undefined> {
    const existing = this.productionBatches.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.productionBatches.set(id, updated);
    return updated;
  }

  async getSales(): Promise<Sale[]> {
    return Array.from(this.sales.values());
  }

  async getSale(id: string): Promise<Sale | undefined> {
    return this.sales.get(id);
  }

  async createSale(insertSale: InsertSale): Promise<Sale> {
    const id = randomUUID();
    const sale: Sale = { ...insertSale, id };
    this.sales.set(id, sale);
    return sale;
  }

  async getFinancialTransactions(): Promise<FinancialTransaction[]> {
    return Array.from(this.financialTransactions.values());
  }

  async getFinancialTransaction(id: string): Promise<FinancialTransaction | undefined> {
    return this.financialTransactions.get(id);
  }

  async createFinancialTransaction(insertTransaction: InsertFinancialTransaction): Promise<FinancialTransaction> {
    const id = randomUUID();
    const transaction: FinancialTransaction = { ...insertTransaction, id };
    this.financialTransactions.set(id, transaction);
    return transaction;
  }

  async getDashboardSummary(): Promise<DashboardSummary> {
    const products = await this.getProducts();
    const batches = await this.getProductionBatches();
    const sales = await this.getSales();
    const transactions = await this.getFinancialTransactions();

    const activeBatches = batches.filter(b => b.status === "in_progress" || b.status === "quality_check");
    const completedBatches = batches.filter(b => b.status === "completed" || b.status === "shipped");
    
    const avgEfficiency = batches.length > 0 
      ? batches.reduce((sum, b) => sum + (parseFloat(b.efficiency || "0")), 0) / batches.length 
      : 0;

    const totalRevenue = sales.reduce((sum, s) => sum + parseFloat(s.totalPrice), 0);
    
    const incomeTransactions = transactions.filter(t => t.type === "income");
    const expenseTransactions = transactions.filter(t => t.type === "expense");
    
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const lowStockProducts = products.filter(p => p.stock < p.minStock);
    const totalStockValue = products.reduce((sum, p) => sum + (p.stock * parseFloat(p.price)), 0);

    const productSales = new Map<string, { quantity: number; revenue: number }>();
    sales.forEach(s => {
      const existing = productSales.get(s.productId) || { quantity: 0, revenue: 0 };
      productSales.set(s.productId, {
        quantity: existing.quantity + s.quantity,
        revenue: existing.revenue + parseFloat(s.totalPrice),
      });
    });

    const topProducts = await Promise.all(
      Array.from(productSales.entries())
        .sort((a, b) => b[1].revenue - a[1].revenue)
        .slice(0, 5)
        .map(async ([productId, data]) => {
          const product = await this.getProduct(productId);
          return {
            name: product?.name || "Unknown",
            quantity: data.quantity,
            revenue: data.revenue,
          };
        })
    );

    const regionalSales = new Map<string, number>();
    sales.forEach(s => {
      const existing = regionalSales.get(s.region) || 0;
      regionalSales.set(s.region, existing + parseFloat(s.totalPrice));
    });

    const expenseBreakdown = new Map<string, number>();
    expenseTransactions.forEach(t => {
      const existing = expenseBreakdown.get(t.category) || 0;
      expenseBreakdown.set(t.category, existing + parseFloat(t.amount));
    });

    const stockByCategory = new Map<string, { count: number; value: number }>();
    products.forEach(p => {
      const existing = stockByCategory.get(p.category) || { count: 0, value: 0 };
      stockByCategory.set(p.category, {
        count: existing.count + 1,
        value: existing.value + (p.stock * parseFloat(p.price)),
      });
    });

    return {
      production: {
        totalBatches: batches.length,
        activeBatches: activeBatches.length,
        completedToday: completedBatches.filter(b => {
          const today = new Date();
          return b.endDate && 
            b.endDate.getDate() === today.getDate() &&
            b.endDate.getMonth() === today.getMonth() &&
            b.endDate.getFullYear() === today.getFullYear();
        }).length,
        averageEfficiency: Math.round(avgEfficiency * 10) / 10,
        monthlyProduction: [125000, 142000, 138000, 155000, 168000, 162000, 175000, 182000, 190000],
        batchStatuses: [
          { status: "in_progress", count: batches.filter(b => b.status === "in_progress").length },
          { status: "quality_check", count: batches.filter(b => b.status === "quality_check").length },
          { status: "completed", count: batches.filter(b => b.status === "completed").length },
          { status: "shipped", count: batches.filter(b => b.status === "shipped").length },
        ],
      },
      sales: {
        totalRevenue,
        monthlyRevenue: totalRevenue,
        totalOrders: sales.length,
        topProducts,
        regionalSales: Array.from(regionalSales.entries()).map(([region, amount]) => ({ region, amount })),
        monthlySales: [
          { month: "فروردین", revenue: 4500000000, orders: 1250 },
          { month: "اردیبهشت", revenue: 5200000000, orders: 1420 },
          { month: "خرداد", revenue: 4800000000, orders: 1380 },
          { month: "تیر", revenue: 5800000000, orders: 1580 },
          { month: "مرداد", revenue: 6200000000, orders: 1720 },
          { month: "شهریور", revenue: 5900000000, orders: 1650 },
          { month: "مهر", revenue: 6500000000, orders: 1820 },
          { month: "آبان", revenue: 7100000000, orders: 1950 },
          { month: "آذر", revenue: 7800000000, orders: 2100 },
        ],
      },
      financial: {
        totalIncome,
        totalExpenses,
        netProfit: totalIncome - totalExpenses,
        profitMargin: totalIncome > 0 ? Math.round((totalIncome - totalExpenses) / totalIncome * 1000) / 10 : 0,
        monthlyFinancials: [
          { month: "فروردین", income: 4500000000, expenses: 3200000000 },
          { month: "اردیبهشت", income: 5200000000, expenses: 3600000000 },
          { month: "خرداد", income: 4800000000, expenses: 3400000000 },
          { month: "تیر", income: 5800000000, expenses: 3900000000 },
          { month: "مرداد", income: 6200000000, expenses: 4100000000 },
          { month: "شهریور", income: 5900000000, expenses: 4000000000 },
          { month: "مهر", income: 6500000000, expenses: 4300000000 },
          { month: "آبان", income: 7100000000, expenses: 4600000000 },
          { month: "آذر", income: 7800000000, expenses: 4900000000 },
        ],
        expenseBreakdown: Array.from(expenseBreakdown.entries()).map(([category, amount]) => ({ category, amount })),
      },
      inventory: {
        totalProducts: products.length,
        lowStockProducts: lowStockProducts.length,
        totalStockValue,
        stockByCategory: Array.from(stockByCategory.entries()).map(([category, data]) => ({
          category,
          count: data.count,
          value: data.value,
        })),
      },
    };
  }
}

export const storage = new MemStorage();
