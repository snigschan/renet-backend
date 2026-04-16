"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Plus,
  Search,
  Filter,
  Users,
  Briefcase,
  Eye,
  MessageSquare,
  TrendingUp,
  DollarSign,
  MapPin,
  Clock,
  Bell,
  Settings,
  Network,
  BarChart3,
  Calendar,
  FileText,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function HiringAgencyDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock agency data
  const agency = {
    name: "Premium Realty Group",
    logo: "/placeholder.svg?height=60&width=60",
    location: "New York, NY",
    employees: "50-200",
    founded: "2015",
    activeJobs: 12,
    totalApplications: 156,
    hiredCandidates: 23,
    profileViews: 1247,
    verified: true,
  }

  // Mock job postings
  const jobPostings = [
    {
      id: 1,
      title: "Senior Property Consultant",
      location: "Manhattan, NY",
      type: "Full-time",
      salary: "$80K - $120K",
      posted: "2 days ago",
      applications: 24,
      views: 156,
      status: "Active",
    },
    {
      id: 2,
      title: "Commercial Real Estate Broker",
      location: "Brooklyn, NY",
      type: "Full-time",
      salary: "$90K - $150K",
      posted: "1 week ago",
      applications: 18,
      views: 203,
      status: "Active",
    },
    {
      id: 3,
      title: "Junior Sales Associate",
      location: "Queens, NY",
      type: "Full-time",
      salary: "$50K - $70K",
      posted: "3 days ago",
      applications: 31,
      views: 89,
      status: "Active",
    },
  ]

  // Mock candidates
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      location: "New York, NY",
      experience: "8 years",
      avatar: "/placeholder.svg?height=40&width=40",
      match: 95,
      appliedFor: "Senior Property Consultant",
      status: "Under Review",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Commercial Broker",
      location: "Brooklyn, NY",
      experience: "6 years",
      avatar: "/placeholder.svg?height=40&width=40",
      match: 88,
      appliedFor: "Commercial Real Estate Broker",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Property Consultant",
      location: "Manhattan, NY",
      experience: "4 years",
      avatar: "/placeholder.svg?height=40&width=40",
      match: 82,
      appliedFor: "Senior Property Consultant",
      status: "New Application",
    },
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
              <p className="text-xs text-muted-foreground">Hiring Agency Dashboard</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Post Job
            </Button>
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
              <AvatarImage src={agency.logo || "/placeholder.svg"} alt={agency.name} />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Agency Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarImage src={agency.logo || "/placeholder.svg"} alt={agency.name} />
                    <AvatarFallback>PR</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{agency.name}</h3>
                    {agency.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs flex items-center justify-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" />
                    {agency.location}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {agency.employees} employees • Founded {agency.founded}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-primary">{agency.activeJobs}</div>
                    <div className="text-xs text-muted-foreground">Active Jobs</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-primary">{agency.profileViews}</div>
                    <div className="text-xs text-muted-foreground">Profile Views</div>
                  </div>
                </div>

                <Button className="w-full mt-4" size="sm">
                  <Building2 className="w-4 h-4 mr-2" />
                  Edit Company Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Hiring Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Applications</span>
                  </div>
                  <Badge variant="outline">{agency.totalApplications}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Hired</span>
                  </div>
                  <Badge variant="outline">{agency.hiredCandidates}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Success Rate</span>
                  </div>
                  <Badge variant="outline">15%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="jobs">Job Postings</TabsTrigger>
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="post-job">Post Job</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Welcome Message */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-2">Welcome to your hiring dashboard!</h2>
                    <p className="text-muted-foreground mb-4">
                      You have 15 new applications and 3 candidates ready for interviews.
                    </p>
                    <div className="flex gap-4">
                      <Button>
                        <Users className="w-4 h-4 mr-2" />
                        Review Candidates
                      </Button>
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Post New Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Recent Applications
                    </CardTitle>
                    <CardDescription>Latest candidates who applied to your positions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {candidates.slice(0, 3).map((candidate) => (
                      <div
                        key={candidate.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                            <AvatarFallback>
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{candidate.name}</h4>
                            <p className="text-sm text-muted-foreground">{candidate.title}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {candidate.location}
                              </span>
                              <span>{candidate.experience} experience</span>
                              <span>Applied for: {candidate.appliedFor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">
                            {candidate.match}% match
                          </Badge>
                          <Badge
                            variant={candidate.status === "New Application" ? "default" : "outline"}
                            className="text-xs"
                          >
                            {candidate.status}
                          </Badge>
                          <Button size="sm">Review</Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Applications
                    </Button>
                  </CardContent>
                </Card>

                {/* Active Job Postings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Active Job Postings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {jobPostings.slice(0, 3).map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {job.posted}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-medium">{job.applications}</div>
                            <div className="text-muted-foreground">Applications</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{job.views}</div>
                            <div className="text-muted-foreground">Views</div>
                          </div>
                          <Badge variant="outline">{job.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Job Postings Tab */}
              <TabsContent value="jobs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Job Postings</CardTitle>
                        <CardDescription>Manage your active and draft job postings</CardDescription>
                      </div>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Post New Job
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobPostings.map((job) => (
                        <div
                          key={job.id}
                          className="p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
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
                            </div>
                            <Badge variant="outline">{job.status}</Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span>{job.applications} applications</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                                <span>{job.views} views</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                View Applications
                              </Button>
                              <Button size="sm">
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Analytics
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Candidates Tab */}
              <TabsContent value="candidates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Candidate Management</CardTitle>
                        <CardDescription>Review and manage job applications</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                        <div className="relative">
                          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                          <Input placeholder="Search candidates..." className="pl-10 w-64" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className="p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                                <AvatarFallback>
                                  {candidate.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">{candidate.name}</h3>
                                <p className="text-muted-foreground">{candidate.title}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {candidate.location}
                                  </span>
                                  <span>{candidate.experience} experience</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">{candidate.match}% match</Badge>
                              <Badge variant={candidate.status === "New Application" ? "default" : "outline"}>
                                {candidate.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Applied for: {candidate.appliedFor}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button variant="outline" size="sm">
                                View Profile
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                              <Button size="sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule Interview
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Hiring Analytics
                    </CardTitle>
                    <CardDescription>Track your recruitment performance and metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-2">{agency.totalApplications}</div>
                        <div className="text-sm text-muted-foreground">Total Applications</div>
                        <div className="text-xs text-green-600 mt-1">+12% this month</div>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-2">{agency.hiredCandidates}</div>
                        <div className="text-sm text-muted-foreground">Successful Hires</div>
                        <div className="text-xs text-green-600 mt-1">+8% this month</div>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-2">15%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                        <div className="text-xs text-green-600 mt-1">+2% this month</div>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-2">18</div>
                        <div className="text-sm text-muted-foreground">Avg. Days to Hire</div>
                        <div className="text-xs text-red-600 mt-1">+3 days</div>
                      </div>
                    </div>

                    <div className="text-center py-12">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Detailed Analytics Coming Soon</h3>
                      <p className="text-muted-foreground">Advanced charts and insights will be available here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Post Job Tab */}
              <TabsContent value="post-job" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post a New Job</CardTitle>
                    <CardDescription>Create a new job posting to attract top real estate talent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input id="jobTitle" placeholder="e.g. Senior Real Estate Agent" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="luxury">Luxury Properties</SelectItem>
                              <SelectItem value="management">Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="e.g. New York, NY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobType">Job Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="freelance">Freelance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience Level</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                              <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                              <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                              <SelectItem value="executive">Executive (10+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="salaryMin">Minimum Salary</Label>
                          <Input id="salaryMin" placeholder="e.g. 80000" type="number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salaryMax">Maximum Salary</Label>
                          <Input id="salaryMax" placeholder="e.g. 120000" type="number" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                          rows={6}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requirements">Requirements</Label>
                        <Textarea
                          id="requirements"
                          placeholder="List the required qualifications, skills, and experience..."
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="benefits">Benefits & Perks</Label>
                        <Textarea
                          id="benefits"
                          placeholder="Describe the benefits, perks, and what makes your company great..."
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-primary hover:bg-primary/90">
                          <FileText className="w-4 h-4 mr-2" />
                          Publish Job
                        </Button>
                        <Button type="button" variant="outline">
                          Save as Draft
                        </Button>
                        <Button type="button" variant="outline">
                          Preview
                        </Button>
                      </div>
                    </form>
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
