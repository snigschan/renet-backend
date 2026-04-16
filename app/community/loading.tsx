import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function CommunityLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-amber-200 text-center">
              <CardContent className="pt-6">
                <Skeleton className="h-8 w-8 mx-auto mb-2" />
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          </div>

          {/* Content Area Skeleton */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-12" />
                <Skeleton className="h-10 w-12" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Discussion Cards Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-amber-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <Skeleton className="h-6 w-96" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full mb-3" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-8 w-8" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
