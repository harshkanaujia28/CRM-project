"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Maria G.",
    ticketsResolved: 78,
    responseTime: 1.2,
    customerSatisfaction: 95,
  },
  {
    name: "James W.",
    ticketsResolved: 65,
    responseTime: 1.5,
    customerSatisfaction: 88,
  },
  {
    name: "Sarah J.",
    ticketsResolved: 82,
    responseTime: 1.1,
    customerSatisfaction: 97,
  },
  {
    name: "Michael C.",
    ticketsResolved: 54,
    responseTime: 2.3,
    customerSatisfaction: 78,
  },
  {
    name: "Emily R.",
    ticketsResolved: 68,
    responseTime: 1.7,
    customerSatisfaction: 85,
  },
]

export default function StaffPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ticketsResolved" name="Tickets Resolved" fill="#4f46e5" />
        <Bar dataKey="customerSatisfaction" name="Customer Satisfaction %" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function ResolutionTimeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="responseTime" name="Avg. Response Time (hours)" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}
