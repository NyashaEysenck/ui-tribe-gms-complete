
import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Info, Building, Users, ExternalLink } from "lucide-react";
import { GrantCategory, FundingSource } from "@/types/grants";

interface OpportunitySidebarProps {
  fundingAmount: number;
  fundingSource: FundingSource;
  category: GrantCategory;
  postedDate?: string;
  deadline: string;
  applicationUrl?: string;
  onApply: () => void;
}

export const OpportunitySidebar: React.FC<OpportunitySidebarProps> = ({
  fundingAmount,
  fundingSource,
  category,
  postedDate,
  deadline,
  applicationUrl,
  onApply,
}) => {
  const deadlineDate = new Date(deadline);
  const isDeadlinePassed = deadlineDate < new Date();
  
  return (
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
          <p className="text-2xl font-bold">${fundingAmount.toLocaleString()}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1 flex items-center">
            <Building className="h-4 w-4 mr-2" />
            Funding Source
          </h3>
          <Badge variant={fundingSource === "internal" ? "default" : "outline"}>
            {fundingSource === "internal" ? "Internal (University)" : "External"}
          </Badge>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Category
          </h3>
          <Badge variant="secondary">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        </div>
        
        {postedDate && (
          <div>
            <h3 className="text-sm font-medium mb-1 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Posted Date
            </h3>
            <p>{format(new Date(postedDate), "PPP")}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isDeadlinePassed && (
          applicationUrl ? (
            <Button className="w-full" onClick={onApply}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Apply External
            </Button>
          ) : (
            <Button className="w-full" onClick={onApply}>
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
  );
};
