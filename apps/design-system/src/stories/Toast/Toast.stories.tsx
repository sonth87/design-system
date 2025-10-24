import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Toaster, toast } from "./Toast";
import Button from "../Button/Button";

const meta: Meta = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Variants = (args: any) => {
  return (
    <div className="flex flex-col items-center gap-3 p-6 w-96">
      <Toaster
        position="top-left"
        richColors
        expand
        closeButton
        duration={3000}
      />

      <Button onClick={() => toast("This is a default toast")}>Default</Button>
      <Button
        variant="mix"
        onClick={() => toast.success("Operation successful!")}
      >
        Success
      </Button>
      <Button variant="mix" onClick={() => toast.error("Something went wrong")}>
        Error
      </Button>
      <Button variant="mix" onClick={() => toast.warning("Be careful!")}>
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("Just an info message")}
      >
        Info
      </Button>
      <Button
        variant="mix"
        onClick={() => toast.primary("Primary variant active!")}
      >
        Primary
      </Button>
      <Button
        variant="mix"
        onClick={() => toast.secondary("Secondary variant active!")}
      >
        Secondary
      </Button>
    </div>
  );
};
