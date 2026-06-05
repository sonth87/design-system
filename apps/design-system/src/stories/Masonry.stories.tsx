import type { Meta, StoryObj } from "@storybook/react";
import { Masonry } from "../components/Masonry";
import { Skeleton } from "../components/Skeleton";

const meta: Meta<typeof Masonry> = {
  title: "Layout/Masonry",
  component: Masonry,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A high-performance masonry grid component with **virtualization** and **lazy loading** support.

## Key Features

- **Virtualization**: Only renders items in viewport (configurable via \`virtualize\` prop)
- **Lazy Loading**: Progressive loading with items staying in DOM (via \`lazyLoad\` prop)
- **ResizeObserver**: Auto-adjusts layout when item sizes change (e.g., after image load)
- **Scroll Throttling**: Optimized scroll handling at 12 FPS for smooth performance
- **Interval Tree**: O(log n) lookup for visible items using Red-Black Tree

## Rendering Modes

| Mode | \`virtualize\` | \`lazyLoad\` | DOM Behavior | Use Case |
|------|-------------|-----------|--------------|----------|
| **Virtualization** | \`true\` | ignored | Items removed when out of viewport | Large lists (1000+ items) |
| **Lazy Load** | \`false\` | \`true\` | Items stay in DOM after loading | SEO + Ctrl+F + Medium lists |
| **Full Render** | \`false\` | \`false\` | All items rendered immediately | Small lists, printing |

## Usage Patterns

### 1. Default (Virtualization)
\`\`\`tsx
<Masonry items={items} renderItem={(item) => <ItemCard item={item} />} />
\`\`\`

### 2. Lazy Load (SEO-friendly, Ctrl+F works)
\`\`\`tsx
<Masonry virtualize={false} lazyLoad={true} items={items} renderItem={...} />
\`\`\`

### 3. Full Render (for printing/export)
\`\`\`tsx
<Masonry virtualize={false} items={items} renderItem={...} />
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columnCount: {
      control: { type: "number", min: 1, max: 6 },
      description: "stories.masonry.argTypes.columnCount.description",
    },
    columnWidth: {
      control: { type: "number", min: 100, max: 500 },
      description: "stories.masonry.argTypes.columnWidth.description",
    },
    gap: {
      control: { type: "number", min: 0, max: 48 },
      description: "stories.masonry.argTypes.gap.description",
    },
    maxColumnCount: {
      control: { type: "number", min: 1, max: 10 },
      description: "stories.masonry.argTypes.maxColumnCount.description",
    },
    overscan: {
      control: { type: "number", min: 1, max: 5 },
      description: "stories.masonry.argTypes.overscan.description",
    },
    linear: {
      control: "boolean",
      description: "stories.masonry.argTypes.linear.description",
    },
    virtualize: {
      control: "boolean",
      description: "stories.masonry.argTypes.virtualize.description",
    },
    lazyLoad: {
      control: "boolean",
      description:
        "Enable lazy loading when virtualization is disabled. Items are loaded progressively as user scrolls and remain in DOM. Ignored when virtualize=true.",
    },
    items: {
      description: "stories.masonry.argTypes.items.description",
    },
    renderItem: {
      description: "stories.masonry.argTypes.renderItem.description",
    },
    fallback: {
      description: "stories.masonry.argTypes.fallback.description",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Masonry>;

// Sample data for stories
interface ImageItem {
  id: number;
  title: string;
  imageUrl: string;
  height: number;
}

const generateItems = (count: number): ImageItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/${i + 1}/400/${200 + Math.floor(Math.random() * 200)}`,
    height: 200 + Math.floor(Math.random() * 200),
  }));

const items = generateItems(20);

