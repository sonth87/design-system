import { forwardRef } from "react";
import {
  TreeView as DsTreeView,
  type TreeViewProps,
  type TreeDataItem,
} from "@dsui/ui/components/tree-view";

export type TreeSelectProps = TreeViewProps;
export type { TreeDataItem, TreeViewProps };

export const TreeSelect = forwardRef<HTMLDivElement, TreeSelectProps>(
  (props, ref) => {
    return <DsTreeView ref={ref} {...props} />;
  }
);

TreeSelect.displayName = "TreeSelect";

export const TreeView = DsTreeView;
