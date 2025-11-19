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
}

function StepperWrapper({ steps, children, ...props }: StepperWrapperProps) {
  const hasStepContent = steps && steps.some((step) => step.content);

  return (
    <Root {...props}>
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
                <div className="flex flex-col gap-1">
                  <Title>{step.title}</Title>
                  {step.description && (
                    <Description>{step.description}</Description>
                  )}
                </div>
              </Trigger>
              {index < steps.length - 1 && (
                <Separator
                  className={cn({
                    "-order-1 -translate-x-1/2 -z-10 absolute inset-y-0 top-5 left-3.5 h-full":
                      props.orientation === "vertical",
                  })}
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
              ),
          )
        : children}
    </Root>
  );
}

export { StepperWrapper };
export type { StepperWrapperProps, Step };
