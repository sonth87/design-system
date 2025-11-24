"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "@/components/Table/data-table";
import { DataTableToolbar } from "@/components/Table/data-table-toolbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dsui/ui/index";
import React from "react";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { createSelectColumn } from "@/components/Table/select-column";
import {
  CheckCircle,
  CheckCircle2,
  DollarSign,
  MoreHorizontal,
  Text,
  XCircle,
} from "lucide-react";
import Badge from "@/components/Badge";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/react";
import { useDataTable } from "@/hooks/use-data-table";
import i18n from "../../../.storybook/i18n";

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
  for (let i = 0; i < count; i++) {
    projects.push({
      id: (i + 1).toString(),
      title: `Project ${titles[i % titles.length]}`,
      status: Math.random() > 0.5 ? "active" : "inactive",
      budget: Math.floor(Math.random() * 90000) + 10000,
    });
  }
  return projects;
}

const data: Project[] = generateFakeProjects(100);

const columns: ColumnDef<Project>[] = [
  createSelectColumn<Project>(),
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
    cell: ({ cell }: CellContext<Project, unknown>) => (
      <div>{cell.getValue<Project["title"]>()}</div>
    ),
    meta: {
      label: "Title",
      placeholder: "Search titles...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
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
    meta: {
      label: "Status",
      variant: "multiSelect",
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
    id: "actions",
    cell: function Cell() {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 32,
  },
];

export const Default = () => {
  const { table } = useDataTable({
    data: data,
    columns,
    // pageCount: Math.ceil(data.length / 10),
    // manualPagination: false,
    // initialState: {
    //   // sorting: [{ id: "title", desc: true }],
    //   // columnPinning: { right: ["actions"] },
    //   pagination: { pageIndex: 0, pageSize: 10 },
    // },
    getRowId: (row) => row.id,
  });

  return (
    <div className="data-table-container">
      <DataTableToolbar table={table} showColumnVisibilityToggle />
      <DataTable table={table} pagination={{ showRowSelectionCount: true }} />
    </div>
  );
};

const WithNuqsStory = () => {
  const [title] = useQueryState("title", parseAsString.withDefault(""));
  const [status] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([])
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
