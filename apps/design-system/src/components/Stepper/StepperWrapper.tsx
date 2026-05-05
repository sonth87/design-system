"use client";

import * as React from "react";
import {
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
  type StepperProps,
} from "./Stepper";
import { cn } from "@dsui/ui/index";

type StepperColor =
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "muted"
  | "success"
  | "error"
  | "warning";
type StepperVariant = "normal" | "dot";
type LabelPosition = "top" | "bottom" | "left" | "right";

interface Step {
  value: string;
  title: string;
  description?: string;
  completed?: boolean;
  disabled?: boolean;
  content?: React.ReactNode;
}

interface StepperWrapperProps extends StepperProps {
  steps?: Step[];
  children?: React.ReactNode;
  color?: StepperColor;
  customColor?: string;
  variant?: StepperVariant;
  labelPosition?: LabelPosition;
}

function StepperWrapper({
  steps,
  children,
  color,
  customColor,
  variant = "normal",
  labelPosition = "right",
  ...props
}: StepperWrapperProps) {
  const hasStepContent = steps && steps.some((step) => step.content);

  // Determine separator classes based on orientation and labelPosition
  const getSeparatorClasses = (index: number, totalSteps: number) => {
    if (index >= totalSteps - 1) return "";

    const { orientation = "horizontal" } = props;

    if (orientation === "vertical") {
      // Vertical stepper - separator positioning
      if (labelPosition === "top" || labelPosition === "bottom") {
        return "ds:-order-1 ds:-z-10 ds:absolute ds:inset-y-0 ds:top-7 ds:left-1/2 ds:-translate-x-1/2 ds:h-full";
      } else if (labelPosition === "left") {
        return "ds:-order-1 ds:-z-10 ds:absolute ds:inset-y-0 ds:top-7 ds:right-0 ds:translate-x-1/2 ds:h-full";
      } else {
        // right (default)
        return "ds:-order-1 ds:-z-10 ds:absolute ds:inset-y-0 ds:top-7 ds:left-3.5 ds:-translate-x-1/2 ds:h-full";
      }
    }

    // Horizontal stepper - separator is handled by the Separator component itself
    return "";
  };

  return (
    <StepperRoot
      {...props}
      color={color}
      customColor={customColor}
      variant={variant}
      labelPosition={labelPosition}
    >
      {steps && steps.length > 0 && (
        <StepperList>
          {steps.map((step, index) => (
            <StepperItem
              key={step.value}
              value={step.value}
              completed={step.completed}
              disabled={step.disabled}
            >
              <StepperTrigger
                className={cn({
                  "ds:not-last:pb-6":
                    index < steps.length - 1 &&
                    props.orientation === "vertical",
                })}
              >
                <StepperIndicator />
                <div
                  className={cn("ds:flex ds:flex-col ds:gap-1", {
                    "ds:text-center":
                      labelPosition === "top" || labelPosition === "bottom",
                    "ds:text-left": labelPosition === "right",
                    "ds:text-right": labelPosition === "left",
                  })}
                >
                  <StepperTitle>{step.title}</StepperTitle>
                  {step.description && (
                    <StepperDescription>{step.description}</StepperDescription>
                  )}
                </div>
              </StepperTrigger>
              {index < steps.length - 1 && (
                <StepperSeparator
                  className={getSeparatorClasses(index, steps.length)}
                />
              )}
            </StepperItem>
          ))}
        </StepperList>
      )}
      {hasStepContent
        ? steps?.map(
            (step) =>
              step.content && (
                <StepperContent key={step.value} value={step.value}>
                  {step.content}
                </StepperContent>
              )
          )
        : children}
    </StepperRoot>
  );
}

export { StepperWrapper };
export type { StepperWrapperProps, Step };
