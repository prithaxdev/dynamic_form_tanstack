import { HugeiconsIcon } from "@hugeicons/react";
import { AddCircleIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StepHeader } from "./StepHeader";
import { MemberCard } from "./MemberCard";
import type { TeamBuilderFormInstance } from "@/hooks/use-team-builder-form";

interface TeamSectionProps {
  form: TeamBuilderFormInstance;
}

export function TeamSection({ form }: TeamSectionProps) {
  return (
    <form.Field name="people" mode="array">
      {(field) => (
        <section className="flex flex-col gap-4">
          <StepHeader
            step={2}
            title="Team Members"
            action={
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {field.state.value.length}{" "}
                  {field.state.value.length === 1 ? "person" : "people"}
                </Badge>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => field.pushValue({ name: "", age: 0, email: "" })}
                >
                  <HugeiconsIcon
                    icon={AddCircleIcon}
                    size={14}
                    data-icon="inline-start"
                  />
                  Add Member
                </Button>
              </div>
            }
          />

          <div className="flex flex-col gap-3">
            {field.state.value.map((_, i) => (
              <MemberCard
                key={i}
                form={form}
                index={i}
                canRemove={field.state.value.length > 1}
                onRemove={() => field.removeValue(i)}
              />
            ))}
          </div>
        </section>
      )}
    </form.Field>
  );
}
