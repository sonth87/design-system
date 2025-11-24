import CommandWrapper, {
  type CommandProps,
  type CommandItemType,
} from "./Command";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
} from "@dsui/ui/components/command";

const Command = Object.assign(CommandWrapper, {
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Separator: CommandSeparator,
  Item: CommandItem,
  Shortcut: CommandShortcut,
});

export { Command };
export type { CommandProps, CommandItemType };
