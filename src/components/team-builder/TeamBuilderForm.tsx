import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  ArrowRight01Icon,
  Loading01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTeamBuilderForm } from "@/hooks/use-team-builder-form";
import { ProjectSection } from "./ProjectSection";
import { TeamSection } from "./TeamSection";
import { JsonOutput } from "./JsonOutput";

export function TeamBuilderForm() {
  const form = useTeamBuilderForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">

          {/* ── Left: Form ── */}
          <div className="flex flex-col gap-8">

            {/* Page Header */}
            <header className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
                <HugeiconsIcon icon={UserGroupIcon} size={13} />
                <span>Team Builder</span>
              </div>
              <h1 className="font-heading text-3xl font-bold leading-tight">
                Build Your Team
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Name your project and add the people who'll make it happen.
              </p>
            </header>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <ProjectSection form={form} />

              <Separator />

              <TeamSection form={form} />

              <Separator />

              {/* Submit row */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  All fields are required
                </p>
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting] as const}
                >
                  {([canSubmit, isSubmitting]) => {
                    const busy = Boolean(isSubmitting);
                    return (
                      <Button
                        type="submit"
                        size="lg"
                        disabled={!canSubmit || busy}
                      >
                        {busy && (
                          <HugeiconsIcon
                            icon={Loading01Icon}
                            size={14}
                            className="animate-spin"
                            data-icon="inline-start"
                          />
                        )}
                        {busy ? "Creating team…" : "Create Team"}
                        {!busy && (
                          <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            size={14}
                            data-icon="inline-end"
                          />
                        )}
                      </Button>
                    );
                  }}
                </form.Subscribe>
              </div>
            </form>
          </div>

          {/* ── Right: JSON Output Panel ── */}
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <form.Subscribe selector={(state) => state.values}>
              {(values) => <JsonOutput values={values} />}
            </form.Subscribe>
          </aside>
        </div>
      </div>
    </div>
  );
}
