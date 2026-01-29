"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {
  ChevronRight,
  Check,
  Minus,
  SquarePlus,
  SquareMinus,
} from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

const treeVariants = cva(
  "group hover:before:opacity-100 before:absolute before:rounded-lg before:left-0 pr-2 before:w-full before:opacity-0 before:bg-accent/70 before:h-[2rem] before:-z-10"
);

const selectedTreeVariants = cva(
  "before:opacity-100 before:bg-accent/70 text-accent-foreground"
);

const DEFAULT_SELECTED_IDS: string[] = [];

interface TreeDataItem {
  id: string;
  name: string;
  icon?: any;
  selectedIcon?: any;
  openIcon?: any;
  children?: TreeDataItem[];
  actions?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
}

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem[] | TreeDataItem;
  initialSelectedItemId?: string;
  onSelectChange?: (item: TreeDataItem | undefined) => void;
  expandAll?: boolean;
  defaultNodeIcon?: any;
  defaultLeafIcon?: any;
  multiSelect?: boolean;
  selectedIds?: string[];
  onMultiSelectChange?: (selectedIds: string[]) => void;
  showIcon?: boolean;
  showLeafIcon?: boolean;
  treeLine?: boolean | "full";
  expandOnArrowClick?: boolean;
  indicatorVariant?: "arrow" | "plus-minus";
  customExpandIcon?: React.ElementType;
  customCollapseIcon?: React.ElementType;
};

const TreeView = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      data,
      initialSelectedItemId,
      onSelectChange,
      expandAll,
      defaultLeafIcon,
      defaultNodeIcon,
      className,
      multiSelect = false,
      selectedIds = DEFAULT_SELECTED_IDS,
      onMultiSelectChange,
      showIcon = true,
      showLeafIcon = true,
      treeLine = false,
      expandOnArrowClick = false,
      indicatorVariant = "arrow",
      customExpandIcon,
      customCollapseIcon,
      ...props
    },
    ref
  ) => {
    const [selectedItemId, setSelectedItemId] = React.useState<
      string | undefined
    >(initialSelectedItemId);

    const [checkedIds, setCheckedIds] = React.useState<string[]>(selectedIds);

    React.useEffect(() => {
      setCheckedIds(selectedIds);
    }, [selectedIds]);

    const handleSelectChange = React.useCallback(
      (item: TreeDataItem | undefined) => {
        setSelectedItemId(item?.id);
        if (onSelectChange) {
          onSelectChange(item);
        }
      },
      [onSelectChange]
    );

    const handleCheckChange = React.useCallback(
      (item: TreeDataItem, checked: boolean) => {
        const getAllChildIds = (node: TreeDataItem): string[] => {
          const ids = [node.id];
          if (node.children) {
            node.children.forEach((child) => {
              ids.push(...getAllChildIds(child));
            });
          }
          return ids;
        };

        const newCheckedIds = checked
          ? [...checkedIds, ...getAllChildIds(item)]
          : checkedIds.filter((id) => !getAllChildIds(item).includes(id));

        const uniqueIds = Array.from(new Set(newCheckedIds));
        setCheckedIds(uniqueIds);
        if (onMultiSelectChange) {
          onMultiSelectChange(uniqueIds);
        }
      },
      [checkedIds, onMultiSelectChange]
    );

    const expandedItemIds = React.useMemo(() => {
      const ids: string[] = [];

      if (expandAll) {
        const collectAllIds = (nodes: TreeDataItem[] | TreeDataItem) => {
          const items = Array.isArray(nodes) ? nodes : [nodes];
          items.forEach((node) => {
            if (node.children && node.children.length > 0) {
              ids.push(node.id);
              collectAllIds(node.children);
            }
          });
        };
        collectAllIds(data);
      } else if (initialSelectedItemId) {
        const findPath = (
          nodes: TreeDataItem[] | TreeDataItem,
          targetId: string
        ): boolean => {
          const items = Array.isArray(nodes) ? nodes : [nodes];
          for (const node of items) {
            if (node.id === targetId) return true;
            if (node.children) {
              if (findPath(node.children, targetId)) {
                ids.push(node.id);
                return true;
              }
            }
          }
          return false;
        };
        findPath(data, initialSelectedItemId);
      }

      return ids;
    }, [data, expandAll, initialSelectedItemId]);

    return (
      <div className={cn("overflow-hidden relative p-2", className)}>
        <TreeItem
          data={data}
          ref={ref}
          selectedItemId={selectedItemId}
          handleSelectChange={handleSelectChange}
          expandedItemIds={expandedItemIds}
          defaultLeafIcon={defaultLeafIcon}
          defaultNodeIcon={defaultNodeIcon}
          multiSelect={multiSelect}
          checkedIds={checkedIds}
          handleCheckChange={handleCheckChange}
          showIcon={showIcon}
          showLeafIcon={showLeafIcon}
          treeLine={treeLine}
          expandOnArrowClick={expandOnArrowClick}
          indicatorVariant={indicatorVariant}
          customExpandIcon={customExpandIcon}
          customCollapseIcon={customCollapseIcon}
          isRoot
          {...props}
        />
      </div>
    );
  }
);
TreeView.displayName = "TreeView";

