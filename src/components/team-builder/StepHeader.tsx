interface StepHeaderProps {
  step: number;
  title: string;
  action?: React.ReactNode;
}

export function StepHeader({ step, title, action }: StepHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="grid size-6 shrink-0 place-items-center border border-border bg-primary text-[10px] font-bold text-primary-foreground">
          {step}
        </span>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
