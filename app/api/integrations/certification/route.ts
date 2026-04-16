import { type NextRequest, NextResponse } from "next/server"
import { CertificationService } from "@/lib/integrations/nar"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const certNumber = searchParams.get("number")
    const type = searchParams.get("type") as "RERA" | "SCFHS" | "REGA"

    if (!certNumber || !type) {
      return NextResponse.json({ error: "Missing certification number or type" }, { status: 400 })
    }

    const certService = new CertificationService()
    const result = await certService.verifyCertification(certNumber, type)

    return NextResponse.json({ result })
  } catch (error) {
    console.error("[v0] Certification API route error:", error)
    return NextResponse.json({ error: "Failed to verify certification" }, { status: 500 })
  }
}
