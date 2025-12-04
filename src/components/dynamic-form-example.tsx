import { useForm } from "@tanstack/react-form";
import z from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Zod Schema
const PersonSchema = z.object({
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

const FormSchema = z.object({
  projectName: z
    .string()
    .min(1, "Project name is required")
    .min(3, "Project name must be at least 3 characters"),
  people: z.array(PersonSchema).min(1, "At least one person is required"),
});

type FormData = z.infer<typeof FormSchema>;

const defaultValues: FormData = {
  projectName: "",
  people: [{ name: "", age: 0, email: "" }],
};

export default function DynamicFormExample() {
  const form = useForm({
    defaultValues,
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", value);

      alert(
        `Form submitted successfully!\n\n${JSON.stringify(value, null, 2)}`,
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-right">Dynamic Team Form</h1>
        <p className="text-muted-foreground">
          Create a project and add team members dynamically
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/*Project name field*/}
        <form.Field name="projectName">
          {({ state, handleChange }) => (
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                type="text"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Enter project name"
              />
              {state.meta.errors.length > 0 && state.meta.isTouched && (
                <p className="text-sm text-red-500">
                  {state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>
        {/*Team Member*/}
        <form.Field name="people" mode="array">
          {(field) => (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Team Members</h2>
                <Button
                  type="button"
                  onClick={() =>
                    field.pushValue({ name: "", age: 0, email: "" })
                  }
                >
                  Add Person
                </Button>
              </div>
              <div className="space-y-4">
                {field.state.value.map((person, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Person {i + 1}
                        </CardTitle>
                        {field.state.value.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => field.removeValue(i)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Name Field */}
                        <form.Field key={i} name={`people[${i}].name`}>
                          {(subField) => (
                            <div className="space-y-2">
                              <Label htmlFor={`name-${i}`}>Name</Label>
                              <Input
                                id={`name-${i}`}
                                type="text"
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                                defaultValue={person.name}
                                placeholder="Enter name"
                              />
                              {subField.state.meta.errors.length > 0 &&
                                subField.state.meta.isTouched && (
                                  <p className="text-sm text-red-500">
                                    {subField.state.meta.errors[0]?.message}
                                  </p>
                                )}
                            </div>
                          )}
                        </form.Field>

                        {/* Age Field */}
                        <form.Field key={i} name={`people[${i}].age`}>
                          {(subField) => (
                            <div className="space-y-2">
                              <Label htmlFor={`age-${i}`}>Age</Label>
                              <Input
                                id={`age-${i}`}
                                type="number"
                                value={subField.state.value || ""}
                                onChange={(e) =>
                                  subField.handleChange(
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                placeholder="Enter age"
                                min="1"
                                max="120"
                              />
                              {subField.state.meta.errors.length > 0 &&
                                subField.state.meta.isTouched && (
                                  <p className="text-sm text-red-500">
                                    {subField.state.meta.errors[0]?.message}
                                  </p>
                                )}
                            </div>
                          )}
                        </form.Field>

                        {/* Email Field */}
                        <form.Field key={i} name={`people[${i}].email`}>
                          {(subField) => (
                            <div className="space-y-2">
                              <Label htmlFor={`email-${i}`}>Email</Label>
                              <Input
                                id={`email-${i}`}
                                type="email"
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                                defaultValue={person.email}
                                placeholder="Enter email"
                              />
                              {subField.state.meta.errors.length > 0 &&
                                subField.state.meta.isTouched && (
                                  <p className="text-sm text-red-500">
                                    {subField.state.meta.errors[0]?.message}
                                  </p>
                                )}
                            </div>
                          )}
                        </form.Field>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </form.Field>
        {/*Submit Button*/}
        <div className="flex justify-end">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </Button>
            )}
          </form.Subscribe>
        </div>

        {/*Debug Output*/}
        <form.Subscribe selector={(state) => state.values}>
          {(values) => (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Current Form Values:</h3>
              <pre className="text-sm text-gray-600">
                {JSON.stringify(values, null, 2)}
              </pre>
            </div>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
