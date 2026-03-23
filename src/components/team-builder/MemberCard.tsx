import { HugeiconsIcon } from "@hugeicons/react";
import {
  User02Icon,
  HashtagIcon,
  Mail01Icon,
  Delete01Icon,
} from "@hugeicons/core-free-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FieldError } from "./FieldError";
import type { TeamBuilderFormInstance } from "@/hooks/use-team-builder-form";

interface MemberCardProps {
  form: TeamBuilderFormInstance;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
}

export function MemberCard({ form, index, canRemove, onRemove }: MemberCardProps) {
  return (
    <Card className="border-l-2 border-l-border">
      <CardHeader className="px-4 pb-0 pt-3">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Member {index + 1}
          </span>
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={onRemove}
              aria-label={`Remove member ${index + 1}`}
            >
              <HugeiconsIcon icon={Delete01Icon} size={14} />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

          {/* Name */}
          <form.Field name={`people[${index}].name`}>
            {(subField) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`name-${index}`}>Full Name</Label>
                <div className="relative">
                  <HugeiconsIcon
                    icon={User02Icon}
                    size={14}
                    className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id={`name-${index}`}
                    type="text"
                    aria-invalid={
                      subField.state.meta.isTouched && subField.state.meta.errors.length > 0
                        ? true
                        : undefined
                    }
                    aria-describedby={`name-error-${index}`}
                    className="pl-8"
                    value={subField.state.value}
                    onChange={(e) => subField.handleChange(e.target.value)}
                    placeholder="Jane Smith"
                  />
                </div>
                <FieldError
                  id={`name-error-${index}`}
                  errors={subField.state.meta.errors as { message?: string }[]}
                  isTouched={subField.state.meta.isTouched}
                />
              </div>
            )}
          </form.Field>

          {/* Age */}
          <form.Field name={`people[${index}].age`}>
            {(subField) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`age-${index}`}>Age</Label>
                <div className="relative">
                  <HugeiconsIcon
                    icon={HashtagIcon}
                    size={14}
                    className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id={`age-${index}`}
                    type="number"
                    aria-invalid={
                      subField.state.meta.isTouched && subField.state.meta.errors.length > 0
                        ? true
                        : undefined
                    }
                    aria-describedby={`age-error-${index}`}
                    className="pl-8"
                    value={subField.state.value || ""}
                    onChange={(e) =>
                      subField.handleChange(parseInt(e.target.value) || 0)
                    }
                    placeholder="28"
                    min="1"
                    max="120"
                  />
                </div>
                <FieldError
                  id={`age-error-${index}`}
                  errors={subField.state.meta.errors as { message?: string }[]}
                  isTouched={subField.state.meta.isTouched}
                />
              </div>
            )}
          </form.Field>

          {/* Email */}
          <form.Field name={`people[${index}].email`}>
            {(subField) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`email-${index}`}>Email</Label>
                <div className="relative">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    size={14}
                    className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id={`email-${index}`}
                    type="email"
                    aria-invalid={
                      subField.state.meta.isTouched && subField.state.meta.errors.length > 0
                        ? true
                        : undefined
                    }
                    aria-describedby={`email-error-${index}`}
                    className="pl-8"
                    value={subField.state.value}
                    onChange={(e) => subField.handleChange(e.target.value)}
                    placeholder="jane@example.com"
                  />
                </div>
                <FieldError
                  id={`email-error-${index}`}
                  errors={subField.state.meta.errors as { message?: string }[]}
                  isTouched={subField.state.meta.isTouched}
                />
              </div>
            )}
          </form.Field>
        </div>
      </CardContent>
    </Card>
  );
}
