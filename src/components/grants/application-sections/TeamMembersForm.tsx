
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";

interface TeamMembersFormProps {
  form: any;
  onSubmit: (values: any) => void;
}

const TeamMembersForm: React.FC<TeamMembersFormProps> = ({ form, onSubmit }) => {
  const { fields, append, remove } = useFieldArray({
    name: "members",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Project Team Members</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ name: "", role: "", expertise: "" })}
            >
              Add Team Member
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">
                  {index === 0 ? "Principal Investigator" : `Team Member ${index}`}
                </h4>
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name={`members.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`members.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Principal Investigator">
                            Principal Investigator
                          </SelectItem>
                          <SelectItem value="Co-Investigator">
                            Co-Investigator
                          </SelectItem>
                          <SelectItem value="Research Assistant">
                            Research Assistant
                          </SelectItem>
                          <SelectItem value="Project Manager">
                            Project Manager
                          </SelectItem>
                          <SelectItem value="Technical Specialist">
                            Technical Specialist
                          </SelectItem>
                          <SelectItem value="Consultant">
                            Consultant
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`members.${index}.expertise`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expertise</FormLabel>
                      <FormControl>
                        <Input placeholder="Area of expertise" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full">
          Save and Continue
        </Button>
      </form>
    </Form>
  );
};

export default TeamMembersForm;
