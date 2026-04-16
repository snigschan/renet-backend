import { generateObject } from "ai"
import { z } from "zod"

const searchInsightsSchema = z.object({
  marketTrends: z.object({
    hotSkills: z.array(
      z.object({
        skill: z.string(),
        demand: z.number().min(0).max(100),
        growth: z.string(),
      }),
    ),
    salaryTrends: z.object({
      averageIncrease: z.string(),
      topPayingRoles: z.array(z.string()),
      emergingRoles: z.array(z.string()),
    }),
    locationInsights: z.array(
      z.object({
        city: z.string(),
        jobGrowth: z.string(),
        averageSalary: z.string(),
        marketHealth: z.string(),
      }),
    ),
  }),
  careerAdvice: z.array(z.string()),
  skillRecommendations: z.array(
    z.object({
      skill: z.string(),
      importance: z.string(),
      learningPath: z.string(),
    }),
  ),
  networkingTips: z.array(z.string()),
})

export async function POST(req: Request) {
  const { userProfile, searchQuery, location } = await req.json()

  const { object } = await generateObject({
    model: "openai/gpt-5",
    schema: searchInsightsSchema,
    messages: [
      {
        role: "system",
        content: `You are an AI career insights system for RENet, providing market intelligence and career guidance for real estate professionals.
        
        Analyze current market trends, skill demands, and provide personalized career advice based on the user's profile and search behavior.
        
        Focus on:
        - Current real estate market trends
        - In-demand skills and certifications
        - Salary benchmarks and growth opportunities
        - Location-specific market insights
        - Networking and career development strategies`,
      },
      {
        role: "user",
        content: `Provide market insights and career advice for:
        
        User Profile: ${JSON.stringify(userProfile)}
        Search Query: ${searchQuery}
        Location: ${location}
        
        Include current market trends, skill recommendations, and actionable career advice.`,
      },
    ],
  })

  return Response.json(object)
}
