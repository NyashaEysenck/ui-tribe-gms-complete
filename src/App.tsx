
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

// New role-based routing components
import { RequireAuth, RequireRole } from "./routes/ProtectedRoutes";

// Landing and Authentication Pages
import LandingPage from "@/components/LandingPage";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import SetupPage from "@/pages/Setup";

// Dashboard Components
import ResearcherDashboard from "@/components/dashboard/researcher/ResearcherDashboard";
import GrantOfficeDashboard from "@/components/dashboard/grant-office/GrantOfficeDashboard";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";

// Feature Pages
import OpportunitiesList from "@/components/opportunities/OpportunitiesList";
import MyGrants from "@/components/grants/MyGrants";
import GrantApplicationForm from "@/components/grants/GrantApplicationForm";
import CreateOpportunityForm from "@/components/grants/CreateOpportunityForm";
import GrantReviewForm from "@/components/grants/GrantReviewForm";
import OpportunityDetailsPage from "@/components/grants/OpportunityDetailsPage";
import NotFound from "@/components/NotFound";

// New pages
import NotificationsPage from "@/components/dashboard/notifications/NotificationsPage";
import SettingsPage from "@/components/dashboard/settings/SettingsPage";
import ReportsPage from "@/components/dashboard/researcher/ReportsPage";
import CalendarPage from "@/components/dashboard/researcher/CalendarPage";
import ReportingPage from "@/components/dashboard/grant-office/ReportingPage";
import ProposalsPage from "@/components/dashboard/grant-office/ProposalsPage";
import FinancePage from "@/components/dashboard/grant-office/FinancePage";
import ApplicationsPage from "@/components/dashboard/grant-office/ApplicationsPage";
import AdminSettingsPage from "@/components/dashboard/admin/AdminSettingsPage";
import UserManagementPage from "@/components/dashboard/admin/UserManagementPage";
import SystemReportsPage from "@/components/dashboard/admin/SystemReportsPage";

// New IP and Agreements management
import IntellectualPropertyPage from "@/components/dashboard/ip/IntellectualPropertyPage";
import AgreementsPage from "@/components/dashboard/agreements/AgreementsPage";

// Fix: Import useAuth correctly
import { useAuth } from "@/contexts/auth/useAuth";

const queryClient = new QueryClient();

// Create role-specific route wrappers to use with <Outlet>
const ResearcherRoute = () => (
  <RequireRole allowedRoles={['researcher', 'admin']}>
    <Outlet />
  </RequireRole>
);

const GrantOfficeRoute = () => (
  <RequireRole allowedRoles={['grant_office', 'admin']}>
    <Outlet />
  </RequireRole>
);

const AdminRoute = () => (
  <RequireRole allowedRoles={['admin']}>
    <Outlet />
  </RequireRole>
);

const App = () => {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* Changed to use / for development environment */}
      <BrowserRouter basename="/">
        <AuthProvider>
          <SidebarProvider defaultOpen={true}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                <Route path="/setup" element={<SetupPage />} />
                
                {/* Protected Routes - Authentication required */}
                <Route element={<RequireAuth />}>
                  {/* Dashboard Routes with Role-Based Access */}
                  <Route path="/dashboard" element={<DashboardRouter />} />
                  
                  {/* Researcher Dashboard */}
                  <Route path="/dashboard/researcher" element={<ResearcherDashboard />} />
                  
                  {/* Grant Office Dashboard */}
                  <Route path="/dashboard/grant-office" element={<GrantOfficeDashboard />} />
                  
                  {/* Admin Dashboard */}
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />
                  
                  {/* Common Routes for All Authenticated Users */}
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  
                  {/* Researcher Routes - Using the wrapper component */}
                  <Route element={<ResearcherRoute />}>
                    <Route path="/my-grants" element={<MyGrants />} />
                    <Route path="/opportunities" element={<OpportunitiesList />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/grant-application" element={<GrantApplicationForm />} />
                    <Route path="/new-application" element={<GrantApplicationForm />} />
                  </Route>
                  
                  {/* Grant Office Routes - Using the wrapper component */}
                  <Route element={<GrantOfficeRoute />}>
                    <Route path="/reporting" element={<ReportingPage />} />
                    <Route path="/proposals" element={<ProposalsPage />} />
                    <Route path="/finance" element={<FinancePage />} />
                    <Route path="/applications" element={<ApplicationsPage />} />
                    <Route path="/create-opportunity" element={<CreateOpportunityForm />} />
                    <Route path="/grant-review/:grantId" element={<GrantReviewForm />} />
                    <Route path="/edit-opportunity/:opportunityId" element={<CreateOpportunityForm />} />
                    <Route path="/opportunity-details/:opportunityId" element={<OpportunityDetailsPage />} />
                    <Route path="/ip-management" element={<IntellectualPropertyPage />} />
                    <Route path="/agreements" element={<AgreementsPage />} />
                  </Route>
                  
                  {/* Admin Only Routes - Using the wrapper component */}
                  <Route element={<AdminRoute />}>
                    <Route path="/admin-settings" element={<AdminSettingsPage />} />
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/system-reports" element={<SystemReportsPage />} />
                  </Route>
                </Route>
                
                {/* Catch-all 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Role-based dashboard router 
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) {
    console.log("DashboardRouter - No user found, redirecting to login");
    return <Navigate to="/login" />;
  }
  
  console.log("DashboardRouter - Current user role:", user.role);
  
  switch (user.role) {
    case "researcher":
      console.log("DashboardRouter - Redirecting to researcher dashboard");
      return <Navigate to="/dashboard/researcher" replace />;
    case "grant_office":
      console.log("DashboardRouter - Redirecting to grant office dashboard");
      return <Navigate to="/dashboard/grant-office" replace />;
    case "admin":
      console.log("DashboardRouter - Redirecting to admin dashboard");
      return <Navigate to="/dashboard/admin" replace />;
    default:
      // Fallback to researcher dashboard if role is unknown
      console.log("DashboardRouter - Unknown role, defaulting to researcher dashboard");
      return <Navigate to="/dashboard/researcher" replace />;
  }
};

export default App;
