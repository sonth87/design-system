import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast } from "../components/Toast/Toast";
import Button from "../components/Button/Button";

const meta: Meta<typeof Toaster> = {
  title: "Feedback/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: { type: "select" },
      options: [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "top-center",
        "bottom-center",
      ],
      defaultValue: "top-right",
      description: "Position of the toast container on the screen",
    },
    richColors: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Enable rich colors for different toast types",
    },
    expand: {
      control: { type: "boolean" },
      defaultValue: true,
      description: "Allow toasts to expand when content is long",
    },
    closeButton: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Show close button on toasts",
    },
    duration: {
      control: { type: "number" },
      defaultValue: 4000,
      description: "Duration in milliseconds for toasts to auto-dismiss",
    },
    visibleToasts: {
      control: { type: "number" },
      defaultValue: 3,
      description: "Maximum number of toasts to display at once",
    },
  },
  args: {
    position: "top-right",
    richColors: false,
    expand: true,
    closeButton: false,
    duration: 4000,
    visibleToasts: 3,
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Variants: Story = {
  render: (args: any) => {
    return (
      <div className="flex flex-col items-center gap-3 p-6 w-96">
        <Toaster {...args} />
        <Button onClick={() => toast("This is a default toast")}>
          Default
        </Button>
        <Button
          variant="mix"
          color="success"
          onClick={() => toast.success("Operation successful!")}
        >
          Success
        </Button>
        <Button
          variant="mix"
          color="error"
          onClick={() => toast.error("Something went wrong")}
        >
          Error
        </Button>
        <Button
          variant="mix"
          color="warning"
          onClick={() => toast.warning("Be careful!")}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("Just an info message")}
        >
          Info
        </Button>
        <Button
          variant="mix"
          color="primary"
          onClick={() => toast.primary("Primary variant active!")}
        >
          Primary
        </Button>
        <Button
          variant="mix"
          color="secondary"
          onClick={() => toast.secondary("Secondary variant active!")}
        >
          Secondary
        </Button>
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Toast</h2>
      <p className="mb-4">
        Component Toast được sử dụng để hiển thị thông báo ngắn gọn cho người
        dùng. Hỗ trợ nhiều loại thông báo như success, error, warning, info,
        primary, và secondary.
      </p>
      <h3 className="text-xl font-semibold mb-2">Cài đặt</h3>
      <p className="mb-4">
        Import <code>Toaster</code> và <code>toast</code> từ component Toast:
      </p>
      <pre className="bg-gray-100 p-4 rounded mb-4">
        {`import { Toaster, toast } from './Toast';`}
      </pre>
      <h3 className="text-xl font-semibold mb-2">Sử dụng</h3>
      <ol className="list-decimal list-inside mb-4">
        <li>
          Thêm <code>&lt;Toaster /&gt;</code> vào root component của ứng dụng
          (thường là App.tsx).
        </li>
        <li>Sử dụng các hàm toast để hiển thị thông báo:</li>
      </ol>
      <ul className="list-disc list-inside mb-4">
        <li>
          <code>toast("Thông báo mặc định")</code> - Thông báo mặc định
        </li>
        <li>
          <code>toast.success("Thành công!")</code> - Thông báo thành công
        </li>
        <li>
          <code>toast.error("Lỗi!")</code> - Thông báo lỗi
        </li>
        <li>
          <code>toast.warning("Cảnh báo!")</code> - Thông báo cảnh báo
        </li>
        <li>
          <code>toast.info("Thông tin")</code> - Thông báo thông tin
        </li>
        <li>
          <code>toast.primary("Primary")</code> - Primary color
        </li>
        <li>
          <code>toast.secondary("Secondary")</code> - Secondary color
        </li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Tùy chỉnh</h3>
      <p className="mb-4">
        Tùy chỉnh vị trí, màu sắc, thời gian hiển thị, và các tùy chọn khác
        thông qua props của <code>Toaster</code>.
      </p>
      <p>Ví dụ:</p>
      <pre className="bg-gray-100 p-4 rounded">
        {`<Toaster
            position="top-right"
            richColors={true}
            expand={true}
            closeButton={false}
            duration={4000}
            visibleToasts={3}
          />`}
      </pre>
    </div>
  ),
};
