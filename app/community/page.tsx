"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  MessageSquare,
  Calendar,
  MapPin,
  Star,
  Heart,
  Share2,
  Plus,
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Coffee,
} from "lucide-react"

export default function CommunityPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const communityStats = {
    totalMembers: 2847,
    activeToday: 156,
    totalPosts: 8934,
    eventsThisMonth: 12,
  }

  const discussions = [
    {
      id: "1",
      title: "Best practices for luxury property marketing in Dubai",
      author: "Sarah Al-Mansouri",
      avatar: "/professional-headshot.png",
      replies: 23,
      likes: 45,
      timestamp: "2 hours ago",
      category: "Marketing",
      excerpt: "I've been working with high-end properties in Downtown Dubai and wanted to share some insights...",
    },
    {
      id: "2",
      title: "New RERA regulations - What agents need to know",
      author: "Ahmed Hassan",
      avatar: "/professional-headshot.png",
      replies: 67,
      likes: 89,
      timestamp: "4 hours ago",
      category: "Legal",
      excerpt:
        "The recent updates to RERA regulations have significant implications for all real estate professionals...",
    },
    {
      id: "3",
      title: "Virtual tour technology recommendations",
      author: "Fatima Al-Zahra",
      avatar: "/professional-headshot.png",
      replies: 34,
      likes: 56,
      timestamp: "6 hours ago",
      category: "Technology",
      excerpt: "After testing various VR platforms, here are my top recommendations for property showcasing...",
    },
  ]

  const events = [
    {
      id: "1",
      title: "UAE Real Estate Investment Summit 2024",
      date: "2024-02-15",
      time: "9:00 AM - 6:00 PM",
      location: "Dubai World Trade Centre",
      attendees: 234,
      type: "Conference",
      description: "Join industry leaders for insights on market trends and investment opportunities.",
      organizer: "Dubai Real Estate Association",
    },
    {
      id: "2",
      title: "Networking Breakfast - Marina District",
      date: "2024-02-08",
      time: "8:00 AM - 10:00 AM",
      location: "Four Seasons Resort Dubai",
      attendees: 45,
      type: "Networking",
      description: "Connect with fellow professionals over breakfast and discuss market opportunities.",
      organizer: "Marina Real Estate Network",
    },
    {
      id: "3",
      title: "PropTech Innovation Workshop",
      date: "2024-02-12",
      time: "2:00 PM - 5:00 PM",
      location: "Dubai Internet City",
      attendees: 78,
      type: "Workshop",
      description: "Hands-on workshop exploring the latest property technology solutions.",
      organizer: "UAE PropTech Hub",
    },
  ]

  const topContributors = [
    {
      name: "Ahmed Al-Rashid",
      avatar: "/professional-headshot.png",
      posts: 156,
      reputation: 2847,
      specialization: "Luxury Properties",
    },
    {
      name: "Sarah Johnson",
      avatar: "/professional-headshot.png",
      posts: 134,
      reputation: 2456,
      specialization: "Commercial Real Estate",
    },
    {
      name: "Mohammed Hassan",
      avatar: "/professional-headshot.png",
      posts: 98,
      reputation: 1923,
      specialization: "Property Management",
    },
  ]

  const knowledgeBase = [
    {
      title: "Dubai Property Market Guide 2024",
      category: "Market Analysis",
      downloads: 1234,
      rating: 4.8,
      author: "Dubai Real Estate Institute",
    },
    {
      title: "RERA Compliance Checklist",
      category: "Legal & Compliance",
      downloads: 2156,
      rating: 4.9,
      author: "UAE Legal Advisory",
    },
    {
      title: "Virtual Tour Best Practices",
      category: "Technology",
      downloads: 876,
      rating: 4.7,
      author: "PropTech Solutions",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Professional Community</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Connect, learn, and grow with UAE's top real estate professionals
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-amber-200 text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600">{communityStats.totalMembers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200 text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600">{communityStats.activeToday}</div>
              <div className="text-sm text-gray-600">Active Today</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200 text-center">
            <CardContent className="pt-6">
              <MessageSquare className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600">{communityStats.totalPosts.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200 text-center">
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600">{communityStats.eventsThisMonth}</div>
              <div className="text-sm text-gray-600">Events This Month</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="discussions" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-6">
            {/* Discussion Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-2">
                <Input placeholder="Search discussions..." className="w-64" />
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="border-amber-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={discussion.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {discussion.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 text-balance">{discussion.title}</h3>
                          <Badge variant="outline">{discussion.category}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3 text-pretty">{discussion.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>by {discussion.author}</span>
                            <span>{discussion.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              {discussion.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {discussion.replies}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Upcoming Events</h2>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-balance">{event.title}</CardTitle>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date} • {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees} attending
                      </div>
                      <p className="text-sm text-gray-600 text-pretty">{event.description}</p>
                      <div className="pt-2">
                        <Button className="w-full bg-amber-600 hover:bg-amber-700">Register</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Knowledge Base</h2>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Plus className="h-4 w-4 mr-2" />
                Contribute
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeBase.map((resource, index) => (
                <Card key={index} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-balance">{resource.title}</CardTitle>
                    <CardDescription>{resource.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">by {resource.author}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{resource.downloads.toLocaleString()} downloads</div>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Top Contributors</h2>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Find Members
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topContributors.map((member, index) => (
                <Card key={index} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-4">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{member.specialization}</p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold text-amber-600">{member.posts}</div>
                          <div className="text-xs text-gray-600">Posts</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-amber-600">{member.reputation.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">Reputation</div>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        <Coffee className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
