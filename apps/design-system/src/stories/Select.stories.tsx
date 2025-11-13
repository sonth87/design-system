import type { Meta } from "@storybook/react";
import Select, {
  type SelectOption,
  type SelectProps,
} from "../components/Select/Select";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Select> = {
  title: "Form Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: i18n.t("stories.select.argTypes.label.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    placeholder: {
      control: "text",
      description: i18n.t("stories.select.argTypes.placeholder.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "normal", "lg", "xl"],
      description: i18n.t("stories.select.argTypes.size.description"),
      table: {
        defaultValue: { summary: "normal" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    isFloatLabel: {
      control: "boolean",
      description: i18n.t("stories.select.argTypes.isFloatLabel.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.ui"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.select.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    state: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: i18n.t("stories.select.argTypes.state.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.validation"),
      },
    },
    helperText: {
      control: "text",
      description: i18n.t("stories.select.argTypes.helperText.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    infoTooltip: {
      control: "text",
      description: i18n.t("stories.select.argTypes.infoTooltip.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    multiple: {
      control: "boolean",
      description: i18n.t("stories.select.argTypes.multiple.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    clearable: {
      control: "boolean",
      description: i18n.t("stories.select.argTypes.clearable.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.ui"),
      },
    },
    clickToRemove: {
      control: "boolean",
      description: i18n.t("stories.select.argTypes.clickToRemove.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.ui"),
      },
    },
    search: {
      control: "boolean",
      description: i18n.t("stories.select.argTypes.search.description"),
      table: {
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean | { placeholder?: string; emptyMessage?: string }",
        },
        category: i18n.t("stories.category.ui"),
      },
    },
    overflowBehavior: {
      control: "select",
      options: ["wrap", "wrap-when-open", "cutoff"],
      description: i18n.t(
        "stories.select.argTypes.overflowBehavior.description",
      ),
      table: {
        defaultValue: { summary: "wrap-when-open" },
        type: { summary: "wrap | wrap-when-open | cutoff" },
        category: i18n.t("stories.category.ui"),
      },
    },
    options: {
      control: "object",
      description: i18n.t("stories.select.argTypes.options.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    tagRender: {
      description: i18n.t("stories.select.argTypes.tagRender.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    onValuesChange: {
      action: "values changed",
      description: i18n.t("stories.select.argTypes.onValuesChange.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.select.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
  args: {
    label: "Select items",
    placeholder: "Choose items...",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
      { value: "option5", label: "Option 5" },
      { value: "option6", label: "Option 6" },
      { value: "option7", label: "Option 7" },
      { value: "option8", label: "Option 8" },
      { value: "option9", label: "Option 9" },
      { value: "option10", label: "Option 10" },
    ],
  },
};

export default meta;

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
];

const fruits: SelectOption[] = [
  { value: "apple", label: "Apple", icon: "🍎" },
  { value: "banana", label: "Banana", icon: "🍌", disabled: true },
  { value: "avocado", label: "Avocado", icon: "🥑" },
  { value: "orange", label: "Orange", icon: "🍊" },
  { value: "grape", label: "Grape", icon: "🍇", disabled: true },
  { value: "kiwi", label: "Kiwi", icon: "🥝" },
  { value: "mango", label: "Mango", icon: "🥭" },
];

const frameworks = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "vue", label: "Vue", group: "Frontend" },
  { value: "angular", label: "Angular", group: "Frontend" },
  { value: "svelte", label: "Svelte", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "express", label: "Express", group: "Backend" },
  { value: "fastify", label: "Fastify", group: "Backend" },
  { value: "nest", label: "NestJS", group: "Backend" },
];

export const Default = (args: SelectProps) => (
  <div className="w-96">
    <Select {...args} />
  </div>
);

export const WithLabel = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Country"
      placeholder="Select countries..."
      options={countries}
    />
    <Select
      label="Favorite Fruits"
      placeholder="Select fruits..."
      options={fruits}
      defaultValues={["banana", "apple"]}
    />
  </div>
);

export const WithHelperText = () => (
  <div className="w-96">
    <Select
      label="Countries"
      placeholder="Select your countries..."
      options={countries}
      helperText="This information will be used for shipping"
    />
  </div>
);

export const WithInfo = () => (
  <div className="w-96 flex flex-col gap-4">
    <Select
      label="Countries"
      placeholder="Select countries..."
      options={countries}
      infoTooltip="Select all countries where you currently operate"
    />
    <Select
      label="Countries"
      placeholder="Select countries..."
      options={countries}
      isFloatLabel
      infoTooltip="Select all countries where you currently operate"
    />
  </div>
);

export const HelperTextStates = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Default"
      placeholder="Select..."
      options={fruits}
      helperText="This is a default helper text"
      state="default"
    />
    <Select
      label="Success"
      placeholder="Select..."
      options={fruits}
      helperText="Selection is valid"
      state="success"
      defaultValues={["apple"]}
    />
    <Select
      label="Warning"
      placeholder="Select..."
      options={fruits}
      helperText="This selection might cause issues"
      state="warning"
      defaultValues={["banana", "orange"]}
    />
    <Select
      label="Error"
      placeholder="Select..."
      options={fruits}
      helperText="This field is required"
      state="error"
    />
  </div>
);

export const Disabled = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Disabled Select"
      placeholder="This select is disabled"
      options={countries}
      disabled
    />
    <Select
      label="Disabled with Values"
      options={countries}
      disabled
      defaultValues={["us", "uk"]}
    />
  </div>
);

export const Sizes = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Extra Small"
      placeholder="XS select"
      size="xs"
      options={fruits}
    />
    <Select
      label="Small"
      placeholder="Small select"
      size="sm"
      options={fruits}
    />
    <Select
      label="Normal"
      placeholder="Normal select"
      size="normal"
      options={fruits}
    />
    <Select
      label="Large"
      placeholder="Large select"
      size="lg"
      options={fruits}
    />
    <Select
      label="Extra Large"
      placeholder="XL select"
      size="xl"
      options={fruits}
    />
  </div>
);

