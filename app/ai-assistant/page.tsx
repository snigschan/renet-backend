"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  TrendingUp,
  Calculator,
  Target,
  Lightbulb,
  BarChart3,
  Users,
  Clock,
  Send,
  Sparkles,
  Brain,
  Zap,
} from "lucide-react"

export default function AIAssistantPage() {
  const [chatMessage, setChatMessage] = useState("")
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const aiTools = [
    {
      id: "pricing",
      title: "Smart Pricing Calculator",
      description: "AI-powered property valuation and pricing recommendations",
      icon: Calculator,
      category: "valuation",
      features: ["Market analysis", "Comparable properties", "Price optimization"],
    },
    {
      id: "market",
      title: "Market Trend Analyzer",
      description: "Real-time market insights and predictive analytics",
      icon: TrendingUp,
      category: "analytics",
      features: ["Trend forecasting", "Demand analysis", "Investment opportunities"],
    },
    {
      id: "lead",
      title: "Lead Scoring Engine",
      description: "Intelligent lead qualification and prioritization",
      icon: Target,
      category: "leads",
      features: ["Buyer intent analysis", "Conversion probability", "Follow-up recommendations"],
    },
    {
      id: "strategy",
      title: "Deal Strategy Advisor",
      description: "Personalized negotiation and closing strategies",
      icon: Lightbulb,
      category: "strategy",
      features: ["Negotiation tactics", "Closing probability", "Risk assessment"],
    },
  ]

  const insights = [
    {
      title: "Market Opportunity Alert",
      description: "Downtown Dubai luxury segment showing 15% price increase potential",
      type: "opportunity",
      confidence: 87,
      impact: "High",
      timeframe: "3-6 months",
    },
    {
      title: "Client Behavior Pattern",
      description: "Your high-value clients prefer properties with smart home features",
      type: "behavior",
      confidence: 92,
      impact: "Medium",
      timeframe: "Immediate",
    },
    {
      title: "Pricing Optimization",
      description: "Reduce listing price by 3% to increase showing requests by 40%",
      type: "pricing",
      confidence: 78,
      impact: "High",
      timeframe: "1-2 weeks",
    },
  ]

  const chatHistory = [
    {
      type: "user",
      message: "What's the best pricing strategy for a 3BR apartment in Marina?",
      timestamp: "10:30 AM",
    },
    {
      type: "ai",
      message:
        "Based on current market data, I recommend pricing your 3BR Marina apartment at AED 2.8M - 3.2M. Here's my analysis:\n\n• Recent comparable sales: AED 2.9M average\n• Market velocity: 45 days average\n• Demand index: 78% (High)\n\nWould you like me to create a detailed pricing report?",
      timestamp: "10:31 AM",
    },
  ]

  const recommendations = [
    {
      title: "Focus on Luxury Segment",
      description: "Your success rate is 40% higher with properties above AED 5M",
      action: "View luxury listings",
      priority: "high",
    },
    {
      title: "Expand to Business Bay",
      description: "Market analysis shows untapped potential in your expertise area",
      action: "Explore opportunities",
      priority: "medium",
    },
    {
      title: "Improve Response Time",
      description: "Responding within 2 hours increases conversion by 25%",
      action: "Set up notifications",
      priority: "high",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">AI Deal Assistant</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Leverage artificial intelligence to optimize your real estate deals and strategies
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="border-amber-200 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-amber-600" />
                  AI Real Estate Assistant
                </CardTitle>
                <CardDescription>Ask questions about market trends, pricing, strategies, and more</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Chat History */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          chat.type === "user" ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{chat.message}</div>
                        <div className={`text-xs mt-1 ${chat.type === "user" ? "text-amber-100" : "text-gray-500"}`}>
                          {chat.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about real estate..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && setChatMessage("")}
                  />
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Tools Sidebar */}
          <div className="space-y-6">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  AI Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiTools.map((tool) => (
                  <Button
                    key={tool.id}
                    variant="outline"
                    className="w-full justify-start h-auto p-3 bg-transparent"
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    <tool.icon className="h-4 w-4 mr-2 text-amber-600" />
                    <div className="text-left">
                      <div className="font-medium">{tool.title}</div>
                      <div className="text-xs text-gray-500">{tool.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-amber-600" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      <Badge variant={rec.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="mt-12">
          <Tabs defaultValue="insights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="insights">Market Insights</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.map((insight, index) => (
                  <Card key={index} className="border-amber-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{insight.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Impact</div>
                          <div className="font-medium">{insight.impact}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Timeframe</div>
                          <div className="font-medium">{insight.timeframe}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-amber-600" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Conversion Rate</span>
                        <span className="font-bold text-amber-600">23.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Deal Size</span>
                        <span className="font-bold text-amber-600">AED 4.2M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Response Time</span>
                        <span className="font-bold text-amber-600">1.2 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Client Satisfaction</span>
                        <span className="font-bold text-amber-600">4.8/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                      Growth Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Monthly Revenue</span>
                        <span className="font-bold text-green-600">+18%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>New Clients</span>
                        <span className="font-bold text-green-600">+25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Deal Velocity</span>
                        <span className="font-bold text-green-600">+12%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Market Share</span>
                        <span className="font-bold text-green-600">+8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-600" />
                      Next 30 Days
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-amber-600">AED 2.8M</div>
                      <div className="text-sm text-gray-600">Predicted Revenue</div>
                      <div className="text-sm">
                        <span className="text-green-600">↗ 15%</span> vs last month
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-amber-600" />
                      Lead Quality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-amber-600">78%</div>
                      <div className="text-sm text-gray-600">High-Quality Leads</div>
                      <div className="text-sm">
                        <span className="text-green-600">↗ 8%</span> improvement
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-600" />
                      Deal Closure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-amber-600">32 days</div>
                      <div className="text-sm text-gray-600">Average Time to Close</div>
                      <div className="text-sm">
                        <span className="text-green-600">↘ 5 days</span> faster
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
