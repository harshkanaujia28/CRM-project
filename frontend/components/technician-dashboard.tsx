"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"

// Mock data for demonstration
const mockTechnicians = {
  "Team A": [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
      status: "online",
      ticketsAssigned: 5,
      ticketsResolved: 3,
      workload: 60,
      expertise: ["Solar Panels", "Inverters"],
    },
    {
      id: 2,
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MG",
      status: "online",
      ticketsAssigned: 4,
      ticketsResolved: 2,
      workload: 50,
      expertise: ["Batteries", "Wiring"],
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DK",
      status: "offline",
      ticketsAssigned: 0,
      ticketsResolved: 4,
      workload: 0,
      expertise: ["Maintenance", "Troubleshooting"],
    },
    {
      id: 4,
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PP",
      status: "online",
      ticketsAssigned: 7,
      ticketsResolved: 5,
      workload: 80,
      expertise: ["Installation", "Solar Panels"],
    },
  ],
  "Team B": [
    {
      id: 5,
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JW",
      status: "online",
      ticketsAssigned: 6,
      ticketsResolved: 4,
      workload: 70,
      expertise: ["Batteries", "Inverters"],
    },
    {
      id: 6,
      name: "Sofia Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SR",
      status: "online",
      ticketsAssigned: 3,
      ticketsResolved: 1,
      workload: 40,
      expertise: ["Wiring", "Installation"],
    },
  ],
  "Team C": [
    {
      id: 7,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
      status: "online",
      ticketsAssigned: 4,
      ticketsResolved: 3,
      workload: 55,
      expertise: ["Troubleshooting", "Maintenance"],
    },
    {
      id: 8,
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ET",
      status: "offline",
      ticketsAssigned: 0,
      ticketsResolved: 2,
      workload: 0,
      expertise: ["Solar Panels", "Batteries"],
    },
  ],
}

interface TechnicianDashboardProps {
  team: string
}

export default function TechnicianDashboard({ team }: TechnicianDashboardProps) {
  const [technicians, setTechnicians] = useState(mockTechnicians[team as keyof typeof mockTechnicians] || [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800">Online</Badge>
      case "offline":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Offline
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return "bg-red-500"
    if (workload >= 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{team} Technicians</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Technician</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tickets Assigned</TableHead>
                <TableHead>Tickets Resolved</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technicians.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No technicians found
                  </TableCell>
                </TableRow>
              ) : (
                technicians.map((technician) => (
                  <TableRow key={technician.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={technician.avatar} alt={technician.name} />
                          <AvatarFallback>{technician.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{technician.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(technician.status)}</TableCell>
                    <TableCell>{technician.ticketsAssigned}</TableCell>
                    <TableCell>{technician.ticketsResolved}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={technician.workload}
                          className="h-2 w-[80px]"
                          indicatorClassName={getWorkloadColor(technician.workload)}
                        />
                        <span className="text-sm">{technician.workload}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {technician.expertise.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Assign tickets</DropdownMenuItem>
                          <DropdownMenuItem>Update status</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
