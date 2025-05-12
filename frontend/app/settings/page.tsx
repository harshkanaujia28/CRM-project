"use client"

import { useEffect, useState } from "react"
import LayoutWithSidebar from "@/components/layout-with-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Mail, MessageSquare, Phone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
// import { useTheme } from "@/contexts/ThemeContext"

export default function SettingsPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  // const { theme, toggleTheme } = useTheme()

  // Get user role from localStorage on client side
  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"))
  }, [])

  // If user role is not loaded yet, show nothing
  if (userRole === null) {
    return null
  }

  // Different settings view for technicians vs admins
  const isAdmin = userRole === "admin"

  return (
    <LayoutWithSidebar>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {isAdmin ? (
        // Admin Settings View
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="users">Users & Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your CRM system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="3i Energy Solutions" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="https://3ienergy.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="support@3ienergy.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable dark mode for the interface
                        </p>
                      </div>
                      {/* <Switch
                        id="darkMode"
                        checked={theme === 'dark'}
                        onCheckedChange={toggleTheme}
                      /> */}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoAssign">Auto-Assign Tickets</Label>
                        <p className="text-sm text-muted-foreground">Automatically assign tickets to technicians</p>
                      </div>
                      <Switch id="autoAssign" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoClose">Auto-Close Resolved Tickets</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically close tickets after 48 hours of being resolved
                        </p>
                      </div>
                      <Switch id="autoClose" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newTicket">New Ticket</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when a new ticket is created</p>
                      </div>
                      <Switch id="newTicket" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ticketAssigned">Ticket Assigned</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive an email when a ticket is assigned to you
                        </p>
                      </div>
                      <Switch id="ticketAssigned" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ticketUpdated">Ticket Updated</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when a ticket is updated</p>
                      </div>
                      <Switch id="ticketUpdated" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ticketResolved">Ticket Resolved</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when a ticket is resolved</p>
                      </div>
                      <Switch id="ticketResolved" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inAppNewTicket">New Ticket</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive an in-app notification when a new ticket is created
                        </p>
                      </div>
                      <Switch id="inAppNewTicket" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inAppTicketAssigned">Ticket Assigned</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive an in-app notification when a ticket is assigned to you
                        </p>
                      </div>
                      <Switch id="inAppTicketAssigned" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inAppTicketUpdated">Ticket Updated</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive an in-app notification when a ticket is updated
                        </p>
                      </div>
                      <Switch id="inAppTicketUpdated" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Manage third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">WhatsApp</h3>
                        <p className="text-sm text-muted-foreground">Connect WhatsApp Business API</p>
                      </div>
                    </div>
                    <Switch id="whatsapp" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">VoIP Phone System</h3>
                        <p className="text-sm text-muted-foreground">Connect your VoIP phone system</p>
                      </div>
                    </div>
                    <Switch id="voip" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Email Integration</h3>
                        <p className="text-sm text-muted-foreground">Connect your email service</p>
                      </div>
                    </div>
                    <Switch id="email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Analytics Integration</h3>
                        <p className="text-sm text-muted-foreground">Connect to analytics platform</p>
                      </div>
                    </div>
                    <Switch id="analytics" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Users & Permissions</CardTitle>
                <CardDescription>Manage user accounts and access levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin User" />
                              <AvatarFallback>AU</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Admin User</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>admin@3ienergy.com</TableCell>
                        <TableCell>Administrator</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Maria Garcia" />
                              <AvatarFallback>MG</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Maria Garcia</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>maria.garcia@3ienergy.com</TableCell>
                        <TableCell>Manager</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                              <AvatarFallback>AJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Alex Johnson</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>alex.johnson@3ienergy.com</TableCell>
                        <TableCell>Technician</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="David Kim" />
                              <AvatarFallback>DK</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">David Kim</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>david.kim@3ienergy.com</TableCell>
                        <TableCell>Technician</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800">Inactive</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/settings/add-user">
                  <Button>Add User</Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        // Technician Settings View - Limited options
        <Tabs defaultValue="personal">
          <TabsList className="mb-4">
            <TabsTrigger value="personal">Personal Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Settings</CardTitle>
                <CardDescription>Manage your personal preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue="Alex Johnson" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="tech@3ienergy.com" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 987-6543" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input id="timezone" defaultValue="America/New_York" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Interface Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable dark mode for the interface
                        </p>
                      </div>
                      {/* <Switch
                        id="darkMode"
                        checked={theme === 'dark'}
                        onCheckedChange={toggleTheme}
                      /> */}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="compactView">Compact View</Label>
                        <p className="text-sm text-muted-foreground">Use a more compact layout for lists</p>
                      </div>
                      <Switch id="compactView" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ticketAssigned">Ticket Assigned</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive an email when a ticket is assigned to you
                        </p>
                      </div>
                      <Switch id="ticketAssigned" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ticketUpdated">Ticket Updated</Label>
                        <p className="text-sm text-muted-foreground">Receive an email when a ticket is updated</p>
                      </div>
                      <Switch id="ticketUpdated" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dailySummary">Daily Summary</Label>
                        <p className="text-sm text-muted-foreground">Receive a daily summary of your tickets</p>
                      </div>
                      <Switch id="dailySummary" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inAppTicketAssigned">Ticket Assigned</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive an in-app notification when a ticket is assigned to you
                        </p>
                      </div>
                      <Switch id="inAppTicketAssigned" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inAppTicketUpdated">Ticket Updated</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive an in-app notification when a ticket is updated
                        </p>
                      </div>
                      <Switch id="inAppTicketUpdated" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inAppReminders">Reminders</Label>
                        <p className="text-sm text-muted-foreground">Receive in-app reminders for upcoming tasks</p>
                      </div>
                      <Switch id="inAppReminders" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </LayoutWithSidebar>
  )
}
