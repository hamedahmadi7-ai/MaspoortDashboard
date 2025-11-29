# Pharmaceutical Dashboard Design Guidelines

## Design Approach
**System-Based Approach**: Using Material Design principles adapted for data-heavy pharmaceutical dashboards, with dark theme optimization for extended viewing sessions. The design prioritizes information density, quick scanning, and real-time data monitoring.

## Layout System

### Grid Structure
- Main dashboard: 12-column grid with 4-column metric cards
- Responsive breakpoints: 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)
- Consistent spacing: Use Tailwind units of 4, 6, and 8 for all spacing (p-4, gap-6, m-8)
- Card-based modular system where each widget is self-contained

### Dashboard Organization
1. **Top Navigation Bar**: Company logo, module switcher (Production/Sales/Financial), notifications, user profile
2. **KPI Summary Row**: 4 key metric cards displaying critical numbers with trend indicators
3. **Main Content Grid**: 2x2 or 3x2 grid of visualization widgets
4. **Data Tables Section**: Detailed transaction/batch records below visualizations

## Typography

### Font Families
- Primary: Inter or Roboto via Google Fonts (excellent for data readability)
- Monospace: JetBrains Mono for numerical data and metrics

### Type Scale
- Dashboard Title: 2xl, semibold
- Widget Headers: lg, medium  
- Primary Metrics: 3xl-4xl, bold (large numbers for quick scanning)
- Labels/Categories: sm, medium
- Body/Table Text: base, regular
- Captions/Timestamps: xs, regular

## Component Library

### Metric Cards
- Compact cards with large number display, label, and trend indicator (↑↓ with percentage)
- Mini sparkline chart below number showing 7-day trend
- Icons representing metric type (production, revenue, efficiency)

### Data Visualization Widgets
- **Line Charts**: Multi-line time series for trends (production volume over time, revenue tracking)
- **Bar Charts**: Comparative data (product-wise sales, monthly comparisons)
- **Donut/Pie Charts**: Distribution breakdowns (product categories, regional sales)
- **Gauge Charts**: Performance indicators (production efficiency %, target achievement)
- All charts include: title, time range selector, legend, data point tooltips

### Tables
- Striped rows for readability
- Sortable column headers with icons
- Fixed header on scroll
- Row actions (view details, edit) on hover
- Pagination controls at bottom

### Navigation
- Sidebar with collapsible sections: Dashboard, Production, Sales, Financial, Inventory, Reports
- Active state clearly differentiated
- Icon + label for each section

### Form Controls (for filters)
- Date range pickers for time-based filtering
- Dropdown selectors for products/categories
- Search bars with auto-complete
- Apply/Reset filter buttons

## Data Visualization Standards

### Chart Specifications
- Consistent padding within widget cards (p-6)
- Y-axis labels always visible
- X-axis shows appropriate time granularity
- Gridlines subtle but present for reference
- Data point hover states show exact values
- Export options (PNG, CSV) in widget menu

### Status Indicators
- Production batch status: In Progress, Completed, Quality Check, Shipped
- Alert badges for low inventory, delayed batches
- Traffic light system for KPI thresholds (green: above target, yellow: near target, red: below)

## Dashboard-Specific Layouts

### Production Dashboard
- Real-time production counter
- Active batches grid (4 columns)
- Production line efficiency gauges (3-4 side by side)
- Daily/weekly production trends line chart
- Equipment status table

### Sales Dashboard  
- Revenue trend chart (prominent, takes 2 column width)
- Top selling products bar chart
- Regional sales map/distribution
- Recent orders table
- Sales rep performance leaderboard

### Financial Dashboard
- P&L summary cards
- Revenue vs expenses dual-axis chart
- Cash flow waterfall chart
- Expense breakdown pie chart
- Financial forecasts with confidence intervals

## Interactive Elements
- Widget cards can be expanded to full-screen view
- Drill-down capability: click chart segment to see detailed breakdown
- Comparison mode: select two time periods to overlay
- Real-time updates with subtle pulse animation on data refresh
- Export and share buttons in each widget header

## Responsive Behavior
- Desktop: 3-4 column grid, all widgets visible
- Tablet: 2 column grid, maintain all widgets but stack
- Mobile: Single column, prioritize KPI cards, charts become scrollable

## Accessibility
- High contrast ratios for text on dark backgrounds
- Clear focus states for keyboard navigation
- ARIA labels for all charts and data points
- Screen reader support for data tables
- Alternative text representation of visual data

This dashboard design emphasizes clarity, efficiency, and quick access to critical pharmaceutical production and financial metrics while maintaining professional aesthetics suitable for extended monitoring sessions.