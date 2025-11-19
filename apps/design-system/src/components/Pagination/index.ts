import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  type PaginationWrapperProps,
  type PaginationItemType,
} from "./Pagination";

const Pagination = Object.assign(PaginationWrapper, {
  Content: PaginationContent,
  Item: PaginationItem,
  Link: PaginationLink,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis,
});

export { Pagination, type PaginationWrapperProps, type PaginationItemType };
