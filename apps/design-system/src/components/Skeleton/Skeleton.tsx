import React from "react";
import { Skeleton as SSkeleton } from "@dsui/ui/components/skeleton";
import { cn } from "@dsui/ui/lib/utils";

export type SkeletonProps = React.ComponentProps<typeof SSkeleton>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return <SSkeleton ref={ref} className={cn(className)} {...props} />;
  },
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
