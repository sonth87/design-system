import type { Meta } from "@storybook/react";
import { Stepper, type StepperProps } from "../components/Stepper";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/Toast";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import i18n from "../../.storybook/i18n";
import Button from "@/components/Button";

const meta: Meta<typeof Stepper> = {
  title: "Navigation/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A flexible stepper component that provides navigation through a series of steps. The Stepper supports both horizontal and vertical orientations, automatic and manual activation modes, and comprehensive validation capabilities.

## Usage Patterns

### 1. Basic Stepper
\`\`\`tsx
<Stepper
  aria-label="Onboarding stepper with steps"
  className="w-full"
  defaultValue="step-1"
  steps={[
    {
      value: "step-1",
      title: "Personal Information",
      description: "Enter your basic details",
      content: (
        <div className="p-4">
          <p>Step 1 content</p>
        </div>
      ),
    },
    ...
  ]}
  steps={steps}
/>
\`\`\`

### 1.1. Basic Stepper with Custom Content
Use the Stepper with custom JSX content for full control over step rendering:

\`\`\`tsx
<Stepper defaultValue="step-1">
  <Stepper.List>
    <Stepper.Item value="step-1">
      <Stepper.Trigger>
        <Stepper.Indicator />
        <div>
          <Stepper.Title>Step 1</Stepper.Title>
          <Stepper.Description>Description</Stepper.Description>
        </div>
      </Stepper.Trigger>
      <Stepper.Separator />
    </Stepper.Item>
    {/* More steps... */}
  </Stepper.List>

  <Stepper.Content value="step-1">
    {/* Step content */}
  </Stepper.Content>
</Stepper>
\`\`\`

### 2. Controlled Stepper
Manage the active step programmatically:

\`\`\`tsx
const [activeStep, setActiveStep] = useState("step-1");

<Stepper value={activeStep} onValueChange={setActiveStep}>
  {/* Stepper content */}
</Stepper>
\`\`\`

### 3. Stepper with Validation
Add form validation between steps:

\`\`\`tsx
<Stepper onValidate={async (value, direction) => {
  // Validation logic
  return isValid;
}}>
  {/* Stepper content */}
</Stepper>
\`\`\`

### 4. Vertical Orientation
Use vertical layout for different UI requirements:

\`\`\`tsx
<Stepper orientation="vertical">
  {/* Stepper content */}
</Stepper>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: i18n.t("stories.stepper.argTypes.orientation.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    activationMode: {
      control: { type: "select" },
      options: ["automatic", "manual"],
      description: i18n.t(
        "stories.stepper.argTypes.activationMode.description"
      ),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: i18n.t("stories.stepper.argTypes.disabled.description"),
      table: {
        category: i18n.t("stories.category.state"),
      },
    },
    loop: {
      control: { type: "boolean" },
      description: i18n.t("stories.stepper.argTypes.loop.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    value: {
      control: { type: "text" },
      description: i18n.t("stories.stepper.argTypes.value.description"),
      table: {
        category: i18n.t("stories.category.state"),
      },
    },
    defaultValue: {
      control: { type: "text" },
      description: i18n.t("stories.stepper.argTypes.defaultValue.description"),
      table: {
        category: i18n.t("stories.category.state"),
      },
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "accent",
        "destructive",
        "muted",
        "success",
        "error",
        "warning",
      ],
      description: i18n.t("stories.stepper.argTypes.color.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    customColor: {
      control: { type: "color" },
      description: i18n.t("stories.stepper.argTypes.customColor.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    variant: {
      control: { type: "select" },
      options: ["normal", "dot"],
      description: i18n.t("stories.stepper.argTypes.variant.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    labelPosition: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
      description: i18n.t("stories.stepper.argTypes.labelPosition.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    onValueChange: {
      description: i18n.t("stories.stepper.argTypes.onValueChange.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onValueComplete: {
      description: i18n.t(
        "stories.stepper.argTypes.onValueComplete.description"
      ),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onValueAdd: {
      description: i18n.t("stories.stepper.argTypes.onValueAdd.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onValueRemove: {
      description: i18n.t("stories.stepper.argTypes.onValueRemove.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onValidate: {
      description: i18n.t("stories.stepper.argTypes.onValidate.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    dir: {
      control: { type: "select" },
      options: ["ltr", "rtl"],
      description: i18n.t("stories.stepper.argTypes.dir.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    nonInteractive: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.stepper.argTypes.nonInteractive.description"
      ),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    steps: {
      description: i18n.t("stories.stepper.argTypes.steps.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    children: {
      description: i18n.t("stories.stepper.argTypes.children.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
  },
};

export default meta;

const steps = [
  {
    value: "step-1",
    title: "Personal Information",
    description: "Enter your basic details",
    content: (
      <div className="p-4">
        <p>Step 1 content: Personal Information form</p>
      </div>
    ),
  },
  {
    value: "step-2",
    title: "Account Setup",
    description: "Configure your account settings",
    content: (
      <div className="p-4">
        <p>Step 2 content: Account Setup form</p>
      </div>
    ),
  },
  {
    value: "step-3",
    title: "Review & Submit",
    description: "Review your information and submit",
    content: (
      <div className="p-4">
        <p>Step 3 content: Review and submit</p>
      </div>
    ),
  },
];

export const Default = (args: typeof Stepper) => {
  return (
    <Stepper
      aria-label="Onboarding stepper with steps"
      className="w-full"
      defaultValue="step-1"
      {...args}
      steps={steps}
    />
  );
};

export const Manual = () => {
  return (
    <Stepper aria-label="Onboarding stepper manual" className="w-full">
      <Stepper.List>
        {steps.map((step, index) => (
          <Stepper.Item key={step.value} value={step.value}>
            <Stepper.Trigger>
              <Stepper.Indicator />
              <div className="flex flex-col">
                <Stepper.Title>{step.title}</Stepper.Title>
                <Stepper.Description>{step.description}</Stepper.Description>
              </div>
            </Stepper.Trigger>
            {index < steps.length - 1 && <Stepper.Separator />}
          </Stepper.Item>
        ))}
      </Stepper.List>
      {steps.map(
        (step) =>
          step.content && (
            <Stepper.Content key={step.value} value={step.value}>
              {step.content}
            </Stepper.Content>
          )
      )}
    </Stepper>
  );
};

export const WithValidation = () => {
  const [step, setStep] = React.useState("account");

  const formSchema = React.useMemo(
    () =>
      z.object({
        username: z
          .string()
          .min(3, "Username must be at least 3 characters")
          .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
          ),
        email: z.email("Please enter a valid email address"),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        bio: z.string().min(10, "Bio must be at least 10 characters"),
      }),
    []
  );

  type FormSchema = z.infer<typeof formSchema>;

  const steps = React.useMemo(
    () => [
      {
        value: "account",
        title: "Account Setup",
        description: "Create your account",
        fields: ["username", "email"] as const,
      },
      {
        value: "profile",
        title: "Profile Info",
        description: "Complete your profile",
        fields: ["firstName", "lastName", "bio"] as const,
      },
      {
        value: "review",
        title: "Review",
        description: "Review your information",
        fields: [] as const,
      },
    ],
    []
  );

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      bio: "",
    },
  });

  const stepIndex = React.useMemo(
    () => steps.findIndex((s) => s.value === step),
    [step, steps]
  );

  const onValidate: NonNullable<StepperProps["onValidate"]> = React.useCallback(
    async (_value, direction) => {
      if (direction === "prev") return true;

      const stepData = steps.find((s) => s.value === step);
      if (!stepData) return true;

      const isValid = await form.trigger(stepData.fields);

      if (!isValid) {
        toast.info("Please complete all required fields to continue", {
          description: "Fix the validation errors and try again.",
        });
      }

      return isValid;
    },
    [form, step, steps]
  );

  const onSubmit = React.useCallback((input: FormSchema) => {
    toast.success(
      <pre className="w-full">{JSON.stringify(input, null, 2)}</pre>
    );
  }, []);

  return (
    <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
      <Stepper
        value={step}
        onValueChange={setStep}
        onValidate={onValidate}
        steps={steps}
      >
        <Stepper.Content
          value="account"
          className="flex flex-col gap-4 rounded-md border bg-card p-4 text-card-foreground"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              placeholder="Enter username"
              {...form.register("username")}
              state={form.formState.errors.username ? "error" : "default"}
            />
            {form.formState.errors.username && (
              <p className="text-sm text-destructive">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...form.register("email")}
              state={form.formState.errors.email ? "error" : "default"}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </Stepper.Content>
        <Stepper.Content
          value="profile"
          className="flex flex-col gap-4 rounded-md border bg-card p-4 text-card-foreground"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                {...form.register("firstName")}
                state={form.formState.errors.firstName ? "error" : "default"}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>
              <Input
                id="lastName"
                placeholder="Enter last name"
                {...form.register("lastName")}
                state={form.formState.errors.lastName ? "error" : "default"}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              className="min-h-[80px]"
              {...form.register("bio")}
              state={form.formState.errors.bio ? "error" : "default"}
            />
            {form.formState.errors.bio && (
              <p className="text-sm text-destructive">
                {form.formState.errors.bio.message}
              </p>
            )}
          </div>
        </Stepper.Content>
        <Stepper.Content
          value="review"
          className="grid grid-cols-2 gap-4 rounded-md border bg-card p-4 text-card-foreground lg:grid-cols-3"
        >
          <div className="flex flex-col gap-1 rounded-md border p-2">
            <span className="font-medium text-sm">Username</span>
            <p className="text-sm">
              {form.watch("username") ?? "Not provided"}
            </p>
          </div>
          <div className="flex flex-col gap-1 rounded-md border p-2">
            <span className="font-medium text-sm">Email</span>
            <p className="text-sm">{form.watch("email") ?? "Not provided"}</p>
          </div>
          <div className="flex flex-col gap-1 rounded-md border p-2">
            <span className="font-medium text-sm">First Name</span>
            <p className="text-sm">
              {form.watch("firstName") ?? "Not provided"}
            </p>
          </div>
          <div className="flex flex-col gap-1 rounded-md border p-2">
            <span className="font-medium text-sm">Last Name</span>
            <p className="text-sm">
              {form.watch("lastName") ?? "Not provided"}
            </p>
          </div>
          <div className="flex flex-col gap-1 rounded-md border p-2">
            <span className="font-medium text-sm">Bio</span>
            <p className="text-sm">{form.watch("bio") ?? "Not provided"}</p>
          </div>
        </Stepper.Content>
        <div className="flex justify-between">
          <Stepper.Prev asChild>
            <Button type="button" variant="outline">
              Previous
            </Button>
          </Stepper.Prev>
          <div className="text-muted-foreground text-sm">
            Step {stepIndex + 1} of {steps.length}
          </div>
          {stepIndex === steps.length - 1 ? (
            <Button type="submit">Complete Setup</Button>
          ) : (
            <Stepper.Next asChild>
              <Button variant="solid" color="primary">
                Next
              </Button>
            </Stepper.Next>
          )}
        </div>
      </Stepper>
    </form>
  );
};

export function StepperVertical() {
  return (
    <Stepper defaultValue="step-2" orientation="vertical">
      <Stepper.List>
        {steps.map((step) => (
          <Stepper.Item key={step.value} value={step.value}>
            <Stepper.Trigger className="not-last:pb-6">
              <Stepper.Indicator />
              <div className="flex flex-col gap-1">
                <Stepper.Title>{step.title}</Stepper.Title>
                <Stepper.Description>{step.description}</Stepper.Description>
              </div>
            </Stepper.Trigger>
            <Stepper.Separator className="-order-1 -translate-x-1/2 -z-10 absolute inset-y-0 top-5 left-3.5 h-full" />
          </Stepper.Item>
        ))}
      </Stepper.List>
      {steps.map((step) => (
        <Stepper.Content
          key={step.value}
          value={step.value}
          className="flex flex-col gap-4 rounded-lg border bg-card p-6 text-card-foreground"
        >
          <div className="flex flex-col gap-px">
            <h4 className="font-semibold">{step.title}</h4>
            <p className="text-muted-foreground text-sm">{step.description}</p>
          </div>
          <p className="text-sm">
            This is the content for {step.title}. You can add forms,
            information, or any other content here.
          </p>
        </Stepper.Content>
      ))}
    </Stepper>
  );
}
