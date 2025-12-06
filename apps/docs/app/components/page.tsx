"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@dsui/design-system/button";
import { Badge } from "@dsui/design-system/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@dsui/design-system/avatar";
import { Input } from "@dsui/design-system/input";
import { Label } from "@dsui/design-system/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@dsui/design-system/select";
import { Checkbox } from "@dsui/design-system/checkbox";
import { RadioGroup, RadioGroupItem } from "@dsui/design-system/radio";
import { Switch } from "@dsui/design-system/switch";
import { Textarea } from "@dsui/design-system/textarea";
import { Slider } from "@dsui/design-system/slider";
import { Progress } from "@dsui/design-system/progress";
import { Alert, AlertDescription, AlertTitle } from "@dsui/design-system/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@dsui/design-system/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dsui/design-system/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@dsui/design-system/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@dsui/design-system/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@dsui/design-system/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@dsui/design-system/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@dsui/design-system/tooltip";
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@dsui/design-system/toast";
import { useToast } from "@dsui/design-system/use-toast";
import { Calendar } from "@dsui/design-system/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@dsui/design-system/collapsible";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@dsui/design-system/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@dsui/design-system/dropdownmenu";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@dsui/design-system/contextmenu";
import { ScrollArea } from "@dsui/design-system/scrollarea";
import { Separator } from "@dsui/design-system/separator";
import { Skeleton } from "@dsui/design-system/skeleton";
import { Toggle } from "@dsui/design-system/toggle";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@dsui/design-system/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@dsui/design-system/table";
import { QrCode } from "@dsui/design-system/qrcode";
import { Rate } from "@dsui/design-system/rate";
import { Stepper, StepperContent, StepperDescription, StepperItem, StepperTitle, StepperTrigger } from "@dsui/design-system/stepper";
import { Tour, TourContent, TourDescription, TourTitle, TourTrigger } from "@dsui/design-system/tour";
import { TreeSelect } from "@dsui/design-system/treeselect";
import { Upload } from "@dsui/design-system/upload";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@dsui/design-system/resizable";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@dsui/design-system/sidebar";
import { Marquee } from "@dsui/design-system/marquee";
import { Masonry } from "@dsui/design-system/masonry";
import { Glass } from "@dsui/design-system/glass";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@dsui/design-system/inputotp";
import { AlertCircle, CheckCircle, ChevronDown, Home, Inbox, Search, Settings, User } from "lucide-react";
import { useState } from "react";

