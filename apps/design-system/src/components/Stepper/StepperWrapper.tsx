"use client";

import * as React from "react";
import {
  Root,
  List,
  Item,
  Trigger,
  Indicator,
  Separator,
  Title,
  Description,
  Content,
} from "./Stepper";
import type { StepperProps } from "./Stepper";
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
        return "-order-1 -z-10 absolute inset-y-0 top-7 left-1/2 -translate-x-1/2 h-full";
      } else if (labelPosition === "left") {
        return "-order-1 -z-10 absolute inset-y-0 top-7 right-0 translate-x-1/2 h-full";
      } else {
        // right (default)
        return "-order-1 -z-10 absolute inset-y-0 top-7 left-3.5 -translate-x-1/2 h-full";
      }
    }

    // Horizontal stepper - separator is handled by the Separator component itself
    return "";
  };

  return (
    <Root
      {...props}
      color={color}
      customColor={customColor}
      variant={variant}
      labelPosition={labelPosition}
    >
      {steps && steps.length > 0 && (
        <List>
          {steps.map((step, index) => (
            <Item
              key={step.value}
              value={step.value}
              completed={step.completed}
              disabled={step.disabled}
            >
              <Trigger
                className={cn({
                  "not-last:pb-6":
                    index < steps.length - 1 &&
                    props.orientation === "vertical",
                })}
              >
                <Indicator />
                <div
                  className={cn("flex flex-col gap-1", {
                    "text-center":
                      labelPosition === "top" || labelPosition === "bottom",
                    "text-left": labelPosition === "right",
                    "text-right": labelPosition === "left",
                  })}
                >
                  <Title>{step.title}</Title>
                  {step.description && (
                    <Description>{step.description}</Description>
                  )}
                </div>
              </Trigger>
              {index < steps.length - 1 && (
                <Separator
                  className={getSeparatorClasses(index, steps.length)}
                />
              )}
            </Item>
          ))}
        </List>
      )}
      {hasStepContent
        ? steps?.map(
            (step) =>
              step.content && (
                <Content key={step.value} value={step.value}>
                  {step.content}
                </Content>
              )
          )
        : children}
    </Root>
  );
}

export { StepperWrapper };
export type { StepperWrapperProps, Step };
