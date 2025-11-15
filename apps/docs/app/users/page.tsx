"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Search, Plus, MoreVertical, Mail, Phone } from "lucide-react";
import Button from "@dsui/design-system/button";
import Badge from "@dsui/design-system/badge";
import { Avatar } from "@dsui/design-system/avatar";
import Input from "@dsui/design-system/input";
import Checkbox from "@dsui/design-system/checkbox";
import Select from "@dsui/design-system/select";
import Dialog from "@dsui/design-system/dialog";
import { useState } from "react";
import { DatePicker } from "@dsui/design-system";

const users = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    phone: "+1 234 567 8900",
    role: "Admin",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    joinedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    phone: "+1 234 567 8901",
    role: "User",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jackson",
    joinedAt: "2024-02-20",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    phone: "+1 234 567 8902",
    role: "User",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    joinedAt: "2024-03-10",
  },
  {
    id: 4,
    name: "William Kim",
    email: "william.kim@email.com",
    phone: "+1 234 567 8903",
    role: "Moderator",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=William",
    joinedAt: "2024-03-25",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    phone: "+1 234 567 8904",
    role: "User",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    joinedAt: "2024-04-05",
  },
];

export default function UsersPage() {
  const [open, setOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">
              Manage your users and their permissions
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              defaultValue="all"
              placeholder="Status"
            />
            <Select
              options={[
                { value: "all", label: "All Roles" },
                { value: "admin", label: "Admin" },
                { value: "moderator", label: "Moderator" },
                { value: "user", label: "User" },
              ]}
              defaultValue="all"
              placeholder="Role"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    <Checkbox />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    User
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Contact
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Role
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Joined
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="p-4 align-middle">
                      <Checkbox />
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          fallback={user.name.charAt(0)}
                          animation="scale"
                          color="primary"
                        />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge
                        variant={
                          user.role === "Admin"
                            ? "solid"
                            : user.role === "Moderator"
                              ? "light"
                              : "outline"
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge
                        variant={user.status === "active" ? "solid" : "outline"}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <span className="text-sm">{user.joinedAt}</span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {users.length} of {users.length} users
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Add User"
        closeOnOutside={false}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Add User</Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <Input placeholder="Enter name" isFloatLabel label="Name" />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Enter email"
              isFloatLabel
              label="Email"
            />
          </div>
          <div>
            <Input placeholder="Enter phone" isFloatLabel label="Phone" />
          </div>
          <div>
            <Select
              isFloatLabel
              label="Role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "moderator", label: "Moderator" },
                { value: "user", label: "User" },
              ]}
              placeholder="Select role"
            />
          </div>
          <div>
            <DatePicker isFloatLabel label="Date of birth" />
          </div>
          <div>
            <Select
              label="Status"
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              placeholder="Select status"
              isFloatLabel
            />
          </div>
        </form>
      </Dialog>
    </AdminLayout>
  );
}
