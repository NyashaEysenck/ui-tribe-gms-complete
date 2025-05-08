
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Edit } from "lucide-react";
import { GrantOpportunity } from "@/types/grants";
import { format } from "date-fns";

interface OpportunityHeaderProps {
  opportunity: GrantOpportunity;
  isGrantOfficeUser: boolean;
  onBack: () => void;
  onEdit: () => void;
}

export const OpportunityHeader: React.FC<OpportunityHeaderProps> = ({
  opportunity,
  isGrantOfficeUser,
  onBack,
  onEdit,
}) => {
  const deadlineDate = new Date(opportunity.deadline);
  const isDeadlinePassed = deadlineDate < new Date();
  
  return (
    <div className="mb-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
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
          <Button onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Opportunity
          </Button>
        )}
      </div>
    </div>
  );
};
