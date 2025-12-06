"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "@/components/Table/data-table";
import { DataTableToolbar } from "@/components/Table/data-table-toolbar";
import { DropdownMenu } from "@/components/DropdownMenu";
import React from "react";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { selectColumn } from "@/components/Table/select-column";
import {
  CheckCircle,
  CheckCircle2,
  Delete,
  DollarSign,
  Edit2,
  Edit3,
  MoreHorizontal,
  Text,
  Trash2,
  XCircle,
} from "lucide-react";
import Badge from "@/components/Badge";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/react";
import { useDataTable } from "@/hooks/use-data-table";
import i18n from "../../../.storybook/i18n";
import Button from "@/components/Button";

const meta: Meta<typeof DataTable> = {
  title: "Data Display/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
## Nuqs Integration

This DataTable component integrates with [nuqs](https://nuqs.dev/), a TypeScript-first URL state management library for React.

### What is nuqs?
Nuqs allows you to manage application state through URL query parameters, enabling features like:
- **Deep linking**: Share URLs that preserve table state (filters, sorting, pagination)
- **Browser navigation**: Back/forward buttons work with table state
- **Persistence**: Table state survives page reloads
- **Server-side rendering**: Compatible with SSR frameworks like Next.js

### How to use nuqs with DataTable
1. **Wrap your component** with \`NuqsAdapter\` from \`nuqs/adapters/react\`:
   \`\`\`tsx
   import { NuqsAdapter } from "nuqs/adapters/react";

   function MyPage() {
     return (
       <NuqsAdapter>
         <MyTableComponent />
       </NuqsAdapter>
     );
   }
   \`\`\`

2. **Use \`useDataTable\` with \`enableNuqs: true\`** (default):
   \`\`\`tsx
   const { table } = useDataTable({
     data,
     columns,
     pageCount: 10, // For server-side pagination
     enableNuqs: true, // Enable URL sync (default)
   });
   \`\`\`

3. **Customize query keys** to avoid conflicts with multiple tables:
   \`\`\`tsx
   const { table } = useDataTable({
     data,
     columns,
     pageCount: 10,
     queryKeys: {
       page: "myPage",
       perPage: "mySize",
       sort: "mySort",
       filters: "myFilters",
     },
   });
   \`\`\`

### Disabling nuqs
If you don't want URL synchronization (e.g., multiple tables on one page), set \`enableNuqs: false\`:
\`\`\`tsx
const { table } = useDataTable({
  data,
  columns,
  pageCount: 10,
  enableNuqs: false,
});
\`\`\`

### URL Parameters
When enabled, the following query parameters are used:
- \`page\`: Current page (1-based)
- \`perPage\`: Items per page
- \`sort\`: Sorting state (e.g., \`title:desc\`)
- \`filters\`: Column filters (JSON-encoded)

Example URL: \`?page=2&perPage=20&sort=title:desc&filters=...\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  // decorators: [
  //   (Story) => (
  //     <NuqsAdapter>
  //       <Story />
  //     </NuqsAdapter>
  //   ),
  // ],
};

export default meta;
type Story = StoryObj<typeof meta>;

interface Project {
  id: string;
  title: string;
  status: "active" | "inactive";
  budget: number;
  priority: "low" | "medium" | "high";
  assignee: string;
  startDate: string;
  endDate: string;
  progress: number;
  category: string;
  tags: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

function generateFakeProjects(count: number): Project[] {
  const projects: Project[] = [];
  const titles = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Epsilon",
    "Zeta",
    "Eta",
    "Theta",
    "Iota",
    "Kappa",
  ];
  const assignees = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
  const categories = [
    "Development",
    "Design",
    "Marketing",
    "Research",
    "Operations",
  ];
  const priorities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];

  for (let i = 0; i < count; i++) {
    projects.push({
      id: (i + 1).toString(),
      title: `Project ${titles[i % titles.length]} ${Math.floor(i / titles.length) + 1}`,
      status: Math.random() > 0.5 ? "active" : "inactive",
      budget: Math.floor(Math.random() * 90000) + 10000,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      startDate: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      )
        .toISOString()
        .split("T")[0],
      endDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      progress: Math.floor(Math.random() * 101),
      category: categories[Math.floor(Math.random() * categories.length)],
      tags: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => `tag${Math.floor(Math.random() * 10)}`,
      ),
      description: `Description for Project ${titles[i % titles.length]} ${Math.floor(i / titles.length) + 1}`,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    });
  }
  return projects;
}

const data: Project[] = generateFakeProjects(100);

const columns: ColumnDef<Project>[] = [
  selectColumn<Project>(),
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
    enableSorting: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }: CellContext<Project, unknown>) => {
      const status = cell.getValue<Project["status"]>();
      const Icon = status === "active" ? CheckCircle2 : XCircle;

      return (
        <Badge
          variant="outline"
          className="capitalize gap-1"
          color={status === "active" ? "success" : "error"}
        >
          <Icon />
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, filterValue) => {
      if (
        !filterValue ||
        !Array.isArray(filterValue) ||
        filterValue.length === 0
      ) {
        return true;
      }
      const cellValue = row.getValue(id);
      return filterValue.includes(cellValue);
    },
    meta: {
      label: "Status",
      variant: "select",
      options: [
        { label: "Active", value: "active", icon: CheckCircle },
        { label: "Inactive", value: "inactive", icon: XCircle },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "budget",
    accessorKey: "budget",
    header: "Budget",
    cell: ({ cell }: CellContext<Project, unknown>) => {
      const budget = cell.getValue<Project["budget"]>();

      return (
        <div className="flex items-center gap-1">
          <DollarSign className="size-4" />
          {budget.toLocaleString()}
        </div>
      );
    },
  },
  {
    id: "priority",
    accessorKey: "priority",
    header: "Priority",
    cell: ({ cell }: CellContext<Project, unknown>) => {
      const priority = cell.getValue<Project["priority"]>();
      return (
        <Badge variant="outline" className="capitalize">
          {priority}
        </Badge>
      );
    },
    filterFn: (row, id, filterValue) => {
      if (
        !filterValue ||
        !Array.isArray(filterValue) ||
        filterValue.length === 0
      ) {
        return true;
      }
      const cellValue = row.getValue(id);
      return filterValue.includes(cellValue);
    },
    meta: {
      label: "Priority",
      variant: "multiSelect",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "assignee",
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ cell }: CellContext<Project, unknown>) => (
      <div>{cell.getValue<Project["assignee"]>()}</div>
    ),
    filterFn: (row, id, filterValue) => {
      if (
        !filterValue ||
        !Array.isArray(filterValue) ||
        filterValue.length === 0
      ) {
        return true;
      }
      const cellValue = row.getValue(id);
      return filterValue.includes(cellValue);
    },
    meta: {
      label: "Assignee",
      variant: "multiSelect",
      options: [
        { label: "Alice", value: "Alice" },
        { label: "Bob", value: "Bob" },
        { label: "Charlie", value: "Charlie" },
        { label: "Diana", value: "Diana" },
        { label: "Eve", value: "Eve" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "startDate",
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ cell }: CellContext<Project, unknown>) => (
      <div>{cell.getValue<Project["startDate"]>()}</div>
    ),
    meta: {
      label: "Start Date",
      variant: "date",
    },
  },
  {
    id: "endDate",
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ cell }: CellContext<Project, unknown>) => (
      <div>{cell.getValue<Project["endDate"]>()}</div>
    ),
  },
  {
    id: "progress",
    accessorKey: "progress",
    header: "Progress",
    cell: ({ cell }: CellContext<Project, unknown>) => {
      const progress = cell.getValue<Project["progress"]>();
      return <div>{progress}%</div>;
    },
  },
  {
    id: "category",
    accessorKey: "category",
    header: "Category",
    cell: ({ cell }: CellContext<Project, unknown>) => (
      <div>{cell.getValue<Project["category"]>()}</div>
    ),
    filterFn: (row, id, filterValue) => {
      if (
        !filterValue ||
        !Array.isArray(filterValue) ||
        filterValue.length === 0
      ) {
        return true;
      }
      const cellValue = row.getValue(id);
      return filterValue.includes(cellValue);
    },
    meta: {
      label: "Category",
      variant: "select",
      options: [
        { label: "Development", value: "Development" },
        { label: "Design", value: "Design" },
        { label: "Marketing", value: "Marketing" },
        { label: "Research", value: "Research" },
        { label: "Operations", value: "Operations" },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: "tags",
    accessorKey: "tags",
    header: "Tags",
    cell: ({ cell }: CellContext<Project, unknown>) => {
      const tags = cell.getValue<Project["tags"]>();
      return (
        <div className="flex gap-1">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
    cell: ({ cell }: CellContext<Project, unknown>) => (
      <div>{cell.getValue<Project["description"]>()}</div>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ cell }: CellContext<Project, unknown>) => {
      const date = new Date(cell.getValue<Project["createdAt"]>());
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ cell }: CellContext<Project, unknown>) => {
      const date = new Date(cell.getValue<Project["updatedAt"]>());
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: function Cell() {
      return (
        <div className="flex gap-1 justify-end">
          <Button variant={"ghost"} color="muted">
            <Edit3 />
          </Button>
          <Button variant={"ghost"} color="error">
            <Trash2 />
          </Button>
        </div>
      );
    },
    size: 32,
  },
  // {
  //   id: "actions",
  //   cell: function Cell() {
  //     return (
  //       <DropdownMenu
  //         trigger={
  //           <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
  //             <MoreHorizontal className="h-4 w-4" />
  //             <span className="sr-only">Open menu</span>
  //           </button>
  //         }
  //         items={[
  //           { key: "edit", label: "Edit", onClick: () => {} },
  //           {
  //             key: "delete",
  //             label: "Delete",
  //             variant: "destructive",
  //             onClick: () => {},
  //           },
  //         ]}
  //         align="end"
  //       />
  //     );
  //   },
  //   size: 32,
  // },
];

export const Default = () => {
  const { table } = useDataTable({
    data: data,
    columns,
    // pageCount: Math.ceil(data.length / 10),
    // manualPagination: false,
    initialState: {
      // sorting: [{ id: "title", desc: true }],
      columnPinning: { left: ["select", "title"], right: ["actions"] },
      pagination: { pageIndex: 0, pageSize: 10 },
    },
    getRowId: (row) => row.id,
    // getFilteredRowModel: undefined, // disable client-side filtering
    // enableNuqs: true, // enabled if you are using NuqsAdapter
  });
  console.log(table.getRowModel());
  return (
    <div className="data-table-container">
      <DataTableToolbar
        table={table}
        showColumnFilters
        showColumnVisibilityToggle
      />
      <DataTable
        table={table}
        pagination={{ showRowSelectionCount: true, showPageSizeOptions: true }}
      />
    </div>
  );
};

const WithNuqsStory = () => {
  const [title] = useQueryState("title", parseAsString.withDefault(""));
  const [status] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  // Ideally we would filter the data server-side, but for the sake of this example, we'll filter the data client-side
  const filteredData = React.useMemo(() => {
    return data.filter((project) => {
      const matchesTitle =
        title === "" ||
        project.title.toLowerCase().includes(title.toLowerCase());
      const matchesStatus =
        status.length === 0 || status.includes(project.status);

      return matchesTitle && matchesStatus;
    });
  }, [title, status]);

  const { table } = useDataTable({
    data: filteredData,
    columns,
    enableNuqs: true, // Enable nuqs
  });

  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
};

export const WithNuqs: Story = {
  render: () => (
    <NuqsAdapter>
      <WithNuqsStory />
    </NuqsAdapter>
  ),
};

export const WithOptions = () => {
  const demoData = React.useMemo(() => data.slice(0, 100), []);
  const { table } = useDataTable({
    data: demoData,
    columns,
    getRowId: (row) => row.id,
  });

  return (
    <div className="data-table-container">
      <DataTableToolbar table={table} showColumnVisibilityToggle />
      <DataTable
        table={table}
        sticky={{ offsetHeader: 150 }}
        bordered={true}
        loading={false}
        footer={(currentPageData) => (
          <div className="text-center py-2">
            Footer: Showing {currentPageData.length} of {demoData.length}{" "}
            projects
          </div>
        )}
        pagination={{ showRowSelectionCount: true, showPageSizeOptions: true }}
      />
    </div>
  );
};
