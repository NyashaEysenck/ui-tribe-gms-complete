
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OpportunityDescriptionProps {
  description: string;
  eligibility: string;
}

export const OpportunityDescription: React.FC<OpportunityDescriptionProps> = ({
  description,
  eligibility,
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{description}</p>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Eligibility Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{eligibility}</p>
        </CardContent>
      </Card>
    </>
  );
};
