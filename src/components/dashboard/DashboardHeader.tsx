
import React from "react";
import { Bell, Search, Calendar, FileText, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useRoleBasedAccess } from "@/hooks/useRoleBasedAccess";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  const { getFormattedRole, getRoleBasedValue } = useRoleBasedAccess();

  const quickActions = getRoleBasedValue({
    researcher: [
      { icon: Search, label: "Find Opportunities", path: "/opportunities" },
      { icon: FileText, label: "My Applications", path: "/my-grants" },
      { icon: Calendar, label: "Deadlines", path: "/calendar" }
    ],
    grant_office: [
      { icon: FileText, label: "Create Grant Call", path: "/create-opportunity" },
      { icon: BarChart3, label: "Applications", path: "/applications" },
      { icon: Calendar, label: "Review Schedule", path: "/calendar" }
    ],
    admin: [
      { icon: Shield, label: "User Management", path: "/users" },
      { icon: BarChart3, label: "System Reports", path: "/system-reports" },
      { icon: FileText, label: "Audit Logs", path: "/admin-settings" }
    ],
    default: []
  });

  return (
    <div className="border-b">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          <p className="text-xs text-muted-foreground mt-1">
            ThinkGrants • {getFormattedRole()} Dashboard
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {quickActions?.slice(0, 3).map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant="ghost"
                asChild
                className="text-xs"
              >
                <Link to={action.path}>
                  <action.icon className="h-4 w-4 mr-1" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </div>
          
          <div className="hidden md:flex relative">
            <Input
              type="search"
              placeholder="Search grants, reports, opportunities..."
              className="pr-8 h-9 md:w-[250px] lg:w-[350px]"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button size="icon" variant="ghost" className="relative" asChild>
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-thinkgrants-maroon" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-6 pb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search grants, reports, opportunities..."
            className="pr-8 h-9 w-full"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
