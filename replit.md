# مصپورت - داشبورد مدیریت دارویی
## Pharmaceutical Production, Sales & Financial Dashboard

### Overview
A comprehensive pharmaceutical company dashboard for monitoring production, sales, and financial metrics. Built with React, TypeScript, Express, and modern UI components. Features RTL (Right-to-Left) support for Persian language.

### Recent Changes
- **2024-11-29**: Initial setup of pharmaceutical dashboard with production, sales, financial, and inventory modules
- Created dark-themed dashboard matching pharmaceutical industry aesthetics
- Implemented KPI cards, gauge charts, line/bar/pie charts using Recharts
- Added RTL support for Persian language

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, Shadcn UI, Recharts
- **Backend**: Express.js, TypeScript
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Styling**: Tailwind CSS with dark mode support

### Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/       # Dashboard-specific components
│   │   │   │   ├── kpi-card.tsx
│   │   │   │   ├── gauge-chart.tsx
│   │   │   │   ├── production-chart.tsx
│   │   │   │   ├── sales-chart.tsx
│   │   │   │   ├── financial-chart.tsx
│   │   │   │   ├── donut-chart.tsx
│   │   │   │   ├── batch-table.tsx
│   │   │   │   ├── inventory-table.tsx
│   │   │   │   ├── top-products-card.tsx
│   │   │   │   ├── regional-sales.tsx
│   │   │   │   ├── expense-breakdown.tsx
│   │   │   │   ├── system-status.tsx
│   │   │   │   ├── validation-progress.tsx
│   │   │   │   └── status-badge.tsx
│   │   │   ├── ui/              # Shadcn UI components
│   │   │   ├── app-sidebar.tsx  # Main navigation sidebar
│   │   │   └── theme-toggle.tsx # Dark/Light mode toggle
│   │   ├── pages/
│   │   │   ├── dashboard.tsx    # Main dashboard
│   │   │   ├── production.tsx   # Production monitoring
│   │   │   ├── sales.tsx        # Sales analytics
│   │   │   ├── financial.tsx    # Financial overview
│   │   │   ├── inventory.tsx    # Inventory management
│   │   │   └── reports.tsx      # Reports page
│   │   ├── lib/
│   │   │   ├── mock-data.ts     # Sample data for testing
│   │   │   ├── theme-provider.tsx # Dark mode provider
│   │   │   ├── queryClient.ts   # React Query setup
│   │   │   └── utils.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
├── server/
│   ├── routes.ts                # API endpoints
│   ├── storage.ts               # In-memory data storage
│   └── index.ts
├── shared/
│   └── schema.ts                # Shared TypeScript types & Drizzle schemas
└── design_guidelines.md         # UI/UX design guidelines
```

### API Endpoints
- `GET /api/dashboard` - Dashboard summary with all metrics
- `GET /api/products` - List all products
- `GET /api/batches` - List production batches
- `GET /api/sales` - List sales transactions
- `GET /api/financial` - List financial transactions

### Features
1. **Production Dashboard**: Real-time production metrics, batch tracking, efficiency gauges, system status
2. **Sales Dashboard**: Revenue trends, top products, regional sales distribution
3. **Financial Dashboard**: Income/expense tracking, profit margins, budget status
4. **Inventory Management**: Stock levels, low-stock alerts, category breakdown
5. **Reports**: Various report types for all modules

### User Preferences
- Dark theme by default (pharmaceutical industry standard)
- RTL layout for Persian language
- Font: Open Sans for body, JetBrains Mono for numbers

### Running the Project
```bash
npm run dev
```
The application runs on port 5000 with hot-reload enabled.
