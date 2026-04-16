"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  BarChart3,
  LineChart,
  Target,
  Award,
  AlertTriangle,
  Info,
  Download,
  Share2,
} from "lucide-react"

export default function AgentInsightsPage() {
  const [timeframe, setTimeframe] = useState("month")

  const marketData = [
    {
      area: "Dubai Marina",
      avgPrice: "AED 1.8M",
      priceChange: "+12.5%",
      trend: "up",
      inventory: 234,
      daysOnMarket: 28,
      demandScore: 85,
    },
    {
      area: "Downtown Dubai",
      avgPrice: "AED 2.1M",
      priceChange: "+8.3%",
      trend: "up",
      inventory: 156,
      daysOnMarket: 22,
      demandScore: 92,
    },
    {
      area: "Business Bay",
      avgPrice: "AED 1.4M",
      priceChange: "-2.1%",
      trend: "down",
      inventory: 312,
      daysOnMarket: 35,
      demandScore: 67,
    },
  ]

  const insights = [
    {
      type: "opportunity",
      title: "High Demand in Dubai Marina",
      description: "Properties in Dubai Marina are selling 15% faster than market average",
      action: "Focus marketing efforts on Marina properties",
      priority: "high",
      icon: Target,
    },
    {
      type: "warning",
      title: "Inventory Buildup in Business Bay",
      description: "Business Bay has 23% more inventory than last month",
      action: "Consider competitive pricing strategies",
      priority: "medium",
      icon: AlertTriangle,
    },
    {
      type: "info",
      title: "Luxury Market Trends",
      description: "Properties above AED 5M are showing strong buyer interest",
      action: "Expand luxury property portfolio",
      priority: "low",
      icon: Info,
    },
  ]

  const performance = {
    thisMonth: {
      sales: 8,
      revenue: "AED 24.5M",
      commission: "AED 490K",
      leads: 156,
      conversions: 23,
      avgDeal: "AED 3.1M",
    },
    lastMonth: {
      sales: 6,
      revenue: "AED 18.2M",
      commission: "AED 364K",
      leads: 134,
      conversions: 18,
      avgDeal: "AED 3.0M",
    },
  }

  const getChangeColor = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-600"
  }

  const getChangeIcon = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return change > 0 ? TrendingUp : change < 0 ? TrendingDown : null
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-amber-200 bg-amber-50"
      case "low":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Market Insights</h1>
              <p className="text-muted-foreground">Data-driven insights to optimize your real estate business</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Performance Overview */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {[
            {
              label: "Sales Closed",
              current: performance.thisMonth.sales,
              previous: performance.lastMonth.sales,
              icon: Home,
            },
            {
              label: "Total Revenue",
              current: "24.5M",
              previous: "18.2M",
              icon: DollarSign,
              prefix: "AED ",
            },
            {
              label: "Commission",
              current: "490K",
              previous: "364K",
              icon: Award,
              prefix: "AED ",
            },
            {
              label: "New Leads",
              current: performance.thisMonth.leads,
              previous: performance.lastMonth.leads,
              icon: Target,
            },
            {
              label: "Conversions",
              current: performance.thisMonth.conversions,
              previous: performance.lastMonth.conversions,
              icon: TrendingUp,
            },
            {
              label: "Avg Deal Size",
              current: "3.1M",
              previous: "3.0M",
              icon: BarChart3,
              prefix: "AED ",
            },
          ].map((metric, index) => {
            const currentValue = typeof metric.current === "string" ? Number.parseFloat(metric.current) : metric.current
            const previousValue =
              typeof metric.previous === "string" ? Number.parseFloat(metric.previous) : metric.previous
            const ChangeIcon = getChangeIcon(currentValue, previousValue)
            const changePercent = (((currentValue - previousValue) / previousValue) * 100).toFixed(1)

            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className="w-5 h-5 text-muted-foreground" />
                    {ChangeIcon && (
                      <div className={`flex items-center gap-1 ${getChangeColor(currentValue, previousValue)}`}>
                        <ChangeIcon className="w-4 h-4" />
                        <span className="text-xs font-medium">{changePercent}%</span>
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold">
                    {metric.prefix || ""}
                    {metric.current}
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Insights Tabs */}
        <Tabs defaultValue="market" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="market">Market Data</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketData.map((area, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{area.area}</CardTitle>
                      <Badge variant={area.trend === "up" ? "default" : "destructive"}>
                        {area.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {area.priceChange}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Avg Price</p>
                        <p className="font-semibold text-lg">{area.avgPrice}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Inventory</p>
                        <p className="font-semibold text-lg">{area.inventory}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Days on Market</p>
                        <p className="font-semibold">{area.daysOnMarket} days</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Demand Score</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${area.demandScore}%` }}
                            />
                          </div>
                          <span className="font-semibold text-sm">{area.demandScore}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <Card key={index} className={`border-l-4 ${getPriorityColor(insight.priority)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <insight.icon className="w-6 h-6 text-muted-foreground mt-1" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{insight.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {insight.priority} Priority
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{insight.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Recommended Action:</span>
                          <span className="text-sm text-amber-600">{insight.action}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance Trend</CardTitle>
                  <CardDescription>Monthly sales comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <LineChart className="w-16 h-16 mb-4" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Interactive chart showing sales trends over time
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lead Conversion Funnel</CardTitle>
                  <CardDescription>Track your lead conversion process</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: "Leads Generated", count: 156, percentage: 100 },
                      { stage: "Qualified Leads", count: 89, percentage: 57 },
                      { stage: "Property Viewings", count: 45, percentage: 29 },
                      { stage: "Offers Made", count: 28, percentage: 18 },
                      { stage: "Sales Closed", count: 8, percentage: 5 },
                    ].map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{stage.stage}</span>
                          <span className="font-semibold">
                            {stage.count} ({stage.percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all duration-300"
                            style={{ width: `${stage.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecasts">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Forecast</CardTitle>
                  <CardDescription>Predicted market trends for next quarter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-green-800">Price Growth Expected</p>
                        <p className="text-sm text-green-600">Dubai Marina & Downtown</p>
                      </div>
                      <div className="text-2xl font-bold text-green-600">+8.5%</div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-amber-800">Stable Market</p>
                        <p className="text-sm text-amber-600">Palm Jumeirah</p>
                      </div>
                      <div className="text-2xl font-bold text-amber-600">+2.1%</div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-red-800">Correction Expected</p>
                        <p className="text-sm text-red-600">Business Bay</p>
                      </div>
                      <div className="text-2xl font-bold text-red-600">-3.2%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Goals Tracking</CardTitle>
                  <CardDescription>Progress towards your quarterly targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { goal: "Sales Target", current: 8, target: 15, unit: "properties" },
                      { goal: "Revenue Target", current: 24.5, target: 45, unit: "M AED" },
                      { goal: "New Clients", current: 23, target: 40, unit: "clients" },
                    ].map((goal, index) => {
                      const percentage = (goal.current / goal.target) * 100
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{goal.goal}</span>
                            <span className="text-sm text-muted-foreground">
                              {goal.current} / {goal.target} {goal.unit}
                            </span>
                          </div>
                          <div className="w-full h-3 bg-muted rounded-full">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          <div className="text-right text-sm font-medium">{percentage.toFixed(1)}% Complete</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
