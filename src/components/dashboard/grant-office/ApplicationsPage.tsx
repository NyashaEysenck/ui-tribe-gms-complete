
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { File, Filter, Search, Loader2 } from "lucide-react";
import { Grant, GrantStatus } from "@/types/grants";
import { useGrantsData } from "@/hooks/useGrantsData";
import { toast } from "sonner";

const statusColors: Record<GrantStatus, string> = {
  draft: "bg-slate-50 text-slate-700 border-slate-200",
  submitted: "bg-blue-50 text-blue-700 border-blue-200",
  under_review: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  modifications_requested: "bg-orange-50 text-orange-700 border-orange-200",
  active: "bg-violet-50 text-violet-700 border-violet-200",
  completed: "bg-teal-50 text-teal-700 border-teal-200"
};

const ApplicationsPage: React.FC = () => {
  const { grants, loading, fetchGrants, reviewGrantApplication } = useGrantsData();
  const [searchQuery, setSearchQuery] = useState("");
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrants();
  }, [fetchGrants]);

  const handleReviewApplication = (grantId: string) => {
    navigate(`/grant-review/${grantId}`);
  };

  const handleViewApplication = (grantId: string) => {
    navigate(`/grant-details/${grantId}`);
  };

  const handleQuickApproval = async (grantId: string) => {
    try {
      setProcessingIds(prev => [...prev, grantId]);
      const success = await reviewGrantApplication(
        grantId, 
        'approved', 
        'Application approved through quick action'
      );
      
      if (success) {
        toast.success("Application approved successfully");
        fetchGrants();
      }
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error("Failed to approve application");
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== grantId));
    }
  };

  const filteredApplications = grants.filter(app => 
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.researcherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusLabel = (status: GrantStatus): string => {
    return status.replace(/_/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getApplicationsForTab = (tab: string): Grant[] => {
    switch (tab) {
      case "review":
        return filteredApplications.filter(app => 
          ["submitted", "under_review"].includes(app.status));
      case "approved":
        return filteredApplications.filter(app => 
          ["approved", "active"].includes(app.status));
      case "rejected":
        return filteredApplications.filter(app => 
          ["rejected", "modifications_requested"].includes(app.status));
      default:
        return filteredApplications;
    }
  };

  // Add a safe formatter function to handle potentially undefined values
  const safeFormatNumber = (value: number | undefined | null) => {
    if (value === undefined || value === null) {
      return "$0";
    }
    return `$${value.toLocaleString()}`;
  };

  // Format date safely
  const safeFormatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Grant Applications</h1>
        <div className="flex gap-2">
          <div className="relative w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search applications..." 
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="review" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="review">Needs Review ({getApplicationsForTab("review").length})</TabsTrigger>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {["review", "all", "approved", "rejected"].map(tab => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab === "review" && "Applications Pending Review"}
                  {tab === "all" && "All Grant Applications"}
                  {tab === "approved" && "Approved Applications"}
                  {tab === "rejected" && "Rejected Applications"}
                </CardTitle>
                <CardDescription>
                  {tab === "review" && "Grant applications awaiting review and decision"}
                  {tab === "all" && "Complete list of all grant applications"}
                  {tab === "approved" && "Grant applications that have been approved"}
                  {tab === "rejected" && "Grant applications that have been rejected"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-4">Project</div>
                    <div className="col-span-2">Researcher</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-2">Submitted</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  
                  {getApplicationsForTab(tab).length > 0 ? (
                    getApplicationsForTab(tab).map((app) => (
                      <div 
                        key={app.id}
                        className="grid grid-cols-12 p-3 text-sm border-t hover:bg-muted/50 transition-colors"
                      >
                        <div className="col-span-4 font-medium flex items-center gap-2">
                          <File className="h-4 w-4 text-[#cf2e2e]" />
                          <div>
                            <div className="font-medium">{app.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {app.department || "No Department"} • {app.category.charAt(0).toUpperCase() + app.category.slice(1)}
                              <Badge 
                                variant="outline" 
                                className={`ml-2 ${statusColors[app.status]}`}
                              >
                                {getStatusLabel(app.status)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="" />
                            <AvatarFallback>
                              {app.researcherName ? app.researcherName.charAt(0) : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{app.researcherName || "Unknown"}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          {safeFormatNumber(app.amount)}
                        </div>
                        <div className="col-span-2 flex items-center">
                          {safeFormatDate(app.submittedDate)}
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-1">
                            {(tab === "review" || app.status === "submitted" || app.status === "under_review") ? (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleReviewApplication(app.id)}
                                  className="whitespace-nowrap"
                                >
                                  Review Details
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleQuickApproval(app.id)}
                                  disabled={processingIds.includes(app.id)}
                                  className="whitespace-nowrap"
                                >
                                  {processingIds.includes(app.id) ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    "Quick Approve"
                                  )}
                                </Button>
                              </>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewApplication(app.id)}
                              >
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-3 mb-4">
                        <File className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        {tab === "review" && "No Applications Pending Review"}
                        {tab === "all" && "No Applications Found"}
                        {tab === "approved" && "No Approved Applications"}
                        {tab === "rejected" && "No Rejected Applications"}
                      </h3>
                      <p className="text-center text-muted-foreground">
                        {tab === "review" && "There are no grant applications awaiting review at this time."}
                        {tab === "all" && "There are no grant applications in the system."}
                        {tab === "approved" && "There are no approved grant applications at this time."}
                        {tab === "rejected" && "There are no rejected grant applications at this time."}
                      </p>
                    </div>
                  )}
                </div>
                {getApplicationsForTab(tab).length > 0 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing <strong>1-{getApplicationsForTab(tab).length}</strong> of <strong>{getApplicationsForTab(tab).length}</strong> applications
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ApplicationsPage;
