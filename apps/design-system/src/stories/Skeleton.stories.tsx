import type { Meta, StoryObj } from "@storybook/react";
import Skeleton, { type SkeletonProps } from "../components/Skeleton/Skeleton";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: i18n.t("stories.skeleton.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<SkeletonProps>;

// Default skeleton
export const Default: Story = {
  render: () => (
    <div className="ds:space-y-2">
      <Skeleton className="ds:h-4 w-[250px]" />
      <Skeleton className="ds:h-4 w-[200px]" />
    </div>
  ),
};

// Card skeleton
export const Card: Story = {
  render: () => (
    <div className="ds:flex ds:flex-col ds:space-y-3 w-[350px]">
      <Skeleton className="h-[125px] ds:w-full ds:rounded-xl" />
      <div className="ds:space-y-2">
        <Skeleton className="ds:h-4 ds:w-full" />
        <Skeleton className="ds:h-4 ds:w-4/5" />
      </div>
    </div>
  ),
};

// Profile skeleton
export const Profile: Story = {
  render: () => (
    <div className="ds:flex ds:items-center ds:space-x-4">
      <Skeleton className="ds:size-12 ds:rounded-full" />
      <div className="ds:space-y-2">
        <Skeleton className="ds:h-4 w-[250px]" />
        <Skeleton className="ds:h-4 w-[200px]" />
      </div>
    </div>
  ),
};

// List skeleton
export const List: Story = {
  render: () => (
    <div className="ds:space-y-4 w-[400px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="ds:flex ds:items-center ds:space-x-4">
          <Skeleton className="ds:size-10 ds:rounded-full" />
          <div className="ds:space-y-2 ds:flex-1">
            <Skeleton className="ds:h-4 ds:w-full" />
            <Skeleton className="ds:h-4 ds:w-3/4" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// Table skeleton
export const Table: Story = {
  render: () => (
    <div className="ds:space-y-3 w-[600px]">
      {/* Header */}
      <div className="ds:flex ds:gap-4">
        <Skeleton className="ds:h-8 ds:flex-1" />
        <Skeleton className="ds:h-8 ds:flex-1" />
        <Skeleton className="ds:h-8 ds:flex-1" />
        <Skeleton className="ds:h-8 ds:w-20" />
      </div>
      {/* Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="ds:flex ds:gap-4">
          <Skeleton className="ds:h-12 ds:flex-1" />
          <Skeleton className="ds:h-12 ds:flex-1" />
          <Skeleton className="ds:h-12 ds:flex-1" />
          <Skeleton className="ds:h-12 ds:w-20" />
        </div>
      ))}
    </div>
  ),
};

// Article skeleton
export const Article: Story = {
  render: () => (
    <div className="ds:space-y-4 w-[500px]">
      <Skeleton className="ds:h-8 ds:w-3/4" />
      <Skeleton className="ds:h-4 ds:w-1/2" />
      <Skeleton className="h-[200px] ds:w-full ds:rounded-lg" />
      <div className="ds:space-y-2">
        <Skeleton className="ds:h-4 ds:w-full" />
        <Skeleton className="ds:h-4 ds:w-full" />
        <Skeleton className="ds:h-4 ds:w-4/5" />
      </div>
      <div className="ds:space-y-2">
        <Skeleton className="ds:h-4 ds:w-full" />
        <Skeleton className="ds:h-4 ds:w-full" />
        <Skeleton className="ds:h-4 ds:w-3/4" />
      </div>
    </div>
  ),
};

// Product card skeleton
export const ProductCard: Story = {
  render: () => (
    <div className="ds:grid ds:grid-cols-3 ds:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="ds:space-y-3 w-[200px]">
          <Skeleton className="ds:aspect-square ds:w-full ds:rounded-lg" />
          <div className="ds:space-y-2">
            <Skeleton className="ds:h-4 ds:w-full" />
            <Skeleton className="ds:h-4 ds:w-3/4" />
            <Skeleton className="ds:h-8 ds:w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// Dashboard widgets
export const DashboardWidgets: Story = {
  render: () => (
    <div className="ds:grid ds:grid-cols-2 ds:gap-4 w-[700px]">
      {/* Stats cards */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="ds:space-y-2 ds:p-4 ds:border ds:rounded-lg">
          <Skeleton className="ds:h-4 ds:w-24" />
          <Skeleton className="ds:h-8 ds:w-32" />
          <Skeleton className="ds:h-3 ds:w-20" />
        </div>
      ))}
      {/* Chart */}
      <div className="ds:col-span-2 ds:space-y-3 ds:p-4 ds:border ds:rounded-lg">
        <Skeleton className="ds:h-6 ds:w-48" />
        <Skeleton className="h-[200px] ds:w-full" />
      </div>
    </div>
  ),
};

// Chat messages skeleton
export const ChatMessages: Story = {
  render: () => (
    <div className="ds:space-y-4 w-[400px]">
      {Array.from({ length: 4 }).map((_, i) => {
        const isMe = i % 2 === 0;
        return (
          <div
            key={i}
            className={`ds:flex ds:gap-2 ${isMe ? "flex-row-reverse" : ""}`}
          >
            <Skeleton className="ds:size-10 ds:rounded-full ds:shrink-0" />
            <div className="ds:space-y-2 ds:flex-1">
              <Skeleton className={`ds:h-16 ds:w-4/5 ${isMe ? "ml-auto" : ""}`} />
            </div>
          </div>
        );
      })}
    </div>
  ),
};

// Form skeleton
export const Form: Story = {
  render: () => (
    <div className="ds:space-y-4 w-[400px] ds:p-6 ds:border ds:rounded-lg">
      <Skeleton className="ds:h-6 ds:w-32" />
      <div className="ds:space-y-2">
        <Skeleton className="ds:h-4 ds:w-20" />
        <Skeleton className="ds:h-10 ds:w-full" />
      </div>
      <div className="ds:space-y-2">
        <Skeleton className="ds:h-4 ds:w-20" />
        <Skeleton className="ds:h-10 ds:w-full" />
      </div>
      <div className="ds:space-y-2">
        <Skeleton className="ds:h-4 ds:w-24" />
        <Skeleton className="ds:h-24 ds:w-full" />
      </div>
      <div className="ds:flex ds:gap-2">
        <Skeleton className="ds:h-10 ds:w-24" />
        <Skeleton className="ds:h-10 ds:w-24" />
      </div>
    </div>
  ),
};

// Image gallery skeleton
export const ImageGallery: Story = {
  render: () => (
    <div className="ds:grid ds:grid-cols-4 ds:gap-4 w-[800px]">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="ds:aspect-square ds:rounded-lg" />
      ))}
    </div>
  ),
};

