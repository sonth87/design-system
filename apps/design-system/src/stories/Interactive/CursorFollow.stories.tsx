import type { Meta, StoryObj } from "@storybook/react";
import {
  CursorProvider,
  Cursor,
  CursorFollow,
  useCursorFollow,
} from "../../components/Interactive/CursorFollow";
import i18n from "../../../.storybook/i18n";

const meta = {
  title: "Interactive/CursorFollow",
  component: CursorFollow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // CursorFollow Props
    align: {
      control: "select",
      options: [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
        "left",
        "right",
        "center",
      ],
      description: i18n.t("stories.cursorfollow.argTypes.align.description"),
      table: {
        category: "CursorFollow",
      },
    },
    sideOffset: {
      control: { type: "range", min: 0, max: 100, step: 5 },
      description: i18n.t(
        "stories.cursorfollow.argTypes.sideOffset.description"
      ),
      table: {
        category: "CursorFollow",
        defaultValue: { summary: "15" },
      },
    },
    followText: {
      control: "text",
      description: i18n.t(
        "stories.cursorfollow.argTypes.followText.description"
      ),
      table: {
        category: "CursorFollow",
      },
    },
    children: {
      control: false,
      description: i18n.t("stories.cursorfollow.argTypes.children.description"),
      table: {
        category: "CursorFollow",
      },
    },
    transition: {
      control: "object",
      description: i18n.t(
        "stories.cursorfollow.argTypes.transition.description"
      ),
      table: {
        category: "CursorFollow",
        type: { summary: "SpringOptions" },
      },
    },

    // CursorProvider Props
    cursorType: {
      control: "select",
      options: ["default", "pointer"],
      description: i18n.t(
        "stories.cursorfollow.argTypes.cursorType.description"
      ),
      table: {
        category: "CursorProvider",
        defaultValue: { summary: "default" },
      },
    },
    showFollow: {
      control: "boolean",
      description: i18n.t(
        "stories.cursorfollow.argTypes.showFollow.description"
      ),
      table: {
        category: "CursorProvider",
        defaultValue: { summary: "true when followText is provided" },
      },
    },
    followAlign: {
      control: "select",
      options: [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
        "left",
        "right",
        "center",
      ],
      description: i18n.t(
        "stories.cursorfollow.argTypes.followAlign.description"
      ),
      table: {
        category: "CursorProvider",
        defaultValue: { summary: "bottom-right" },
      },
    },
    followSideOffset: {
      control: { type: "range", min: 0, max: 100, step: 5 },
      description: i18n.t(
        "stories.cursorfollow.argTypes.followSideOffset.description"
      ),
      table: {
        category: "CursorProvider",
        defaultValue: { summary: "15" },
      },
    },
    followTransition: {
      control: "select",
      options: ["slow", "normal", "fast", "realtime"],
      description: i18n.t(
        "stories.cursorfollow.argTypes.followTransition.description"
      ),
      table: {
        category: "CursorProvider",
        defaultValue: { summary: "normal" },
      },
    },

    // Cursor Props
    // cursorType is shared with CursorProvider

    // useCursorFollow Hook Options
    // (documented separately as these are hook options, not component props)

    // Animation Props
    transitionPreset: {
      control: "select",
      options: ["slow", "normal", "fast", "realtime"],
      description: i18n.t(
        "stories.cursorfollow.argTypes.transitionPreset.description"
      ),
      table: {
        category: "Animation",
        defaultValue: { summary: "normal" },
      },
    },

    // Styling
    className: {
      control: "text",
      description: i18n.t(
        "stories.cursorfollow.argTypes.className.description"
      ),
      table: {
        category: "Styling",
      },
    },
    style: {
      control: "object",
      description: i18n.t("stories.cursorfollow.argTypes.style.description"),
      table: {
        category: "Styling",
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any, // Include CursorProvider and Cursor props for documentation
} satisfies Meta<typeof CursorFollow>;

export default meta;
type Story = StoryObj<typeof CursorFollow>;

export const Default: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 15,
    followText: "Follow me!",
  },
  render: (args) => (
    <div className="relative h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl">
      <CursorProvider cursorType={<div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-50 blur-sm" />}>
        <div className="text-white text-lg">Move your cursor here</div>
        <CursorFollow {...args} />
      </CursorProvider>
    </div>
  ),
};

export const DifferentAlignments: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(
        [
          "top-left",
          "top",
          "top-right",
          "left",
          "center",
          "right",
          "bottom-left",
          "bottom",
          "bottom-right",
        ] as const
      ).map((align) => (
        <div
          key={align}
          className="relative h-[100px] w-[100px] flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg"
        >
          <CursorProvider>
            <div className="text-white text-xs text-center">{align}</div>
            <Cursor>
              <div className="h-4 w-4 rounded-full bg-yellow-400" />
            </Cursor>
            <CursorFollow align={align} sideOffset={10}>
              <div className="px-2 py-1 bg-yellow-400 rounded text-xs font-bold text-blue-900">
                {align}
              </div>
            </CursorFollow>
          </CursorProvider>
        </div>
      ))}
    </div>
  ),
};

