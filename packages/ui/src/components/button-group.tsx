import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";
import { Separator } from "@dsui/ui/components/separator";

const buttonGroupVariants = cva(
  "ds:flex ds:w-fit ds:items-stretch ds:[&>*]:focus-visible:z-10 ds:[&>*]:focus-visible:relative ds:[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit ds:[&>input]:flex-1 ds:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md ds:has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "ds:[&>*:not(:first-child)]:rounded-l-none ds:[&>*:not(:first-child)]:border-l-0 ds:[&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "ds:flex-col ds:[&>*:not(:first-child)]:rounded-t-none ds:[&>*:not(:first-child)]:border-t-0 ds:[&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "ds:bg-muted ds:flex ds:items-center ds:gap-2 ds:rounded-md ds:border ds:px-4 ds:text-sm ds:font-medium ds:shadow-xs ds:[&_svg]:pointer-events-none ds:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "ds:bg-input ds:relative ds:!m-0 ds:self-stretch ds:data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
