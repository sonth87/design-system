"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Search, Plus, MoreVertical, Mail, Phone } from "lucide-react";
import Button from "@sth87/shadcn-design-system/button";
import Badge from "@sth87/shadcn-design-system/badge";
import { Avatar } from "@sth87/shadcn-design-system/avatar";
import Input from "@sth87/shadcn-design-system/input";
import Checkbox from "@sth87/shadcn-design-system/checkbox";
import Select from "@sth87/shadcn-design-system/select";
import Dialog from "@sth87/shadcn-design-system/dialog";
import { useState } from "react";
import { DatePicker } from "@sth87/shadcn-design-system";

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
      <div className="ds:space-y-6">
        {/* Page Header */}
        <div className="ds:flex ds:items-center ds:justify-between">
          <div>
            <h1 className="ds:text-3xl ds:font-bold ds:tracking-tight">Users</h1>
            <p className="ds:text-muted-foreground">
              Manage your users and their permissions
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="ds:mr-2 ds:h-4 ds:w-4" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="ds:flex ds:flex-col ds:gap-4 ds:md:flex-row ds:md:items-center ds:md:justify-between">
          <div className="ds:relative ds:flex-1 ds:max-w-md">
            <Search className="ds:absolute ds:left-3 ds:top-1/2 ds:h-4 ds:w-4 ds:-translate-y-1/2 ds:text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="ds:pl-9"
            />
          </div>
          <div className="ds:flex ds:gap-2">
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
        <div className="ds:rounded-lg ds:border ds:bg-card ds:shadow-sm">
          <div className="ds:overflow-x-auto">
            <table className="ds:w-full">
              <thead className="ds:border-b ds:bg-muted/50">
                <tr>
                  <th className="ds:h-12 ds:px-4 ds:text-left ds:align-middle ds:font-medium">
                    <Checkbox />
                  </th>
                  <th className="ds:h-12 ds:px-4 ds:text-left ds:align-middle ds:font-medium">
                    User
                  </th>
                  <th className="ds:h-12 ds:px-4 ds:text-left ds:align-middle ds:font-medium">
                    Contact
                  </th>
                  <th className="ds:h-12 ds:px-4 ds:text-left ds:align-middle ds:font-medium">
                    Role
                  </th>
                  <th className="ds:h-12 ds:px-4 ds:text-left ds:align-middle ds:font-medium">
                    Status
                  </th>
                  <th className="ds:h-12 ds:px-4 ds:text-left ds:align-middle ds:font-medium">
                    Joined
                  </th>
                  <th className="ds:h-12 ds:px-4 ds:text-right ds:align-middle ds:font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="ds:border-b ds:last:border-0">
                    <td className="ds:p-4 ds:align-middle">
                      <Checkbox />
                    </td>
                    <td className="ds:p-4 ds:align-middle">
                      <div className="ds:flex ds:items-center ds:gap-3">
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          fallback={user.name.charAt(0)}
                          color="primary"
                        />
                        <div>
                          <p className="ds:font-medium">{user.name}</p>
                          <p className="ds:text-sm ds:text-muted-foreground">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="ds:p-4 ds:align-middle">
                      <div className="ds:space-y-1">
                        <div className="ds:flex ds:items-center ds:gap-2 ds:text-sm">
                          <Mail className="ds:h-3 ds:w-3 ds:text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="ds:flex ds:items-center ds:gap-2 ds:text-sm ds:text-muted-foreground">
                          <Phone className="ds:h-3 ds:w-3" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="ds:p-4 ds:align-middle">
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
                    <td className="ds:p-4 ds:align-middle">
                      <Badge
                        variant={user.status === "active" ? "solid" : "outline"}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="ds:p-4 ds:align-middle">
                      <span className="ds:text-sm">{user.joinedAt}</span>
                    </td>
                    <td className="ds:p-4 ds:align-middle ds:text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="ds:h-4 ds:w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="ds:flex ds:items-center ds:justify-between">
          <p className="ds:text-sm ds:text-muted-foreground">
            Showing 1 to {users.length} of {users.length} users
          </p>
          <div className="ds:flex ds:gap-2">
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
          <div className="ds:flex ds:justify-end ds:gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Add User</Button>
          </div>
        }
      >
        <form className="ds:space-y-4">
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
