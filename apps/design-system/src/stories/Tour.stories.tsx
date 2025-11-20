import type { Meta } from "@storybook/react";
import { Tour } from "../components/Tour";
import React from "react";
import i18n from "../../.storybook/i18n";
import Button from "@/components/Button";

const meta: Meta<typeof Tour> = {
  title: "Navigation/Tour",
  component: Tour,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A guided tour component that highlights elements and provides step-by-step instructions. The Tour component supports customizable positioning, automatic scrolling, and spotlight effects to guide users through your application.

## Usage Patterns

### 1. Basic Tour
\`\`\`tsx
<Tour
  defaultOpen
  defaultValue={0}
  steps={[
    {
      target: "#element-1",
      title: "Welcome",
      description: "This is your dashboard",
    },
    {
      target: "#element-2",
      title: "Features",
      description: "Explore the features here",
    },
  ]}
/>
\`\`\`

### 2. Controlled Tour
Manage the tour state programmatically:

\`\`\`tsx
const [open, setOpen] = useState(false);
const [step, setStep] = useState(0);

<Tour
  open={open}
  onOpenChange={setOpen}
  value={step}
  onValueChange={setStep}
  steps={steps}
/>
\`\`\`

### 3. Custom Tour with JSX
Use the Tour with custom JSX content for full control:

\`\`\`tsx
<Tour defaultOpen>
  <Tour.Portal>
    <Tour.Spotlight />
    <Tour.SpotlightRing />
  </Tour.Portal>

  <Tour.Step target="#element-1">
    <Tour.Arrow />
    <Tour.Header>
      <Tour.Title>Step 1</Tour.Title>
      <Tour.Close />
    </Tour.Header>
    <Tour.Description>Description here</Tour.Description>
    <Tour.Footer>
      <Tour.StepCounter />
      <div>
        <Tour.Prev />
        <Tour.Next />
      </div>
    </Tour.Footer>
  </Tour.Step>
</Tour>
\`\`\`

### 4. Tour with Callbacks
Handle tour lifecycle events:

\`\`\`tsx
<Tour
  onComplete={() => console.log("Tour completed")}
  onSkip={() => console.log("Tour skipped")}
  steps={steps}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: i18n.t("stories.tour.argTypes.open.description"),
      table: {
        category: i18n.t("stories.category.state"),
      },
    },
    defaultOpen: {
      control: { type: "boolean" },
      description: i18n.t("stories.tour.argTypes.defaultOpen.description"),
      table: {
        category: i18n.t("stories.category.state"),
      },
    },
    value: {
      control: { type: "number" },
      description: i18n.t("stories.tour.argTypes.value.description"),
      table: {
        category: i18n.t("stories.category.state"),
      },
    },
    defaultValue: {
      control: { type: "number" },
      description: i18n.t("stories.tour.argTypes.defaultValue.description"),
      table: {
        category: i18n.t("stories.category.state"),
      },
    },
    autoScroll: {
      control: { type: "boolean" },
      description: i18n.t("stories.tour.argTypes.autoScroll.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    scrollBehavior: {
      control: { type: "select" },
      options: ["auto", "smooth", "instant"],
      description: i18n.t("stories.tour.argTypes.scrollBehavior.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    dismissible: {
      control: { type: "boolean" },
      description: i18n.t("stories.tour.argTypes.dismissible.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    modal: {
      control: { type: "boolean" },
      description: i18n.t("stories.tour.argTypes.modal.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    dir: {
      control: { type: "select" },
      options: ["ltr", "rtl"],
      description: i18n.t("stories.tour.argTypes.dir.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    alignOffset: {
      control: { type: "number" },
      description: i18n.t("stories.tour.argTypes.alignOffset.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    sideOffset: {
      control: { type: "number" },
      description: i18n.t("stories.tour.argTypes.sideOffset.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    spotlightPadding: {
      control: { type: "number" },
      description: i18n.t("stories.tour.argTypes.spotlightPadding.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    onOpenChange: {
      description: i18n.t("stories.tour.argTypes.onOpenChange.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onValueChange: {
      description: i18n.t("stories.tour.argTypes.onValueChange.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onComplete: {
      description: i18n.t("stories.tour.argTypes.onComplete.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onSkip: {
      description: i18n.t("stories.tour.argTypes.onSkip.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    steps: {
      description: i18n.t("stories.tour.argTypes.steps.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    children: {
      description: i18n.t("stories.tour.argTypes.children.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    showSpotlight: {
      control: { type: "boolean" },
      description: i18n.t("stories.tour.argTypes.showSpotlight.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    showSpotlightRing: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.tour.argTypes.showSpotlightRing.description",
      ),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    spotlightClassName: {
      control: { type: "text" },
      description: i18n.t(
        "stories.tour.argTypes.spotlightClassName.description",
      ),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    spotlightRingClassName: {
      control: { type: "text" },
      description: i18n.t(
        "stories.tour.argTypes.spotlightRingClassName.description",
      ),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    buttonConfig: {
      description: i18n.t("stories.tour.argTypes.buttonConfig.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
  },
};

export default meta;

export const Default = (args: typeof Tour) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>Start Tour</Button>

      <div className="grid grid-cols-3 gap-4">
        <div
          id="tour-element-1"
          className="p-6 border rounded-lg bg-card text-card-foreground"
        >
          <h3 className="font-semibold mb-2">Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Your main dashboard view
          </p>
        </div>

        <div
          id="tour-element-2"
          className="p-6 border rounded-lg bg-card text-card-foreground"
        >
          <h3 className="font-semibold mb-2">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            View your analytics here
          </p>
        </div>

        <div
          id="tour-element-3"
          className="p-6 border rounded-lg bg-card text-card-foreground"
        >
          <h3 className="font-semibold mb-2">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure your preferences
          </p>
        </div>
      </div>

      <Tour
        {...args}
        open={open}
        onOpenChange={setOpen}
        defaultValue={0}
        onComplete={() => console.log("Tour completed!")}
        onSkip={() => console.log("Tour skipped!")}
        steps={[
          {
            target: "#tour-element-1",
            title: "Welcome to Dashboard",
            description:
              "This is your main dashboard where you can see an overview of your data.",
            side: "bottom",
          },
          {
            target: "#tour-element-2",
            title: "Analytics Section",
            description:
              "Track your performance metrics and insights in this section.",
            side: "bottom",
          },
          {
            target: "#tour-element-3",
            title: "Settings",
            description:
              "Customize your experience by adjusting settings here.",
            side: "bottom",
          },
        ]}
      />
    </div>
  );
};

export function Manual() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <h1 id="welcome-title" className="font-bold text-2xl">
            Welcome to Your Dashboard
          </h1>
          <p className="text-center text-muted-foreground">
            Take a quick tour to explore key features
          </p>
        </div>
        <Button id="start-tour-btn" onClick={() => setOpen(true)}>
          Start Tour
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div id="feature-1" className="rounded-lg border p-4 text-center">
          <h3 className="font-semibold">Analytics</h3>
          <p className="text-muted-foreground text-sm">
            Track your performance metrics
          </p>
        </div>
        <div id="feature-2" className="rounded-lg border p-4 text-center">
          <h3 className="font-semibold">Projects</h3>
          <p className="text-muted-foreground text-sm">
            Manage your active projects
          </p>
        </div>
        <div id="feature-3" className="rounded-lg border p-4 text-center">
          <h3 className="font-semibold">Team</h3>
          <p className="text-muted-foreground text-sm">
            Collaborate with teammates
          </p>
        </div>
      </div>
      <Tour
        open={open}
        onOpenChange={setOpen}
        dismissible={false}
        stepFooter={
          <Tour.Footer>
            <div className="flex w-full items-center justify-between">
              <Tour.StepCounter />
              <div className="flex gap-2">
                <Tour.Prev />
                <Tour.Next />
              </div>
            </div>
          </Tour.Footer>
        }
      >
        <Tour.Portal>
          <Tour.Spotlight />
          <Tour.SpotlightRing />
          <Tour.Step target="#welcome-title" side="bottom" align="center">
            <Tour.Header>
              <Tour.Title>Welcome!</Tour.Title>
              <Tour.Description>
                Let's walk through the main features of your dashboard in just a
                few steps.
              </Tour.Description>
            </Tour.Header>
            <Tour.Close />
          </Tour.Step>
          <Tour.Step target="#feature-1" side="top" align="center">
            <Tour.Arrow />
            <Tour.Header>
              <Tour.Title>Analytics Dashboard</Tour.Title>
              <Tour.Description>
                View real-time insights, track KPIs, and monitor your team's
                progress with interactive charts.
              </Tour.Description>
            </Tour.Header>
            <Tour.Close />
          </Tour.Step>
          <Tour.Step target="#feature-2" side="top" align="center">
            <Tour.Arrow />
            <Tour.Header>
              <Tour.Title>Project Management</Tour.Title>
              <Tour.Description>
                Create, organize, and track projects with powerful tools for
                task management and deadlines.
              </Tour.Description>
            </Tour.Header>
            <Tour.Close />
          </Tour.Step>
          <Tour.Step target="#feature-3" side="top" align="center" required>
            <Tour.Arrow />
            <Tour.Header>
              <Tour.Title>Team Collaboration</Tour.Title>
              <Tour.Description>
                Invite members, assign roles, and collaborate seamlessly. This
                step is required to continue.
              </Tour.Description>
            </Tour.Header>
            <Tour.Close />
          </Tour.Step>
        </Tour.Portal>
      </Tour>
    </div>
  );
}

export const WithCustomContent = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>Start Tour</Button>

      <div className="grid grid-cols-2 gap-4">
        <div
          id="tour-custom-1"
          className="p-6 border rounded-lg bg-card text-card-foreground"
        >
          <h3 className="font-semibold mb-2">Feature 1</h3>
          <p className="text-sm text-muted-foreground">
            Important feature description
          </p>
        </div>

        <div
          id="tour-custom-2"
          className="p-6 border rounded-lg bg-card text-card-foreground"
        >
          <h3 className="font-semibold mb-2">Feature 2</h3>
          <p className="text-sm text-muted-foreground">Another key feature</p>
        </div>
      </div>

      <Tour
        open={open}
        onOpenChange={setOpen}
        defaultValue={0}
        steps={[
          {
            target: "#tour-custom-1",
            title: "First Feature",
            description: "This is an important feature you should know about.",
            content: (
              <div className="space-y-2">
                <p className="text-sm">Here are some key points:</p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Point number one</li>
                  <li>Point number two</li>
                  <li>Point number three</li>
                </ul>
              </div>
            ),
            side: "right",
          },
          {
            target: "#tour-custom-2",
            title: "Second Feature",
            description: "Learn about this powerful feature.",
            content: (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">Pro Tip:</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You can use keyboard shortcuts to navigate faster!
                </p>
              </div>
            ),
            side: "left",
          },
        ]}
      />
    </div>
  );
};

export const ControlledTour = () => {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>Start Tour</Button>
        <Button
          variant="outline"
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={!open || step === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setStep((prev) => prev + 1)}
          disabled={!open}
        >
          Next
        </Button>
        <span className="flex items-center text-sm text-muted-foreground">
          Step: {step + 1}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            id={`controlled-${num}`}
            className="p-6 border rounded-lg bg-card text-card-foreground"
          >
            <h3 className="font-semibold">Step {num}</h3>
          </div>
        ))}
      </div>

      <Tour
        open={open}
        onOpenChange={setOpen}
        value={step}
        onValueChange={setStep}
        steps={[
          {
            target: "#controlled-1",
            title: "Step 1",
            description: "First step of the controlled tour",
          },
          {
            target: "#controlled-2",
            title: "Step 2",
            description: "Second step of the controlled tour",
          },
          {
            target: "#controlled-3",
            title: "Step 3",
            description: "Third step of the controlled tour",
          },
          {
            target: "#controlled-4",
            title: "Step 4",
            description: "Final step of the controlled tour",
          },
        ]}
      />
    </div>
  );
};

export function TourControlled() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const onStepChange = React.useCallback((step: number) => {
    setValue(step);
  }, []);

  const onComplete = React.useCallback(() => {
    setOpen(false);
    setValue(0);
  }, []);

  const onSkip = React.useCallback(() => {
    setOpen(false);
    setValue(0);
  }, []);

  const onTourStart = React.useCallback(() => {
    setValue(0);
    setOpen(true);
  }, []);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4">
        <h1 id="controlled-title" className="font-bold text-2xl">
          Controlled Tour
        </h1>
        <div className="flex items-center gap-2">
          <Button id="controlled-start-btn" onClick={onTourStart}>
            Start
          </Button>
          <Button
            variant="outline"
            onClick={() => setValue(Math.max(0, value - 1))}
            disabled={!open || value === 0}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            onClick={() => setValue(Math.min(3, value + 1))}
            disabled={!open || value === 3}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          <div
            id="controlled-step-1"
            className="rounded-lg border p-6 text-center"
          >
            <h3 className="font-semibold">Step 1</h3>
            <p className="text-muted-foreground text-sm">
              First step in our controlled tour
            </p>
          </div>
          <div
            id="controlled-step-2"
            className="rounded-lg border p-6 text-center"
          >
            <h3 className="font-semibold">Step 2</h3>
            <p className="text-muted-foreground text-sm">
              Second step with external controls
            </p>
          </div>
        </div>
        {open && value >= 2 && (
          <div
            id="controlled-step-3"
            className="fade-in slide-in-from-bottom-4 animate-in rounded-lg border border-primary/50 bg-primary/5 p-6 text-center duration-300"
          >
            <h3 className="font-semibold">Step 3</h3>
            <p className="text-muted-foreground text-sm">
              Dynamic step that appears after step 2
            </p>
          </div>
        )}
      </div>
      <Tour
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={onStepChange}
        onComplete={onComplete}
        onSkip={onSkip}
        stepFooter={
          <Tour.Footer>
            <div className="flex w-full items-center justify-between">
              <Tour.StepCounter />
              <div className="flex gap-2">
                <Tour.Prev />
                <Tour.Next />
              </div>
            </div>
          </Tour.Footer>
        }
        steps={[
          {
            target: "#controlled-title",
            title: "Controlled Tour",
            description:
              "This tour's state is controlled externally. Notice how the step counter updates.",
            side: "bottom",
            align: "center",
          },
          {
            target: "#controlled-step-1",
            title: "External Controls",
            description:
              "You can control this tour using the external buttons above, or use the built-in navigation.",
            side: "top",
            align: "center",
          },
          {
            target: "#controlled-step-2",
            title: "Second Feature",
            description:
              "The tour state is fully controlled by the parent component. Watch what happens next!",
            side: "top",
            align: "center",
          },
          {
            target: "#controlled-step-3",
            title: "Dynamic Layout",
            description:
              "This element appeared when you reached this step, demonstrating how the tour handles dynamic content and layout shifts.",
            side: "top",
            align: "center",
          },
        ]}
      />
    </div>
  );
}

export const WithCustomButtonsAndStyle = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>Bắt đầu Tour</Button>

      <div className="grid grid-cols-3 gap-4">
        <div
          id="custom-btn-1"
          className="p-6 border rounded-lg bg-card text-card-foreground"
        >
          <h3 className="font-semibold mb-2">Tính năng 1</h3>
          <p className="text-sm text-muted-foreground">
            Tính năng quan trọng đầu tiên
          </p>
        </div>

        <div
          id="custom-btn-2"
          className="p-6 border rounded-lg bg-card text-card-foreground"
        >
          <h3 className="font-semibold mb-2">Tính năng 2</h3>
          <p className="text-sm text-muted-foreground">Tính năng thứ hai</p>
        </div>

        <div
          id="custom-btn-3"
          className="p-6 border rounded-lg bg-card text-card-foreground"
        >
          <h3 className="font-semibold mb-2">Tính năng 3</h3>
          <p className="text-sm text-muted-foreground">Tính năng cuối cùng</p>
        </div>
      </div>

      <Tour
        open={open}
        onOpenChange={setOpen}
        defaultValue={0}
        buttonConfig={{
          skip: "Bỏ qua",
          prev: "Trước",
          next: "Tiếp theo",
          finish: "Hoàn thành",
        }}
        steps={[
          {
            target: "#custom-btn-1",
            title: "Chào mừng",
            description: "Đây là tính năng đầu tiên bạn cần biết.",
            side: "bottom",
          },
          {
            target: "#custom-btn-2",
            title: "Tính năng chính",
            description: "Tính năng này rất quan trọng cho công việc của bạn.",
            side: "bottom",
          },
          {
            target: "#custom-btn-3",
            title: "Hoàn thành",
            description: "Bạn đã hoàn thành tour! Hãy bắt đầu sử dụng.",
            side: "bottom",
          },
        ]}
        spotlightClassName="bg-gradient-to-r from-primary/40 to-transparent"
        spotlightRingClassName="ring-2 ring-offset-2 ring-primary animate-heartbeat"
      />
    </div>
  );
};
