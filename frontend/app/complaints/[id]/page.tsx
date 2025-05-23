"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import LayoutWithSidebar from "@/components/layout-with-sidebar"
import RoleGuard from "@/components/role-guard"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { toast } from "react-toastify"
import { AlertCircle, ArrowLeft, Download, Trash2 } from "lucide-react"
import { useApi } from "@/contexts/api-context"
export interface ComplaintPayload {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  productName: string;
  serialNumber: string;
  dateOfPurchase: Date;
  issueDescription: string;
  createdAt?: Date;
  status?: 'Pending' | 'Ticket Created' | 'Closed';
  assignedTo?: string; // New field to store assigned staff member
}
interface UpdateComplaintStatusPayload {
  status: string;
  assignedTo?: string | null;
}


const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Pending":
      return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
    case "Ticket Created":
      return <Badge className="bg-yellow-100 text-yellow-800">Ticket Created</Badge>;
    case "Closed":
      return <Badge className="bg-green-100 text-green-800">Closed</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  }
}
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

const formatDateTime = (date: string) => `${formatDate(date)} at ${formatTime(date)}`

export default function ComplaintDetailsPage() {
  const router = useRouter()
  const { getComplaintById, deleteComplaint, updateComplaintStatus } = useApi();

  const params = useParams()
  const [complaint, setComplaint] = useState<ComplaintPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const [assignee, setAssignee] = useState("")
  const [noteText, setNoteText] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!params?.id) return

    const fetchComplaint = async () => {
      try {
        setIsLoading(true)
        const data = await getComplaintById(params.id)
        setComplaint(data)
        setStatus(data.status)
        setAssignee(data.assignedTo || "")
      } catch (err) {
        console.error(err)
        setError("Failed to load complaint details. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchComplaint()
  }, [params?.id, getComplaintById])

  const handleSaveChanges = async () => {
    if (!complaint) return;

    // Ensure the status is one of the allowed values
    const allowedStatuses = ['Pending', 'Ticket Created', 'Closed'];
    if (!allowedStatuses.includes(status)) {
      toast({
        title: "Error",
        description: "Invalid status value.",
        variant: "destructive",
      });
      return;
    }

    const payload: UpdateComplaintStatusPayload = { status };

    setIsSaving(true);
    try {
      const updated = await updateComplaintStatus(complaint._id!, payload);
      setComplaint(updated);
    toast.success("Complaint status updated successfully");
    } catch {
     toast.error("Failed to update complaint status");
    } finally {
      setIsSaving(false);
    }
  };


  // const handleAddNote = async () => {
  //   if (!noteText.trim() || !complaint) return
  //   setIsSaving(true)
  //   try {
  //     const updated = await addNoteToComplaint(complaint._id, noteText.trim())
  //     setComplaint(updated)
  //     setNoteText("")
  //     toast({ title: "Note added", description: "Note has been added to the complaint." })
  //   } catch {
  //     toast({ title: "Error", description: "Failed to add note.", variant: "destructive" })
  //   } finally {
  //     setIsSaving(false)
  //   }
  // }

const handleDeleteComplaint = async () => {
  if (!complaint) return;

  toast.info(
      <div>
        <p>Are you sure you want to delete this Complaint?</p>
        <div className="mt-2">
          <button
            onClick={async () => {
              try {
                await deleteComplaint(complaint._id);
                toast.success("Technician deleted successfully");
                router.push("/complaints"); // Redirect to technician list or another page
              } catch (error) {
                toast.error("Failed to delete technician");
              }
              toast.dismiss()
            }}
            className="bg-red-600 text-white px-4 py-2 mr-2 rounded"
          >
            Confirm Deletion
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        // Keep the toast open until manually closed
        closeOnClick: false, // Prevent closing the toast on click
        position: "top-center", // Set the position of the toast
      }
    );
};


  return (
    <RoleGuard allowedRoles={["admin", "staff", "manager"]}>
      <LayoutWithSidebar>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-b-2 rounded-full border-gray-900" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : complaint ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to complaints
              </Button>
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteComplaint}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">{complaint._id}</h1>
                <StatusBadge status={complaint.status} />
                <p className="text-muted-foreground">Submitted on {formatDateTime(complaint.createdAt)}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Complaint Details</CardTitle>
                <CardDescription>{complaint.issueDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Product Name</Label>
                  <p>{complaint.productName}</p>
                </div>
                <div>
                  <Label>customer Name</Label>
                  <p>{complaint.name}</p>
                </div>
                <div>
                  <Label>customer Email</Label>
                  <p>{complaint.email}</p>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <p>{complaint.phone}</p>
                </div>
                <div>
                  <Label>Address</Label>
                  <p>{complaint.address}</p>
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <p>{complaint.phone}</p>
                </div>
                <div>
                  <Label>Assign to</Label>
                  <p>{complaint.assignedTo || "Unassigned"}</p>
                </div>
                <div>
                  <Label>Purchase Date</Label>
                  <p>{formatDate(complaint.dateOfPurchase)}</p>
                </div>

                {complaint.billFile && (
                  <div>
                    <Label>Uploaded Bill</Label>
                    <img src={complaint.billFile} alt="Bill" className="max-h-[300px] object-contain bg-gray-50" />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Ticket Created">Ticket Created</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                </div>
                <div>
                </div>
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </LayoutWithSidebar>
    </RoleGuard>
  )
}
