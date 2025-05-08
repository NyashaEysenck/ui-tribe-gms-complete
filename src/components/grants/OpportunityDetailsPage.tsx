
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/auth/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { GrantOpportunity } from "@/types/grants";
import { toast } from "sonner";
import { validateGrantCategory, validateFundingSource } from "@/utils/typeUtils";
import { OpportunityHeader } from "./opportunities/OpportunityHeader";
import { OpportunityDescription } from "./opportunities/OpportunityDescription";
import { OpportunitySidebar } from "./opportunities/OpportunitySidebar";
import { OpportunityLoading } from "./opportunities/OpportunityLoading";
import { OpportunityError } from "./opportunities/OpportunityError";

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
    return <OpportunityLoading />;
  }

  if (error || !opportunity) {
    return <OpportunityError error={error} onBack={handleBackToList} />;
  }
  
  return (
    <div className="container mx-auto p-6">
      <OpportunityHeader 
        opportunity={opportunity}
        isGrantOfficeUser={isGrantOfficeUser}
        onBack={handleBackToList}
        onEdit={handleEditOpportunity}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <OpportunityDescription 
            description={opportunity.description}
            eligibility={opportunity.eligibility}
          />
        </div>
        
        <div>
          <OpportunitySidebar 
            fundingAmount={opportunity.fundingAmount}
            fundingSource={opportunity.fundingSource}
            category={opportunity.category}
            postedDate={opportunity.postedDate}
            deadline={opportunity.deadline}
            applicationUrl={opportunity.applicationUrl}
            onApply={handleApply}
          />
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailsPage;
