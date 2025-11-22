import type { Meta, StoryObj } from "@storybook/react";
import Rate, { type RateProps } from "../components/Rate/Rate";
import { useState } from "react";
import { Heart, Smile } from "lucide-react";

const meta: Meta<typeof Rate> = {
  title: "Form Components/Rate",
  component: Rate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: "number",
      description: "Star count",
      table: {
        category: "Display",
      },
    },
    value: {
      control: "number",
      description: "The current value",
      table: {
        category: "State",
      },
    },
    defaultValue: {
      control: "number",
      description: "The default value",
      table: {
        category: "State",
      },
    },
    allowHalf: {
      control: "boolean",
      description: "Whether to allow semi selection",
      table: {
        category: "Interaction",
      },
    },
    allowClear: {
      control: "boolean",
      description: "Whether to allow clear when click again",
      table: {
        category: "Interaction",
      },
    },
    size: {
      control: "radio",
      options: ["small", "middle", "large"],
      description: "Star size",
      table: {
        category: "Appearance",
      },
    },
    disabled: {
      control: "boolean",
      description: "If read only, unable to interact",
      table: {
        category: "State",
      },
    },
    autoFocus: {
      control: "boolean",
      description: "If get focus when component mounted",
      table: {
        category: "Interaction",
      },
    },
    keyboard: {
      control: "boolean",
      description: "Support keyboard operation",
      table: {
        category: "Interaction",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rate>;

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  render: function DefaultRate(args: RateProps) {
    const [value, setValue] = useState(0);
    return <Rate {...args} value={value} onChange={setValue} />;
  },
  args: {
    count: 5,
  },
};

export const WithDefaultValue: Story = {
  render: function WithDefaultValueRate() {
    return (
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Default value: 3</p>
          <Rate defaultValue={3} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Default value: 2.5
          </p>
          <Rate defaultValue={2.5} allowHalf />
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledRate() {
    const [value, setValue] = useState(3);
    return (
      <div className="space-y-4">
        <Rate value={value} onChange={setValue} />
        <div className="flex gap-2">
          <button
            onClick={() => setValue(0)}
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm"
          >
            Clear
          </button>
          <button
            onClick={() => setValue(5)}
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm"
          >
            Set to 5 stars
          </button>
          <span className="text-sm text-muted-foreground self-center">
            Current value: {value}
          </span>
        </div>
      </div>
    );
  },
};

// ============================================================================
// HALF STAR
// ============================================================================

export const AllowHalf: Story = {
  render: function AllowHalfRate() {
    const [value, setValue] = useState(2.5);
    return (
      <div className="space-y-4">
        <Rate allowHalf value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">
          Current value: {value} stars
        </p>
      </div>
    );
  },
};

// ============================================================================
// CLEAR
// ============================================================================

export const AllowClear: Story = {
  render: function AllowClearRate() {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Allow Clear (default) - Click the same star again to clear
          </p>
          <Rate defaultValue={3} allowClear />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Don't Allow Clear - Cannot clear by clicking
          </p>
          <Rate defaultValue={3} allowClear={false} />
        </div>
      </div>
    );
  },
};

// ============================================================================
// SIZES
// ============================================================================

export const Sizes: Story = {
  render: function SizesRate() {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Small</p>
          <Rate defaultValue={3} size="small" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Middle (default)</p>
          <Rate defaultValue={3} size="middle" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Large</p>
          <Rate defaultValue={3} size="large" />
        </div>
      </div>
    );
  },
};

// ============================================================================
// CUSTOM COUNT
// ============================================================================

export const CustomCount: Story = {
  render: function CustomCountRate() {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">3 stars</p>
          <Rate count={3} defaultValue={2} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            5 stars (default)
          </p>
          <Rate count={5} defaultValue={3} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">10 stars</p>
          <Rate count={10} defaultValue={6} />
        </div>
      </div>
    );
  },
};

// ============================================================================
// TOOLTIPS
// ============================================================================

export const WithTooltips: Story = {
  render: function WithTooltipsRate() {
    const [value, setValue] = useState(0);
    const tooltips = ["Chán", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];

    return (
      <div className="space-y-4">
        <Rate value={value} onChange={setValue} tooltips={tooltips} />
        <p className="text-sm text-muted-foreground">
          {value > 0
            ? `${tooltips[value - 1]} (${value} sao)`
            : "Chưa đánh giá"}
        </p>
      </div>
    );
  },
};

export const WithTooltipsHalf: Story = {
  render: function WithTooltipsHalfRate() {
    const [value, setValue] = useState(0);
    const tooltips = ["Terrible", "Bad", "Normal", "Good", "Excellent"];

    return (
      <div className="space-y-4">
        <Rate allowHalf value={value} onChange={setValue} tooltips={tooltips} />
        <p className="text-sm text-muted-foreground">
          {value > 0 ? `${value} stars` : "Not rated yet"}
        </p>
      </div>
    );
  },
};

