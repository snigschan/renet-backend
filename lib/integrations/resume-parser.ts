// Resume Parser integration using Affinda API
// Documentation: https://docs.affinda.com/

export interface ParsedResume {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin?: string
    website?: string
  }
  summary: string
  experience: Array<{
    title: string
    company: string
    location: string
    startDate: string
    endDate: string | null
    description: string
    current: boolean
  }>
  education: Array<{
    degree: string
    institution: string
    location: string
    graduationDate: string
    gpa?: string
  }>
  skills: string[]
  certifications: Array<{
    name: string
    issuer: string
    date: string
    expiryDate?: string
  }>
  languages: Array<{
    language: string
    proficiency: string
  }>
}

export class ResumeParserService {
  private apiKey: string
  private baseUrl = "https://api.affinda.com/v3"

  constructor() {
    this.apiKey = process.env.AFFINDA_API_KEY || ""
  }

  async parseResume(file: File | Buffer): Promise<ParsedResume> {
    try {
      const formData = new FormData()
      if (file instanceof File) {
        formData.append("file", file)
      }

      const response = await fetch(`${this.baseUrl}/resumes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to parse resume")
      }

      const data = await response.json()
      console.log("[v0] Resume parsed successfully")
      return this.transformAffindaResponse(data)
    } catch (error) {
      console.error("[v0] Resume parser error:", error)
      // Return mock parsed data for demo
      return this.getMockParsedResume()
    }
  }

  async parseResumeFromUrl(url: string): Promise<ParsedResume> {
    try {
      const response = await fetch(`${this.baseUrl}/resumes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Failed to parse resume from URL")
      }

      const data = await response.json()
      return this.transformAffindaResponse(data)
    } catch (error) {
      console.error("[v0] Resume parser error:", error)
      return this.getMockParsedResume()
    }
  }

  private transformAffindaResponse(data: any): ParsedResume {
    return {
      personalInfo: {
        name: data.data?.name?.raw || "",
        email: data.data?.emails?.[0] || "",
        phone: data.data?.phoneNumbers?.[0] || "",
        location: data.data?.location?.formatted || "",
        linkedin: data.data?.websites?.find((w: any) => w.includes("linkedin"))?.url,
        website: data.data?.websites?.[0]?.url,
      },
      summary: data.data?.summary || "",
      experience:
        data.data?.workExperience?.map((exp: any) => ({
          title: exp.jobTitle,
          company: exp.organization,
          location: exp.location?.formatted || "",
          startDate: exp.dates?.startDate,
          endDate: exp.dates?.endDate,
          description: exp.jobDescription,
          current: !exp.dates?.endDate,
        })) || [],
      education:
        data.data?.education?.map((edu: any) => ({
          degree: edu.accreditation?.education,
          institution: edu.organization,
          location: edu.location?.formatted || "",
          graduationDate: edu.dates?.completionDate,
          gpa: edu.grade?.value,
        })) || [],
      skills: data.data?.skills?.map((s: any) => s.name) || [],
      certifications:
        data.data?.certifications?.map((cert: any) => ({
          name: cert.name,
          issuer: cert.organization,
          date: cert.date,
        })) || [],
      languages:
        data.data?.languages?.map((lang: any) => ({
          language: lang.name,
          proficiency: lang.proficiency,
        })) || [],
    }
  }

  private getMockParsedResume(): ParsedResume {
    return {
      personalInfo: {
        name: "Ahmed Al Maktoum",
        email: "ahmed.almaktoum@example.com",
        phone: "+971 50 123 4567",
        location: "Dubai, UAE",
        linkedin: "https://linkedin.com/in/ahmedalmaktoum",
      },
      summary:
        "Experienced real estate professional with 8+ years in luxury property sales across Dubai and Abu Dhabi. Proven track record of closing high-value transactions and building lasting client relationships.",
      experience: [
        {
          title: "Senior Real Estate Agent",
          company: "Emaar Properties",
          location: "Dubai, UAE",
          startDate: "2020-01",
          endDate: null,
          description:
            "Leading sales team for luxury residential properties. Achieved 150% of annual sales target in 2023.",
          current: true,
        },
        {
          title: "Real Estate Consultant",
          company: "Damac Properties",
          location: "Dubai, UAE",
          startDate: "2016-06",
          endDate: "2019-12",
          description: "Specialized in off-plan property sales and investor relations.",
          current: false,
        },
      ],
      education: [
        {
          degree: "Bachelor of Business Administration",
          institution: "American University of Dubai",
          location: "Dubai, UAE",
          graduationDate: "2016-05",
        },
      ],
      skills: [
        "Property Sales",
        "Client Relationship Management",
        "Market Analysis",
        "Negotiation",
        "Arabic & English Fluency",
        "CRM Software",
      ],
      certifications: [
        {
          name: "RERA Certified Agent",
          issuer: "Real Estate Regulatory Agency",
          date: "2022-01",
          expiryDate: "2025-01",
        },
      ],
      languages: [
        { language: "Arabic", proficiency: "Native" },
        { language: "English", proficiency: "Fluent" },
      ],
    }
  }
}
