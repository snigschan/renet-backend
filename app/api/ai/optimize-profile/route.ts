import { generateObject } from "ai"
import { z } from "zod"

const profileOptimizationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  improvements: z.array(
    z.object({
      section: z.string(),
      currentScore: z.number().min(0).max(100),
      suggestions: z.array(z.string()),
      priority: z.enum(["high", "medium", "low"]),
      impact: z.string(),
    }),
  ),
  optimizedContent: z.object({
    headline: z.string(),
    summary: z.string(),
    keySkills: z.array(z.string()),
    experienceHighlights: z.array(z.string()),
  }),
  keywordSuggestions: z.array(z.string()),
  industryBenchmarks: z.object({
    profileViews: z.string(),
    connectionGrowth: z.string(),
    jobInquiries: z.string(),
  }),
})

export async function POST(req: Request) {
  const { currentProfile, targetRole, location } = await req.json()

  const { object } = await generateObject({
    model: "openai/gpt-5",
    schema: profileOptimizationSchema,
    messages: [
      {
        role: "system",
        content: `You are an AI profile optimization system for RENet, helping real estate professionals create compelling profiles that attract opportunities.
        
        Analyze the current profile and provide specific, actionable recommendations to:
        - Improve profile visibility and searchability
        - Highlight relevant skills and achievements
        - Optimize for target roles and locations
        - Increase engagement and connection requests
        - Align with industry best practices
        
        Provide concrete suggestions with clear impact explanations.`,
      },
      {
        role: "user",
        content: `Optimize this real estate professional's profile:
        
        Current Profile: ${JSON.stringify(currentProfile)}
        Target Role: ${targetRole}
        Location: ${location}
        
        Provide detailed optimization recommendations and improved content suggestions.`,
      },
    ],
  })

  return Response.json(object)
}
