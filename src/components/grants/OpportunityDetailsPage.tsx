
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/auth/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { GrantOpportunity } from "@/types/grants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Edit,
  ExternalLink,
  Loader2,
  Users,
  Building,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { validateGrantCategory, validateFundingSource } from "@/utils/typeUtils";

const OpportunityDetailsPage: React.FC = () => {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const [opportunity, setOpportunity] = useState<GrantOpportunity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const isGrantOfficeUser = user?.role === "grant_office" || user?.role === "admin";

  useEffect(() => {
    const fetchOpportunityDetails = async () => {
      if (!opportunityId) {
        setError("No opportunity ID provided");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("grant_opportunities")
          .select("*")
          .eq("id", opportunityId)
          .single();
          
        if (error) throw error;
        
        if (data) {
          // Transform the data to match our GrantOpportunity type
          // Use validation utility functions for enum types
          const opportunityData: GrantOpportunity = {
            id: data.id,
            title: data.title,
            description: data.description,
            fundingAmount: data.funding_amount,
            deadline: data.deadline,
            eligibility: data.eligibility,
            category: validateGrantCategory(data.category),
            fundingSource: validateFundingSource(data.funding_source),
            applicationUrl: data.application_url || "",
            postedBy: data.posted_by,
            postedDate: data.posted_date,
          };
          
          setOpportunity(opportunityData);
        } else {
          setError("Opportunity not found");
        }
      } catch (err: any) {
        console.error("Error fetching opportunity details:", err);
        setError(err.message || "An error occurred while fetching opportunity details");
        toast.error("Failed to load opportunity details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOpportunityDetails();
  }, [opportunityId]);

  const handleApply = () => {
    if (opportunity?.applicationUrl) {
      window.open(opportunity.applicationUrl, "_blank");
    } else {
      navigate("/grant-application", { 
        state: { opportunityId: opportunityId }
      });
    }
  };
  
  const handleEditOpportunity = () => {
    navigate(`/edit-opportunity/${opportunityId}`);
  };
  
  const handleBackToList = () => {
    navigate("/proposals");
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading opportunity details...</p>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
              <p className="text-muted-foreground mb-4">{error || "Opportunity not found"}</p>
              <Button onClick={handleBackToList}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Opportunities
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const deadlineDate = new Date(opportunity.deadline);
  const isDeadlinePassed = deadlineDate < new Date();
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="outline" onClick={handleBackToList} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Opportunities
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{opportunity.title}</h1>
            <div className="flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className={`text-sm ${isDeadlinePassed ? 'text-destructive' : 'text-muted-foreground'}`}>
                {isDeadlinePassed 
                  ? `Deadline Passed: ${format(deadlineDate, "PPP")}` 
                  : `Deadline: ${format(deadlineDate, "PPP")}`}
              </span>
            </div>
          </div>
          
          {isGrantOfficeUser && (
            <Button onClick={handleEditOpportunity}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Opportunity
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{opportunity.description}</p>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{opportunity.eligibility}</p>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Opportunity Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1 flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Funding Amount
                </h3>
                <p className="text-2xl font-bold">${opportunity.fundingAmount.toLocaleString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Funding Source
                </h3>
                <Badge variant={opportunity.fundingSource === "internal" ? "default" : "outline"}>
                  {opportunity.fundingSource === "internal" ? "Internal (University)" : "External"}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Category
                </h3>
                <Badge variant="secondary">
                  {opportunity.category.charAt(0).toUpperCase() + opportunity.category.slice(1)}
                </Badge>
              </div>
              
              {opportunity.postedDate && (
                <div>
                  <h3 className="text-sm font-medium mb-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Posted Date
                  </h3>
                  <p>{format(new Date(opportunity.postedDate), "PPP")}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!isDeadlinePassed && (
                opportunity.applicationUrl ? (
                  <Button className="w-full" onClick={handleApply}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Apply External
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleApply}>
                    Apply Now
                  </Button>
                )
              )}
              
              {isDeadlinePassed && (
                <p className="text-destructive text-center w-full">
                  Application deadline has passed
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailsPage;
