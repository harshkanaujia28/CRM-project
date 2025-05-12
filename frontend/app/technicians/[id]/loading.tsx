import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function TechnicianDetailsLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" disabled>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Loading technician details...</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-32"></div>
              <div className="h-4 bg-gray-200 rounded-md w-24 mt-2"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded-md w-32"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full"></div>
                <div className="h-6 bg-gray-200 rounded-md w-full"></div>
              </div>

              <div className="h-px bg-gray-200 my-4"></div>

              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded-md w-24"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-gray-200 rounded-md w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-24"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded-md w-48"></div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="h-8 bg-gray-200 rounded-md w-12 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded-md w-24 mx-auto mt-2"></div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="h-8 bg-gray-200 rounded-md w-12 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded-md w-24 mx-auto mt-2"></div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="h-8 bg-gray-200 rounded-md w-12 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded-md w-24 mx-auto mt-2"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded-md w-32"></div>
                <div className="h-4 bg-gray-200 rounded-md w-12"></div>
              </div>
              <div className="h-2 bg-gray-200 rounded-md w-full"></div>
            </div>

            <div className="h-px bg-gray-200 my-4"></div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded-md w-32"></div>
              <div className="space-y-2">
                <div className="flex">
                  <div className="h-5 w-5 rounded-full bg-gray-200 mr-4"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded-md w-48"></div>
                    <div className="h-3 bg-gray-200 rounded-md w-24"></div>
                  </div>
                </div>
                <div className="flex">
                  <div className="h-5 w-5 rounded-full bg-gray-200 mr-4"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded-md w-64"></div>
                    <div className="h-3 bg-gray-200 rounded-md w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
