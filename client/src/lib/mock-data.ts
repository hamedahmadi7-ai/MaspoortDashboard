export const mockProductionData = {
  monthlyProduction: [
    { month: "فروردین", production: 125000, target: 130000 },
    { month: "اردیبهشت", production: 142000, target: 140000 },
    { month: "خرداد", production: 138000, target: 145000 },
    { month: "تیر", production: 155000, target: 150000 },
    { month: "مرداد", production: 168000, target: 160000 },
    { month: "شهریور", production: 162000, target: 165000 },
    { month: "مهر", production: 175000, target: 170000 },
    { month: "آبان", production: 182000, target: 180000 },
    { month: "آذر", production: 190000, target: 185000 },
  ],
  activeBatches: [
    {
      id: "1",
      batchNumber: "BTH-2024-0892",
      productName: "مولتی ویتامین A-Z",
      quantity: 50000,
      status: "in_progress",
      efficiency: 87,
      startDate: "1403/09/05",
    },
    {
      id: "2",
      batchNumber: "BTH-2024-0893",
      productName: "ویتامین D3",
      quantity: 75000,
      status: "quality_check",
      efficiency: 92,
      startDate: "1403/09/03",
    },
    {
      id: "3",
      batchNumber: "BTH-2024-0894",
      productName: "امگا 3",
      quantity: 40000,
      status: "completed",
      efficiency: 95,
      startDate: "1403/09/01",
    },
    {
      id: "4",
      batchNumber: "BTH-2024-0895",
      productName: "کلسیم + D",
      quantity: 60000,
      status: "in_progress",
      efficiency: 78,
      startDate: "1403/09/06",
    },
    {
      id: "5",
      batchNumber: "BTH-2024-0896",
      productName: "ویتامین C 1000",
      quantity: 80000,
      status: "shipped",
      efficiency: 94,
      startDate: "1403/08/28",
    },
  ],
  kpis: {
    totalBatches: 892,
    activeBatches: 12,
    completedToday: 5,
    averageEfficiency: 88.5,
    dailyProduction: 15420,
    monthlyTarget: 185000,
    currentProgress: 92,
  },
};

export const mockSalesData = {
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
  topProducts: [
    { name: "مولتی ویتامین A-Z", quantity: 125000, revenue: 2875000000 },
    { name: "ویتامین D3", quantity: 98000, revenue: 1960000000 },
    { name: "امگا 3", quantity: 85000, revenue: 2550000000 },
    { name: "کلسیم + D", quantity: 72000, revenue: 1440000000 },
    { name: "ویتامین C 1000", quantity: 68000, revenue: 1020000000 },
  ],
  regionalSales: [
    { region: "تهران", amount: 3200000000 },
    { region: "اصفهان", amount: 1850000000 },
    { region: "مشهد", amount: 1420000000 },
    { region: "شیراز", amount: 980000000 },
    { region: "تبریز", amount: 750000000 },
    { region: "اهواز", amount: 520000000 },
  ],
  kpis: {
    totalRevenue: 53800000000,
    monthlyRevenue: 7800000000,
    totalOrders: 14870,
    monthlyOrders: 2100,
    averageOrderValue: 3718000,
    growthRate: 12.5,
  },
};

export const mockFinancialData = {
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
  expenseBreakdown: [
    { category: "مواد اولیه", amount: 18500000000 },
    { category: "حقوق و دستمزد", amount: 8200000000 },
    { category: "تجهیزات", amount: 3500000000 },
    { category: "انرژی", amount: 2100000000 },
    { category: "بازاریابی", amount: 1800000000 },
    { category: "حمل و نقل", amount: 1400000000 },
    { category: "تحقیق و توسعه", amount: 2500000000 },
  ],
  kpis: {
    totalIncome: 53800000000,
    totalExpenses: 36000000000,
    netProfit: 17800000000,
    profitMargin: 33.1,
    monthlyIncome: 7800000000,
    monthlyExpenses: 4900000000,
    cashFlow: 2900000000,
  },
};

export const mockInventoryData = {
  items: [
    {
      id: "1",
      name: "مولتی ویتامین A-Z",
      code: "MV-001",
      category: "مکمل‌ها",
      stock: 45000,
      minStock: 30000,
      unit: "عدد",
      price: 23000,
    },
    {
      id: "2",
      name: "ویتامین D3",
      code: "VD-002",
      category: "ویتامین‌ها",
      stock: 12000,
      minStock: 20000,
      unit: "عدد",
      price: 20000,
    },
    {
      id: "3",
      name: "امگا 3",
      code: "OM-003",
      category: "اسیدهای چرب",
      stock: 38000,
      minStock: 25000,
      unit: "عدد",
      price: 30000,
    },
    {
      id: "4",
      name: "کلسیم + D",
      code: "CD-004",
      category: "مینرال‌ها",
      stock: 8000,
      minStock: 15000,
      unit: "عدد",
      price: 20000,
    },
    {
      id: "5",
      name: "ویتامین C 1000",
      code: "VC-005",
      category: "ویتامین‌ها",
      stock: 52000,
      minStock: 30000,
      unit: "عدد",
      price: 15000,
    },
    {
      id: "6",
      name: "زینک پلاس",
      code: "ZP-006",
      category: "مینرال‌ها",
      stock: 28000,
      minStock: 20000,
      unit: "عدد",
      price: 18000,
    },
    {
      id: "7",
      name: "آهن + فولیک اسید",
      code: "IF-007",
      category: "مینرال‌ها",
      stock: 5000,
      minStock: 12000,
      unit: "عدد",
      price: 22000,
    },
    {
      id: "8",
      name: "ویتامین B12",
      code: "VB-008",
      category: "ویتامین‌ها",
      stock: 35000,
      minStock: 25000,
      unit: "عدد",
      price: 25000,
    },
  ],
  kpis: {
    totalProducts: 48,
    lowStockProducts: 3,
    outOfStockProducts: 0,
    totalStockValue: 4250000000,
    stockTurnover: 4.2,
  },
  stockByCategory: [
    { category: "ویتامین‌ها", count: 18, value: 1580000000 },
    { category: "مکمل‌ها", count: 12, value: 1250000000 },
    { category: "مینرال‌ها", count: 10, value: 820000000 },
    { category: "اسیدهای چرب", count: 8, value: 600000000 },
  ],
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
};
