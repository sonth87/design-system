import DropdownMenuWrapper, { type DropdownMenuProps } from "./DropdownMenu";
import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@dsui/ui/components/dropdown-menu";

const DropdownMenu = Object.assign(DropdownMenuWrapper, {
  // Primitives
  Root: DropdownMenuPrimitive,
  Portal: DropdownMenuPortal,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Group: DropdownMenuGroup,
  Label: DropdownMenuLabel,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
});

export { DropdownMenu };
export type { DropdownMenuProps, DropdownMenuItem };
