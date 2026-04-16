import { Suspense } from "react"
import { ATSContent } from "./ats-content"

export default function ATSPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading ATS...</div>}
    >
      <ATSContent />
    </Suspense>
  )
}
