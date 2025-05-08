import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Home,
  File,
  Bell,
  BarChart2,
  Calendar,
  Settings,
  LogOut,
  Users,
  FileText,
  Search,
  Award,
  FileSignature,
  BookOpen,
  ChevronRight
} from "lucide-react";
import NotificationCenter from "./notifications/NotificationCenter";
import { useRoleBasedAccess } from "@/hooks/useRoleBasedAccess";

export const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { getRoleBasedValue, getFormattedRole } = useRoleBasedAccess();
  
  if (!user) return null;
  
  // Debug log for sidebar rendering
  console.log("AppSidebar - User role:", user.role);
  
  const isActiveRoute = (route: string) => {
    return location.pathname === route || location.pathname.startsWith(`${route}/`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const menuItems = getRoleBasedValue({
    researcher: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <Home className="h-4 w-4 mr-2" />,
      },
      {
        name: "My Grants",
        path: "/my-grants",
        icon: <File className="h-4 w-4 mr-2" />,
      },
      {
        name: "Find Opportunities",
        path: "/opportunities",
        icon: <Search className="h-4 w-4 mr-2" />,
      },
      {
        name: "Reports",
        path: "/reports",
        icon: <FileText className="h-4 w-4 mr-2" />,
      },
      {
        name: "Calendar",
        path: "/calendar",
        icon: <Calendar className="h-4 w-4 mr-2" />,
      },
      {
        name: "Notifications",
        path: "/notifications",
        icon: <Bell className="h-4 w-4 mr-2" />,
      },
      {
        name: "Settings",
        path: "/settings",
        icon: <Settings className="h-4 w-4 mr-2" />,
      },
    ],
    grant_office: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <Home className="h-4 w-4 mr-2" />,
      },
      {
        name: "Applications",
        path: "/applications",
        icon: <File className="h-4 w-4 mr-2" />,
      },
      {
        name: "Reporting",
        path: "/reporting",
        icon: <BarChart2 className="h-4 w-4 mr-2" />,
      },
      {
        name: "Financial Management",
        path: "/finance",
        icon: <FileText className="h-4 w-4 mr-2" />,
      },
      {
        name: "Call-for-Proposals",
        path: "/proposals",
        icon: <Calendar className="h-4 w-4 mr-2" />,
      },
      {
        name: "IP Management",
        path: "/ip-management",
        icon: <Award className="h-4 w-4 mr-2" />,
      },
      {
        name: "Agreements",
        path: "/agreements",
        icon: <FileSignature className="h-4 w-4 mr-2" />,
      },
      {
        name: "Notifications",
        path: "/notifications",
        icon: <Bell className="h-4 w-4 mr-2" />,
      },
      {
        name: "Settings",
        path: "/settings",
        icon: <Settings className="h-4 w-4 mr-2" />,
      },
    ],
    admin: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <Home className="h-4 w-4 mr-2" />,
      },
      {
        name: "User Management",
        path: "/users",
        icon: <Users className="h-4 w-4 mr-2" />,
      },
      {
        name: "System Reports",
        path: "/system-reports",
        icon: <BarChart2 className="h-4 w-4 mr-2" />,
      },
      {
        name: "Applications",
        path: "/applications", 
        icon: <File className="h-4 w-4 mr-2" />,
      },
      {
        name: "Reporting",
        path: "/reporting",
        icon: <FileText className="h-4 w-4 mr-2" />,
      },
      {
        name: "Notifications",
        path: "/notifications",
        icon: <Bell className="h-4 w-4 mr-2" />,
      },
      {
        name: "Admin Settings",
        path: "/admin-settings",
        icon: <Settings className="h-4 w-4 mr-2" />,
      },
    ],
    default: [
      {
        name: "Dashboard", 
        path: "/dashboard", 
        icon: <Home className="h-4 w-4 mr-2" />
      },
      {
        name: "Notifications",
        path: "/notifications",
        icon: <Bell className="h-4 w-4 mr-2" />,
      },
      {
        name: "Settings",
        path: "/settings",
        icon: <Settings className="h-4 w-4 mr-2" />,
      },
    ]
  }) || [];

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="h-screen border-r" collapsible="icon">
        <SidebarHeader className="border-b py-3 px-4 flex justify-between items-center bg-[#cf2e2e] text-white">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/4af217f9-8ca2-4acc-8ba4-9320b16cf567.png" 
              alt="Africa University" 
              className="h-16 w-auto" 
            />
            <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">AU GMS</span>
          </div>
          <div className="flex items-center">
            <NotificationCenter />
          </div>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <div className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 text-sm rounded-md transition-colors group",
                  isActiveRoute(item.path)
                    ? "bg-[#cf2e2e]/10 text-[#cf2e2e] font-medium"
                    : "text-au-neutral-600 hover:bg-au-neutral-100"
                )}
              >
                <div className="flex items-center">
                  {React.cloneElement(item.icon, { 
                    className: cn(
                      "h-5 w-5",
                      !isActiveRoute(item.path) && "group-data-[collapsible=icon]:mx-auto"
                    )
                  })}
                  <span className="ml-2 group-data-[collapsible=icon]:hidden">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <div className="flex items-center mb-4 space-x-3">
            <Avatar>
              <AvatarImage src={user.profileImage} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {getFormattedRole()}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-2 group-data-[collapsible=icon]:hidden">Sign out</span>
          </Button>
        </SidebarFooter>
        
        <SidebarTrigger className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full border bg-background shadow-md" />
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
};
