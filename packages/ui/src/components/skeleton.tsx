import { cn } from "@dsui/ui/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("ds:bg-ink200 ds:animate-pulse ds:rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
