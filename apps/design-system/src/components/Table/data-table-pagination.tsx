import type { Table } from "@tanstack/react-table";

import { Select } from "../Select";
import { Pagination } from "../Pagination";
import { cn } from "@dsui/ui/lib/utils";

export interface DataTablePaginationProps<
  TData,
> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  showPagination?: boolean;
  showPageSizeOptions?: boolean;
  showRowSelectionCount?: boolean;
  showPageInfo?: boolean;
  /**
   * Shows "start - end from filteredCount[ / totalCount]" when nothing is selected.
   * `filteredCount` comes from `table.getRowCount()` — pass `rowCount` as a table
   * option (e.g. in `useDataTable`/`useReactTable`) for server-side pagination so
   * it reflects the true filtered total instead of just the loaded page.
   */
  showTotalCount?: boolean;
  /** Grand total across the whole (unfiltered) dataset, e.g. from a server response. Omit if unknown. */
  totalCount?: number;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 30, 40, 50, 100],
  className,
  showPageInfo = false,
  showPageSizeOptions = false,
  showRowSelectionCount = false,
  showTotalCount = false,
  totalCount,
  showPagination = true,
  ...props
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  // Respects an externally-supplied `rowCount` table option (server-side
  // pagination); falls back to the client-computed filtered row count otherwise.
  const filteredCount = table.getRowCount();
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const rangeStart = filteredCount === 0 ? 0 : pageIndex * pageSize + 1;
  const rangeEnd = Math.min(rangeStart + pageSize - 1, filteredCount);

  return (
    <div
      className={cn(
        "ds:flex ds:w-full ds:flex-col-reverse ds:items-center ds:justify-between ds:gap-4 ds:overflow-auto ds:p-1 ds:sm:flex-row ds:sm:gap-8",
        className
      )}
      {...props}
    >
      <div className="ds:flex-1 ds:whitespace-nowrap ds:text-muted-foreground ds:text-sm">
        {showRowSelectionCount && selectedCount > 0 ? (
          <>
            {selectedCount} of {filteredCount} row(s) selected.
          </>
        ) : (
          showTotalCount && (
            <>
              Hiển thị <strong>{rangeStart} - {rangeEnd}</strong>
              {typeof totalCount === "number" && ` / ${totalCount}`}
            </>
          )
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
              label: `${pageSize} / trang`,
            }))}
          />
        )}
      </div>
    </div>
  );
}
