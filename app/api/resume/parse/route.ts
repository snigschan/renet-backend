import { type NextRequest, NextResponse } from "next/server"
import { ResumeParserService } from "@/lib/integrations/resume-parser"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const url = formData.get("url") as string

    if (!file && !url) {
      return NextResponse.json({ error: "No file or URL provided" }, { status: 400 })
    }

    const parserService = new ResumeParserService()

    let parsedResume
    if (file) {
      parsedResume = await parserService.parseResume(file)
    } else {
      parsedResume = await parserService.parseResumeFromUrl(url)
    }

    return NextResponse.json({ parsedResume })
  } catch (error) {
    console.error("[v0] Resume parse API error:", error)
    return NextResponse.json({ error: "Failed to parse resume" }, { status: 500 })
  }
}
