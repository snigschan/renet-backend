import { Suspense } from "react"
import { InterviewsContent } from "./interviews-content"

export default function InterviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">Loading Interviews...</div>
      }
    >
      <InterviewsContent />
    </Suspense>
  )
}
