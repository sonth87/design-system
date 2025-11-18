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
  ...props
}: MarqueeWrapperProps) {
  const hasItems = items && items.length > 0;
  const hasChildren = React.Children.count(children) > 0;

  if (hasItems && hasChildren) {
    console.warn(
      "Marquee: Both 'items' and 'children' are provided. 'items' will be used.",
    );
  }

  if (hasItems) {
    return (
      <Root {...props}>
        <Content>
          {items.map((item, index) => (
            <Item key={index}>{item}</Item>
          ))}
        </Content>
        {fade && <Edge side="left" />}
        {fade && <Edge side="right" />}
      </Root>
    );
  }

  return <Root {...props}>{children}</Root>;
}

export { MarqueeWrapper };
export type { MarqueeWrapperProps };
