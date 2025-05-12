"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useApi } from "@/contexts/api-context"
interface Ticket {
  status: string
  source?: string // if available
}

interface TicketStatusChartProps {
  variant?: "pie" | "bar"
  title?: string
  description?: string
}

const STATUS_COLORS: Record<string, string> = {
  open: "#3b82f6",
  "in-progress": "#eab308",
  resolved: "#22c55e",
  closed: "#ef4444",
}

export default function TicketStatusChart({
  variant = "pie",
  title = "Ticket Status",
  description = "Current distribution of tickets",
}: TicketStatusChartProps) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  
const { getAllTickets } = useApi()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAllTickets()
        setTickets(data)
      } catch (err) {
        console.error("Failed to fetch tickets:", err)
      }
    }
  
    fetchTickets()
  }, [])
  useEffect(() => {
    const statusCounts: Record<string, number> = {}

    tickets.forEach((ticket) => {
      const status = ticket.status?.toLowerCase() || "unknown"
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })

    const formattedData = Object.entries(statusCounts).map(([status, value]) => ({
      name: status[0].toUpperCase() + status.slice(1),
      value,
      color: STATUS_COLORS[status] || "#8884d8",
    }))

    setChartData(formattedData)
  }, [tickets])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {variant === "pie" ? (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tickets`, ""]} />
                <Legend />
              </PieChart>
            ) : (
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} tickets`, ""]} />
                <Legend />
                <Bar dataKey="value" name="Tickets">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
