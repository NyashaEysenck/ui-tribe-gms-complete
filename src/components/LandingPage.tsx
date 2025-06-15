
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, DollarSign, FileText, BarChart3, Users, CheckCircle2, Search, Award, TrendingUp, Shield, Clock, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { getAssetPath } from "@/lib/assetUtils";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 text-white" style={{ backgroundColor: '#761420' }}>
        <div className="au-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="max-w-3xl">
              <img 
                src={getAssetPath("/lovable-uploads/bddbc08a-a185-4878-85ac-a3c91e22fce5.png")} 
                alt="ThinkGrants" 
                className="h-32 mb-6"
              />
              
              {/* Tagline below logo */}
              <div className="mb-6">
                <p className="text-lg md:text-xl font-medium text-white/90 tracking-wide">
                  🌐 ThinkGrants: Empowering Research • Fueling Innovation
                </p>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Full-Lifecycle Grants Management System
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Streamline your entire grants journey from discovery to final reporting. Supporting researchers, grants managers, and administrators with secure, role-based access.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="white" className="bg-white text-thinkgrants-maroon hover:bg-white/90">
                  <Link to="/login">Start Application</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                  <Link to="/opportunities">Browse Opportunities</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Core System Modules */}
      <section className="py-16">
        <div className="au-container">
          <h2 className="text-3xl font-bold text-center mb-4">Core System Modules</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-thinkgrants-gray-600">
            ThinkGrants supports the complete grant lifecycle with distinct phases for maximum efficiency and compliance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModuleCard 
              icon={<Search className="h-8 w-8 text-blue-600" />}
              phase="🔵 Application Phase"
              title="Pre-Award Discovery"
              description="Discover opportunities, submit applications, and track submissions with automated notifications and funder requirement displays."
              features={["Grant Opportunities Listing", "Call Notifications", "Application Submission", "Requirements Display"]}
            />
            <ModuleCard 
              icon={<FileCheck className="h-8 w-8 text-green-600" />}
              phase="🟢 Review Phase"
              title="Pre-Award Evaluation"
              description="Structured evaluation process with workflow management, reviewer assignments, and real-time status tracking."
              features={["Review Workflow", "Status Tracking", "Reviewer Assignment", "Assessment Criteria"]}
            />
            <ModuleCard 
              icon={<Award className="h-8 w-8 text-yellow-600" />}
              phase="🟡 Award Phase"
              title="Funding Confirmation"
              description="Manage the transition from pre-award to post-award with notifications, assessments, and contract management."
              features={["Award Notifications", "Pre-Award Assessment", "Contract Management", "MOU Signing"]}
            />
            <ModuleCard 
              icon={<TrendingUp className="h-8 w-8 text-blue-600" />}
              phase="🔵 Project Tracking"
              title="Post-Award Monitoring"
              description="Monitor project execution, track milestones, manage deliverables, and handle IP reporting."
              features={["Progress Reports", "Milestone Tracking", "Deliverables Management", "IP Reports"]}
            />
            <ModuleCard 
              icon={<BarChart3 className="h-8 w-8 text-purple-600" />}
              phase="🟣 Project Reports"
              title="Final Post-Award"
              description="Ensure accountability with budget reports, performance tracking, M&E assessments, and claims processing."
              features={["Budget Reports", "Performance Reports", "M&E Reports", "Claims & Reimbursements"]}
            />
            <ModuleCard 
              icon={<Shield className="h-8 w-8 text-thinkgrants-maroon" />}
              phase="Cross-Cutting"
              title="System Foundation"
              description="Authentication, document management, notifications, analytics, and audit trails across all phases."
              features={["RBAC Security", "Document Management", "Notifications", "Analytics Dashboard"]}
            />
          </div>
        </div>
      </section>

      {/* Grant Categories */}
      <section className="py-16 bg-thinkgrants-gray-100">
        <div className="au-container">
          <h2 className="text-3xl font-bold text-center mb-12">Grant Categories Supported</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            <CategoryCard title="ORI Grants" icon="🔬" />
            <CategoryCard title="External Funding" icon="🌍" />
            <CategoryCard title="Government" icon="🏛️" />
            <CategoryCard title="Fellowships" icon="🎓" />
            <CategoryCard title="Scholarships" icon="📚" />
            <CategoryCard title="Travel/Conference" icon="✈️" />
            <CategoryCard title="Industry Design" icon="🏭" />
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-16">
        <div className="au-container">
          <h2 className="text-3xl font-bold text-center mb-12">Role-Based Access Control</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RoleCard
              title="Researcher"
              icon={<Users className="h-8 w-8 text-blue-600" />}
              responsibilities={[
                "Search and view grant opportunities",
                "Create and submit applications",
                "Track application status",
                "Submit project reports",
                "Manage personal profile"
              ]}
            />
            <RoleCard
              title="Grants Manager"
              icon={<FileText className="h-8 w-8 text-green-600" />}
              responsibilities={[
                "Create and publish grant calls",
                "Manage applications and reviewers",
                "Monitor review progress",
                "Facilitate award notifications",
                "Generate reports and analytics"
              ]}
            />
            <RoleCard
              title="Admin (Technical)"
              icon={<Shield className="h-8 w-8 text-purple-600" />}
              responsibilities={[
                "Manage all user accounts",
                "Configure system settings",
                "Oversee security and audit logs",
                "Troubleshoot system issues",
                "Maintain database integrity"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-thinkgrants-gray-100">
        <div className="au-container">
          <h2 className="text-3xl font-bold text-center mb-12">Cross-Cutting Functionalities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-thinkgrants-maroon" />}
              title="Secure Authentication"
              description="Role-based access control with secure login, password management, and user profile management."
            />
            <FeatureCard 
              icon={<FileText className="h-8 w-8 text-thinkgrants-maroon" />}
              title="Document Management"
              description="Centralized storage with versioning, search capabilities, and secure file handling."
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-thinkgrants-maroon" />}
              title="Smart Notifications"
              description="Automated emails and in-app alerts for status changes, deadlines, and new opportunities."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8 text-thinkgrants-maroon" />}
              title="Analytics & Reports"
              description="Customizable dashboards and comprehensive reporting across all grant activities."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-thinkgrants-maroon text-white">
        <div className="au-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Grants Process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the comprehensive ThinkGrants platform and experience streamlined grant management from discovery to completion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="white" className="bg-white text-thinkgrants-maroon hover:bg-white/90">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-thinkgrants-gray-900 text-white/80">
        <div className="au-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ThinkGrants</h3>
              <p>Full-lifecycle grants management platform empowering research and innovation.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">For Researchers</h3>
              <ul className="space-y-2">
                <li><Link to="/opportunities" className="hover:text-white">Find Opportunities</Link></li>
                <li><Link to="/login" className="hover:text-white">Submit Application</Link></li>
                <li><Link to="/my-grants" className="hover:text-white">Track Progress</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">For Managers</h3>
              <ul className="space-y-2">
                <li><Link to="/create-opportunity" className="hover:text-white">Create Grants</Link></li>
                <li><Link to="/applications" className="hover:text-white">Review Applications</Link></li>
                <li><Link to="/reporting" className="hover:text-white">Generate Reports</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">User Guide</a></li>
                <li><a href="#" className="hover:text-white">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p>© {new Date().getFullYear()} ThinkGrants - Full-Lifecycle Grants Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ModuleCard: React.FC<{
  icon: React.ReactNode;
  phase: string;
  title: string;
  description: string;
  features: string[];
}> = ({ icon, phase, title, description, features }) => {
  return (
    <Card className="card-hover h-full">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <div className="text-sm font-medium text-muted-foreground mb-2">{phase}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">{description}</p>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-xs text-muted-foreground flex items-start">
              <CheckCircle2 className="h-3 w-3 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const CategoryCard: React.FC<{
  title: string;
  icon: string;
}> = ({ title, icon }) => {
  return (
    <Card className="card-hover text-center p-4">
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm font-medium">{title}</p>
    </Card>
  );
};

const RoleCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  responsibilities: string[];
}> = ({ title, icon, responsibilities }) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="text-sm flex items-start">
              <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              {responsibility}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