// ============================================================================
// CUSTOM CHARACTER
// ============================================================================

export const CustomCharacter: Story = {
  render: function CustomCharacterRate() {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Heart character</p>
          <Rate
            defaultValue={3}
            character={<Heart className="w-full h-full fill-current" />}
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Smile character</p>
          <Rate
            defaultValue={4}
            character={<Smile className="w-full h-full fill-current" />}
            size="large"
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Custom text character
          </p>
          <Rate
            defaultValue={2}
            character={<span className="font-bold">A</span>}
            size="large"
          />
        </div>
      </div>
    );
  },
};

// ============================================================================
// DISABLED
// ============================================================================

export const Disabled: Story = {
  render: function DisabledRate() {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Disabled with value
          </p>
          <Rate defaultValue={3} disabled />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Disabled with half value
          </p>
          <Rate defaultValue={2.5} allowHalf disabled />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Disabled without value
          </p>
          <Rate disabled />
        </div>
      </div>
    );
  },
};

// ============================================================================
// KEYBOARD SUPPORT
// ============================================================================

export const KeyboardSupport: Story = {
  render: function KeyboardSupportRate() {
    const [value, setValue] = useState(3);
    return (
      <div className="space-y-4">
        <Rate value={value} onChange={setValue} keyboard />
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Arrow Right/Up: Increase rating</p>
          <p>• Arrow Left/Down: Decrease rating</p>
          <p>• Home: Jump to minimum</p>
          <p>• End: Jump to maximum</p>
          <p className="mt-2">Current value: {value}</p>
        </div>
      </div>
    );
  },
};

// ============================================================================
// CALLBACKS
// ============================================================================

export const WithCallbacks: Story = {
  render: function WithCallbacksRate() {
    const [value, setValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);
    const [focused, setFocused] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
      setLogs((prev) => [
        ...prev.slice(-4),
        `${new Date().toLocaleTimeString()}: ${message}`,
      ]);
    };

    return (
      <div className="space-y-4">
        <Rate
          value={value}
          onChange={(v) => {
            setValue(v);
            addLog(`Changed to ${v}`);
          }}
          onHoverChange={(v) => {
            setHoverValue(v);
            if (v > 0) addLog(`Hovering on ${v}`);
          }}
          onFocus={() => {
            setFocused(true);
            addLog("Focused");
          }}
          onBlur={() => {
            setFocused(false);
            addLog("Blurred");
          }}
        />
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">Value: {value}</p>
          <p className="text-muted-foreground">
            Hover value: {hoverValue || "-"}
          </p>
          <p className="text-muted-foreground">
            Focused: {focused ? "Yes" : "No"}
          </p>
          <div className="p-2 bg-muted rounded text-xs space-y-1">
            <p className="font-medium">Event logs:</p>
            {logs.length === 0 ? (
              <p className="text-muted-foreground">No events yet</p>
            ) : (
              logs.map((log, i) => <p key={i}>{log}</p>)
            )}
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// REAL WORLD EXAMPLE
// ============================================================================

export const ProductReview: Story = {
  render: function ProductReviewRate() {
    const [ratings, setRatings] = useState({
      quality: 0,
      service: 0,
      price: 0,
      delivery: 0,
    });

    const categories = [
      { key: "quality", label: "Chất lượng sản phẩm" },
      { key: "service", label: "Dịch vụ chăm sóc" },
      { key: "price", label: "Giá cả hợp lý" },
      { key: "delivery", label: "Giao hàng nhanh" },
    ];

    const average =
      Object.values(ratings).reduce((a, b) => a + b, 0) /
        Object.values(ratings).filter((v) => v > 0).length || 0;

    return (
      <div className="w-[400px] space-y-6 p-6 border rounded-lg">
        <h3 className="text-lg font-semibold">Đánh giá sản phẩm</h3>

        <div className="space-y-4">
          {categories.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-4">
              <span className="text-sm w-40">{label}:</span>
              <Rate
                allowHalf
                value={ratings[key as keyof typeof ratings]}
                onChange={(value) =>
                  setRatings((prev) => ({ ...prev, [key]: value }))
                }
              />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Đánh giá trung bình:</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {average.toFixed(1)}
              </span>
              <Rate value={average} allowHalf disabled size="small" />
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            alert(
              `Cảm ơn bạn đã đánh giá!\nTrung bình: ${average.toFixed(1)} sao`
            );
          }}
          disabled={average === 0}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Gửi đánh giá
        </button>
      </div>
    );
  },
};
