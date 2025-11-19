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
  Prev,
  Next,
  //
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
  Root,
  List,
  Item,
  Trigger,
  Indicator,
  Separator,
  Title,
  Description,
  Content,
  Prev,
  Next,
  //
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
});

export { Stepper, useStepper };
export type { StepperProps };
