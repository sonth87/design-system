import type { Meta, StoryObj } from "@storybook/react";
import {
  TreeView,
  type TreeDataItem,
} from "../components/TreeSelect/TreeSelect";
import { File, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof TreeView> = {
  title: "Form Components/TreeSelect",
  component: TreeView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: i18n.t("stories.treeselect.argTypes.data.description"),
      table: {
        category: i18n.t("stories.category.data"),
      },
    },
    initialSelectedItemId: {
      control: "text",
      description: i18n.t(
        "stories.treeselect.argTypes.initialSelectedItemId.description"
      ),
      table: {
        category: i18n.t("stories.category.state"),
      },
    },
    onSelectChange: {
      description: i18n.t(
        "stories.treeselect.argTypes.onSelectChange.description"
      ),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    expandAll: {
      control: "boolean",
      description: i18n.t("stories.treeselect.argTypes.expandAll.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    defaultNodeIcon: {
      description: i18n.t(
        "stories.treeselect.argTypes.defaultNodeIcon.description"
      ),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    defaultLeafIcon: {
      description: i18n.t(
        "stories.treeselect.argTypes.defaultLeafIcon.description"
      ),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    multiSelect: {
      control: "boolean",
      description: i18n.t(
        "stories.treeselect.argTypes.multiSelect.description"
      ),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    selectedIds: {
      description: i18n.t(
        "stories.treeselect.argTypes.selectedIds.description"
      ),
      table: {
        category: i18n.t("stories.category.state"),
      },
    },
    onMultiSelectChange: {
      description: i18n.t(
        "stories.treeselect.argTypes.onMultiSelectChange.description"
      ),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    showIcon: {
      control: "boolean",
      description: i18n.t("stories.treeselect.argTypes.showIcon.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    showLeafIcon: {
      control: "boolean",
      description: i18n.t(
        "stories.treeselect.argTypes.showLeafIcon.description"
      ),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    treeLine: {
      control: "boolean",
      description: i18n.t("stories.treeselect.argTypes.treeLine.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.appearance"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

const sampleData: TreeDataItem[] = [
  {
    id: "1",
    name: "Documents",
    children: [
      {
        id: "1-1",
        name: "Work",
        children: [
          { id: "1-1-1", name: "Resume.pdf" },
          { id: "1-1-2", name: "Cover Letter.docx" },
        ],
      },
      {
        id: "1-2",
        name: "Personal",
        children: [
          { id: "1-2-1", name: "Photo.jpg" },
          { id: "1-2-2", name: "Notes.txt" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Projects",
    children: [
      {
        id: "2-1",
        name: "Website",
        children: [
          { id: "2-1-1", name: "index.html" },
          { id: "2-1-2", name: "styles.css" },
          { id: "2-1-3", name: "app.js" },
        ],
      },
      { id: "2-2", name: "Mobile App", children: [] },
    ],
  },
  {
    id: "3",
    name: "Downloads",
    children: [
      { id: "3-1", name: "installer.exe" },
      { id: "3-2", name: "archive.zip" },
    ],
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const WithIcons: Story = {
  args: {
    data: sampleData,
    defaultNodeIcon: Folder,
    defaultLeafIcon: File,
  },
};

export const WithCustomIcons: Story = {
  args: {
    data: [
      {
        id: "1",
        name: "Documents",
        icon: Folder,
        openIcon: FolderOpen,
        children: [
          {
            id: "1-1",
            name: "Work",
            icon: Folder,
            openIcon: FolderOpen,
            children: [
              { id: "1-1-1", name: "Resume.pdf", icon: File },
              { id: "1-1-2", name: "Cover Letter.docx", icon: File },
            ],
          },
        ],
      },
    ],
    defaultNodeIcon: Folder,
    defaultLeafIcon: File,
  },
};

export const ExpandAll: Story = {
  args: {
    data: sampleData,
    expandAll: true,
    defaultNodeIcon: Folder,
    defaultLeafIcon: File,
  },
};

export const WithInitialSelection: Story = {
  args: {
    data: sampleData,
    initialSelectedItemId: "1-1-1",
    defaultNodeIcon: Folder,
    defaultLeafIcon: File,
  },
};

export const Interactive: Story = {
  render: function InteractiveTreeView(args) {
    const [selectedItem, setSelectedItem] = useState<
      TreeDataItem | undefined
    >();

    return (
      <div className="w-[400px]">
        <TreeView
          {...args}
          data={sampleData}
          onSelectChange={(item) => {
            setSelectedItem(item);
            console.log("Selected item:", item);
          }}
          defaultNodeIcon={Folder}
          defaultLeafIcon={File}
        />
        {selectedItem && (
          <div className="mt-4 p-4 border rounded-lg">
            <p className="text-sm font-medium">Selected Item:</p>
            <p className="text-sm text-muted-foreground">{selectedItem.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              ID: {selectedItem.id}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  args: {
    data: [
      {
        id: "1",
        name: "Active Folder",
        children: [
          { id: "1-1", name: "Active File.txt" },
          { id: "1-2", name: "Disabled File.txt", disabled: true },
        ],
      },
      {
        id: "2",
        name: "Another Folder",
        children: [{ id: "2-1", name: "File.txt" }],
      },
    ],
    defaultNodeIcon: Folder,
    defaultLeafIcon: File,
  },
};

export const MultiSelect: Story = {
  render: function MultiSelectTreeView(args) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div className="w-[400px]">
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Multi-Select Mode</p>
          <p className="text-xs text-muted-foreground">
            Use checkboxes to select multiple items
          </p>
          {selectedIds.length > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Selected: {selectedIds.length} item
              {selectedIds.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
        <TreeView
          {...args}
          data={sampleData}
          multiSelect={true}
          selectedIds={selectedIds}
          onMultiSelectChange={(ids: string[]) => {
            setSelectedIds(ids);
            console.log("Selected IDs:", ids);
          }}
          defaultNodeIcon={Folder}
          defaultLeafIcon={File}
        />
        {selectedIds.length > 0 && (
          <div className="mt-4 p-4 border rounded-lg">
            <p className="text-sm font-medium mb-2">Selected Items:</p>
            <div className="flex flex-wrap gap-2">
              {selectedIds.map((id) => (
                <span
                  key={id}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const MultiSelectWithInitialSelection: Story = {
  render: function MultiSelectWithInitialTreeView(args) {
    const [selectedIds, setSelectedIds] = useState<string[]>([
      "1-1-1",
      "1-1-2",
      "2-1-1",
    ]);

    return (
      <div className="w-[400px]">
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Pre-selected Items</p>
          <p className="text-xs text-muted-foreground">
            Some items are already selected
          </p>
        </div>
        <TreeView
          {...args}
          data={sampleData}
          multiSelect={true}
          selectedIds={selectedIds}
          onMultiSelectChange={(ids: string[]) => {
            setSelectedIds(ids);
          }}
          expandAll={true}
          defaultNodeIcon={Folder}
          defaultLeafIcon={File}
        />
      </div>
    );
  },
};

export const LargeTree: Story = {
  args: {
    data: [
      {
        id: "root",
        name: "Root Directory",
        children: Array.from({ length: 5 }, (_, i) => ({
          id: `folder-${i}`,
          name: `Folder ${i + 1}`,
          children: Array.from({ length: 3 }, (_, j) => ({
            id: `folder-${i}-${j}`,
            name: `Subfolder ${j + 1}`,
            children: Array.from({ length: 4 }, (_, k) => ({
              id: `file-${i}-${j}-${k}`,
              name: `File ${k + 1}.txt`,
            })),
          })),
        })),
      },
    ],
    defaultNodeIcon: Folder,
    defaultLeafIcon: File,
  },
};

export const WithTreeLines: Story = {
  args: {
    data: sampleData,
    treeLine: true,
    defaultNodeIcon: Folder,
    defaultLeafIcon: File,
    expandAll: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    data: sampleData,
    showIcon: false,
    showLeafIcon: false,
    expandAll: true,
  },
};

export const WithoutLeafIcons: Story = {
  args: {
    data: sampleData,
    showIcon: true,
    showLeafIcon: false,
    defaultNodeIcon: Folder,
    expandAll: true,
  },
};

export const TreeLinesWithoutIcons: Story = {
  args: {
    data: sampleData,
    treeLine: true,
    showIcon: false,
    showLeafIcon: false,
    expandAll: true,
  },
};
