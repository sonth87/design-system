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
    <div className="ds:relative h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-slate-900 ds:to-slate-800 ds:rounded-xl">
      <CursorProvider
        cursorType={
          <div className="ds:h-12 ds:w-12 ds:rounded-full ds:bg-gradient-to-br ds:from-pink-400 ds:to-purple-400 ds:opacity-50 ds:blur-sm" />
        }
      >
        <div className="ds:text-white ds:text-lg">Move your cursor here</div>
        <CursorFollow {...args} />
      </CursorProvider>
    </div>
  ),
};

export const DifferentAlignments: Story = {
  render: () => (
    <div className="ds:grid ds:grid-cols-3 ds:gap-4">
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
          className="ds:relative h-[100px] w-[100px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-blue-900 ds:to-blue-700 ds:rounded-lg"
        >
          <CursorProvider>
            <div className="ds:text-white ds:text-xs ds:text-center">{align}</div>
            <Cursor>
              <div className="ds:h-4 ds:w-4 ds:rounded-full ds:bg-yellow-400" />
            </Cursor>
            <CursorFollow align={align} sideOffset={10}>
              <div className="ds:px-2 ds:py-1 ds:bg-yellow-400 ds:rounded ds:text-xs ds:font-bold ds:text-blue-900">
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
    <div className="ds:relative h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-emerald-900 ds:to-teal-800 ds:rounded-xl">
      <CursorProvider>
        <div className="ds:text-white ds:text-xl">Custom animated cursor</div>
        <Cursor>
          <div className= "relative">
            <div className="ds:h-8 ds:w-8 ds:rounded-full ds:bg-emerald-400 ds:animate-pulse" />
            <div className="ds:absolute ds:inset-0 ds:h-8 ds:w-8 ds:rounded-full ds:bg-emerald-400/30 ds:animate-ping" />
          </div>
        </Cursor>
        <CursorFollow {...args}>
          <div className="ds:flex ds:items-center ds:gap-2 ds:px-4 ds:py-2 ds:bg-white ds:rounded-lg ds:shadow-xl">
            <div className="ds:h-2 ds:w-2 ds:rounded-full ds:bg-emerald-500 ds:animate-pulse" />
            <span className="ds:text-sm ds:font-medium ds:text-emerald-900">
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
    <div className="ds:relative h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-orange-900 ds:to-red-800 ds:rounded-xl">
      <CursorProvider>
        <div className="ds:text-white ds:text-lg">Slow, smooth follow effect</div>
        <Cursor>
          <div className="ds:h-6 ds:w-6 ds:rounded-full ds:bg-orange-400 ds:border-2 ds:border-white" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="ds:px-4 ds:py-2 ds:bg-white ds:rounded-full ds:shadow-lg ds:text-sm ds:font-medium ds:text-orange-900">
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
    <div className="ds:relative h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-cyan-900 ds:to-blue-800 ds:rounded-xl">
      <CursorProvider>
        <div className="ds:text-white ds:text-lg">Fast, snappy follow effect</div>
        <Cursor>
          <div className="ds:h-6 ds:w-6 ds:rounded-full ds:bg-cyan-400 ds:border-2 ds:border-white" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="ds:px-4 ds:py-2 ds:bg-white ds:rounded-full ds:shadow-lg ds:text-sm ds:font-medium ds:text-cyan-900">
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
    <div className="ds:relative h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-indigo-900 ds:via-purple-900 ds:to-pink-900 ds:rounded-xl ds:p-8">
      <CursorProvider>
        <div className="ds:grid ds:grid-cols-3 ds:gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="ds:h-24 ds:w-24 ds:bg-white/10 ds:backdrop-blur-sm ds:rounded-lg ds:flex ds:items-center ds:justify-center ds:text-white ds:text-2xl ds:font-bold ds:border ds:border-white/20 ds:hover:bg-white/20 ds:transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
        <Cursor>
          <div className="ds:h-12 ds:w-12 ds:rounded-full ds:bg-gradient-to-br ds:from-pink-400 ds:to-purple-400 ds:opacity-50 ds:blur-sm" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="ds:px-6 ds:py-3 ds:bg-gradient-to-r ds:from-pink-500 ds:to-purple-500 ds:rounded-lg ds:shadow-2xl ds:text-white ds:font-semibold ds:text-sm">
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
    <div className="ds:relative h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-blue-900 ds:to-indigo-800 ds:rounded-xl">
      <CursorProvider>
        <div className="ds:text-white ds:text-lg ds:text-center ds:space-y-4">
          <h3 className="ds:font-bold">Cách 1: Manual Setup</h3>
          <p className="ds:text-sm ds:text-gray-300">
            Sử dụng CursorProvider + Cursor + CursorFollow riêng biệt
          </p>
          <div className="ds:mt-4 ds:p-4 ds:bg-white/10 ds:rounded-lg">
            <p className="ds:text-xs ds:font-mono ds:text-left">
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
      className="h-[400px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-purple-900 ds:to-pink-800 ds:rounded-xl"
    >
      {cursorProps.children(
        <div className="ds:text-white ds:text-lg ds:text-center ds:space-y-4">
          <h3 className="ds:font-bold">Cách 2: Hook-based Setup</h3>
          <p className="ds:text-sm ds:text-gray-300">
            Sử dụng hook useCursorFollow và spread props
          </p>
          <div className="ds:mt-4 ds:p-4 ds:bg-white/10 ds:rounded-lg">
            <p className="ds:text-xs ds:font-mono ds:text-left ds:whitespace-pre">
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
    <div className="h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-emerald-900 ds:to-teal-800 ds:rounded-xl">
      <CursorProvider
        cursorType="pointer"
        followText="Click me"
        showFollow={true}
      >
        <div className="ds:text-white ds:text-lg ds:text-center ds:space-y-4">
          <h3 className="ds:font-bold">Cách 3: Auto Setup</h3>
          <p className="ds:text-sm ds:text-gray-300">
            CursorProvider tự động render cursor và follow
          </p>
          <div className="ds:mt-4 ds:p-4 ds:bg-white/10 ds:rounded-lg">
            <p className="ds:text-xs ds:font-mono ds:text-left">
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
      className="h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-violet-900 ds:to-fuchsia-800 ds:rounded-xl"
    >
      {cursorProps.children(
        <div className="ds:text-white ds:text-lg ds:text-center ds:space-y-4">
          <h3 className="ds:font-bold">Hook with System Cursor</h3>
          <p className="ds:text-sm ds:text-gray-300">
            useCursorFollow với type="default" - hiển thị cursor hệ thống
          </p>
          <div className="ds:mt-4 ds:p-4 ds:bg-white/10 ds:rounded-lg">
            <p className="ds:text-xs ds:font-mono ds:text-left ds:whitespace-pre">
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
    <div className="ds:relative h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-rose-900 ds:to-orange-800 ds:rounded-xl">
      <CursorProvider cursorType="pointer">
        <div className="ds:text-white ds:text-lg">followText accepts ReactNode!</div>
        <CursorFollow
          followText={
            <div className="ds:flex ds:items-center ds:gap-2 ds:px-4 ds:py-2 ds:bg-gradient-to-r ds:from-rose-500 ds:to-orange-500 ds:rounded-lg ds:shadow-xl">
              <svg className="ds:w-4 ds:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ds:text-sm ds:font-bold ds:text-white">
                Custom ReactNode!
              </span>
              <div className="ds:w-2 ds:h-2 ds:rounded-full ds:bg-white ds:animate-pulse" />
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
    <div className="ds:relative h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-purple-900 ds:to-pink-800 ds:rounded-xl">
      <CursorProvider
        cursorType={
          <div className= "relative">
            <div className="ds:h-8 ds:w-8 ds:rounded-full ds:bg-pink-400 ds:border-2 ds:border-white ds:shadow-lg" />
            <div className="ds:absolute ds:inset-0 ds:h-8 ds:w-8 ds:rounded-full ds:bg-pink-400/50 ds:animate-ping" />
          </div>
        }
        followText="Custom cursor type!"
        followAlign="bottom-right"
      >
        <div className="ds:text-white ds:text-lg ds:text-center ds:space-y-4">
          <h3 className="ds:font-bold">cursorType as ReactNode</h3>
          <p className="ds:text-sm ds:text-gray-300">
            Bạn có thể truyền custom ReactNode trực tiếp vào cursorType prop
          </p>
          <div className="ds:mt-4 ds:p-4 ds:bg-white/10 ds:rounded-lg">
            <p className="ds:text-xs ds:font-mono ds:text-left ds:whitespace-pre">
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
    <div className="ds:relative h-[300px] w-[500px] ds:flex ds:items-center ds:justify-center ds:bg-gradient-to-br ds:from-cyan-900 ds:to-blue-800 ds:rounded-xl">
      <CursorProvider>
        <div className="ds:text-white ds:text-lg ds:text-center ds:space-y-4">
          <h3 className="ds:font-bold">Cursor với cursorType ReactNode</h3>
          <p className="ds:text-sm ds:text-gray-300">
            Truyền custom cursor trực tiếp vào Cursor component
          </p>
        </div>
        <Cursor
          cursorType={
            <div className="ds:flex ds:items-center ds:gap-1">
              <div className="ds:h-6 ds:w-6 ds:rounded-full ds:bg-cyan-400 ds:border-2 ds:border-white" />
              <div className="ds:h-2 ds:w-2 ds:rounded-full ds:bg-cyan-400 ds:animate-bounce" />
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
