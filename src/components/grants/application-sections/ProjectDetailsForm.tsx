
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface ProjectDetailsFormProps {
  form: any;
  onSubmit: (values: any) => void;
  isActive: boolean;
}

const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({ form, onSubmit, isActive }) => {
  if (!isActive) {
    return (
      <div className="border rounded-lg p-4 bg-muted/30">
        <h3 className="text-lg font-medium text-center mb-2">Project Details</h3>
        <p className="text-sm text-muted-foreground text-center">
          Complete the previous sections to unlock this part of the application.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="objectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Objectives</FormLabel>
              <FormDescription>
                Define clear, measurable objectives for your project.
              </FormDescription>
              <FormControl>
                <Textarea 
                  placeholder="List the main objectives of your project" 
                  className="min-h-24"
                  error={!!form.formState.errors.objectives}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="methodology"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Methodology</FormLabel>
              <FormDescription>
                Describe the methods you will use to achieve your objectives.
              </FormDescription>
              <FormControl>
                <Textarea 
                  placeholder="Explain your approach and methodologies" 
                  className="min-h-24"
                  error={!!form.formState.errors.methodology}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expectedOutcomes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Outcomes</FormLabel>
              <FormDescription>
                What results do you expect from this project?
              </FormDescription>
              <FormControl>
                <Textarea 
                  placeholder="Describe the anticipated outcomes and impacts" 
                  className="min-h-24"
                  error={!!form.formState.errors.expectedOutcomes}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Timeline</FormLabel>
              <FormDescription>
                Provide a timeline of key milestones.
              </FormDescription>
              <FormControl>
                <Textarea 
                  placeholder="Outline the timeline for implementing your project" 
                  className="min-h-24"
                  error={!!form.formState.errors.timeline}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="min-w-[120px]">
          Save and Continue
        </Button>
      </div>
    </form>
  );
};

export default ProjectDetailsForm;