type TreeItemProps = TreeProps & {
  selectedItemId?: string;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  defaultNodeIcon?: any;
  defaultLeafIcon?: any;
  checkedIds?: string[];
  handleCheckChange?: (item: TreeDataItem, checked: boolean) => void;
  showIcon?: boolean;
  showLeafIcon?: boolean;
  treeLine?: boolean | "full";
  expandOnArrowClick?: boolean;
  indicatorVariant?: "arrow" | "plus-minus";
  customExpandIcon?: React.ElementType;
  customCollapseIcon?: React.ElementType;
  isRoot?: boolean;
};

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      data,
      selectedItemId,
      handleSelectChange,
      expandedItemIds,
      defaultNodeIcon,
      defaultLeafIcon,
      multiSelect,
      checkedIds,
      handleCheckChange,
      showIcon,
      showLeafIcon,
      treeLine,
      expandOnArrowClick,
      indicatorVariant,
      customExpandIcon,
      customCollapseIcon,
      isRoot,
      ...props
    },
    ref
  ) => {
    if (!(data instanceof Array)) {
      data = [data];
    }
    return (
      <div ref={ref} role="tree" className={className} {...props}>
        <ul>
          {data.map((item, index) => (
            <li key={item.id} className="relative">
              {item.children ? (
                <TreeNode
                  item={item}
                  selectedItemId={selectedItemId}
                  expandedItemIds={expandedItemIds}
                  handleSelectChange={handleSelectChange}
                  defaultNodeIcon={defaultNodeIcon}
                  defaultLeafIcon={defaultLeafIcon}
                  multiSelect={multiSelect}
                  checkedIds={checkedIds}
                  handleCheckChange={handleCheckChange}
                  showIcon={showIcon}
                  treeLine={treeLine}
                  expandOnArrowClick={expandOnArrowClick}
                  indicatorVariant={indicatorVariant}
                  customExpandIcon={customExpandIcon}
                  customCollapseIcon={customCollapseIcon}
                  isLastChild={index === (data as TreeDataItem[]).length - 1}
                  isRoot={isRoot}
                />
              ) : (
                <TreeLeaf
                  item={item}
                  selectedItemId={selectedItemId}
                  handleSelectChange={handleSelectChange}
                  defaultLeafIcon={defaultLeafIcon}
                  multiSelect={multiSelect}
                  checkedIds={checkedIds}
                  handleCheckChange={handleCheckChange}
                  showLeafIcon={showLeafIcon}
                  treeLine={treeLine}
                  isLastChild={index === (data as TreeDataItem[]).length - 1}
                  isRoot={isRoot}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
TreeItem.displayName = "TreeItem";

const TreeNode = ({
  item,
  handleSelectChange,
  expandedItemIds,
  selectedItemId,
  defaultNodeIcon,
  defaultLeafIcon,
  multiSelect,
  checkedIds = [],
  handleCheckChange,
  showIcon = true,
  treeLine = false,
  expandOnArrowClick = false,
  indicatorVariant = "arrow",
  customExpandIcon,
  customCollapseIcon,
  isLastChild,
  isRoot,
}: {
  item: TreeDataItem;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  selectedItemId?: string;
  defaultNodeIcon?: any;
  defaultLeafIcon?: any;
  multiSelect?: boolean;
  checkedIds?: string[];
  handleCheckChange?: (item: TreeDataItem, checked: boolean) => void;
  showIcon?: boolean;
  treeLine?: boolean | "full";
  expandOnArrowClick?: boolean;
  indicatorVariant?: "arrow" | "plus-minus";
  customExpandIcon?: React.ElementType;
  customCollapseIcon?: React.ElementType;
  isLastChild?: boolean;
  isRoot?: boolean;
}) => {
  const [value, setValue] = React.useState<string[]>(
    expandedItemIds.includes(item.id) ? [item.id] : []
  );

  React.useEffect(() => {
    if (expandedItemIds.includes(item.id)) {
      setValue((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    } else {
      setValue((prev) => prev.filter((id) => id !== item.id));
    }
  }, [expandedItemIds, item.id]);

  // Get all descendant IDs - memoized separately to avoid recalculation
  const allDescendantIds = React.useMemo(() => {
    const getAllDescendantIds = (node: TreeDataItem): string[] => {
      const ids: string[] = [];
      if (node.children) {
        node.children.forEach((child) => {
          ids.push(child.id);
          ids.push(...getAllDescendantIds(child));
        });
      }
      return ids;
    };
    return item.children ? getAllDescendantIds(item) : [];
    // We only want to recalculate when item structure changes, not on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  // Check if this node is checked
  const isChecked = React.useMemo(() => {
    if (!checkedIds) return false;

    // If the node itself is in checkedIds
    if (checkedIds.includes(item.id)) return true;

    // If all descendants are checked, consider this node as checked
    if (!item.children || item.children.length === 0) return false;
    if (allDescendantIds.length === 0) return false;

    // All descendants must be checked
    return allDescendantIds.every((id) => checkedIds.includes(id));
    // item.children check is done inside allDescendantIds calculation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedIds, item.id, allDescendantIds]);

  const isIndeterminate = React.useMemo(() => {
    if (!multiSelect || !item.children || !checkedIds) return false;
    if (isChecked) return false; // If node is fully checked, not indeterminate

    const checkedDescendants = allDescendantIds.filter((id) =>
      checkedIds.includes(id)
    );

    // Indeterminate if some (but not all) descendants are checked
    return (
      checkedDescendants.length > 0 &&
      checkedDescendants.length < allDescendantIds.length
    );
    // item.children check is done inside allDescendantIds calculation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiSelect, checkedIds, isChecked, allDescendantIds]);

  return (
    <AccordionPrimitive.Root
      type="multiple"
      value={value}
      onValueChange={(s: string[]) => setValue(s)}
    >
      <AccordionPrimitive.Item value={item.id} className="relative">
        {treeLine === "full" && (
          <div
            className={cn(
              "absolute left-[-1.05rem] w-px bg-border",
              isLastChild ? "h-5" : "h-full",
              isRoot && "hidden"
            )}
          >
            <div className="absolute left-0 top-5 w-4 h-px bg-border" />
          </div>
        )}
        <div
          className={cn(
            "flex items-center relative",
            !expandOnArrowClick && treeVariants(),
            !expandOnArrowClick &&
              selectedItemId === item.id &&
              selectedTreeVariants()
          )}
        >
          <AccordionPrimitive.Header className="flex items-center w-full">
            <AccordionPrimitive.Trigger
              asChild
              onClick={(e) => {
                if (expandOnArrowClick) {
                  e.stopPropagation();
                }
              }}
            >
              <div
                className={cn(
                  "flex items-center p-2 transition-all gap-1",
                  indicatorVariant === "arrow" &&
                    !customExpandIcon &&
                    !customCollapseIcon &&
                    "[&[data-state=open]>svg:first-of-type]:rotate-90",
                  expandOnArrowClick
                    ? "hover:bg-accent/50 rounded-sm cursor-pointer"
                    : "flex-1 cursor-pointer"
                )}
              >
                <IndicatorIcon
                  variant={indicatorVariant}
                  isOpen={value.includes(item.id)}
                  customExpand={customExpandIcon}
                  customCollapse={customCollapseIcon}
                />
                {!expandOnArrowClick && (
                  <>
                    {multiSelect && (
                      <CheckboxPrimitive.Root
                        checked={
                          isChecked
                            ? true
                            : isIndeterminate
                              ? "indeterminate"
                              : false
                        }
                        onCheckedChange={(checked) => {
                          handleCheckChange?.(item, checked === true);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="mr-2 h-4 w-4 shrink-0 rounded-sm border border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground"
                      >
                        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                          {isIndeterminate ? (
                            <Minus className="h-3 w-3" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )}
                        </CheckboxPrimitive.Indicator>
                      </CheckboxPrimitive.Root>
                    )}
                    {showIcon && (
                      <TreeIcon
                        item={item}
                        isSelected={selectedItemId === item.id}
                        isOpen={value.includes(item.id)}
                        default={defaultNodeIcon}
                      />
                    )}
                    <span className="text-sm truncate">{item.name}</span>
                  </>
                )}
              </div>
            </AccordionPrimitive.Trigger>
            {expandOnArrowClick && (
              <div
                className={cn(
                  "flex items-center flex-1 py-2 cursor-pointer",
                  treeVariants(),
                  selectedItemId === item.id && selectedTreeVariants()
                )}
                onClick={() => {
                  if (!multiSelect) {
                    handleSelectChange(item);
                    item.onClick?.();
                  }
                }}
              >
                {multiSelect && (
                  <CheckboxPrimitive.Root
                    checked={
                      isChecked
                        ? true
                        : isIndeterminate
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={(checked) => {
                      handleCheckChange?.(item, checked === true);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="mr-2 h-4 w-4 shrink-0 rounded-sm border border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground"
                  >
                    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                      {isIndeterminate ? (
                        <Minus className="h-3 w-3" />
                      ) : (
                        <Check className="h-3 w-3" />
                      )}
                    </CheckboxPrimitive.Indicator>
                  </CheckboxPrimitive.Root>
                )}
                {showIcon && (
                  <TreeIcon
                    item={item}
                    isSelected={selectedItemId === item.id}
                    isOpen={value.includes(item.id)}
                    default={defaultNodeIcon}
                  />
                )}
                <span className="text-sm truncate">{item.name}</span>
              </div>
            )}
            <TreeActions
              isSelected={selectedItemId === item.id}
              className={cn(expandOnArrowClick && "right-1")}
            >
              {item.actions}
            </TreeActions>
          </AccordionPrimitive.Header>
        </div>
        <AccordionContent
          className={cn(
            "ml-4 pl-1",
            treeLine === true && "border-l",
            treeLine === "full" && "pl-2 border-l ml-4"
          )}
        >
          <TreeItem
            data={item.children ? item.children : item}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            defaultLeafIcon={defaultLeafIcon}
            defaultNodeIcon={defaultNodeIcon}
            multiSelect={multiSelect}
            checkedIds={checkedIds}
            handleCheckChange={handleCheckChange}
            showIcon={showIcon}
            showLeafIcon={showIcon}
            treeLine={treeLine}
            expandOnArrowClick={expandOnArrowClick}
            indicatorVariant={indicatorVariant}
            customExpandIcon={customExpandIcon}
            customCollapseIcon={customCollapseIcon}
          />
        </AccordionContent>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
};

const TreeLeaf = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    item: TreeDataItem;
    selectedItemId?: string;
    handleSelectChange: (item: TreeDataItem | undefined) => void;
    defaultLeafIcon?: any;
    multiSelect?: boolean;
    checkedIds?: string[];
    handleCheckChange?: (item: TreeDataItem, checked: boolean) => void;
    showLeafIcon?: boolean;
    treeLine?: boolean | "full";
    isLastChild?: boolean;
    isRoot?: boolean;
  }
>(
  (
    {
      className,
      item,
      selectedItemId,
      handleSelectChange,
      defaultLeafIcon,
      multiSelect,
      checkedIds,
      handleCheckChange,
      showLeafIcon = true,
      treeLine = false,
      isLastChild,
      isRoot,
      ...props
    },
    ref
  ) => {
    const isChecked = checkedIds?.includes(item.id);

    return (
      <div
        ref={ref}
        className={cn(
          "ml-5 flex text-left items-center py-2 cursor-pointer before:right-1",
          treeLine === "full" && "ml-[1.25rem]",
          treeVariants(),
          className,
          selectedItemId === item.id && selectedTreeVariants(),
          item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
        onClick={() => {
          if (item.disabled) return;
          if (!multiSelect) {
            handleSelectChange(item);
            item.onClick?.();
          }
        }}
        {...props}
      >
        {treeLine === "full" && (
          <div
            className={cn(
              "absolute left-[-1.05rem] w-px bg-border",
              isLastChild ? "h-1/2" : "h-full",
              isRoot && "hidden"
            )}
          >
            <div className="absolute left-0 top-1/2 w-4 h-px bg-border" />
          </div>
        )}
        {multiSelect && (
          <CheckboxPrimitive.Root
            checked={isChecked}
            onCheckedChange={(checked) => {
              handleCheckChange?.(item, checked === true);
            }}
            disabled={item.disabled}
            onClick={(e) => e.stopPropagation()}
            className="mr-2 h-4 w-4 shrink-0 rounded-sm border border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
              <Check className="h-3 w-3" />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        )}
        {showLeafIcon && (
          <TreeIcon
            item={item}
            isSelected={selectedItemId === item.id}
            default={defaultLeafIcon}
          />
        )}
        <span className="grow text-sm truncate">{item.name}</span>
        <TreeActions isSelected={selectedItemId === item.id && !item.disabled}>
          {item.actions}
        </TreeActions>
      </div>
    );
  }
);
TreeLeaf.displayName = "TreeLeaf";

const AccordionTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger asChild {...props}>
      <div
        ref={ref}
        className={cn(
          "flex flex-1 w-full items-center py-2 transition-all first:[&[data-state=open]>svg]:first-of-type:rotate-90",
          className
        )}
      >
        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50" />
        {children}
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-1 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const TreeIcon = ({
  item,
  isOpen,
  isSelected,
  default: defaultIcon,
}: {
  item: TreeDataItem;
  isOpen?: boolean;
  isSelected?: boolean;
  default?: any;
}) => {
  let Icon = defaultIcon;
  if (isSelected && item.selectedIcon) {
    Icon = item.selectedIcon;
  } else if (isOpen && item.openIcon) {
    Icon = item.openIcon;
  } else if (item.icon) {
    Icon = item.icon;
  }
  return Icon ? <Icon className="h-4 w-4 shrink-0 mr-2" /> : <></>;
};

const TreeActions = ({
  children,
  isSelected,
  className,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        isSelected ? "block" : "hidden",
        "absolute right-3 group-hover:block",
        className
      )}
    >
      {children}
    </div>
  );
};

const IndicatorIcon = ({
  variant,
  isOpen,
  customExpand: CustomExpand,
  customCollapse: CustomCollapse,
}: {
  variant: "arrow" | "plus-minus";
  isOpen: boolean;
  customExpand?: React.ElementType;
  customCollapse?: React.ElementType;
}) => {
  if (CustomExpand && !isOpen) {
    return (
      <CustomExpand className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50" />
    );
  }
  if (CustomCollapse && isOpen) {
    return (
      <CustomCollapse className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50" />
    );
  }

  if (variant === "plus-minus") {
    return isOpen ? (
      <SquareMinus className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50" />
    ) : (
      <SquarePlus className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50" />
    );
  }

  return (
    <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50" />
  );
};

export { TreeView, type TreeDataItem };
