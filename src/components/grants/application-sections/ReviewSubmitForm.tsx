
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface ReviewSubmitFormProps {
  basicInfo: any;
  projectDetails: any;
  budget: any;
  team: any;
  onSubmit: () => void;
}

const ReviewSubmitForm: React.FC<ReviewSubmitFormProps> = ({
  basicInfo,
  projectDetails,
  budget,
  team,
  onSubmit,
}) => {
  const categoryLabels: Record<string, string> = {
    research: "Research",
    education: "Education",
    community: "Community",
    infrastructure: "Infrastructure",
    innovation: "Innovation",
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Review Your Application</h2>
        <p className="text-muted-foreground">
          Please review all information before submitting your grant application.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Project Title</h3>
              <p className="mt-1">{basicInfo.title}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
              <p className="mt-1">{categoryLabels[basicInfo.category] || basicInfo.category}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
              <p className="mt-1">{basicInfo.startDate ? format(basicInfo.startDate, "PPP") : "Not set"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
              <p className="mt-1">{basicInfo.endDate ? format(basicInfo.endDate, "PPP") : "Not set"}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Project Summary</h3>
            <p className="mt-1 whitespace-pre-line">{basicInfo.summary}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Objectives</h3>
            <p className="mt-1 whitespace-pre-line">{projectDetails.objectives}</p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Methodology</h3>
            <p className="mt-1 whitespace-pre-line">{projectDetails.methodology}</p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Expected Outcomes</h3>
            <p className="mt-1 whitespace-pre-line">{projectDetails.expectedOutcomes}</p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
            <p className="mt-1 whitespace-pre-line">{projectDetails.timeline}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Personnel</h3>
              <p className="mt-1">${budget.personnel.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Equipment</h3>
              <p className="mt-1">${budget.equipment.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Travel</h3>
              <p className="mt-1">${budget.travel.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Materials</h3>
              <p className="mt-1">${budget.materials.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Other Costs</h3>
              <p className="mt-1">${budget.other.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground font-bold">Total Amount</h3>
              <p className="mt-1 font-bold">${budget.totalAmount.toLocaleString()}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Budget Justification</h3>
            <p className="mt-1 whitespace-pre-line">{budget.justification}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {team.members.map((member: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-4 pb-4 border-b last:border-0">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="mt-1">{member.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                  <p className="mt-1">{member.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Expertise</h3>
                  <p className="mt-1">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <p className="text-center text-sm text-muted-foreground">
          By submitting this application, you confirm that all information provided is accurate 
          and complete to the best of your knowledge.
        </p>
        <div className="flex justify-center">
          <Button onClick={onSubmit} size="lg">
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmitForm;
