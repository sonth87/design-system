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
      className={cn("mx-auto flex w-full justify-center", className)}
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
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
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
        className,
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
      className={cn("gap-1 px-2.5 justify-center", className)}
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
      className={cn("gap-1 px-2.5 justify-center", className)}
      {...props}
    >
      {showText && text && <span>{text}</span>}
      {!hideIcon && <ChevronRightIcon />}
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
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
