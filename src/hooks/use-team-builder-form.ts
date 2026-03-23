import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  TeamBuilderSchema,
  teamBuilderDefaultValues,
} from "@/schemas/team-builder";

export function useTeamBuilderForm() {
  return useForm({
    defaultValues: teamBuilderDefaultValues,
    validators: {
      onChange: TeamBuilderSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      console.log("Team created:", value);
      toast.success("Team created!", {
        description: `"${value.projectName}" is ready with ${value.people.length} member${value.people.length !== 1 ? "s" : ""}.`,
      });
    },
  });
}

export type TeamBuilderFormInstance = ReturnType<typeof useTeamBuilderForm>;
