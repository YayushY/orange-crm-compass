
import { BarChart3, Users, Target, Calendar, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Leads", url: "/leads", icon: Users },
  { title: "Targets", url: "/targets", icon: Target },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-r border-orange-200`}>
      <SidebarHeader className="border-b border-orange-200 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-orange-900">CRM Pro</h2>
              <p className="text-sm text-orange-600">Sales Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-700">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-orange-100 text-orange-900 font-medium border-l-4 border-orange-500"
                            : "text-orange-700 hover:bg-orange-50"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
