import { type NextRequest, NextResponse } from "next/server"
import { getCache } from "@/lib/cache/redis"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get("action")
    const key = searchParams.get("key")
    const tag = searchParams.get("tag")

    const cache = getCache()

    if (action === "get" && key) {
      const value = await cache.get(key)
      return NextResponse.json({ value })
    }

    if (action === "delete" && key) {
      const success = await cache.delete(key)
      return NextResponse.json({ success })
    }

    if (action === "invalidate" && tag) {
      const count = await cache.invalidateByTag(tag)
      return NextResponse.json({ count })
    }

    if (action === "clear") {
      const success = await cache.clear()
      return NextResponse.json({ success })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Cache API error:", error)
    return NextResponse.json({ error: "Cache operation failed" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value, ttl, tags } = body

    if (!key || !value) {
      return NextResponse.json({ error: "Missing key or value" }, { status: 400 })
    }

    const cache = getCache()
    const success = await cache.set(key, value, { ttl, tags })

    return NextResponse.json({ success })
  } catch (error) {
    console.error("[v0] Cache API error:", error)
    return NextResponse.json({ error: "Cache operation failed" }, { status: 500 })
  }
}
