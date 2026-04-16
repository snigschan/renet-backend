import { generateObject } from "ai"
import { z } from "zod"

const jobMatchSchema = z.object({
  matches: z.array(
    z.object({
      jobId: z.string(),
      jobTitle: z.string(),
      company: z.string(),
      location: z.string(),
      salary: z.string(),
      matchScore: z.number().min(0).max(100),
      matchReasons: z.array(z.string()),
      requirements: z.array(z.string()),
      benefits: z.array(z.string()),
    }),
  ),
  totalMatches: z.number(),
  searchInsights: z.object({
    topSkills: z.array(z.string()),
    salaryRange: z.object({
      min: z.number(),
      max: z.number(),
    }),
    popularLocations: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
})

export async function POST(req: Request) {
  const { userProfile, preferences, location } = await req.json()

  const { object } = await generateObject({
    model: "openai/gpt-5",
    schema: jobMatchSchema,
    messages: [
      {
        role: "system",
        content: `You are an AI job matching system for RENet, a global real estate professional networking platform. 
        Analyze the user's profile and preferences to find the best matching real estate jobs.
        
        Consider:
        - Professional experience and skills
        - Location preferences and willingness to relocate
        - Salary expectations
        - Career level and specializations
        - Company culture fit
        - Growth opportunities
        
        Provide realistic match scores (0-100) and detailed explanations for why each job matches.`,
      },
      {
        role: "user",
        content: `Find matching real estate jobs for this professional:
        
        Profile: ${JSON.stringify(userProfile)}
        Preferences: ${JSON.stringify(preferences)}
        Location: ${location}
        
        Return 5-10 best matching jobs with detailed analysis.`,
      },
    ],
  })

  return Response.json(object)
}
