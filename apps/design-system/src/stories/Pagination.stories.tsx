import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import {
  Pagination,
  type PaginationWrapperProps,
} from "../components/Pagination";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible pagination component that provides navigation through multiple pages of content. The Pagination component supports customizable text, colors, sizes, and advanced features like jump-on-ellipsis functionality with hover or popover modes.

## Usage Patterns

### 1. Basic Pagination
\`\`\`tsx
<Pagination
  total={20}
  currentPage={5}
  onPageChange={(page) => setCurrentPage(page)}
  maxPages={5}
/>
\`\`\`

\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    total: {
      control: { type: "number" },
      description: i18n.t("stories.pagination.argTypes.total.description"),
      table: {
        category: "Data",
        type: { summary: "number" },
      },
    },
    currentPage: {
      control: { type: "number" },
      description: i18n.t(
        "stories.pagination.argTypes.currentPage.description"
      ),
      table: {
        category: "Data",
        type: { summary: "number" },
      },
    },
    onPageChange: {
      description: i18n.t(
        "stories.pagination.argTypes.onPageChange.description"
      ),
      table: {
        category: "Events",
        type: { summary: "(page: number) => void" },
      },
    },
    showPreviousNext: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.pagination.argTypes.showPreviousNext.description"
      ),
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "accent",
        "destructive",
        "muted",
        "success",
        "error",
        "warning",
      ],
      description: i18n.t("stories.pagination.argTypes.color.description"),
      table: {
        category: "Appearance",
        type: { summary: "string" },
        defaultValue: { summary: '"muted"' },
      },
    },
    size: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "normal",
        "lg",
        "xl",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
        "icon-xl",
        "circle-icon",
        "circle-icon-xs",
        "circle-icon-sm",
        "circle-icon-lg",
        "circle-icon-xl",
      ],
      description: i18n.t("stories.pagination.argTypes.size.description"),
      table: {
        category: "Appearance",
        type: { summary: "string" },
      },
    },
    maxPages: {
      control: { type: "number" },
      description: i18n.t("stories.pagination.argTypes.maxPages.description"),
      table: {
        category: "Behavior",
        type: { summary: "number" },
        defaultValue: { summary: "5" },
      },
    },
    previousText: {
      control: { type: "text" },
      description: i18n.t(
        "stories.pagination.argTypes.previousText.description"
      ),
      table: {
        category: "Content",
        type: { summary: "string | boolean" },
      },
    },
    nextText: {
      control: { type: "text" },
      description: i18n.t("stories.pagination.argTypes.nextText.description"),
      table: {
        category: "Content",
        type: { summary: "string | boolean" },
      },
    },
    jumpOnEllipsis: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.pagination.argTypes.jumpOnEllipsis.description"
      ),
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    jumpType: {
      control: { type: "select" },
      options: ["jump", "select"],
      description:
        "Type of jump interaction for ellipsis. 'jump' shows buttons on hover, 'select' shows a searchable list on click.",
      table: {
        category: "Behavior",
        type: { summary: "string" },
        defaultValue: { summary: '"hover"' },
      },
    },
    animation: {
      description: i18n.t("stories.pagination.argTypes.animation.description"),
      table: {
        category: "Appearance",
        type: { summary: "ButtonAnimation" },
      },
    },
    className: {
      control: { type: "text" },
      description: i18n.t("stories.pagination.argTypes.className.description"),
      table: {
        category: "Appearance",
        type: { summary: "string" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: PaginationWrapperProps) => (
    <Pagination
      total={10}
      currentPage={1}
      onPageChange={(page) => console.log("Page changed to:", page)}
      maxPages={5}
      {...args}
    />
  ),
};

export const Manual: Story = {
  render: () => (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous href="#" />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#" isActive>
            1
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">10</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next href="#" />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
};

export const WithSize: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Pagination
          total={10}
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          size="xs"
          maxPages={5}
        />
      </div>
      <div>
        <Pagination
          total={10}
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          size="sm"
          maxPages={5}
        />
      </div>
      <div>
        <Pagination
          total={10}
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          maxPages={5}
        />
      </div>
    </div>
  ),
};

export const WithCustomText: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Custom Text (string)</h3>
        <Pagination
          total={10}
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          size="normal"
          maxPages={5}
          previousText="Trước"
          nextText="Sau"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Default Text (true)</h3>
        <Pagination
          total={10}
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          size="normal"
          maxPages={5}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">No Text (false)</h3>
        <Pagination
          total={10}
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          size="normal"
          maxPages={5}
          previousText={false}
          nextText={false}
        />
      </div>
    </div>
  ),
};

export const WithColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">
          Default (muted - follows text color)
        </h3>
        <Pagination
          total={10}
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          maxPages={5}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Primary</h3>
        <Pagination
          total={10}
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          color="primary"
          maxPages={5}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Secondary</h3>
        <Pagination
          total={10}
          currentPage={1}
          onPageChange={(page) => console.log("Page changed to:", page)}
          color="secondary"
          maxPages={5}
        />
      </div>
    </div>
  ),
};

export const WithJumpOnEllipsis: Story = {
  render: () => {
    const PaginationWithState = () => {
      const [currentPage, setCurrentPage] = React.useState(10);

      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">
              Jump on Ellipsis (hover over ... to see directional jump buttons)
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              Current page: {currentPage}. Hover over the ellipsis (...) before
              the active page to see "Previous" button, or after the active page
              to see "Next" button. Clicking jumps by maxPages amount.
            </p>
            <Pagination
              total={20}
              currentPage={currentPage}
              onPageChange={(page) => {
                console.log("Page changed to:", page);
                setCurrentPage(page);
              }}
              size="normal"
              maxPages={5}
              jumpOnEllipsis={true}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">
              Jump on Ellipsis with Custom Text
            </h3>
            <Pagination
              total={20}
              currentPage={currentPage}
              onPageChange={(page) => {
                console.log("Page changed to:", page);
                setCurrentPage(page);
              }}
              size="normal"
              maxPages={3}
              jumpOnEllipsis={true}
              previousText="« Jump Back 3"
              nextText="Jump Forward 3 »"
            />
          </div>
        </div>
      );
    };

    return <PaginationWithState />;
  },
};

export const WithSelectJump: Story = {
  render: () => {
    const PaginationWithState = () => {
      const [currentPage, setCurrentPage] = React.useState(10);

      return (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">
              Popover Jump on Ellipsis (click ... to open searchable page list)
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              Current page: {currentPage}. Click on the ellipsis (...) to open a
              popover with a searchable list of all pages. You can search by
              typing page numbers or scroll through the list.
            </p>
            <Pagination
              total={50}
              currentPage={currentPage}
              onPageChange={(page) => {
                console.log("Page changed to:", page);
                setCurrentPage(page);
              }}
              size="normal"
              maxPages={5}
              jumpOnEllipsis={true}
              jumpType="select"
            />
          </div>
        </div>
      );
    };

    return <PaginationWithState />;
  },
};
