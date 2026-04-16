"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp, Award, TrendingUp, Plus, Search, MessageSquare } from "lucide-react"

// Mock endorsements data
const skills = [
  {
    id: 1,
    name: "Luxury Real Estate",
    endorsements: 45,
    topEndorsers: [
      { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32", title: "Property Manager" },
      { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", title: "Real Estate Agent" },
      { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32", title: "Developer" },
    ],
    recentEndorsement: "2 days ago",
    trending: true,
  },
  {
    id: 2,
    name: "Commercial Real Estate",
    endorsements: 38,
    topEndorsers: [
      { name: "Emma Rodriguez", avatar: "/placeholder.svg?height=32&width=32", title: "Broker" },
      { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32", title: "Investor" },
    ],
    recentEndorsement: "1 week ago",
    trending: false,
  },
  {
    id: 3,
    name: "Investment Properties",
    endorsements: 32,
    topEndorsers: [
      { name: "Lisa Anderson", avatar: "/placeholder.svg?height=32&width=32", title: "Investment Advisor" },
    ],
    recentEndorsement: "2 weeks ago",
    trending: false,
  },
  {
    id: 4,
    name: "Client Relations",
    endorsements: 28,
    topEndorsers: [{ name: "Robert Taylor", avatar: "/placeholder.svg?height=32&width=32", title: "Sales Director" }],
    recentEndorsement: "3 weeks ago",
    trending: false,
  },
  {
    id: 5,
    name: "Property Valuation",
    endorsements: 22,
    topEndorsers: [],
    recentEndorsement: "1 month ago",
    trending: false,
  },
]

const recommendations = [
  {
    id: 1,
    author: "Michael Chen",
    authorTitle: "Property Investment Manager at Global Realty",
    authorAvatar: "/placeholder.svg?height=48&width=48",
    relationship: "Worked together at Global Realty",
    text: "I had the pleasure of working with Sarah for over 3 years. Her expertise in luxury real estate is unmatched, and her dedication to client satisfaction is truly remarkable. She consistently exceeded sales targets and built lasting relationships with high-net-worth clients.",
    date: "January 15, 2025",
    helpful: 24,
  },
  {
    id: 2,
    author: "Emma Rodriguez",
    authorTitle: "Commercial Real Estate Broker at Metro Commercial",
    authorAvatar: "/placeholder.svg?height=48&width=48",
    relationship: "Collaborated on commercial projects",
    text: "Sarah's knowledge of commercial real estate markets is exceptional. She provided invaluable insights during our collaboration on several high-value commercial properties. Her analytical skills and market understanding make her a top-tier professional.",
    date: "December 10, 2024",
    helpful: 18,
  },
]

export default function EndorsementsPage() {
  const [activeTab, setActiveTab] = useState("received")
  const [searchQuery, setSearchQuery] = useState("")

  const totalEndorsements = skills.reduce((sum, skill) => sum + skill.endorsements, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Endorsements & Recommendations</h1>
          <p className="text-muted-foreground">Build credibility with endorsements from your professional network</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Endorsements</p>
                  <p className="text-3xl font-bold text-primary">{totalEndorsements}</p>
                </div>
                <Star className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Skills Endorsed</p>
                  <p className="text-3xl font-bold text-primary">{skills.length}</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Recommendations</p>
                  <p className="text-3xl font-bold text-primary">{recommendations.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">This Month</p>
                  <p className="text-3xl font-bold text-primary">+12</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="received">Endorsements Received</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="give">Give Endorsement</TabsTrigger>
          </TabsList>

          {/* Endorsements Received Tab */}
          <TabsContent value="received" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Skills & Endorsements</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{skill.name}</h3>
                          {skill.trending && (
                            <Badge variant="secondary" className="text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {skill.endorsements} endorsements • Last endorsed {skill.recentEndorsement}
                        </p>
                        <Progress value={(skill.endorsements / 50) * 100} className="h-2 mb-3" />
                      </div>
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Request
                      </Button>
                    </div>

                    {skill.topEndorsers.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Top Endorsers:</p>
                        <div className="flex items-center gap-3">
                          {skill.topEndorsers.map((endorser, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={endorser.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{endorser.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-xs font-medium">{endorser.name}</p>
                                <p className="text-xs text-muted-foreground">{endorser.title}</p>
                              </div>
                            </div>
                          ))}
                          {skill.endorsements > skill.topEndorsers.length && (
                            <Button variant="ghost" size="sm" className="text-xs">
                              +{skill.endorsements - skill.topEndorsers.length} more
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recommendations Received</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Request Recommendation
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className="border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={rec.authorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{rec.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{rec.author}</h3>
                          <p className="text-sm text-muted-foreground">{rec.authorTitle}</p>
                          <p className="text-xs text-muted-foreground mt-1">{rec.relationship}</p>
                        </div>
                        <Badge variant="outline">{rec.date}</Badge>
                      </div>
                      <p className="text-sm text-foreground mb-4 leading-relaxed">{rec.text}</p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{rec.helpful} people found this helpful</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Helpful
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Write Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle>Give a Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Who would you like to recommend?</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search your connections..." className="pl-9" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your relationship</label>
                  <Input placeholder="e.g., Worked together at..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your recommendation</label>
                  <Textarea
                    placeholder="Write a thoughtful recommendation highlighting their skills and achievements..."
                    rows={6}
                  />
                </div>
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Recommendation
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Give Endorsement Tab */}
          <TabsContent value="give" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Endorse Your Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search connections to endorse..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Michael Chen",
                      title: "Property Investment Manager",
                      avatar: "/placeholder.svg?height=48&width=48",
                      skills: ["Investment Analysis", "Portfolio Management", "Market Research"],
                    },
                    {
                      name: "Emma Rodriguez",
                      title: "Commercial Real Estate Broker",
                      avatar: "/placeholder.svg?height=48&width=48",
                      skills: ["Commercial Leasing", "Negotiation", "Client Relations"],
                    },
                    {
                      name: "David Kim",
                      title: "Real Estate Developer",
                      avatar: "/placeholder.svg?height=48&width=48",
                      skills: ["Property Development", "Project Management", "Urban Planning"],
                    },
                  ].map((connection, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold">{connection.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{connection.title}</p>
                            <div className="flex flex-wrap gap-2">
                              {connection.skills.map((skill, skillIdx) => (
                                <Button key={skillIdx} variant="outline" size="sm">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {skill}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
