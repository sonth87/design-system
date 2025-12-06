import ContextMenuWrapper, { type ContextMenuProps } from "./ContextMenu";
import {
  ContextMenu as ContextMenuPrimitive,
  ContextMenuPortal,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@dsui/ui/components/context-menu";

const ContextMenu = Object.assign(ContextMenuWrapper, {
  // Primitives
  Root: ContextMenuPrimitive,
  Portal: ContextMenuPortal,
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Group: ContextMenuGroup,
  Label: ContextMenuLabel,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
});

export { ContextMenu };
export type { ContextMenuProps };
export type { ContextMenuItem } from "./ContextMenu";