export const FloatLabel = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Countries"
      placeholder=" "
      options={countries}
      isFloatLabel
    />
    <Select
      label="Favorite Fruits"
      options={fruits}
      isFloatLabel
      defaultValues={["apple", "banana"]}
      helperText="Select your favorite fruits"
    />
    <Select
      label="Select with Error"
      options={fruits}
      isFloatLabel
      state="error"
      helperText="This field is required"
      placeholder=" "
    />
  </div>
);

export const Clearable = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Countries"
      placeholder="Select countries..."
      options={countries}
      clearable
      defaultValues={["us", "uk"]}
      onValuesChange={(values) => console.log("Values changed:", values)}
      helperText="Click X on badges to clear individual selections"
    />
    <Select
      label="Fruits"
      placeholder="Select fruits..."
      options={fruits}
      clearable
      defaultValues={["banana", "apple", "orange"]}
      helperText="Clearable multi-select"
    />
    <Select
      label="Float Label with Clear"
      options={countries}
      isFloatLabel
      clearable
      defaultValues={["uk", "ca"]}
      onValuesChange={(values) => console.log("Cleared:", values)}
    />
  </div>
);

export const NotClearable = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Countries (Not Clearable)"
      placeholder="Select countries..."
      options={countries}
      clearable={false}
      clickToRemove={false}
      defaultValues={["us", "uk"]}
      helperText="Cannot remove selected items by clicking"
    />
  </div>
);

export const WithGroups = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Frameworks"
      placeholder="Select frameworks..."
      options={frameworks}
      helperText="Options are grouped by category"
    />
    <Select
      label="Tech Stack"
      options={frameworks}
      isFloatLabel
      defaultValues={["react", "node"]}
      helperText="Select your technology stack"
    />
  </div>
);

export const WithSearch = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Search Countries"
      placeholder="Type to search..."
      options={countries}
      search={{
        placeholder: "Search countries...",
        emptyMessage: "No country found.",
      }}
      helperText="Use the search box to filter options"
    />
    <Select
      label="Without Search"
      placeholder="Select fruits..."
      options={fruits}
      search={false}
      helperText="Search is disabled"
    />
  </div>
);

export const OverflowBehaviors = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Wrap (always)"
      placeholder="Select items..."
      options={countries}
      overflowBehavior="wrap"
      defaultValues={["us", "uk", "ca", "au", "de", "fr", "jp", "cn"]}
      helperText="Items always wrap to multiple lines"
      multiple
    />
    <Select
      label="Wrap when open (default)"
      placeholder="Select items..."
      options={countries}
      overflowBehavior="wrap-when-open"
      defaultValues={["us", "uk", "ca", "au", "de", "fr", "jp", "cn"]}
      helperText="Items wrap only when dropdown is open"
      multiple
    />
    <Select
      label="Cutoff"
      placeholder="Select items..."
      options={countries}
      overflowBehavior="cutoff"
      defaultValues={["us", "uk", "ca", "au", "de", "fr", "jp", "cn"]}
      helperText="Shows +N for overflow items"
      multiple
    />
  </div>
);

