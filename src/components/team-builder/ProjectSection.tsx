import { HugeiconsIcon } from "@hugeicons/react";
import {
  Folder01Icon,
  CheckmarkCircle01Icon,
  CancelCircleIcon,
} from "@hugeicons/core-free-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FieldError } from "./FieldError";
import { StepHeader } from "./StepHeader";
import type { TeamBuilderFormInstance } from "@/hooks/use-team-builder-form";

interface ProjectSectionProps {
  form: TeamBuilderFormInstance;
}

export function ProjectSection({ form }: ProjectSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <StepHeader step={1} title="Project Details" />

      <Card>
        <CardContent className="px-4 py-4">
          <form.Field name="projectName">
            {({ state, handleChange }) => {
              const hasValue = state.value.length > 0;
              const isValid =
                state.meta.isTouched && state.meta.errors.length === 0 && hasValue;
              const isInvalid =
                state.meta.isTouched && state.meta.errors.length > 0;

              return (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="projectName">Project Name</Label>
                  <div className="relative">
                    <HugeiconsIcon
                      icon={Folder01Icon}
                      size={14}
                      className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      id="projectName"
                      type="text"
                      aria-invalid={isInvalid ? true : undefined}
                      aria-describedby={isInvalid ? "projectName-error" : undefined}
                      className={cn(
                        "pl-8 pr-8",
                        isValid && "border-green-600/60 focus-visible:border-green-600/60 focus-visible:ring-green-600/20"
                      )}
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      placeholder="e.g. Apollo, Orion, Nova..."
                    />
                    {isValid && (
                      <HugeiconsIcon
                        icon={CheckmarkCircle01Icon}
                        size={14}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-green-600"
                      />
                    )}
                    {isInvalid && (
                      <HugeiconsIcon
                        icon={CancelCircleIcon}
                        size={14}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-destructive"
                      />
                    )}
                  </div>
                  <FieldError
                    id="projectName-error"
                    errors={state.meta.errors as { message?: string }[]}
                    isTouched={state.meta.isTouched}
                  />
                </div>
              );
            }}
          </form.Field>
        </CardContent>
      </Card>
    </section>
  );
}