// Sidebar skeleton
export const SidebarMenu: Story = {
  render: () => (
    <div className="ds:space-y-2 w-[250px] ds:p-4 ds:border ds:rounded-lg">
      {/* Logo */}
      <Skeleton className="ds:h-8 ds:w-32 ds:mb-6" />
      {/* Menu items */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="ds:flex ds:items-center ds:gap-3">
          <Skeleton className="ds:size-5 ds:rounded" />
          <Skeleton className="ds:h-4 ds:flex-1" />
        </div>
      ))}
    </div>
  ),
};

// Notification skeleton
export const Notifications: Story = {
  render: () => (
    <div className="ds:space-y-3 w-[350px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="ds:flex ds:gap-3 ds:p-3 ds:border ds:rounded-lg">
          <Skeleton className="ds:size-10 ds:rounded-full ds:shrink-0" />
          <div className="ds:space-y-2 ds:flex-1">
            <Skeleton className="ds:h-4 ds:w-full" />
            <Skeleton className="ds:h-3 ds:w-3/4" />
            <Skeleton className="ds:h-3 ds:w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// Different shapes
export const Shapes: Story = {
  render: () => (
    <div className="ds:space-y-6">
      <div className="ds:space-y-2">
        <p className="ds:text-sm ds:font-medium ds:mb-3">Circles</p>
        <div className="ds:flex ds:gap-3">
          <Skeleton className="ds:size-10 ds:rounded-full" />
          <Skeleton className="ds:size-12 ds:rounded-full" />
          <Skeleton className="ds:size-16 ds:rounded-full" />
          <Skeleton className="ds:size-20 ds:rounded-full" />
        </div>
      </div>
      <div className="ds:space-y-2">
        <p className="ds:text-sm ds:font-medium ds:mb-3">Rectangles</p>
        <div className="ds:flex ds:gap-3">
          <Skeleton className="ds:h-10 ds:w-20" />
          <Skeleton className="ds:h-10 ds:w-32" />
          <Skeleton className="ds:h-10 ds:w-40" />
          <Skeleton className="ds:h-10 ds:w-48" />
        </div>
      </div>
      <div className="ds:space-y-2">
        <p className="ds:text-sm ds:font-medium ds:mb-3">Squares</p>
        <div className="ds:flex ds:gap-3">
          <Skeleton className="ds:size-10" />
          <Skeleton className="ds:size-12" />
          <Skeleton className="ds:size-16" />
          <Skeleton className="ds:size-20" />
        </div>
      </div>
    </div>
  ),
};
