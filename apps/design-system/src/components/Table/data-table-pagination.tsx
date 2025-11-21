import type { Table } from "@tanstack/react-table";

import { Select } from "../Select";
import { Pagination } from "../Pagination";
import { cn } from "@dsui/ui/index";

interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 30, 40, 50, 100],
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8",
        className
      )}
      {...props}
    >
      <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap font-medium text-sm">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            options={pageSizeOptions.map((pageSize) => ({
              value: `${pageSize}`,
              label: `${pageSize}`,
            }))}
          />
        </div>
        <div className="flex items-center justify-center font-medium text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

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
      </div>
    </div>
  );
}