export const CustomCursor: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 25,
  },
  render: (args) => (
    <div className="relative h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-emerald-900 to-teal-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-xl">Custom animated cursor</div>
        <Cursor>
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-emerald-400 animate-pulse" />
            <div className="absolute inset-0 h-8 w-8 rounded-full bg-emerald-400/30 animate-ping" />
          </div>
        </Cursor>
        <CursorFollow {...args}>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-xl">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-900">
              Following...
            </span>
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

export const SlowTransition: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 15,
    transition: { stiffness: 100, damping: 20, bounce: 0 },
  },
  render: (args) => (
    <div className="relative h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-orange-900 to-red-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">Slow, smooth follow effect</div>
        <Cursor>
          <div className="h-6 w-6 rounded-full bg-orange-400 border-2 border-white" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-orange-900">
            Slow follow
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

export const FastTransition: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 15,
    transition: { stiffness: 1000, damping: 80, bounce: 0 },
  },
  render: (args) => (
    <div className="relative h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-cyan-900 to-blue-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">Fast, snappy follow effect</div>
        <Cursor>
          <div className="h-6 w-6 rounded-full bg-cyan-400 border-2 border-white" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-cyan-900">
            Fast follow
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

export const InteractiveCard: Story = {
  args: {
    align: "center",
    sideOffset: 0,
  },
  render: (args) => (
    <div className="relative h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-xl p-8">
      <CursorProvider>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white text-2xl font-bold border border-white/20 hover:bg-white/20 transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
        <Cursor>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-50 blur-sm" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-2xl text-white font-semibold text-sm">
            ✨ Interactive
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

// ===============================================
// CÁCH 1: Manual Setup
// ===============================================
export const Method1_Manual: Story = {
  name: "1: Manual Setup",
  render: () => (
    <div className="relative h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg text-center space-y-4">
          <h3 className="font-bold">Cách 1: Manual Setup</h3>
          <p className="text-sm text-gray-300">
            Sử dụng CursorProvider + Cursor + CursorFollow riêng biệt
          </p>
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-xs font-mono text-left">
              <pre>
                {`<CursorProvider>
  <div>Nội dung</div> // content

  <Cursor cursorType="pointer" /> // custom cursor

  <CursorFollow 
    followText="Click me"
    align="bottom-right" 
  /> // follow element
</CursorProvider>`}
              </pre>
            </p>
          </div>
        </div>
        <Cursor cursorType="pointer" />
        <CursorFollow followText="Click me" align="bottom-right" />
      </CursorProvider>
    </div>
  ),
};

// ===============================================
// CÁCH 2: Hook-based Setup
// ===============================================
export const Method2_Hook = () => {
  const cursorProps = useCursorFollow({
    cursorType: "pointer",
    followText: "Click me",
    align: "bottom-right",
  });

  return (
    <div
      {...cursorProps}
      className="h-[400px] w-[500px] flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-800 rounded-xl"
    >
      {cursorProps.children(
        <div className="text-white text-lg text-center space-y-4">
          <h3 className="font-bold">Cách 2: Hook-based Setup</h3>
          <p className="text-sm text-gray-300">
            Sử dụng hook useCursorFollow và spread props
          </p>
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-xs font-mono text-left whitespace-pre">
              {`function MyComponent() {
  const cursorProps = useCursorFollow({
    cursorType: "pointer",
    followText: "Click me",
    align: "bottom-right"
  });
  
  return (
    <div {...cursorProps}>
      {cursorProps.children(
        <div>Nội dung</div>
      )}
    </div>
  );
}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ===============================================
// CÁCH 3: Auto Setup with CursorProvider
// ===============================================
export const Method3_AutoSetup: Story = {
  name: "3: Auto Setup",
  render: () => (
    <div className="h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-emerald-900 to-teal-800 rounded-xl">
      <CursorProvider
        cursorType="pointer"
        followText="Click me"
        showFollow={true}
      >
        <div className="text-white text-lg text-center space-y-4">
          <h3 className="font-bold">Cách 3: Auto Setup</h3>
          <p className="text-sm text-gray-300">
            CursorProvider tự động render cursor và follow
          </p>
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-xs font-mono text-left">
              <pre>{`<CursorProvider
  cursorType="pointer" 
  followText="Click me"
  showFollow={true}
>
  <div>Nội dung</div>
</CursorProvider>`}</pre>
            </p>
          </div>
        </div>
      </CursorProvider>
    </div>
  ),
};

export const HookWithDefaultCursor = () => {
  const cursorProps = useCursorFollow({
    cursorType: "default", // System cursor with follow element
    followText: "System cursor + Follow",
    align: "bottom-right",
  });

  return (
    <div
      {...cursorProps}
      className="h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-violet-900 to-fuchsia-800 rounded-xl"
    >
      {cursorProps.children(
        <div className="text-white text-lg text-center space-y-4">
          <h3 className="font-bold">Hook with System Cursor</h3>
          <p className="text-sm text-gray-300">
            useCursorFollow với type="default" - hiển thị cursor hệ thống
          </p>
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-xs font-mono text-left whitespace-pre">
              {`const cursorProps = useCursorFollow({
  cursorType: "default", // Cursor hệ thống
  followText: "System cursor + Follow",
});`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const FollowWithReactNode: Story = {
  name: "Follow with ReactNode",
  render: () => (
    <div className="relative h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-rose-900 to-orange-800 rounded-xl">
      <CursorProvider cursorType="pointer">
        <div className="text-white text-lg">followText accepts ReactNode!</div>
        <CursorFollow
          followText={
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg shadow-xl">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-white">
                Custom ReactNode!
              </span>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          }
          align="bottom-right"
        />
      </CursorProvider>
    </div>
  ),
};

export const CustomCursorTypeAsReactNode: Story = {
  name: "Custom cursorType as ReactNode",
  render: () => (
    <div className="relative h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-800 rounded-xl">
      <CursorProvider
        cursorType={
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-pink-400 border-2 border-white shadow-lg" />
            <div className="absolute inset-0 h-8 w-8 rounded-full bg-pink-400/50 animate-ping" />
          </div>
        }
        followText="Custom cursor type!"
        followAlign="bottom-right"
      >
        <div className="text-white text-lg text-center space-y-4">
          <h3 className="font-bold">cursorType as ReactNode</h3>
          <p className="text-sm text-gray-300">
            Bạn có thể truyền custom ReactNode trực tiếp vào cursorType prop
          </p>
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <p className="text-xs font-mono text-left whitespace-pre">
              {`<CursorProvider
  cursorType={
    <div className="custom-cursor">
      ...
    </div>
  }
  followText="Custom cursor!"
>
  ...
</CursorProvider>`}
            </p>
          </div>
        </div>
      </CursorProvider>
    </div>
  ),
};

export const CursorComponentWithReactNode: Story = {
  name: "Cursor Component with ReactNode",
  render: () => (
    <div className="relative h-[300px] w-[500px] flex items-center justify-center bg-gradient-to-br from-cyan-900 to-blue-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg text-center space-y-4">
          <h3 className="font-bold">Cursor với cursorType ReactNode</h3>
          <p className="text-sm text-gray-300">
            Truyền custom cursor trực tiếp vào Cursor component
          </p>
        </div>
        <Cursor
          cursorType={
            <div className="flex items-center gap-1">
              <div className="h-6 w-6 rounded-full bg-cyan-400 border-2 border-white" />
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" />
            </div>
          }
        />
        <CursorFollow
          followText="Following custom cursor!"
          align="bottom-right"
        />
      </CursorProvider>
    </div>
  ),
};
