// Zillow API integration for market trends and property data
// Documentation: https://www.zillow.com/howto/api/APIOverview.htm

export interface MarketTrends {
  region: string
  medianPrice: number
  priceChange: number
  inventory: number
  daysOnMarket: number
  forecast: {
    nextMonth: number
    nextQuarter: number
    nextYear: number
  }
}

export interface PropertyValuation {
  address: string
  estimatedValue: number
  valuationRange: {
    low: number
    high: number
  }
  lastUpdated: string
  comparables: Array<{
    address: string
    price: number
    distance: number
  }>
}

export class ZillowService {
  private apiKey: string
  private baseUrl = "https://api.bridgedataoutput.com/api/v2/zillow"

  constructor() {
    this.apiKey = process.env.ZILLOW_API_KEY || ""
  }

  async getMarketTrends(region: string): Promise<MarketTrends> {
    try {
      const response = await fetch(`${this.baseUrl}/market-trends?region=${region}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch market trends")
      }

      const data = await response.json()
      console.log("[v0] Zillow market trends fetched successfully")
      return data
    } catch (error) {
      console.error("[v0] Zillow API error:", error)
      // Return mock data for demo
      return this.getMockMarketTrends(region)
    }
  }

  async getPropertyValuation(address: string): Promise<PropertyValuation> {
    try {
      const response = await fetch(`${this.baseUrl}/valuation?address=${encodeURIComponent(address)}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch property valuation")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("[v0] Zillow API error:", error)
      return this.getMockValuation(address)
    }
  }

  private getMockMarketTrends(region: string): MarketTrends {
    const trends: Record<string, MarketTrends> = {
      Dubai: {
        region: "Dubai, UAE",
        medianPrice: 1850000,
        priceChange: 12.5,
        inventory: 4200,
        daysOnMarket: 45,
        forecast: {
          nextMonth: 1.2,
          nextQuarter: 3.8,
          nextYear: 15.2,
        },
      },
      Riyadh: {
        region: "Riyadh, Saudi Arabia",
        medianPrice: 980000,
        priceChange: 8.3,
        inventory: 3100,
        daysOnMarket: 52,
        forecast: {
          nextMonth: 0.9,
          nextQuarter: 2.5,
          nextYear: 10.8,
        },
      },
    }

    return trends[region] || trends.Dubai
  }

  private getMockValuation(address: string): PropertyValuation {
    return {
      address,
      estimatedValue: 2150000,
      valuationRange: {
        low: 1950000,
        high: 2350000,
      },
      lastUpdated: new Date().toISOString(),
      comparables: [
        { address: "Similar property 1", price: 2100000, distance: 0.3 },
        { address: "Similar property 2", price: 2200000, distance: 0.5 },
        { address: "Similar property 3", price: 2050000, distance: 0.7 },
      ],
    }
  }
}
