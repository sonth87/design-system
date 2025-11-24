import PopoverWrapper, { type PopoverProps } from "./Popover";
import { PopoverTrigger, PopoverContent } from "@dsui/ui/components/popover";

const Popover = Object.assign(PopoverWrapper, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});

export { Popover };
export type { PopoverProps };
