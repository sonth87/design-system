import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import Checkbox from "@/components/Checkbox";

function createSelectColumn<TData>(
  props?: Partial<ColumnDef<TData>>
): ColumnDef<TData> {
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
    size: 36,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    ...props,
  };
}

export const selectColumn = createSelectColumn;
