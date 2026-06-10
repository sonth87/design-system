import type { Table } from "@tanstack/react-table";

import { Select } from "../Select";
import { Pagination } from "../Pagination";
import { cn } from "@dsui/ui/lib/utils";

export interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  showPagination?: boolean;
  showPageSizeOptions?: boolean;
  showRowSelectionCount?: boolean;
  showPageInfo?: boolean;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 30, 40, 50, 100],
  className,
  showPageInfo = false,
  showPageSizeOptions = false,
  showRowSelectionCount = false,
  showPagination = true,
  ...props
}: DataTablePaginationProps<TData>) {
  return (
    <div
      className={cn(
        "ds:flex ds:w-full ds:flex-col-reverse ds:items-center ds:justify-between ds:gap-4 ds:overflow-auto ds:p-1 ds:sm:flex-row ds:sm:gap-8",
        className
      )}
      {...props}
    >
      <div className="ds:flex-1 ds:whitespace-nowrap ds:text-muted-foreground ds:text-sm">
        {showRowSelectionCount && (
          <>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </>
        )}
      </div>
      <div className="ds:flex ds:flex-col-reverse ds:items-center ds:gap-2 ds:sm:flex-row ds:sm:gap-2 ds:lg:gap-4">
        {showPageInfo && (
          <div className="ds:flex ds:items-center ds:justify-center ds:font-medium ds:text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        )}

        {showPagination && (
          <Pagination
            total={table.getPageCount()}
            currentPage={table.getState().pagination.pageIndex + 1}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            maxPages={3}
            previousText={false}
            nextText={false}
            jumpOnEllipsis
            showPreviousNext={true}
          />
        )}

        {showPageSizeOptions && (
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            options={pageSizeOptions.map((pageSize) => ({
              value: `${pageSize}`,
              label: `${pageSize} / page`,
            }))}
          />
        )}
      </div>
    </div>
  );
}
