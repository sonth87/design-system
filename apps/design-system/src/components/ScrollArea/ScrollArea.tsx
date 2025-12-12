import React, { useEffect, useRef } from "react";
import {
  ScrollArea as SScrollArea,
  ScrollBar as SScrollBar,
} from "@dsui/ui/components/scroll-area";
import { cn } from "@dsui/ui/lib/utils";

export interface ScrollAreaProps
  extends React.ComponentProps<typeof SScrollArea> {
  /**
   * Type of scroll snap behavior
   * @default undefined
   */
  snapType?:
    | "none"
    | "x"
    | "y"
    | "both"
    | "x mandatory"
    | "y mandatory"
    | "both mandatory"
    | "x proximity"
    | "y proximity"
    | "both proximity";
  /**
   * Additional className for the viewport (where scroll happens)
   */
  viewportClassName?: string;
}

export type ScrollBarProps = React.ComponentProps<typeof SScrollBar>;

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, snapType, viewportClassName, ...props }, ref) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const snapClass = React.useMemo(() => {
      if (!snapType || snapType === "none") return "snap-none";

      const [axis, alignment] = snapType.split(" ");
      return cn(`snap-${axis}`, alignment && `snap-${alignment}`);
    }, [snapType]);

    // const snapClass = snapType
    //   ? snapType === "none"
    //     ? "snap-none"
    //     : snapType === "x"
    //       ? "snap-x"
    //       : snapType === "y"
    //         ? "snap-y"
    //         : snapType === "both"
    //           ? "snap-both"
    //           : snapType === "x mandatory"
    //             ? "snap-x snap-mandatory"
    //             : snapType === "y mandatory"
    //               ? "snap-y snap-mandatory"
    //               : snapType === "both mandatory"
    //                 ? "snap-both snap-mandatory"
    //                 : snapType === "x proximity"
    //                   ? "snap-x snap-proximity"
    //                   : snapType === "y proximity"
    //                     ? "snap-y snap-proximity"
    //                     : snapType === "both proximity"
    //                       ? "snap-both snap-proximity"
    //                       : ""
    //   : "";

    useEffect(() => {
      if (scrollAreaRef.current && (snapClass || viewportClassName)) {
        const viewport = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (viewport) {
          const classes = cn(snapClass, viewportClassName);
          if (classes) {
            viewport.className = cn(viewport.className, classes);
          }
        }
      }
    }, [snapClass, viewportClassName]);

    return (
      <SScrollArea
        ref={(node) => {
          scrollAreaRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </SScrollArea>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, ...props }, ref) => {
    return <SScrollBar ref={ref} className={cn(className)} {...props} />;
  }
);
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
export default ScrollArea;