export const AllFeaturesCombined = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Complete Example"
      placeholder="Select frameworks..."
      options={frameworks}
      size="xl"
      isFloatLabel
      clearable
      state="success"
      helperText="All features enabled: float label, groups, search, clearable"
      infoTooltip="This select demonstrates all available features combined"
      defaultValues={["react", "node"]}
      onValuesChange={(values) => console.log("Selected:", values)}
      search={{
        placeholder: "Search frameworks...",
        emptyMessage: "No framework found.",
      }}
    />
  </div>
);

export const CompareSizes = () => (
  <div className="flex flex-col gap-6 w-96">
    <div>
      <h3 className="text-sm font-semibold mb-3">Regular Label</h3>
      <div className="flex flex-col gap-3">
        <Select
          size="xs"
          label="XS"
          options={fruits}
          defaultValues={["apple"]}
        />
        <Select
          size="sm"
          label="SM"
          options={fruits}
          defaultValues={["apple"]}
        />
        <Select
          size="normal"
          label="Normal"
          options={fruits}
          defaultValues={["apple"]}
        />
        <Select
          size="lg"
          label="LG"
          options={fruits}
          defaultValues={["apple"]}
        />
        <Select
          size="xl"
          label="XL"
          options={fruits}
          defaultValues={["apple"]}
        />
      </div>
    </div>

    <div>
      <h3 className="text-sm font-semibold mb-3">Float Label</h3>
      <div className="flex flex-col gap-3">
        <Select
          size="xs"
          label="XS Float"
          options={fruits}
          defaultValues={["apple"]}
          isFloatLabel
        />
        <Select
          size="sm"
          label="SM Float"
          options={fruits}
          defaultValues={["apple"]}
          isFloatLabel
        />
        <Select
          size="normal"
          label="Normal Float"
          options={fruits}
          defaultValues={["apple"]}
          isFloatLabel
        />
        <Select
          size="lg"
          label="LG Float"
          options={fruits}
          defaultValues={["apple"]}
          isFloatLabel
        />
        <Select
          size="xl"
          label="XL Float"
          options={fruits}
          defaultValues={["apple"]}
          isFloatLabel
        />
      </div>
    </div>
  </div>
);

export const SelectWithStates = () => (
  <div className="flex flex-col gap-4 w-96">
    <Select
      label="Default"
      placeholder="Select one..."
      options={fruits}
      helperText="This is a default single select"
      state="default"
    />
    <Select
      label="Success"
      placeholder="Select one..."
      options={fruits}
      helperText="Selection is valid"
      state="success"
      defaultValue="apple"
    />
    <Select
      label="Warning"
      placeholder="Select one..."
      options={fruits}
      multiple
      isFloatLabel
      size="lg"
      helperText="This selection might cause issues"
      state="warning"
      defaultValue="banana"
    />
    <Select
      label="Error"
      placeholder="Select one..."
      options={fruits}
      multiple
      isFloatLabel
      size="xl"
      helperText="This field is required"
      state="error"
    />
  </div>
);

export const CustomTagRender = () => {
  const tagRender = (option: SelectOption) => {
    const classNames = () => {
      switch (option.value) {
        case "banana":
          return "bg-yellow-100 text-yellow-800";
        case "apple":
          return "bg-pink-100 text-pink-800";
        case "avocado":
          return "bg-green-100 text-green-500";
        case "orange":
          return "bg-orange-100 text-orange-800";
        case "mango":
          return "bg-yellow-100 text-yellow-800";
        case "grape":
          return "bg-purple-100 text-purple-800";
        case "kiwi":
          return "bg-gray-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <div
        className={`${classNames()} px-2 py-1 rounded-full text-xs font-medium`}
      >
        {option.icon} {option.label}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-96">
      <Select
        label="Fruits with Custom Tags"
        placeholder="Select fruits..."
        options={fruits}
        tagRender={tagRender}
        defaultValues={"apple"}
        helperText="Custom tag rendering with emojis"
      />
      <Select
        label="Fruits with Custom Tags"
        placeholder="Select fruits..."
        options={fruits}
        multiple
        tagRender={tagRender}
        defaultValues={["apple", "banana"]}
        helperText="Custom tag rendering with emojis"
      />
    </div>
  );
};

export const CompareMultipleVsSingle = () => (
  <div className="flex flex-col gap-6 w-96">
    <div>
      <h3 className="text-sm font-semibold mb-3">Multi Select</h3>
      <Select
        label="Select Countries (Multiple)"
        placeholder="Select countries..."
        options={countries}
        multiple={true}
        defaultValues={["us", "uk", "ca"]}
        helperText="You can select multiple countries"
      />
    </div>

    <div>
      <h3 className="text-sm font-semibold mb-3">Single Select</h3>
      <Select
        label="Select Country (Single)"
        placeholder="Select a country..."
        options={countries}
        multiple={false}
        defaultValue="us"
        helperText="You can only select one country"
      />
    </div>
  </div>
);
