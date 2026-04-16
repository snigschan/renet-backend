"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Briefcase,
  Users,
  Eye,
  MessageCircle,
  Star,
  UserPlus,
  FileText,
  TrendingUp,
  Calendar,
  Filter,
  ThumbsUp,
  Share2,
  MessageSquare,
} from "lucide-react"

// Mock activity feed data
const activities = [
  {
    id: 1,
    type: "job_application",
    user: "You",
    action: "applied to",
    target: "Senior Property Consultant at Premium Realty Group",
    timestamp: "2 hours ago",
    icon: Briefcase,
    details: "95% match • Manhattan, NY • $80K-$120K",
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: 2,
    type: "profile_view",
    user: "Michael Chen",
    userAvatar: "/placeholder.svg?height=40&width=40",
    action: "viewed your profile",
    target: "",
    timestamp: "5 hours ago",
    icon: Eye,
    details: "Property Investment Manager at Global Realty Group",
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: 3,
    type: "connection",
    user: "You",
    action: "connected with",
    target: "Emma Rodriguez",
    targetAvatar: "/placeholder.svg?height=40&width=40",
    timestamp: "1 day ago",
    icon: UserPlus,
    details: "Commercial Real Estate Broker at Metro Commercial",
    engagement: { likes: 3, comments: 1, shares: 0 },
  },
  {
    id: 4,
    type: "endorsement",
    user: "David Kim",
    userAvatar: "/placeholder.svg?height=40&width=40",
    action: "endorsed you for",
    target: "Commercial Real Estate",
    timestamp: "1 day ago",
    icon: Star,
    details: "You now have 15 endorsements for this skill",
    engagement: { likes: 5, comments: 0, shares: 0 },
  },
  {
    id: 5,
    type: "profile_update",
    user: "You",
    action: "updated your",
    target: "professional experience",
    timestamp: "2 days ago",
    icon: FileText,
    details: "Added new position: Senior Real Estate Agent",
    engagement: { likes: 8, comments: 2, shares: 0 },
  },
  {
    id: 6,
    type: "message",
    user: "Sarah Johnson",
    userAvatar: "/placeholder.svg?height=40&width=40",
    action: "sent you a message about",
    target: "collaboration opportunities",
    timestamp: "2 days ago",
    icon: MessageCircle,
    details: "Interested in discussing NYC luxury market strategies",
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
  {
    id: 7,
    type: "achievement",
    user: "You",
    action: "earned the",
    target: "Top Performer badge",
    timestamp: "3 days ago",
    icon: Star,
    details: "Recognized for outstanding performance in Q4 2024",
    engagement: { likes: 24, comments: 5, shares: 3 },
  },
  {
    id: 8,
    type: "network_growth",
    user: "Your network",
    action: "grew by",
    target: "15 new connections",
    timestamp: "1 week ago",
    icon: Users,
    details: "You're now connected with 247 professionals",
    engagement: { likes: 0, comments: 0, shares: 0 },
  },
]

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activityList] = useState(activities)

  const filterActivities = (type: string) => {
    if (type === "all") return activityList
    return activityList.filter((a) => a.type === type)
  }

  const getActivityIcon = (activity: any) => {
    const IconComponent = activity.icon
    return <IconComponent className="h-5 w-5" />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Activity Feed</h1>
            <p className="text-muted-foreground">Track your professional activities and engagement</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Activity Feed */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="job_application">Jobs</TabsTrigger>
                <TabsTrigger value="connection">Network</TabsTrigger>
                <TabsTrigger value="endorsement">Endorsements</TabsTrigger>
                <TabsTrigger value="profile_view">Views</TabsTrigger>
                <TabsTrigger value="achievement">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filterActivities(activeTab).length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
                      <p className="text-muted-foreground">Your activities will appear here as you use RENet</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterActivities(activeTab).map((activity) => (
                    <Card key={activity.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Avatar or Icon */}
                          <div className="flex-shrink-0">
                            {activity.userAvatar || activity.targetAvatar ? (
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={activity.userAvatar || activity.targetAvatar} />
                                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                {getActivityIcon(activity)}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="mb-2">
                              <span className="font-semibold">{activity.user}</span>
                              <span className="text-muted-foreground"> {activity.action} </span>
                              {activity.target && <span className="font-semibold">{activity.target}</span>}
                            </div>
                            {activity.details && (
                              <p className="text-sm text-muted-foreground mb-3">{activity.details}</p>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                              <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <ThumbsUp className="h-4 w-4" />
                                  {activity.engagement.likes > 0 && (
                                    <span className="text-xs">{activity.engagement.likes}</span>
                                  )}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  {activity.engagement.comments > 0 && (
                                    <span className="text-xs">{activity.engagement.comments}</span>
                                  )}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <Share2 className="h-4 w-4" />
                                  {activity.engagement.shares > 0 && (
                                    <span className="text-xs">{activity.engagement.shares}</span>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Activity Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <Badge variant="outline">+12%</Badge>
                  </div>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Total activities</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Profile Views</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">New Connections</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Applications</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Endorsements</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Likes Received</span>
                  </div>
                  <Badge variant="outline">40</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Comments</span>
                  </div>
                  <Badge variant="outline">8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Shares</span>
                  </div>
                  <Badge variant="outline">3</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Expand Network
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
