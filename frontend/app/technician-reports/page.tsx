"use client"

import { useEffect, useState } from "react"
import LayoutWithSidebar from "@/components/layout-with-sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Download } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import RoleGuard from "@/components/role-guard"
import TechnicianPerformanceChart from "@/components/technician-performance-chart"
import { useApi } from "@/contexts/api-context"

interface TechnicianReport {
  name: string
  team: string
  ticketsAssigned: number
  ticketsResolved: number
  avgResolutionTime: string
  customerRating: number
}

export default function TechnicianReportsPage() {
  const { getReports } = useApi()
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [technicianId, setTechnicianId] = useState("all")
  const [reportData, setReportData] = useState<TechnicianReport[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const params = {
          from: fromDate ? format(fromDate, "yyyy-MM-dd") : undefined,
          to: toDate ? format(toDate, "yyyy-MM-dd") : undefined,
          technicianId: technicianId !== "all" ? technicianId : undefined,
        }

        const data = await getReports(params)
        setReportData(data)
      } catch (error) {
        console.error("Failed to fetch reports:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [fromDate, toDate, technicianId])

  return (
    <RoleGuard allowedRoles={["staff", "admin"]}>
      <LayoutWithSidebar>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Technician Reports</h1>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select value={technicianId} onValueChange={setTechnicianId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Technician" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Technicians</SelectItem>
              <SelectItem value="tech-1">Technician 1</SelectItem>
              <SelectItem value="tech-2">Technician 2</SelectItem>
              <SelectItem value="tech-3">Technician 3</SelectItem>
            </SelectContent>
          </Select>

          {/* From Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[200px] justify-start text-left font-normal", !fromDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "PPP") : <span>From Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* To Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[200px] justify-start text-left font-normal", !toDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "PPP") : <span>To Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Tabs defaultValue="performance" className="mb-6">
          {/* <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          </TabsList> */}

          <TabsContent value="performance">
            <TechnicianPerformanceChart />
          </TabsContent>

          <TabsContent value="efficiency">
            {/* <ResolutionTimeChart data={reportData} loading={loading} /> */}
          </TabsContent>
        </Tabs>
      </LayoutWithSidebar>
    </RoleGuard>
  )
}
