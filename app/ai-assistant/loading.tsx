import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AIAssistantLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface Skeleton */}
          <div className="lg:col-span-2">
            <Card className="border-amber-200 h-[600px]">
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Chat messages skeleton */}
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <Skeleton className="h-16 w-64 rounded-lg" />
                  </div>
                  <div className="flex justify-start">
                    <Skeleton className="h-24 w-80 rounded-lg" />
                  </div>
                </div>
                {/* Input skeleton */}
                <div className="flex gap-2 mt-auto">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-12" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <Card className="border-amber-200">
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 bg-amber-50 rounded-lg">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section Skeleton */}
        <div className="mt-12 space-y-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-amber-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Skeleton className="h-3 w-12 mb-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div>
                      <Skeleton className="h-3 w-16 mb-1" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