export default function ComponentsPage() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Design System Components</h1>
          <p className="text-muted-foreground mt-2">
            Explore all available components from our design system.
          </p>
        </div>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="utilities">Utilities</TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>Input controls and form components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="input">Input</Label>
                    <Input id="input" placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="select">Select</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="r1" />
                      <Label htmlFor="r1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="r2" />
                      <Label htmlFor="r2">Option 2</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox" />
                  <Label htmlFor="checkbox">Accept terms</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="switch" />
                  <Label htmlFor="switch">Enable notifications</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea">Textarea</Label>
                  <Textarea id="textarea" placeholder="Enter your message..." />
                </div>

                <div className="space-y-2">
                  <Label>Slider</Label>
                  <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label>Input OTP</Label>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="space-y-2">
                  <Label>Calendar</Label>
                  <Calendar mode="single" className="rounded-md border" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Display</CardTitle>
                <CardDescription>Components for displaying data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Avatar Component</p>
                    <p className="text-sm text-muted-foreground">With image and fallback</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>

                <div className="space-y-2">
                  <Label>Progress</Label>
                  <Progress value={66} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <Rate value={rating} onChange={setRating} />
                </div>

                <div className="space-y-2">
                  <Label>Skeleton</Label>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Table</Label>
                  <Table>
                    <TableCaption>A list of recent invoices.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Components</CardTitle>
                <CardDescription>Alerts, toasts, and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This is a warning alert with an icon.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    This is a success alert.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      toast({
                        title: "Success!",
                        description: "Your action was completed successfully.",
                      })
                    }
                  >
                    Show Toast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Layout Components</CardTitle>
                <CardDescription>Dialogs, sheets, and overlays</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                          This is a dialog component example.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                        <SheetDescription>
                          This is a sheet component example.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <p>This is a popover content.</p>
                    </PopoverContent>
                  </Popover>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Accordion Item 1</AccordionTrigger>
                    <AccordionContent>
                      Content for accordion item 1.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Accordion Item 2</AccordionTrigger>
                    <AccordionContent>
                      Content for accordion item 2.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Tabs>
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">Content for Tab 1</TabsContent>
                  <TabsContent value="tab2">Content for Tab 2</TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label>Collapsible</Label>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline">Toggle Content</Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      This content can be collapsed and expanded.
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Components</CardTitle>
                <CardDescription>Menus, trees, and navigation elements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Open Menu <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <Button variant="outline">Right Click Me</Button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>Profile</ContextMenuItem>
                      <ContextMenuItem>Billing</ContextMenuItem>
                      <ContextMenuItem>Settings</ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>

                <div className="space-y-2">
                  <Label>Tree Select</Label>
                  <TreeSelect
                    data={[
                      {
                        value: "1",
                        label: "Parent 1",
                        children: [
                          { value: "1-1", label: "Child 1-1" },
                          { value: "1-2", label: "Child 1-2" },
                        ],
                      },
                      {
                        value: "2",
                        label: "Parent 2",
                        children: [
                          { value: "2-1", label: "Child 2-1" },
                        ],
                      },
                    ]}
                    placeholder="Select an item..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Command Palette</Label>
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>
                          <Search className="mr-2 h-4 w-4" />
                          <span>Search</span>
                        </CommandItem>
                        <CommandItem>
                          <Home className="mr-2 h-4 w-4" />
                          <span>Home</span>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utilities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Utility Components</CardTitle>
                <CardDescription>Specialized utility components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>QR Code</Label>
                  <QrCode value="https://example.com" size={128} />
                </div>

                <div className="space-y-2">
                  <Label>Stepper</Label>
                  <Stepper>
                    <StepperItem value="step1">
                      <StepperTrigger>
                        <StepperTitle>Step 1</StepperTitle>
                        <StepperDescription>Description for step 1</StepperDescription>
                      </StepperTrigger>
                      <StepperContent>Content for step 1</StepperContent>
                    </StepperItem>
                    <StepperItem value="step2">
                      <StepperTrigger>
                        <StepperTitle>Step 2</StepperTitle>
                        <StepperDescription>Description for step 2</StepperDescription>
                      </StepperTrigger>
                      <StepperContent>Content for step 2</StepperContent>
                    </StepperItem>
                  </Stepper>
                </div>

                <div className="space-y-2">
                  <Label>Pagination</Label>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>

                <div className="space-y-2">
                  <Label>Upload</Label>
                  <Upload>
                    <Button variant="outline">Choose File</Button>
                  </Upload>
                </div>

                <div className="space-y-2">
                  <Label>Glass Effect</Label>
                  <Glass className="p-4">
                    <p>This is a glass effect component.</p>
                  </Glass>
                </div>

                <div className="space-y-2">
                  <Label>Marquee</Label>
                  <Marquee className="bg-muted p-2 rounded">
                    <span>Scrolling text • </span>
                    <span>Another scrolling text • </span>
                  </Marquee>
                </div>

                <div className="space-y-2">
                  <Label>Resizable Panels</Label>
                  <ResizablePanelGroup direction="horizontal" className="min-h-[200px] w-full rounded-lg border">
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Panel 1</span>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Panel 2</span>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>

                <div className="space-y-2">
                  <Label>Sidebar</Label>
                  <SidebarProvider>
                    <Sidebar>
                      <SidebarHeader>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <Home />
                              <span>Home</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <Inbox />
                              <span>Inbox</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <Settings />
                              <span>Settings</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarHeader>
                    </Sidebar>
                    <main className="flex-1 p-4">
                      <SidebarTrigger />
                      <p>Main content area</p>
                    </main>
                  </SidebarProvider>
                </div>

                <div className="space-y-2">
                  <Label>Tour</Label>
                  <Tour>
                    <TourTrigger asChild>
                      <Button>Start Tour</Button>
                    </TourTrigger>
                    <TourContent>
                      <TourTitle>Welcome!</TourTitle>
                      <TourDescription>This is a guided tour component.</TourDescription>
                    </TourContent>
                  </Tour>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}