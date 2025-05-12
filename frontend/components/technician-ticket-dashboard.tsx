"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare, Phone, Globe, Mail } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockAssignedTickets = [
  {
    id: "TKT-004",
    customer: "Emily Davis",
    subject: "System maintenance request",
    status: "open",
    priority: "urgent",
    source: "phone",
    createdAt: "2025-03-22T11:20:00Z",
  },
  {
    id: "TKT-005",
    customer: "Robert Wilson",
    subject: "Energy efficiency consultation",
    status: "in-progress",
    priority: "medium",
    source: "email",
    createdAt: "2025-03-21T16:30:00Z",
  },
  {
    id: "TKT-007",
    customer: "Jennifer Lopez",
    subject: "Solar panel not generating power",
    status: "in-progress",
    priority: "high",
    source: "whatsapp",
    createdAt: "2025-03-23T09:15:00Z",
  },
]

export default function TechnicianTicketDashboard() {
  const [tickets, setTickets] = useState(mockAssignedTickets)
  const [userName, setUserName] = useState<string>("")

  // Get user name from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") || ""
    setUserName(storedUserName)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "phone":
        return <Phone className="h-4 w-4 text-blue-500" />
      case "web":
        return <Globe className="h-4 w-4 text-purple-500" />
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "email":
        return <Mail className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>My Assigned Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No tickets assigned to you
                  </TableCell>
                </TableRow>
              ) : (
                tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.customer}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getSourceIcon(ticket.source)}
                        <span className="capitalize">{ticket.source}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/tickets/${ticket.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
