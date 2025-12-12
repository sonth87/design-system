import * as React from "react";
import {
  Pagination as SPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@dsui/ui/components/pagination";
import { cn } from "@dsui/ui/lib/utils";
import type { ButtonAnimation } from "@/types/variables";
import { animationEffect } from "@/utils/animations";
import { ChevronsLeft, ChevronsRight, MoreHorizontalIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@dsui/ui/components/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@dsui/ui/components/command";
import type Button from "../Button";

type PaginationItemType =
  | number
  | "..."
  | { page: number; isActive?: boolean; disabled?: boolean };

type PaginationWrapperProps = React.ComponentProps<typeof SPagination> & {
  animation?: ButtonAnimation;
  total?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showPreviousNext?: boolean;
  maxPages?: number; // số pages hiển thị
  previousText?: string | boolean;
  nextText?: string | boolean;
  jumpOnEllipsis?: boolean; // khi hover vào ellipsis thì hiện thành nút next/previous
  jumpType?: "jump" | "select"; // jump type for ellipsis interaction
} & Pick<React.ComponentProps<typeof Button>, "size" | "color">;

type AnimResult = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const generatePages = (
  total: number,
  currentPage: number,
  maxPages: number
): PaginationItemType[] => {
  if (total <= maxPages) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: PaginationItemType[] = [];
  const halfSize = Math.floor(maxPages / 2);
  let start = Math.max(1, currentPage - halfSize);
  const end = Math.min(total, start + maxPages - 1);

  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1);
  }

  // Add first page and ellipsis if needed
  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push("...");
    }
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis and last page if needed
  if (end < total) {
    if (end < total - 1) {
      pages.push("...");
    }
    pages.push(total);
  }

  return pages;
};

const PaginationEllipsisWithJump = ({
  position,
  onJumpPrevious,
  onJumpNext,
  color,
  size,
  previousText,
  nextText,
  jumpType = "jump",
  total,
  onPageChange,
}: {
  position: "before" | "after";
  onJumpPrevious?: () => void;
  onJumpNext?: () => void;
  color?: PaginationWrapperProps["color"];
  size?: PaginationWrapperProps["size"];
  previousText?: React.ReactNode;
  nextText?: React.ReactNode;
  jumpType?: "jump" | "select";
  total?: number;
  onPageChange?: (page: number) => void;
}) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  if (jumpType === "select") {
    return (
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <PaginationItem>
            <PaginationEllipsis size={size} color={color} />
          </PaginationItem>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0">
          <Command>
            <CommandInput placeholder="Search pages..." />
            <CommandList>
              {total &&
                Array.from({ length: total }, (_, i) => i + 1).map((page) => (
                  <CommandItem
                    key={page}
                    onSelect={() => {
                      onPageChange?.(page);
                      setPopoverOpen(false);
                    }}
                  >
                    Page {page}
                  </CommandItem>
                ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <PaginationItem className="group">
      {position === "before" ? (
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onJumpPrevious?.();
          }}
          color={color}
          size={size}
          hideIcon
          className="peer"
        >
          <span className="hidden group-hover:block leading-none">
            {previousText}
          </span>
          <MoreHorizontalIcon className="group-hover:hidden cursor-pointer" />
        </PaginationPrevious>
      ) : (
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onJumpNext?.();
          }}
          color={color}
          size={size}
          hideIcon
        >
          <span className="hidden group-hover:block leading-none">
            {nextText}
          </span>
          <MoreHorizontalIcon className="group-hover:hidden cursor-pointer" />
        </PaginationNext>
      )}
    </PaginationItem>
  );
};

const Pagination = React.forwardRef<HTMLElement, PaginationWrapperProps>(
  (
    {
      className,
      animation,
      total,
      currentPage = 1,
      onPageChange,
      showPreviousNext = true,
      color = "muted",
      size,
      maxPages = 5,
      previousText,
      nextText,
      jumpOnEllipsis = false,
      jumpType = "jump",
      children,
      ...props
    },
    ref
  ) => {
    const paginationAnimation = React.useMemo<AnimResult | null>(() => {
      if (!animation) return null;
      return animationEffect<ButtonAnimation, string | undefined>({
        animation,
        children,
        className,
        rootClassName: "",
        variantType: undefined,
        ...props,
      });
    }, [animation, props, className, children]);

    const getPreviousText = () => {
      if (previousText === false) return false;
      if (previousText === true) return "Previous";
      return previousText;
    };

    const getNextText = () => {
      if (nextText === false) return false;
      if (nextText === true) return "Next";
      return nextText;
    };

    const handleJumpPrevious = () => {
      const newPage = Math.max(1, currentPage - maxPages);
      onPageChange?.(newPage);
    };

    const handleJumpNext = () => {
      const newPage = Math.min(total!, currentPage + maxPages);
      onPageChange?.(newPage);
    };

    const renderItems = () => {
      if (!total) return children;

      const pages = generatePages(total, currentPage, maxPages);

      return (
        <PaginationContent>
          {showPreviousNext && (
            <PaginationItem className="flex justify-center">
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange?.(currentPage - 1);
                }}
                color={color}
                size={size}
              >
                {getPreviousText()}
              </PaginationPrevious>
            </PaginationItem>
          )}
          {pages.map((item, index) => {
            if (item === "...") {
              if (jumpOnEllipsis) {
                // Determine if this ellipsis is before or after the active page
                const ellipsisIndex = index;
                const activePageIndex = pages.findIndex(
                  (page) => typeof page === "number" && page === currentPage
                );
                const position =
                  ellipsisIndex < activePageIndex ? "before" : "after";

                return (
                  <PaginationEllipsisWithJump
                    key={`ellipsis-${index}`}
                    position={position}
                    onJumpPrevious={handleJumpPrevious}
                    onJumpNext={handleJumpNext}
                    color={color}
                    size={size}
                    previousText={<ChevronsLeft />}
                    nextText={<ChevronsRight />}
                    jumpType={jumpType}
                    total={total}
                    onPageChange={onPageChange}
                  />
                );
              }
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis size={size} color={color} />
                </PaginationItem>
              );
            }

            const page = item as number;
            const isActive = page === currentPage;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={isActive}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange?.(page);
                  }}
                  color={color}
                  size={size}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {showPreviousNext && (
            <PaginationItem className="flex justify-center">
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < total) onPageChange?.(currentPage + 1);
                }}
                color={color}
                size={size}
              >
                {getNextText()}
              </PaginationNext>
            </PaginationItem>
          )}
        </PaginationContent>
      );
    };

    return (
      <SPagination
        ref={ref}
        className={cn(className, paginationAnimation?.className)}
        style={{
          ...(props.style || {}),
          ...(paginationAnimation?.style || {}),
        }}
        {...props}
      >
        {paginationAnimation?.children ?? renderItems()}
      </SPagination>
    );
  }
);

Pagination.displayName = "Pagination";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  type PaginationWrapperProps,
  type PaginationItemType,
};
