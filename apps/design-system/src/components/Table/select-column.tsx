import type { CellContext, ColumnDef, HeaderContext } from "@tanstack/react-table";
import Checkbox from "@/components/Checkbox";

/**
 * Creates a select column definition for use in DataTable
 * Usage: Add this column to your columns array and the table will automatically
 * render checkboxes for row selection with select all/indeterminate support
 */
export function createSelectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }: HeaderContext<TData, unknown>) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }: CellContext<TData, unknown>) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 50,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  };
}

/**
 * Alternative: ColumnDef object can be used directly
 * This is the pre-defined select column definition
 */
export const selectColumn = createSelectColumn();
