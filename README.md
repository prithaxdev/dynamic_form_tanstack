# dynamic-form-tanstack

A production-grade dynamic form built with TanStack Form, Zod validation, and shadcn/ui - demonstrating array field management, real-time validation, and live JSON output in a clean two-column layout.

---

## Stack

| Layer | Library | Version |
|---|---|---|
| Framework | React | 19 |
| Build | Vite | 7 |
| Form state | TanStack Form | 1.27 |
| Validation | Zod | 4 |
| UI primitives | @base-ui/react | 1.3 |
| Component system | shadcn/ui (base-lyra) | — |
| Styling | Tailwind CSS | 4 |
| Icons | @hugeicons/react | 1.1 |
| Toasts | Sonner | 2 |
| Language | TypeScript | 5.9 |

---

## Features

- **Dynamic array fields** - add and remove team members at runtime with TanStack Form's `mode="array"`
- **Schema-driven validation** - Zod schemas colocated in `src/schemas/`, validated on change via `validators.onChange`
- **Inline validation feedback** - per-field error messages with cancel icons; green checkmark on valid state
- **Live JSON output panel** - sticky right-column panel with syntax-highlighted JSON that updates on every keystroke
- **Syntax tokenizer** - hand-rolled JSON tokenizer (keys, strings, numbers, booleans, null) with no external dependency
- **Copy to clipboard** - one-click JSON copy with tick confirmation
- **Toast notifications** - success toast via Sonner on form submit
- **Accessible** - `aria-invalid`, `aria-describedby` on all inputs; `aria-label` on icon-only buttons
- **Responsive** - single column on mobile, two-column grid on `lg+`

---

## Project Structure

```
src/
├── schemas/
│   └── team-builder.ts           # Zod schemas + inferred types + default values
│
├── hooks/
│   └── use-team-builder-form.ts  # TanStack Form setup, submit handler, form instance type
│
├── components/
│   ├── ui/                       # shadcn primitives - do not edit manually
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   └── sonner.tsx
│   │
│   └── team-builder/             # Feature components
│       ├── TeamBuilderForm.tsx   # Root orchestrator - layout, form submit, JSON subscription
│       ├── ProjectSection.tsx    # Step 1 - project name field with validation icons
│       ├── TeamSection.tsx       # Step 2 - people array with add/remove controls
│       ├── MemberCard.tsx        # Per-member card - name, age, email fields
│       ├── JsonOutput.tsx        # Right-panel live JSON preview with syntax highlighting
│       ├── FieldError.tsx        # Shared validation error display
│       ├── StepHeader.tsx        # Numbered section header with optional action slot
│       └── index.ts              # Barrel export
│
├── lib/
│   └── utils.ts                  # cn() - clsx + tailwind-merge
│
├── App.tsx
├── main.tsx
└── index.css                     # Tailwind v4 + CSS variables (stone palette, lyra preset)
```

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
pnpm preview
```

Type check:

```bash
pnpm exec tsc --noEmit
```

---

## Form Architecture

The form is structured around three distinct layers:

**Schema layer** (`src/schemas/team-builder.ts`)
Owns the shape of the data. Zod schemas define validation rules and export `TeamBuilderFormData` - the single source of truth for all TypeScript types across the feature.

**State layer** (`src/hooks/use-team-builder-form.ts`)
`useTeamBuilderForm` wraps TanStack Form's `useForm` with the Zod validator bound to `onChange`. It exports `TeamBuilderFormInstance` - the inferred return type of the hook - so child components can type the `form` prop without manual annotation.

**UI layer** (`src/components/team-builder/`)
Components are composed around the `form` instance passed as a prop. `TeamBuilderForm` is the only component that calls the hook; all others receive `form` and render their slice of the field tree via `form.Field`.

```
useTeamBuilderForm()
    └── TeamBuilderForm
            ├── ProjectSection    → form.Field("projectName")
            ├── TeamSection       → form.Field("people", mode="array")
            │       └── MemberCard × N
            │               ├── form.Field("people[i].name")
            │               ├── form.Field("people[i].age")
            │               └── form.Field("people[i].email")
            └── JsonOutput        ← form.Subscribe(state.values)
```

---

## shadcn Config

```json
{
  "style": "base-lyra",
  "base": "@base-ui/react",
  "iconLibrary": "hugeicons",
  "tailwind": { "baseColor": "stone" }
}
```

To add a new shadcn component:

```bash
pnpm dlx shadcn@latest add <component>
```

Icons are imported from `@hugeicons/core-free-icons` and rendered via `HugeiconsIcon`:

```tsx
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";

<HugeiconsIcon icon={Mail01Icon} size={16} />
```

---

## Key Patterns

**Array field management**
```tsx
<form.Field name="people" mode="array">
  {(field) => (
    <>
      {field.state.value.map((_, i) => (
        <MemberCard key={i} form={form} index={i}
          onRemove={() => field.removeValue(i)} />
      ))}
      <Button onClick={() => field.pushValue({ name: "", age: 0, email: "" })}>
        Add Member
      </Button>
    </>
  )}
</form.Field>
```

**Subscribing to form values for the JSON panel**
```tsx
<form.Subscribe selector={(state) => state.values}>
  {(values) => <JsonOutput values={values} />}
</form.Subscribe>
```

**Passing `aria-invalid` only on error (avoids false-positive CSS)**
```tsx
aria-invalid={isInvalid ? true : undefined}
```

---
