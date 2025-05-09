
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Higher-order component to protect routes based on authentication
export const RequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log("RequireAuth - Auth state:", { isAuthenticated, isLoading });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-au-purple"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("RequireAuth - Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ message: "Please sign in to access this page" }} replace />;
  }

  console.log("RequireAuth - User is authenticated, rendering protected content");
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

// Higher-order component to restrict access based on user role
export const RequireRole = ({ 
  allowedRoles, 
  children 
}: { 
  allowedRoles: string[],
  children: React.ReactNode 
}) => {
  const { user, isLoading } = useAuth();
  console.log("RequireRole - Checking role access:", { userRole: user?.role, allowedRoles, isLoading });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-au-purple"></div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    console.log("RequireRole - Access denied, user role not in allowed roles");
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="mb-4">
          You don't have permission to access this page. This area is restricted to {allowedRoles.join(", ")} users.
        </p>
        <p>
          If you believe this is an error, please contact the system administrator.
        </p>
      </div>
    );
  }

  console.log("RequireRole - Access granted for role:", user.role);
  return <>{children}</>;
};
