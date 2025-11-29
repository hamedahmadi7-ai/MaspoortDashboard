import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Factory,
  TrendingUp,
  Wallet,
  Package,
  FileBarChart,
  Settings,
  Bell,
  HelpCircle,
  Pill,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import logoUrl from "@assets/Logo-3 copy_1764401395370.png";

const mainMenuItems = [
  {
    title: "داشبورد",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "تولید",
    url: "/production",
    icon: Factory,
    badge: "3",
  },
  {
    title: "فروش",
    url: "/sales",
    icon: TrendingUp,
  },
  {
    title: "مالی",
    url: "/financial",
    icon: Wallet,
  },
  {
    title: "موجودی",
    url: "/inventory",
    icon: Package,
    badge: "2",
  },
  {
    title: "گزارش‌ها",
    url: "/reports",
    icon: FileBarChart,
  },
];

const settingsMenuItems = [
  {
    title: "اعلان‌ها",
    url: "/notifications",
    icon: Bell,
    badge: "5",
  },
  {
    title: "تنظیمات",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "راهنما",
    url: "/help",
    icon: HelpCircle,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center justify-center">
          <img 
            src={logoUrl} 
            alt="MDEC Logo" 
            className="h-20 w-20 object-contain"
            data-testid="logo-image"
          />
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>منوی اصلی</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url} data-testid={`nav-${item.url.replace("/", "") || "dashboard"}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="mr-auto bg-primary/20 text-primary text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>تنظیمات</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url} data-testid={`nav-${item.url.replace("/", "")}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="mr-auto bg-amber-500/20 text-amber-400 text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
        <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-4 border border-blue-500/20">
          <p className="text-xs text-muted-foreground mb-2">نسخه سیستم</p>
          <p className="text-sm font-medium">v2.1.0</p>
          <p className="text-xs text-muted-foreground mt-1">آخرین به‌روزرسانی: ۱۴۰۳/۰۹/۰۸</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
