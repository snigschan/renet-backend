import { Suspense } from "react"
import { ComplianceContent } from "./compliance-content"

export default function CompliancePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">Loading Compliance Tools...</div>
      }
    >
      <ComplianceContent />
    </Suspense>
  )
}
