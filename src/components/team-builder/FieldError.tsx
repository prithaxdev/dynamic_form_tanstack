import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";

interface FieldErrorProps {
  errors: { message?: string }[];
  isTouched: boolean;
  id?: string;
}

export function FieldError({ errors, isTouched, id }: FieldErrorProps) {
  if (!isTouched || errors.length === 0) return null;

  return (
    <p id={id} className="flex items-center gap-1 text-xs text-destructive">
      <HugeiconsIcon icon={CancelCircleIcon} size={12} className="shrink-0" />
      {errors[0]?.message}
    </p>
  );
}
