"use client";

import * as React from "react";
import {
  Root,
  Portal,
  Step,
  Arrow,
  Header,
  Title,
  Description,
  Close,
  Footer,
  Prev,
  Next,
  Skip,
  StepCounter,
  Spotlight,
  SpotlightRing,
} from "./Tour";
import type { TourProps } from "./Tour";

interface TourStep {
  target: string | React.RefObject<HTMLElement> | HTMLElement;
  title: string;
  description?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  alignOffset?: number;
  sideOffset?: number;
  collisionBoundary?: Element | null | Array<Element | null>;
  collisionPadding?:
    | number
    | Partial<Record<"top" | "right" | "bottom" | "left", number>>;
  arrowPadding?: number;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  avoidCollisions?: boolean;
  required?: boolean;
  forceMount?: boolean;
  hideArrow?: boolean;
  hideClose?: boolean;
  hideFooter?: boolean;
  hideSkip?: boolean;
  hideStepCounter?: boolean;
  content?: React.ReactNode;
  onStepEnter?: () => void;
  onStepLeave?: () => void;
}

interface ButtonConfig {
  skip?: string;
  prev?: string;
  next?: string;
  finish?: string;
}

interface TourWrapperProps extends Omit<TourProps, "children"> {
  steps?: TourStep[];
  children?: React.ReactNode;
  showSpotlight?: boolean;
  showSpotlightRing?: boolean;
  spotlightClassName?: string;
  spotlightRingClassName?: string;
  buttonConfig?: ButtonConfig;
}

function TourWrapper({
  steps,
  children,
  showSpotlight = true,
  showSpotlightRing = true,
  spotlightClassName,
  spotlightRingClassName,
  buttonConfig,
  ...props
}: TourWrapperProps) {
  return (
    <Root {...props}>
      <Portal>
        {showSpotlight && (
          <>
            <Spotlight className={spotlightClassName} />
            {showSpotlightRing && (
              <SpotlightRing className={spotlightRingClassName} />
            )}
          </>
        )}

        {steps &&
          steps.length > 0 &&
          steps.map((step, index) => (
            <Step
              key={index}
              target={step.target}
              side={step.side}
              align={step.align}
              alignOffset={step.alignOffset}
              sideOffset={step.sideOffset}
              collisionBoundary={step.collisionBoundary}
              collisionPadding={step.collisionPadding}
              arrowPadding={step.arrowPadding}
              sticky={step.sticky}
              hideWhenDetached={step.hideWhenDetached}
              avoidCollisions={step.avoidCollisions}
              required={step.required}
              forceMount={step.forceMount}
              onStepEnter={step.onStepEnter}
              onStepLeave={step.onStepLeave}
            >
              {!step.hideArrow && <Arrow />}
              <Header>
                <Title>{step.title}</Title>
                {!step.hideClose && <Close />}
              </Header>
              {step.description && (
                <Description>{step.description}</Description>
              )}
              {step.content && <div className="py-2">{step.content}</div>}
              {!step.hideFooter && (
                <Footer>
                  <div className="flex items-center gap-2">
                    {!step.hideStepCounter && <StepCounter />}
                    {!step.hideSkip &&
                      index === 0 &&
                      (buttonConfig?.skip ? (
                        <Skip>{buttonConfig.skip}</Skip>
                      ) : (
                        <Skip />
                      ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {index > 0 &&
                      (buttonConfig?.prev ? (
                        <Prev>{buttonConfig.prev}</Prev>
                      ) : (
                        <Prev />
                      ))}
                    {buttonConfig?.next ? (
                      index === steps.length - 1 && buttonConfig?.finish ? (
                        <Next>{buttonConfig.finish}</Next>
                      ) : (
                        <Next>{buttonConfig.next}</Next>
                      )
                    ) : (
                      <Next />
                    )}
                  </div>
                </Footer>
              )}
            </Step>
          ))}
      </Portal>

      {children}
    </Root>
  );
}

export { TourWrapper };
export type { TourWrapperProps, TourStep, ButtonConfig };
