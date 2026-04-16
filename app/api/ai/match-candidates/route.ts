import { generateObject } from "ai"
import { z } from "zod"

const candidateMatchSchema = z.object({
  matches: z.array(
    z.object({
      candidateId: z.string(),
      name: z.string(),
      title: z.string(),
      location: z.string(),
      experience: z.string(),
      matchScore: z.number().min(0).max(100),
      matchReasons: z.array(z.string()),
      skills: z.array(z.string()),
      strengths: z.array(z.string()),
      potentialConcerns: z.array(z.string()).optional(),
      interviewQuestions: z.array(z.string()),
    }),
  ),
  totalMatches: z.number(),
  hiringInsights: z.object({
    topSkillsInMarket: z.array(z.string()),
    averageExperience: z.string(),
    salaryBenchmark: z.object({
      min: z.number(),
      max: z.number(),
      average: z.number(),
    }),
    recommendations: z.array(z.string()),
  }),
})

export async function POST(req: Request) {
  const { jobRequirements, companyProfile, location, salaryRange } = await req.json()

  const { object } = await generateObject({
    model: "openai/gpt-5",
    schema: candidateMatchSchema,
    messages: [
      {
        role: "system",
        content: `You are an AI candidate matching system for RENet, a global real estate professional networking platform.
        Analyze job requirements and company profile to find the best matching real estate professionals.
        
        Consider:
        - Required skills and experience level
        - Location compatibility
        - Salary expectations alignment
        - Cultural fit with company
        - Career growth potential
        - Specialization match
        
        Provide realistic match scores (0-100) and detailed explanations for each candidate match.
        Also suggest relevant interview questions based on the role requirements.`,
      },
      {
        role: "user",
        content: `Find matching real estate candidates for this position:
        
        Job Requirements: ${JSON.stringify(jobRequirements)}
        Company Profile: ${JSON.stringify(companyProfile)}
        Location: ${location}
        Salary Range: ${salaryRange}
        
        Return 8-12 best matching candidates with detailed analysis and interview suggestions.`,
      },
    ],
  })

  return Response.json(object)
}
