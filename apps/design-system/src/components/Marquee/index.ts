import {
  Content,
  Item,
  Edge,
  //
  MarqueeContent,
  MarqueeItem,
  MarqueeEdge,
  // types
  type MarqueeRootProps,
  type MarqueeEdgeProps,
} from "./Marquee";
import { MarqueeWrapper } from "./MarqueeWrapper";

const Marquee = Object.assign(MarqueeWrapper, {
  Content,
  Item,
  Edge,
  //
  MarqueeContent,
  MarqueeItem,
  MarqueeEdge,
});

export { Marquee };
export type { MarqueeRootProps, MarqueeEdgeProps };
