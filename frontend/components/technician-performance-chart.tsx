"use client"

import { useEffect, useState } from "react"
import { useApi } from "@/contexts/api-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface Technician {
  name: string
  assigned: number
  resolved: number
}

export default function TechnicianPerformanceChart({
  title = "Technician Performance",
  description = "Tickets assigned and resolved per technician",
}: {
  title?: string
  description?: string
}) {
  const { getAllTickets, getTechnicians } = useApi()
  const [technicianPerformanceData, setTechnicianPerformanceData] = useState<Technician[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tickets, technicians] = await Promise.all([
          getAllTickets(),
          getTechnicians(),
        ])

        const statsMap: Record<string, Technician> = {}

        // Initialize all technicians with 0s
        technicians.forEach((tech: any) => {
          statsMap[tech.name] = {
            name: tech.name,
            assigned: 0,
            resolved: 0,
          }
        })

        // Count tickets per technician
        tickets.forEach((ticket: any) => {
          const technician = ticket.assignedTo || "Unassigned"

          if (!statsMap[technician]) {
            statsMap[technician] = {
              name: technician,
              assigned: 0,
              resolved: 0,
            }
          }

          statsMap[technician].assigned += 1

          if (["resolved", "closed"].includes(ticket.status.toLowerCase())) {
            statsMap[technician].resolved += 1
          }
        })

        setTechnicianPerformanceData(Object.values(statsMap))
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [getAllTickets, getTechnicians])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={technicianPerformanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="assigned" name="Tickets Assigned" fill="#3b82f6" />
              <Bar dataKey="resolved" name="Tickets Resolved" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
