// Matterport API integration for virtual property tours
// Documentation: https://matterport.github.io/showcase-sdk/

export interface MatterportTour {
  id: string
  name: string
  embedUrl: string
  thumbnailUrl: string
  created: string
  propertyAddress?: string
}

export class MatterportService {
  private apiKey: string
  private baseUrl = "https://my.matterport.com/api/v1"

  constructor() {
    this.apiKey = process.env.MATTERPORT_API_KEY || ""
  }

  async getTours(): Promise<MatterportTour[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch Matterport tours")
      }

      const data = await response.json()
      console.log("[v0] Matterport tours fetched successfully")
      return data.models || []
    } catch (error) {
      console.error("[v0] Matterport API error:", error)
      // Return mock data for demo
      return this.getMockTours()
    }
  }

  async getTourById(id: string): Promise<MatterportTour | null> {
    try {
      const response = await fetch(`${this.baseUrl}/models/${id}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch Matterport tour")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("[v0] Matterport API error:", error)
      return null
    }
  }

  generateEmbedUrl(modelId: string): string {
    return `https://my.matterport.com/show/?m=${modelId}`
  }

  private getMockTours(): MatterportTour[] {
    return [
      {
        id: "SxQL3iGyoDo",
        name: "Luxury Villa - Dubai Marina",
        embedUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
        thumbnailUrl: "/luxury-villa-dubai.png",
        created: "2024-01-15",
        propertyAddress: "Dubai Marina, Dubai, UAE",
      },
      {
        id: "j4RZx7ZGM6T",
        name: "Penthouse - Burj Khalifa",
        embedUrl: "https://my.matterport.com/show/?m=j4RZx7ZGM6T",
        thumbnailUrl: "/penthouse-burj-khalifa.jpg",
        created: "2024-02-20",
        propertyAddress: "Downtown Dubai, UAE",
      },
    ]
  }
}
