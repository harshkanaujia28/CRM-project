"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApi } from "@/contexts/api-context"

interface AnalyticsDashboardProps {
  type: "overview" | "tickets" | "technicians" | "customer-satisfaction"
}

export default function AnalyticsDashboard({ type }: AnalyticsDashboardProps) {
  const { getAnalyticsSummary } = useApi()
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnalyticsSummary()
        setSummary(data)
      } catch (error) {
        console.error("Error fetching analytics summary:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [getAnalyticsSummary])

  if (loading) {
    return <p className="text-muted-foreground">Loading analytics summary...</p>
  }

  if (!summary) {
    return <p className="text-red-500">Failed to load analytics summary.</p>
  }

  return (
    <div className="space-y-6">
      {type === "overview" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Ticket Volume Over Time</CardTitle>
              <CardDescription>Tickets created per day</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
              <p className="text-muted-foreground">
                Total Tickets: {summary.totalTickets ?? "N/A"}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tickets by Source</CardTitle>
                <CardDescription>Distribution by channel</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center bg-muted/20">
                <p className="text-muted-foreground">
                  Email: {summary.source?.email ?? 0}, Chat: {summary.source?.chat ?? 0}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tickets by Status</CardTitle>
                <CardDescription>Open vs Closed</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center bg-muted/20">
                <p className="text-muted-foreground">
                  Open: {summary.status?.open ?? 0}, Closed: {summary.status?.closed ?? 0}
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* You can replace the remaining type blocks similarly to show data from `summary` */}
    </div>
  )
}
