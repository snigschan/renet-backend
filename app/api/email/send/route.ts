import { type NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/integrations/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, to, data } = body

    if (!type || !to) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailService = new EmailService()
    let success = false

    switch (type) {
      case "welcome":
        success = await emailService.sendWelcomeEmail(to, data.name)
        break
      case "application":
        success = await emailService.sendApplicationConfirmation(to, data.jobTitle, data.company)
        break
      case "interview":
        success = await emailService.sendInterviewInvitation(
          to,
          data.candidateName,
          data.jobTitle,
          data.interviewDate,
          data.interviewLink,
        )
        break
      case "job-match":
        success = await emailService.sendJobMatchNotification(to, data.matches)
        break
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    return NextResponse.json({ success })
  } catch (error) {
    console.error("[v0] Email send API error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
