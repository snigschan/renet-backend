import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing server Supabase environment variables for application API.")
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payload = {
      job_id: body?.jobId ?? null,
      job_title: body?.jobTitle ?? null,
      company: body?.company ?? null,
      first_name: body?.personalInfo?.firstName ?? "",
      last_name: body?.personalInfo?.lastName ?? "",
      email: body?.personalInfo?.email ?? "",
      phone: body?.personalInfo?.phone ?? "",
      current_location: body?.personalInfo?.currentLocation ?? "",
      current_title: body?.professionalInfo?.currentTitle ?? "",
      years_of_experience: Number(body?.professionalInfo?.yearsOfExperience ?? 0),
      expected_salary: body?.professionalInfo?.expectedSalary ?? null,
      notice_period: body?.professionalInfo?.noticePeriod ?? null,
      work_authorization: body?.professionalInfo?.workAuthorization ?? null,
      linkedin_url: body?.profileLinks?.linkedinUrl ?? null,
      portfolio_url: body?.profileLinks?.portfolioUrl ?? null,
      key_skills: body?.application?.keySkills ?? "",
      cover_letter: body?.application?.coverLetter ?? "",
      resume_text: body?.application?.resumeText ?? "",
      can_relocate: body?.application?.canRelocate === "yes",
    }

    const { data, error } = await supabaseAdmin.from("applications").insert([payload]).select()

    if (error) {
      console.error(error)
      return NextResponse.json(
        { success: false, message: "DB insert failed", error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application saved successfully",
        data,
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error("Failed:", error)
    const message = error instanceof Error ? error.message : "Invalid payload"
    return NextResponse.json(
      { success: false, message },
      { status: 400 }
    )
  }
}
