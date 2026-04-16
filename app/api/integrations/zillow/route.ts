import { type NextRequest, NextResponse } from "next/server"
import { ZillowService } from "@/lib/integrations/zillow"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get("action")
    const region = searchParams.get("region") || "Dubai"
    const address = searchParams.get("address")

    const zillowService = new ZillowService()

    if (action === "trends") {
      const trends = await zillowService.getMarketTrends(region)
      return NextResponse.json({ trends })
    }

    if (action === "valuation" && address) {
      const valuation = await zillowService.getPropertyValuation(address)
      return NextResponse.json({ valuation })
    }

    return NextResponse.json({ error: "Invalid action or missing parameters" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Zillow API route error:", error)
    return NextResponse.json({ error: "Failed to fetch Zillow data" }, { status: 500 })
  }
}
