import type { Meta, StoryObj } from "@storybook/react";
import { Masonry } from "../components/Masonry";
import { Skeleton } from "../components/Skeleton";

const meta: Meta<typeof Masonry> = {
  title: "Components/Masonry",
  component: Masonry,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A high-performance masonry grid component with **virtualization** support.

## Key Features

- **Virtualization**: Only renders items in viewport (configurable via \`virtualize\` prop)
- **ResizeObserver**: Auto-adjusts layout when item sizes change (e.g., after image load)
- **Scroll Throttling**: Optimized scroll handling at 12 FPS for smooth performance
- **Interval Tree**: O(log n) lookup for visible items using Red-Black Tree

## Usage Patterns

### 1. Data-driven mode (recommended)
\`\`\`tsx
<Masonry
  items={items}
  renderItem={(item) => <ItemCard item={item} />}
  columnCount={3}
  gap={12}
/>
\`\`\`

### 2. Declarative mode
\`\`\`tsx
<Masonry columnCount={3} gap={12}>
  {items.map((item) => (
    <Masonry.Item key={item.id}>
      <ItemCard item={item} />
    </Masonry.Item>
  ))}
</Masonry>
\`\`\`

### 3. Disable virtualization (for SEO/printing)
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
  <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
    <img
      src={item.imageUrl}
      alt={item.title}
      className="w-full object-cover"
      style={{ height: item.height }}
    />
    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white">
      <h3 className="text-sm font-medium">{item.title}</h3>
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
    <div className="p-4">
      <Masonry<ImageItem>
        columnCount={3}
        gap={12}
        fallback={<Skeleton className="h-72 w-full" />}
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
    <div className="p-4">
      <Masonry
        columnCount={3}
        gap={12}
        fallback={<Skeleton className="h-72 w-full" />}
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
    <div className="p-4">
      <Masonry
        columnCount={3}
        gap={12}
        fallback={<Skeleton className="h-72 w-full" />}
      >
        {items.map((item) => (
          <Masonry.Item key={item.id}>
            <div className="overflow-hidden rounded-lg bg-linear-to-br from-purple-500 to-pink-500 p-4 text-white shadow-lg">
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm opacity-90">
                Custom styled item with height: {item.height}px
              </p>
              <div
                className="mt-2 rounded bg-white/20"
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
    <div className="p-4">
      <Masonry<ImageItem>
        columnCount={4}
        gap={8}
        fallback={<Skeleton className="h-72 w-full" />}
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
    <div className="p-4">
      <Masonry<ImageItem>
        columnCount={3}
        gap={{ column: 24, row: 12 }}
        fallback={<Skeleton className="h-72 w-full" />}
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
    <div className="p-4">
      <Masonry<ImageItem>
        columnCount={3}
        gap={12}
        linear
        fallback={<Skeleton className="h-72 w-full" />}
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
    <div className="p-4">
      <div className="mb-4 rounded bg-yellow-100 p-3 text-sm text-yellow-800">
        <strong>15 items</strong> - All items are rendered in DOM regardless of
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
