import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useApi } from "@/contexts/api-context"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation"

type Technician = {
  _id: string
  name: string
  email: string
  status?: "active" | "inactive" | string
  ticketsAssigned?: number
  ticketsResolved?: number
}

type TicketPayload = {
  title: string
  description: string
  priority: string
  status: string
  customer: {
    name: string
    email: string
    phone: string
  }
  assignedTo?: string
}

const CreateTicketModal = () => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    status: 'Open',
    name: '',
    email: '',
    phone: '',
    assignedTo: '',
  })

  const [technicians, setTechnicians] = useState<Technician[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const { getTechnicians, createTicket } = useApi()

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true)
        const data: Technician[] = await getTechnicians()
        setTechnicians(data)
        setError("")
      } catch (err) {
        console.error("Failed to fetch technicians:", err)
        setError("Failed to load technicians. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchTechnicians()
  }, [getTechnicians])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const ticketData: TicketPayload = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority.toLowerCase(),
      status: formData.status.toLowerCase().replace(' ', '_'),
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      assignedTo: formData.assignedTo,
    }

    try {
      const res = await createTicket(ticketData)
      toast.success('Ticket created successfully!')
      setOpen(false)
      setFormData({
        title: '',
        description: '',
        priority: 'Low',
        status: 'Open',
        name: '',
        email: '',
        phone: '',
        assignedTo: '',
      })
      router.refresh()
    } catch (err) {
      console.error('Error creating ticket:', err)
      toast.error('Error creating ticket. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create Ticket</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <Label htmlFor="assignedTo">Assign Technician</Label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Technician</option>
              {technicians.map((technician) => (
                <option key={technician._id} value={technician._id}>
                  {technician.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="name">Customer Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Customer Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Customer Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Ticket"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTicketModal
