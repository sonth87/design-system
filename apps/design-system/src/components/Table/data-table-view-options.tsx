"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type {
  Column,
  ColumnOrderState,
  ColumnPinningState,
  Table,
} from "@tanstack/react-table";
import { Check, GripVertical, Settings2 } from "lucide-react";
import * as React from "react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import Command, { type CommandItemType } from "../Command/Command";
import { Popover } from "../Popover";
import { cn } from "@dsui/ui";

export type DataTableViewOptionsVariant = "command" | "draggable";

export interface DataTableViewOptionsLabels {
  trigger?: React.ReactNode;
  searchPlaceholder?: string;
  selectAll?: React.ReactNode;
  reset?: React.ReactNode;
}

export interface DataTableViewOptionsProps<TData> extends React.ComponentProps<
  typeof Popover
> {
  table: Table<TData>;
  variant?: DataTableViewOptionsVariant;
  labels?: DataTableViewOptionsLabels;
  triggerIcon?: React.ReactNode;
}

export function DataTableViewOptions<TData>({
  table,
  variant = "command",
  labels,
  triggerIcon = <Settings2 className="ds:text-muted-foreground" />,
  trigger,
  content,
  contentClassName,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const columnOrder = table.getState().columnOrder;
  const columnPinning = table.getState().columnPinning;

  const columns = React.useMemo(
    () =>
      getOrderedTableColumns(table, columnOrder, columnPinning).filter(
        (column) =>
          typeof column.accessorFn !== "undefined" && column.getCanHide()
      ),
    [table, columnOrder, columnPinning]
  );

  const getColumnLabel = React.useCallback(
    (column: (typeof columns)[number]) =>
      column.columnDef.meta?.label ??
      (typeof column.columnDef.header === "string"
        ? column.columnDef.header
        : column.id),
    []
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columnIds = React.useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const allColumnsVisible = columns.every((column) => column.getIsVisible());
  const someColumnsVisible = columns.some((column) => column.getIsVisible());

  const onToggleAll = React.useCallback(
    (checked: boolean) => {
      columns.forEach((column) => column.toggleVisibility(checked));
    },
    [columns]
  );

  const onDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const oldIndex = columnIds.indexOf(String(active.id));
      const newIndex = columnIds.indexOf(String(over.id));

      if (oldIndex === -1 || newIndex === -1) return;

      const orderedOptionIds = arrayMove(columnIds, oldIndex, newIndex);
      const optionIdSet = new Set(columnIds);
      const pendingOptionIds = [...orderedOptionIds];
      const nextColumnOrder = getOrderedTableColumns(table).map((column) =>
        optionIdSet.has(column.id)
          ? (pendingOptionIds.shift() ?? column.id)
          : column.id
      );
      const currentColumnPinning = table.getState().columnPinning;
      const nextColumnPinning = {
        ...currentColumnPinning,
        left: currentColumnPinning?.left?.filter((id) => !optionIdSet.has(id)),
        right: currentColumnPinning?.right?.filter(
          (id) => !optionIdSet.has(id)
        ),
      };

      table.setColumnOrder(nextColumnOrder);
      table.setColumnPinning(nextColumnPinning);
    },
    [columnIds, table]
  );

  const items: CommandItemType[] = [
    {
      type: "group",
      heading: "",
      items: columns.map((column) => ({
        type: "item" as const,
        onClick: () => column.toggleVisibility(!column.getIsVisible()),
        children: (
          <>
            <span className="ds:truncate">{getColumnLabel(column)}</span>
            <Check
              className={cn(
                "ds:ml-auto ds:size-4 ds:shrink-0",
                column.getIsVisible() ? "ds:opacity-100" : "ds:opacity-0"
              )}
            />
          </>
        ),
      })),
    },
  ];

  const resolvedLabels = {
    trigger: labels?.trigger ?? "View",
    searchPlaceholder: labels?.searchPlaceholder ?? "Search columns...",
    selectAll: labels?.selectAll ?? "Chọn tất cả",
    reset: labels?.reset ?? "Đặt lại",
  };

  const defaultDraggableContent = (
    <div className="ds:flex ds:w-full ds:flex-col">
      <div className="ds:flex ds:items-center ds:gap-3 ds:px-3 ds:py-3">
        <Checkbox
          aria-label="Toggle all columns"
          checked={
            allColumnsVisible
              ? true
              : someColumnsVisible
                ? "indeterminate"
                : false
          }
          onCheckedChange={(checked) => onToggleAll(checked === true)}
        />
        <span className="ds:text-sm ds:font-medium ds:text-foreground">
          {resolvedLabels.selectAll}
        </span>
      </div>
      <div className="ds:mx-3 ds:h-px ds:bg-border" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={columnIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="ds:flex ds:max-h-80 ds:flex-col ds:overflow-y-auto ds:py-2">
            {columns.map((column) => (
              <DataTableDraggableColumnOption
                key={column.id}
                id={column.id}
                label={getColumnLabel(column)}
                checked={column.getIsVisible()}
                onCheckedChange={(checked) =>
                  column.toggleVisibility(checked === true)
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="ds:mx-3 ds:h-px ds:bg-border" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="ds:mx-3 ds:my-2 ds:text-primary hover:ds:text-primary"
        onClick={() => {
          table.resetColumnVisibility();
          table.resetColumnOrder();
          table.resetColumnPinning();
        }}
      >
        {resolvedLabels.reset}
      </Button>
    </div>
  );

  return (
    <Popover
      trigger={
        trigger ?? (
          <Button
            aria-label="Toggle columns"
            role="combobox"
            variant="outline"
            size="sm"
            className="ds:ml-auto ds:h-8 ds:font-normal ds:lg:flex"
          >
            {triggerIcon}
            {resolvedLabels.trigger}
          </Button>
        )
      }
      content={
        content ??
        (variant === "draggable" ? (
          defaultDraggableContent
        ) : (
          <Command items={items} search={resolvedLabels.searchPlaceholder} />
        ))
      }
      contentClassName={cn(
        "ds:p-0",
        variant === "draggable" ? "ds:w-72" : "ds:w-44",
        contentClassName
      )}
      {...props}
    />
  );
}

function getOrderedTableColumns<TData>(
  table: Table<TData>,
  columnOrder: ColumnOrderState = table.getState().columnOrder,
  columnPinning: ColumnPinningState = table.getState().columnPinning
) {
  const allColumns = table.getAllLeafColumns();
  const columnById = new Map(allColumns.map((column) => [column.id, column]));
  const columnIds = allColumns.map((column) => column.id);
  const order = columnOrder ?? [];
  const orderedIds = [
    ...order.filter((id) => columnById.has(id)),
    ...columnIds.filter((id) => !order.includes(id)),
  ];
  const pinning = columnPinning ?? {};
  const leftIds = (pinning.left ?? []).filter((id) => columnById.has(id));
  const rightIds = (pinning.right ?? []).filter((id) => columnById.has(id));
  const pinnedIds = new Set([...leftIds, ...rightIds]);
  const centerIds = orderedIds.filter((id) => !pinnedIds.has(id));

  return [...leftIds, ...centerIds, ...rightIds]
    .map((id) => columnById.get(id))
    .filter((column): column is Column<TData, unknown> => Boolean(column));
}

interface DataTableDraggableColumnOptionProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onCheckedChange: React.ComponentProps<typeof Checkbox>["onCheckedChange"];
}

function DataTableDraggableColumnOption({
  id,
  label,
  checked,
  onCheckedChange,
}: DataTableDraggableColumnOptionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "ds:flex ds:min-h-11 ds:items-center ds:gap-3 ds:px-3 ds:text-sm ds:text-foreground",
        isDragging && "ds:bg-accent"
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <button
        type="button"
        className="ds:flex ds:size-5 ds:shrink-0 ds:cursor-grab ds:items-center ds:justify-center ds:text-muted-foreground active:ds:cursor-grabbing"
        aria-label={`Reorder ${label}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="ds:size-4" />
      </button>
      <Checkbox
        aria-label={`Toggle ${label}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <span className="ds:min-w-0 ds:flex-1 ds:truncate ds:font-medium">
        {label}
      </span>
    </div>
  );
}
