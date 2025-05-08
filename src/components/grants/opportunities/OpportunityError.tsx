
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface OpportunityErrorProps {
  error: string | null;
  onBack: () => void;
}

export const OpportunityError: React.FC<OpportunityErrorProps> = ({ error, onBack }) => {
  return (
    <div className="p-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
            <p className="text-muted-foreground mb-4">{error || "Opportunity not found"}</p>
            <Button onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Opportunities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
