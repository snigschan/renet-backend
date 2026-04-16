"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Star,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import Link from "next/link"

export default function AgencyDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock agency data
  const agency = {
    name: "Emirates Properties",
    logo: "/agency-logo.png",
    type: "Premium Real Estate Agency",
    location: "Dubai Marina",
    founded: "2015",
    employees: "150+",
    rating: 4.8,
    reviews: 89,
    verified: true,
  }

  const stats = [
    { label: "Active Missions", value: "24", icon: Briefcase, color: "text-blue-600" },
    { label: "Applications", value: "342", icon: Users, color: "text-green-600" },
    { label: "Hired This Month", value: "8", icon: TrendingUp, color: "text-amber-600" },
    { label: "Success Rate", value: "94%", icon: Star, color: "text-purple-600" },
  ]

  const activeMissions = [
    {
      id: 1,
      title: "Senior Real Estate Agent - Luxury Properties",
      location: "Palm Jumeirah",
      type: "Full-time",
      salary: "AED 15,000 + Commission",
      posted: "3 days ago",
      applications: 28,
      views: 156,
      status: "Active",
    },
    {
      id: 2,
      title: "Commercial Property Consultant",
      location: "DIFC",
      type: "Contract",
      salary: "AED 12,000 + Benefits",
      posted: "1 week ago",
      applications: 45,
      views: 203,
      status: "Active",
    },
    {
      id: 3,
      title: "Property Manager - Residential",
      location: "Dubai Marina",
      type: "Full-time",
      salary: "AED 10,000 + Benefits",
      posted: "2 weeks ago",
      applications: 67,
      views: 289,
      status: "Reviewing",
    },
  ]

  const recentApplications = [
    {
      id: 1,
      candidate: "Ahmed Al-Rashid",
      position: "Senior Real Estate Agent",
      rating: 4.9,
      experience: "8+ years",
      applied: "2 hours ago",
      status: "New",
      avatar: "/professional-headshot.png",
    },
    {
      id: 2,
      candidate: "Sarah Johnson",
      position: "Commercial Property Consultant",
      rating: 4.7,
      experience: "5 years",
      applied: "5 hours ago",
      status: "Reviewed",
      avatar: "/candidate-2.png",
    },
    {
      id: 3,
      candidate: "Mohammed Hassan",
      position: "Property Manager",
      rating: 4.8,
      experience: "6 years",
      applied: "1 day ago",
      status: "Interview",
      avatar: "/candidate-3.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-foreground">RealEstate Pro</div>
                  <div className="text-xs text-muted-foreground">Agency Portal</div>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/agency/missions/create">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Mission
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Agency Profile */}
          <div className="lg:col-span-1">
            <Card className="border-border/50">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={agency.logo || "/placeholder.svg"} alt={agency.name} />
                  <AvatarFallback className="text-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                    {agency.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CardTitle className="text-xl">{agency.name}</CardTitle>
                  {agency.verified && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <CardDescription>{agency.type}</CardDescription>

                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{agency.rating}</span>
                  <span className="text-muted-foreground">({agency.reviews} reviews)</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{agency.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Founded {agency.founded}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{agency.employees} employees</span>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  Edit Company Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="missions">Missions</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                          </div>
                          <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Applications */}
                <Card className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Applications</CardTitle>
                        <CardDescription>Latest candidates who applied to your missions</CardDescription>
                      </div>
                      <Link href="/agency/applications">
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div
                          key={application.id}
                          className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.candidate} />
                              <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                                {application.candidate
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-foreground">{application.candidate}</h3>
                              <p className="text-sm text-muted-foreground">{application.position}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  {application.rating}
                                </div>
                                <span>{application.experience}</span>
                                <span>{application.applied}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={application.status === "New" ? "default" : "secondary"}
                              className={
                                application.status === "New"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  : application.status === "Interview"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : ""
                              }
                            >
                              {application.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Missions Tab */}
              <TabsContent value="missions" className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Active Missions</CardTitle>
                        <CardDescription>Manage your posted job opportunities</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                        <Link href="/agency/missions/create">
                          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Post New Mission
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeMissions.map((mission) => (
                        <div
                          key={mission.id}
                          className="p-6 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-foreground text-lg mb-2">{mission.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {mission.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Briefcase className="w-3 h-3" />
                                  {mission.type}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Posted {mission.posted}
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant={mission.status === "Active" ? "default" : "secondary"}
                              className={
                                mission.status === "Active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                              }
                            >
                              {mission.status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <span className="font-medium text-amber-600">{mission.salary}</span>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {mission.applications} applications
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {mission.views} views
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                View Applications
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>All Applications</CardTitle>
                        <CardDescription>Review and manage candidate applications</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Search className="w-4 h-4 mr-2" />
                          Search
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div
                          key={application.id}
                          className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage
                                  src={application.avatar || "/placeholder.svg"}
                                  alt={application.candidate}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                                  {application.candidate
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-foreground">{application.candidate}</h3>
                                <p className="text-sm text-muted-foreground">{application.position}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    {application.rating}
                                  </div>
                                  <span>{application.experience}</span>
                                  <span>Applied {application.applied}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant={application.status === "New" ? "default" : "secondary"}
                                className={
                                  application.status === "New"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : application.status === "Interview"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : ""
                                }
                              >
                                {application.status}
                              </Badge>
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                              >
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Mission Performance</CardTitle>
                      <CardDescription>Track your mission posting success</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Views</span>
                          <span className="font-medium">1,248</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Applications</span>
                          <span className="font-medium">342</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Conversion Rate</span>
                          <span className="font-medium">27.4%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Successful Hires</span>
                          <span className="font-medium">23</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Top Performing Missions</CardTitle>
                      <CardDescription>Your most successful job postings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="truncate">Senior Real Estate Agent</span>
                          <span className="font-medium">156 views</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="truncate">Property Manager</span>
                          <span className="font-medium">289 views</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="truncate">Commercial Consultant</span>
                          <span className="font-medium">203 views</span>
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
    </div>
  )
}
