
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
}

const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({ form, onSubmit }) => {
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
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button type="submit" className="w-full">
        Save and Continue
      </Button>
    </form>
  );
};

export default ProjectDetailsForm;
