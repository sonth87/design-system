"use client";

import * as React from "react";
import {
  MasonryRoot,
  MasonryItem,
  type MasonryRootProps,
  type MasonryItemProps,
} from "./Masonry";

/* -------------------------------------------------------------------------------------------------
 * Masonry - Unified wrapper component supporting both declarative and data-driven usage
 * -----------------------------------------------------------------------------------------------*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MasonryItemData = any;

interface MasonryProps<T = MasonryItemData>
  extends Omit<MasonryRootProps, "children"> {
  /**
   * Array of items to render in the masonry grid (data-driven mode)
   * If provided, `renderItem` should also be provided
   */
  items?: T[];
  /**
   * Custom render function for each item (data-driven mode)
   * @param item - The item data
   * @param index - The index of the item
   */
  renderItem?: (_item: T, _index: number) => React.ReactNode;
  /**
   * Children elements (declarative mode)
   * Use `<Masonry.Item>` components as children
   */
  children?: React.ReactNode;
}

function MasonryComponent<T = MasonryItemData>(props: MasonryProps<T>) {
  const { items, renderItem, children, ...rootProps } = props;

  // Data-driven mode: render items using renderItem function
  if (items && items.length > 0) {
    return (
      <MasonryRoot {...rootProps}>
        {items.map((item, index) => {
          const key =
            typeof item === "object" && item !== null && "id" in item
              ? String((item as { id: unknown }).id)
              : index;
          return (
            <MasonryItem key={key}>
              {renderItem ? renderItem(item, index) : null}
            </MasonryItem>
          );
        })}
      </MasonryRoot>
    );
  }

  // Declarative mode: render children directly
  return <MasonryRoot {...rootProps}>{children}</MasonryRoot>;
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

// Re-export MasonryItem as Item for Masonry.Item usage
const Masonry = Object.assign(MasonryComponent, {
  Item: MasonryItem,
  Root: MasonryRoot,
});

export { Masonry, MasonryComponent };
export type { MasonryProps, MasonryItemProps };
