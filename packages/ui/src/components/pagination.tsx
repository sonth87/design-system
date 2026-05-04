import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@dsui/ui/lib/utils";
import { Button, buttonVariants } from "@dsui/ui/components/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("ds:mx-auto ds:flex ds:w-full ds:justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("ds:flex ds:flex-row ds:items-center ds:gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      {...props}
      className={cn("ds:flex ds:items-center cursor-pointer", props?.className)}
    />
  );
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size" | "color"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  color,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
          color,
        }),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  children,
  size = "normal",
  hideIcon = false,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  children?: React.ReactNode;
  hideIcon?: boolean;
}) {
  const showText =
    !size || (!size.startsWith("icon") && !size.startsWith("circle"));
  const text = children === false ? null : children || "Previous";

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={size}
      className={cn("ds:gap-1 ds:justify-center ds:items-center", className)}
      {...props}
    >
      {!hideIcon && <ChevronLeftIcon />}
      {showText && text && <span>{text}</span>}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  children,
  size = "normal",
  hideIcon = false,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  children?: React.ReactNode;
  hideIcon?: boolean;
}) {
  const showText =
    !size || (!size.startsWith("icon") && !size.startsWith("circle"));
  const text = children === false ? null : children || "Next";

  return (
    <PaginationLink
      aria-label="Go to next page"
      size={size}
      className={cn("ds:gap-1 ds:justify-center ds:items-center", className)}
      {...props}
    >
      {showText && text && <span>{text}</span>}
      {!hideIcon && <ChevronRightIcon />}
    </PaginationLink>
  );
}

function PaginationEllipsis({ ...props }: PaginationLinkProps) {
  return (
    <PaginationLink {...props}>
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </PaginationLink>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
