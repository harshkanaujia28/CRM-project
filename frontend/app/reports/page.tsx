"use client"

import { useState, useEffect } from "react"
import LayoutWithSidebar from "@/components/layout-with-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Download, BarChart2, PieChart, LineChart } from "lucide-react"
import { cn } from "@/lib/utils"
import RoleGuard from "@/components/role-guard"
import { useApi } from "@/contexts/api-context"

export default function ReportsPage() {
  const api = useApi()
  const [loading, setLoading] = useState(true)
  const [reportType, setReportType] = useState("tickets")
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [status, setStatus] = useState("all")
  const [technician, setTechnician] = useState("all")
  const [reportData, setReportData] = useState<any>(null)
  const [technicians, setTechnicians] = useState<any[]>([])

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const techData = await api.getTechnicians()
        console.log("Fetched technicians:", techData) // 👈 log here
        setTechnicians(techData)
      } catch (error) {
        console.error("Error fetching technicians:", error)
      }
    }

    fetchTechnicians()
  }, [api])


  const generateReport = async () => {
    setLoading(true)
    try {
      const params = {
        from: format(dateRange.from, "yyyy-MM-dd"),
        to: format(dateRange.to, "yyyy-MM-dd"),
        status: status !== "all" ? status : undefined,
        assignedTo: technician !== "all" ? technician : undefined,
        type: reportType,
      }

      const data = await api.getReports(params)
      setReportData(data)
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = () => {
    // In a real app, this would generate a CSV or PDF
    alert("Report download functionality would be implemented here")
  }

  return (
    <RoleGuard allowedRoles={["admin", "staff"]}>
      <LayoutWithSidebar>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and analyze system reports</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Report Parameters</CardTitle>
            <CardDescription>Configure the parameters for your report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tickets">Ticket Report</SelectItem>
                    <SelectItem value="technicians">Technician Performance</SelectItem>
                    <SelectItem value="customers">Customer Report</SelectItem>
                    <SelectItem value="resolution">Resolution Time Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={(range) => setDateRange(range || { from: new Date(), to: new Date() })}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Technician</label>
                <Select value={technician} onValueChange={setTechnician}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Technicians</SelectItem>
                    {technicians.map((tech, index) => (
                      <SelectItem key={tech.id ?? `${tech.name}-${index}`} value={tech.id ?? `${tech.name}-${index}`}>
                        {tech.name}
                      </SelectItem>
                    ))}

                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => downloadReport()} disabled={!reportData || loading}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Button onClick={generateReport} disabled={loading}>
                {loading ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {reportData && (
          <Tabs defaultValue="table" className="mb-6">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="table">
              <Card>
                <CardHeader>
                  <CardTitle>Report Results</CardTitle>
                  <CardDescription>
                    Showing results for {format(dateRange.from, "LLL dd, y")} to {format(dateRange.to, "LLL dd, y")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Assigned To
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Resolved
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Resolution Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-background divide-y divide-border">
                        {reportData.tickets?.map((ticket: any) => (
                          <tr key={ticket.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{ticket.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.subject}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.assignedTo || "Unassigned"}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {ticket.resolvedAt ? new Date(ticket.resolvedAt).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {ticket.resolutionTime ? `${ticket.resolutionTime.toFixed(1)}h` : "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chart">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tickets by Status</CardTitle>
                    <CardDescription>Distribution of tickets by status</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <PieChart className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resolution Time Trend</CardTitle>
                    <CardDescription>Average resolution time over the period</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <LineChart className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Tickets by Technician</CardTitle>
                    <CardDescription>Number of tickets handled by each technician</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <BarChart2 className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Report Summary</CardTitle>
                  <CardDescription>Key metrics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-md">
                      <div className="text-sm font-medium text-muted-foreground">Total Tickets</div>
                      <div className="text-2xl font-bold mt-2">{reportData.summary?.totalTickets || 0}</div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="text-sm font-medium text-muted-foreground">Average Resolution Time</div>
                      <div className="text-2xl font-bold mt-2">
                        {reportData.summary?.averageResolutionTime?.toFixed(1) || 0}h
                      </div>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="text-sm font-medium text-muted-foreground">Resolution Rate</div>
                      <div className="text-2xl font-bold mt-2">
                        {reportData.summary?.resolutionRate?.toFixed(1) || 0}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Key Insights</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2 text-xs">
                          +
                        </div>
                        <span>
                          Resolution time has improved by{" "}
                          {reportData.insights?.resolutionTimeImprovement?.toFixed(1) || 0}% compared to previous period
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center mr-2 text-xs">
                          !
                        </div>
                        <span>
                          {reportData.insights?.highVolumeCategory || "Hardware"} issues represent{" "}
                          {reportData.insights?.highVolumeCategoryPercentage?.toFixed(1) || 0}% of all tickets
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2 text-xs">
                          i
                        </div>
                        <span>
                          Top performing technician: {reportData.insights?.topPerformer || "Alex Johnson"} with an
                          average resolution time of {reportData.insights?.topPerformerTime?.toFixed(1) || 0}h
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {!reportData && !loading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BarChart2 className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Report Data</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Configure the report parameters above and click "Generate Report" to view your data.
              </p>
            </CardContent>
          </Card>
        )}
      </LayoutWithSidebar>
    </RoleGuard>
  )
}
