import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function StaffDetailsLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" disabled>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Loading staff details...</h1>
      </div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded-md w-48"></div>
                <div className="h-4 bg-gray-200 rounded-md w-24"></div>
              </div>
            </div>
            <div className="h-px bg-gray-200 my-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded-md w-32"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded-md w-32"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full"></div>
              </div>
            </div>
            <div className="h-px bg-gray-200 my-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded-md w-48"></div>
              <div className="h-24 bg-gray-200 rounded-md w-full"></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="h-10 bg-gray-200 rounded-md w-24"></div>
          <div className="h-10 bg-gray-200 rounded-md w-24"></div>
        </CardFooter>
      </Card>
    </div>
  )
}