// Card component for rendering items
const ItemCard = ({ item }: { item: ImageItem }) => (
  <div className="ds:relative ds:overflow-hidden ds:rounded-lg ds:bg-white ds:shadow-md">
    <img
      src={item.imageUrl}
      alt={item.title}
      className="ds:w-full ds:object-cover"
      style={{ height: item.height }}
    />
    <div className="ds:absolute ds:bottom-0 ds:left-0 ds:right-0 ds:bg-black/50 ds:p-2 ds:text-white">
      <h3 className="ds:text-sm ds:font-medium">{item.title}</h3>
    </div>
  </div>
);

/**
 * **Data-driven mode** - The simplest way to use Masonry.
 *
 * Pass an array of items and a render function. The component handles
 * virtualization, key generation, and item wrapping automatically.
 *
 * ```tsx
 * <Masonry
 *   items={items}
 *   renderItem={(item) => <ItemCard item={item} />}
 *   columnCount={3}
 *   gap={12}
 * />
 * ```
 */
export const DataDriven: Story = {
  render: () => (
    <div className="ds:p-4">
      <Masonry<ImageItem>
        columnCount={3}
        gap={12}
        fallback={<Skeleton className="ds:h-72 ds:w-full" />}
        items={items}
        renderItem={(item) => <ItemCard item={item} />}
      />
    </div>
  ),
};

/**
 * **Declarative mode** - Use `Masonry.Item` for full control over each item.
 *
 * This mode gives you direct control over the item wrapper, useful when you need
 * to add custom props, event handlers, or conditional rendering per item.
 *
 * ```tsx
 * <Masonry columnCount={3} gap={12}>
 *   {items.map((item) => (
 *     <Masonry.Item key={item.id}>
 *       <ItemCard item={item} />
 *     </Masonry.Item>
 *   ))}
 * </Masonry>
 * ```
 */
export const Declarative: Story = {
  render: () => (
    <div className="ds:p-4">
      <Masonry
        columnCount={3}
        gap={12}
        fallback={<Skeleton className="ds:h-72 ds:w-full" />}
      >
        {items.map((item) => (
          <Masonry.Item key={item.id}>
            <ItemCard item={item} />
          </Masonry.Item>
        ))}
      </Masonry>
    </div>
  ),
};

/**
 * **Custom item styling** - Full control over item rendering with custom styles.
 *
 * When using declarative mode, you can render any custom content inside `Masonry.Item`.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="ds:p-4">
      <Masonry
        columnCount={3}
        gap={12}
        fallback={<Skeleton className="ds:h-72 ds:w-full" />}
      >
        {items.map((item) => (
          <Masonry.Item key={item.id}>
            <div className="ds:overflow-hidden ds:rounded-lg ds:bg-linear-to-br ds:from-purple-500 ds:to-pink-500 ds:p-4 ds:text-white ds:shadow-lg">
              <h3 className="ds:mb-2 ds:text-lg ds:font-bold">{item.title}</h3>
              <p className="ds:text-sm ds:opacity-90">
                Custom styled item with height: {item.height}px
              </p>
              <div
                className="ds:mt-2 ds:rounded ds:bg-white/20"
                style={{ height: item.height / 2 }}
              />
            </div>
          </Masonry.Item>
        ))}
      </Masonry>
    </div>
  ),
};

/**
 * Four columns layout
 */
export const FourColumns: Story = {
  render: () => (
    <div className="ds:p-4">
      <Masonry<ImageItem>
        columnCount={4}
        gap={8}
        fallback={<Skeleton className="ds:h-72 ds:w-full" />}
        items={items}
        renderItem={(item) => <ItemCard item={item} />}
      />
    </div>
  ),
};

/**
 * **Custom gap configuration** - Different horizontal and vertical gaps.
 *
 * Pass an object with `column` and `row` properties for different spacing.
 *
 * ```tsx
 * <Masonry gap={{ column: 24, row: 12 }} />
 * ```
 */
export const CustomGap: Story = {
  render: () => (
    <div className="ds:p-4">
      <Masonry<ImageItem>
        columnCount={3}
        gap={{ column: 24, row: 12 }}
        fallback={<Skeleton className="ds:h-72 ds:w-full" />}
        items={items.slice(0, 12)}
        renderItem={(item) => <ItemCard item={item} />}
      />
    </div>
  ),
};

/**
 * **Linear layout** - Items are placed in order from left to right.
 *
 * By default, items are placed in the shortest column. Set `linear={true}`
 * to place items sequentially.
 * 
 * ```tsx
 * Linear = False (default)
 * 
 * Col 1    Col 2    Col 3
┌────┐   ┌────┐   ┌────┐
│ 1  │   │ 2  │   │ 3  │
│    │   └────┘   │    │
└────┘   ┌────┐   └────┘
┌────┐   │ 4  │   ┌────┐
│ 6  │   │    │   │ 5  │  ← Item 5 placed in Col 3 as it is the shortest
└────┘   └────┘   └────┘

--------------------------------

Linear = True

Col 1    Col 2    Col 3
┌────┐   ┌────┐   ┌────┐
│ 1  │   │ 2  │   │ 3  │
│    │   └────┘   │    │
└────┘            └────┘
┌────┐   ┌────┐   ┌────┐
│ 4  │   │ 5  │   │ 6  │  ← Item 4,5,6 placed in order left→right
└────┘   │    │   └────┘
         └────┘
\`\`\`
 */
export const LinearLayout: Story = {
  render: () => (
    <div className="ds:p-4">
      <Masonry<ImageItem>
        columnCount={3}
        gap={12}
        linear
        fallback={<Skeleton className="ds:h-72 ds:w-full" />}
        items={items.slice(0, 12)}
        renderItem={(item) => <ItemCard item={item} />}
      />
    </div>
  ),
};

/**
 * **Virtualization disabled** - Renders all items at once.
 *
 * Use `virtualize={false}` when you need:
 * - SEO (all content in DOM for crawlers)
 * - Printing (all items visible)
 * - Small lists (< 50 items)
 * - Screenshot/export functionality
 *
 * ⚠️ **Warning**: May cause performance issues with large lists (100+ items)
 */
export const NoVirtualization: Story = {
  render: () => (
    <div className="ds:p-4">
      <div className="ds:mb-4 ds:rounded ds:bg-yellow-100 ds:p-3 ds:text-sm ds:text-yellow-800">
        <strong>50 items</strong> - All items are rendered in DOM regardless of
        scroll position.
      </div>
      <Masonry<ImageItem>
        columnCount={3}
        gap={12}
        virtualize={false}
        items={generateItems(50)}
        renderItem={(item) => <ItemCard item={item} />}
      />
    </div>
  ),
};

/**
 * **Lazy Load mode** - Progressive loading without virtualization.
 *
 * Use `virtualize={false}` + `lazyLoad={true}` when you need:
 * - Items to stay in DOM after being scrolled (for Ctrl+F, printing)
 * - Progressive loading instead of loading all at once
 * - Better initial performance than full render
 * - SEO-friendly content that accumulates as user scrolls
 *
 * **Behavior:**
 * - Items are loaded as user scrolls into viewport
 * - Once loaded, items remain in DOM (unlike virtualization)
 * - DOM grows progressively but doesn't shrink
 *
 * ```tsx
 * <Masonry virtualize={false} lazyLoad={true} items={items} renderItem={...} />
 * ```
 */
export const LazyLoad: Story = {
  render: () => (
    <div className="ds:p-4">
      <div className="ds:mb-4 ds:rounded ds:bg-blue-100 ds:p-3 ds:text-sm ds:text-blue-800">
        <strong>100 items with Lazy Load</strong> - Items load progressively as
        you scroll and remain in DOM. Try Ctrl+F to search after scrolling!
      </div>
      <Masonry<ImageItem>
        columnCount={3}
        gap={12}
        virtualize={false}
        lazyLoad={true}
        items={generateItems(100)}
        renderItem={(item) => <ItemCard item={item} />}
      />
    </div>
  ),
};
