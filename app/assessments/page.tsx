import { Suspense } from "react"
import { AssessmentsContent } from "./assessments-content"

export default function AssessmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">Loading Assessments...</div>
      }
    >
      <AssessmentsContent />
    </Suspense>
  )
}
