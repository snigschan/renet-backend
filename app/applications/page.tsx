import { Suspense } from "react"
import { ApplicationsContent } from "./applications-content"

export default function ApplicationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">Loading Applications...</div>
      }
    >
      <ApplicationsContent />
    </Suspense>
  )
}
