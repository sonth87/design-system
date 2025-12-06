"use client";

import * as React from "react";
import { Root, Content, Item, Edge } from "./Marquee";
import type { MarqueeRootProps } from "./Marquee";

interface MarqueeWrapperProps extends MarqueeRootProps {
  items?: React.ReactNode[];
  fade?: boolean;
}

function MarqueeWrapper({
  items,
  fade,
  children,
  side = "left",
  ...props
}: MarqueeWrapperProps) {
  const hasItems = items && items.length > 0;
  const hasChildren = React.Children.count(children) > 0;

  if (hasItems && hasChildren) {
    console.warn(
      "Marquee: Both 'items' and 'children' are provided. 'items' will be used.",
    );
  }

  const isVertical = side === "top" || side === "bottom";
  const fadeSides = isVertical ? ["top", "bottom"] : ["left", "right"];

  if (hasItems) {
    return (
      <Root {...props} side={side}>
        <Content>
          {items.map((item, index) => (
            <Item key={index}>{item}</Item>
          ))}
        </Content>
        {fade && (
          <Edge side={fadeSides[0] as "left" | "right" | "top" | "bottom"} />
        )}
        {fade && (
          <Edge side={fadeSides[1] as "left" | "right" | "top" | "bottom"} />
        )}
      </Root>
    );
  }

  return (
    <Root {...props} side={side}>
      {children}
    </Root>
  );
}

export { MarqueeWrapper };
export type { MarqueeWrapperProps };
