"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Briefcase,
  MapPin,
  MessageSquare,
  Heart,
  Search,
  Filter,
  Bell,
  Settings,
  Network,
  DollarSign,
  Users,
  Award,
  Target,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function JobSeekerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=100&width=100",
    profileCompletion: 85,
    connections: 247,
    profileViews: 156,
    jobApplications: 12,
    savedJobs: 8,
    verified: true,
    experience: "8 years",
    specializations: ["Luxury Properties", "Commercial Real Estate", "Investment Properties"],
  }

  // Mock job recommendations
  const jobRecommendations = [
    {
      id: 1,
      title: "Senior Property Consultant",
      company: "Premium Realty Group",
      location: "Manhattan, NY",
      salary: "$80K - $120K",
      type: "Full-time",
      posted: "2 days ago",
      match: 95,
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Commercial Real Estate Broker",
      company: "Global Properties Inc",
      location: "Brooklyn, NY",
      salary: "$90K - $150K",
      type: "Full-time",
      posted: "1 week ago",
      match: 88,
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "Luxury Property Specialist",
      company: "Elite Estates",
      location: "Queens, NY",
      salary: "$70K - $110K",
      type: "Full-time",
      posted: "3 days ago",
      match: 82,
      logo: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Mock recent activities
  const recentActivities = [
    { type: "application", text: "Applied to Senior Property Consultant at Premium Realty", time: "2 hours ago" },
    { type: "view", text: "Your profile was viewed by Global Properties Inc", time: "5 hours ago" },
    { type: "connection", text: "Connected with Michael Chen, Real Estate Director", time: "1 day ago" },
    { type: "save", text: "Saved Commercial Real Estate Broker position", time: "2 days ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Network className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">RENet</h1>
              <p className="text-xs text-muted-foreground">Job Seeker Dashboard</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    {user.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{user.title}</p>
                  <p className="text-muted-foreground text-xs flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {user.location}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profile Completion</span>
                      <span>{user.profileCompletion}%</span>
                    </div>
                    <Progress value={user.profileCompletion} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-primary">{user.connections}</div>
                      <div className="text-xs text-muted-foreground">Connections</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-primary">{user.profileViews}</div>
                      <div className="text-xs text-muted-foreground">Profile Views</div>
                    </div>
                  </div>

                  <Button className="w-full" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Applications</span>
                  </div>
                  <Badge variant="outline">{user.jobApplications}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Saved Jobs</span>
                  </div>
                  <Badge variant="outline">{user.savedJobs}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Experience</span>
                  </div>
                  <Badge variant="outline">{user.experience}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="jobs">Job Search</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Welcome Message */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-2">Welcome back, {user.name}!</h2>
                    <p className="text-muted-foreground mb-4">
                      You have 3 new job matches and 2 profile views since your last visit.
                    </p>
                    <div className="flex gap-4">
                      <Button>
                        <Search className="w-4 h-4 mr-2" />
                        Browse Jobs
                      </Button>
                      <Button variant="outline">
                        <Users className="w-4 h-4 mr-2" />
                        Expand Network
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Recommended Jobs
                    </CardTitle>
                    <CardDescription>Jobs matched to your profile and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {jobRecommendations.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                            <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {job.salary}
                              </span>
                              <span>{job.posted}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">
                            {job.match}% match
                          </Badge>
                          <Button size="sm">Apply</Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Recommendations
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm">{activity.text}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Search</CardTitle>
                    <CardDescription>Find your next opportunity in real estate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search jobs, companies, or keywords..."
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
                          />
                        </div>
                      </div>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {jobRecommendations.map((job) => (
                        <div
                          key={job.id}
                          className="p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                                <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                <p className="text-muted-foreground">{job.company}</p>
                              </div>
                            </div>
                            <Badge variant="secondary">{job.match}% match</Badge>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.posted}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <Button>Apply Now</Button>
                            <Button variant="outline" size="sm">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                    <CardDescription>Track your job applications and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                      <p className="text-muted-foreground mb-4">Start applying to jobs to see them here</p>
                      <Button>Browse Jobs</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Network Tab */}
              <TabsContent value="network" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Network</CardTitle>
                    <CardDescription>Connect with real estate professionals worldwide</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Expand your network</h3>
                      <p className="text-muted-foreground mb-4">Connect with other professionals in your field</p>
                      <Button>Find Connections</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Management</CardTitle>
                    <CardDescription>Keep your profile updated to attract the right opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {user.specializations.map((spec, index) => (
                            <Badge key={index} variant="outline">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button>
                        <User className="w-4 h-4 mr-2" />
                        Edit Full Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
