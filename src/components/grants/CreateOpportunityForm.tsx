
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth/useAuth";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GrantOpportunity } from "@/types/grants";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  fundingAmount: z.coerce.number().positive({ message: "Amount must be positive" }),
  deadline: z.date({ required_error: "Deadline is required" }),
  eligibility: z.string().min(10, { message: "Eligibility criteria is required" }),
  category: z.string({ required_error: "Please select a category" }),
  fundingSource: z.enum(["internal", "external"], { required_error: "Please select a funding source" }),
  applicationUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const sendNewOpportunityNotification = async (opportunityId: string, opportunityTitle: string) => {
  try {
    // Create notification in Supabase for all researchers
    await supabase
      .from("notifications")
      .insert({
        user_id: "all", // Special value to indicate all users should see this
        message: `New grant opportunity: ${opportunityTitle}`,
        type: "opportunity",
        is_read: false,
        related_id: opportunityId,
        related_type: "opportunity"
      });
    
    toast.success("Notification sent to all researchers about the new opportunity!");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

const CreateOpportunityForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { opportunityId } = useParams();
  const isEditMode = !!opportunityId;
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      fundingAmount: undefined,
      eligibility: "",
      category: "",
      fundingSource: "internal",
      applicationUrl: "",
    },
  });

  // Fetch opportunity data if in edit mode
  useEffect(() => {
    const fetchOpportunityData = async () => {
      if (isEditMode && opportunityId) {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from("grant_opportunities")
            .select("*")
            .eq("id", opportunityId)
            .single();
          
          if (error) throw error;
          
          if (data) {
            // Transform data for the form
            form.reset({
              title: data.title || "",
              description: data.description || "",
              fundingAmount: data.funding_amount,
              deadline: data.deadline ? new Date(data.deadline) : new Date(),
              eligibility: data.eligibility || "",
              category: data.category || "",
              fundingSource: data.funding_source as "internal" | "external",
              applicationUrl: data.application_url || "",
            });
          }
        } catch (error: any) {
          console.error("Error fetching opportunity data:", error);
          toast.error("Failed to load opportunity data: " + error.message);
          // Redirect back to proposals page if opportunity not found
          navigate("/proposals");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchOpportunityData();
  }, [opportunityId, isEditMode, form, navigate]);

  const onSubmit = async (data: FormValues) => {
    if (!user) return;
    
    try {
      const formData = {
        title: data.title,
        description: data.description,
        funding_amount: data.fundingAmount,
        deadline: data.deadline.toISOString(),
        eligibility: data.eligibility,
        category: data.category,
        funding_source: data.fundingSource,
        application_url: data.applicationUrl || null,
      };
      
      let response;
      
      if (isEditMode && opportunityId) {
        // Update existing opportunity
        response = await supabase
          .from("grant_opportunities")
          .update(formData)
          .eq("id", opportunityId)
          .select();
        
        if (response.error) throw response.error;
        toast.success("Opportunity updated successfully!");
      } else {
        // Create new opportunity
        response = await supabase
          .from("grant_opportunities")
          .insert({
            ...formData,
            posted_by: user.id,
          })
          .select()
          .single();
        
        if (response.error) throw response.error;
        
        // Send notification about the new opportunity
        if (response.data) {
          await sendNewOpportunityNotification(response.data.id, response.data.title);
        }
        
        toast.success("Opportunity created successfully!");
      }

      navigate("/proposals");
    } catch (error: any) {
      console.error("Error saving opportunity:", error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} opportunity: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <p>Loading opportunity data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{isEditMode ? "Edit" : "Create New"} Opportunity</h1>
          <p className="text-muted-foreground">
            {isEditMode ? "Update" : "Create a new"} funding opportunity for researchers
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter opportunity title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fundingAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Funding Amount ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="25000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Application Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="research">Research Grant</SelectItem>
                          <SelectItem value="fellowship">Fellowship</SelectItem>
                          <SelectItem value="scholarship">Scholarship</SelectItem>
                          <SelectItem value="conference">Conference Funding</SelectItem>
                          <SelectItem value="travel">Travel Grant</SelectItem>
                          <SelectItem value="equipment">Equipment Grant</SelectItem>
                          <SelectItem value="innovation">Innovation Fund</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fundingSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Funding Source</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select funding source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="internal">Internal (University)</SelectItem>
                          <SelectItem value="external">External</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>External Application URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="eligibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eligibility Criteria</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe who is eligible to apply for this opportunity"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of the opportunity"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/proposals")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 
                    (isEditMode ? "Updating..." : "Creating...") : 
                    (isEditMode ? "Update Opportunity" : "Create Opportunity")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

// Export the notification sender function for use in other components
export { sendNewOpportunityNotification };

// Add default export for the component
export default CreateOpportunityForm;
