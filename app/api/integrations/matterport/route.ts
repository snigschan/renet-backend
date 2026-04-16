import { type NextRequest, NextResponse } from "next/server"
import { MatterportService } from "@/lib/integrations/matterport"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tourId = searchParams.get("id")

    const matterportService = new MatterportService()

    if (tourId) {
      const tour = await matterportService.getTourById(tourId)
      return NextResponse.json({ tour })
    }

    const tours = await matterportService.getTours()
    return NextResponse.json({ tours })
  } catch (error) {
    console.error("[v0] Matterport API route error:", error)
    return NextResponse.json({ error: "Failed to fetch Matterport data" }, { status: 500 })
  }
}
