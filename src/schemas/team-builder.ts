import z from "zod";

export const PersonSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  age: z
    .number()
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than 120"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export const TeamBuilderSchema = z.object({
  projectName: z
    .string()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters"),
  people: z.array(PersonSchema).min(1, "At least one person is required"),
});

export type Person = z.infer<typeof PersonSchema>;
export type TeamBuilderFormData = z.infer<typeof TeamBuilderSchema>;

export const teamBuilderDefaultValues: TeamBuilderFormData = {
  projectName: "",
  people: [{ name: "", age: 0, email: "" }],
};
