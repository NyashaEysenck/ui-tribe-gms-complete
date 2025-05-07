import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicInfoForm from "./application-sections/BasicInfoForm";
import BudgetForm from "./application-sections/BudgetForm";
import ProjectDetailsForm from "./application-sections/ProjectDetailsForm";
import TeamMembersForm from "./application-sections/TeamMembersForm";
import ReviewSubmitForm from "./application-sections/ReviewSubmitForm";
import { useAuth } from "@/contexts/AuthContext";
import { useGrantsData } from "@/hooks/useGrantsData";
import { GrantStatus, GrantCategory } from "@/types/grants"; // Import both GrantStatus and GrantCategory types

// Define schemas for each section
const basicInfoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  startDate: z.date(),
  endDate: z.date(),
  category: z.string().min(1, "Please select a category"),
  summary: z.string().min(20, "Summary must be at least 20 characters"),
});

const projectDetailsSchema = z.object({
  objectives: z.string().min(20, "Objectives must be at least 20 characters"),
  methodology: z.string().min(20, "Methodology must be at least 20 characters"),
  expectedOutcomes: z.string().min(20, "Expected outcomes must be at least 20 characters"),
  timeline: z.string().min(20, "Timeline must be at least 20 characters"),
});

const budgetSchema = z.object({
  totalAmount: z.number().min(1, "Total amount is required"),
  personnel: z.number().min(0),
  equipment: z.number().min(0),
  travel: z.number().min(0),
  materials: z.number().min(0),
  other: z.number().min(0),
  justification: z.string().min(20, "Budget justification must be at least 20 characters"),
});

const teamMembersSchema = z.object({
  members: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      role: z.string().min(1, "Role is required"),
      expertise: z.string().min(1, "Expertise is required"),
    })
  ).min(1, "At least one team member is required"),
});

const GrantApplicationForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submitGrantApplication } = useGrantsData();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({
    "basic-info": false,
    "project-details": false,
    "budget": false,
    "team": false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create forms for each section
  const basicInfoForm = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: "",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
      category: "",
      summary: "",
    },
  });

  const projectDetailsForm = useForm({
    resolver: zodResolver(projectDetailsSchema),
    defaultValues: {
      objectives: "",
      methodology: "",
      expectedOutcomes: "",
      timeline: "",
    },
  });

  const budgetForm = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      totalAmount: 0,
      personnel: 0,
      equipment: 0,
      travel: 0,
      materials: 0,
      other: 0,
      justification: "",
    },
  });

  const teamMembersForm = useForm({
    resolver: zodResolver(teamMembersSchema),
    defaultValues: {
      members: [{ name: user?.name || "", role: "Principal Investigator", expertise: "" }],
    },
  });

  const handleTabChange = (value: string) => {
    // Check if previous sections are completed before allowing tab change
    const tabOrder = ["basic-info", "project-details", "budget", "team", "review"];
    const targetIndex = tabOrder.indexOf(value);
    const currentIndex = tabOrder.indexOf(activeTab);

    // Allow moving back to previous tabs
    if (targetIndex <= currentIndex) {
      setActiveTab(value);
      return;
    }

    // Check if user can proceed to next section
    const canProceed = tabOrder.slice(0, targetIndex).every(tab => 
      completedSections[tab] || tab === "review"
    );

    if (canProceed) {
      setActiveTab(value);
    } else {
      toast.error("Please complete all required fields before proceeding");
    }
  };

  const completeSection = (section: string) => {
    setCompletedSections(prev => ({ ...prev, [section]: true }));
    
    // Advance to next tab
    const tabOrder = ["basic-info", "project-details", "budget", "team", "review"];
    const currentIndex = tabOrder.indexOf(section);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const handleBasicInfoSubmit = (data: any) => {
    console.log("Basic Info:", data);
    completeSection("basic-info");
  };

  const handleProjectDetailsSubmit = (data: any) => {
    console.log("Project Details:", data);
    completeSection("project-details");
  };

  const handleBudgetSubmit = (data: any) => {
    console.log("Budget:", data);
    completeSection("budget");
  };

  const handleTeamSubmit = (data: any) => {
    console.log("Team:", data);
    completeSection("team");
  };

  const handleSubmitApplication = async () => {
    try {
      setIsSubmitting(true);
      
      // Combine all form data
      const applicationData = {
        ...basicInfoForm.getValues(),
        ...projectDetailsForm.getValues(),
        ...budgetForm.getValues(),
        ...teamMembersForm.getValues(),
        // Map to expected format for the API
        title: basicInfoForm.getValues().title,
        description: basicInfoForm.getValues().summary,
        amount: budgetForm.getValues().totalAmount,
        category: basicInfoForm.getValues().category as GrantCategory, // Cast string to GrantCategory type
        fundingSource: "internal", // Default to internal funding for now
        startDate: basicInfoForm.getValues().startDate.toISOString(),
        endDate: basicInfoForm.getValues().endDate.toISOString(),
        status: "submitted" as GrantStatus // Cast string to GrantStatus type
      };

      console.log("Full application data:", applicationData);
      
      // Submit the application data to the database
      const result = await submitGrantApplication(applicationData);
      
      if (result) {
        toast.success("Application submitted successfully");
        navigate("/my-grants");
      } else {
        toast.error("Error submitting application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if a particular section can be accessed
  const canAccessSection = (section: string) => {
    const tabOrder = ["basic-info", "project-details", "budget", "team", "review"];
    const sectionIndex = tabOrder.indexOf(section);
    const currentIndex = tabOrder.indexOf(activeTab);

    // Can always access current or previous sections
    if (sectionIndex <= currentIndex) return true;

    // For next sections, check if all previous are completed
    return tabOrder.slice(0, sectionIndex).every(tab => completedSections[tab]);
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Grant Application Form</CardTitle>
          <CardDescription>
            Complete all sections to submit your grant application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger 
                value="basic-info"
                className="flex flex-col gap-1 py-2"
                aria-disabled={!canAccessSection("basic-info")}
              >
                <span className="font-medium">1</span>
                <span className="text-xs">Basic Info</span>
                {completedSections["basic-info"] && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="project-details"
                className="flex flex-col gap-1 py-2"
                aria-disabled={!canAccessSection("project-details")}
                disabled={!canAccessSection("project-details")}
              >
                <span className="font-medium">2</span>
                <span className="text-xs">Project Details</span>
                {completedSections["project-details"] && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="budget" 
                className="flex flex-col gap-1 py-2"
                aria-disabled={!canAccessSection("budget")}
                disabled={!canAccessSection("budget")}
              >
                <span className="font-medium">3</span>
                <span className="text-xs">Budget</span>
                {completedSections["budget"] && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="flex flex-col gap-1 py-2"
                aria-disabled={!canAccessSection("team")}
                disabled={!canAccessSection("team")}
              >
                <span className="font-medium">4</span>
                <span className="text-xs">Team</span>
                {completedSections["team"] && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="review" 
                className="flex flex-col gap-1 py-2"
                aria-disabled={!canAccessSection("review")}
                disabled={!canAccessSection("review")}
              >
                <span className="font-medium">5</span>
                <span className="text-xs">Review</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="basic-info">
                <BasicInfoForm form={basicInfoForm} onSubmit={handleBasicInfoSubmit} />
              </TabsContent>
              
              <TabsContent value="project-details">
                <ProjectDetailsForm 
                  form={projectDetailsForm} 
                  onSubmit={handleProjectDetailsSubmit} 
                  isActive={completedSections["basic-info"]}
                />
              </TabsContent>
              
              <TabsContent value="budget">
                <BudgetForm form={budgetForm} onSubmit={handleBudgetSubmit} />
              </TabsContent>
              
              <TabsContent value="team">
                <TeamMembersForm form={teamMembersForm} onSubmit={handleTeamSubmit} />
              </TabsContent>
              
              <TabsContent value="review">
                <ReviewSubmitForm 
                  basicInfo={basicInfoForm.getValues()}
                  projectDetails={projectDetailsForm.getValues()}
                  budget={budgetForm.getValues()}
                  team={teamMembersForm.getValues()}
                  onSubmit={handleSubmitApplication}
                />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <div className="flex gap-2">
            {activeTab !== "basic-info" && (
              <Button
                variant="outline"
                onClick={() => {
                  const tabOrder = ["basic-info", "project-details", "budget", "team", "review"];
                  const currentIndex = tabOrder.indexOf(activeTab);
                  setActiveTab(tabOrder[currentIndex - 1]);
                }}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            
            {activeTab !== "review" ? (
              <Button
                onClick={() => {
                  switch (activeTab) {
                    case "basic-info":
                      basicInfoForm.handleSubmit(handleBasicInfoSubmit)();
                      break;
                    case "project-details":
                      projectDetailsForm.handleSubmit(handleProjectDetailsSubmit)();
                      break;
                    case "budget":
                      budgetForm.handleSubmit(handleBudgetSubmit)();
                      break;
                    case "team":
                      teamMembersForm.handleSubmit(handleTeamSubmit)();
                      break;
                  }
                }}
                disabled={isSubmitting}
              >
                Save and Continue
              </Button>
            ) : (
              <Button onClick={handleSubmitApplication} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GrantApplicationForm;
