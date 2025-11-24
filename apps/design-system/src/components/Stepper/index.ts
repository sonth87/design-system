import {
  StepperRoot,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
  StepperContent,
  StepperPrev,
  StepperNext,
  //
  useStepper,
  //
  type StepperProps,
} from "./Stepper";
import { StepperWrapper } from "./StepperWrapper";

const Stepper = Object.assign(StepperWrapper, {
  Root: StepperRoot,
  List: StepperList,
  Item: StepperItem,
  Trigger: StepperTrigger,
  Indicator: StepperIndicator,
  Separator: StepperSeparator,
  Title: StepperTitle,
  Description: StepperDescription,
  Content: StepperContent,
  Prev: StepperPrev,
  Next: StepperNext,
});

export { Stepper, useStepper };
export type { StepperProps };
