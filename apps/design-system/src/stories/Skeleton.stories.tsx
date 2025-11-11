import type { Meta, StoryObj } from "@storybook/react";
import Skeleton, { type SkeletonProps } from "../components/Skeleton/Skeleton";

const meta: Meta<SkeletonProps> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<SkeletonProps>;

// Default skeleton
export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  ),
};

// Card skeleton
export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3 w-[350px]">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  ),
};

// Profile skeleton
export const Profile: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

// List skeleton
export const List: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// Table skeleton
export const Table: Story = {
  render: () => (
    <div className="space-y-3 w-[600px]">
      {/* Header */}
      <div className="flex gap-4">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 w-20" />
      </div>
      {/* Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-20" />
        </div>
      ))}
    </div>
  ),
};

// Article skeleton
export const Article: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ),
};

// Product card skeleton
export const ProductCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3 w-[200px]">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// Dashboard widgets
export const DashboardWidgets: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[700px]">
      {/* Stats cards */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2 p-4 border rounded-lg">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
      {/* Chart */}
      <div className="col-span-2 space-y-3 p-4 border rounded-lg">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  ),
};

// Chat messages skeleton
export const ChatMessages: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      {Array.from({ length: 4 }).map((_, i) => {
        const isMe = i % 2 === 0;
        return (
          <div
            key={i}
            className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}
          >
            <Skeleton className="size-10 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className={`h-16 w-4/5 ${isMe ? "ml-auto" : ""}`} />
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
    <div className="space-y-4 w-[400px] p-6 border rounded-lg">
      <Skeleton className="h-6 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  ),
};

// Image gallery skeleton
export const ImageGallery: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 w-[800px]">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-lg" />
      ))}
    </div>
  ),
};

// Sidebar skeleton
export const SidebarMenu: Story = {
  render: () => (
    <div className="space-y-2 w-[250px] p-4 border rounded-lg">
      {/* Logo */}
      <Skeleton className="h-8 w-32 mb-6" />
      {/* Menu items */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  ),
};

// Notification skeleton
export const Notifications: Story = {
  render: () => (
    <div className="space-y-3 w-[350px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-3 p-3 border rounded-lg">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};

// Different shapes
export const Shapes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-3">Circles</p>
        <div className="flex gap-3">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="size-20 rounded-full" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-3">Rectangles</p>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-48" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-3">Squares</p>
        <div className="flex gap-3">
          <Skeleton className="size-10" />
          <Skeleton className="size-12" />
          <Skeleton className="size-16" />
          <Skeleton className="size-20" />
        </div>
      </div>
    </div>
  ),
};
