"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Eye,
  MessageSquare,
  TrendingUp,
  Building2,
  Send,
} from "lucide-react"

const mockApplications = [
  {
    id: 1,
    job: {
      title: "Senior Property Consultant",
      company: "Emaar Properties",
      logo: "/placeholder.svg?height=40&width=40",
      location: "Dubai, UAE",
      type: "Full-time",
      salary: "AED 15,000 - 20,000/month",
    },
    appliedDate: "2024-01-15",
    status: "interview",
    stage: "Technical Interview",
    progress: 60,
    lastUpdate: "2 days ago",
    nextStep: "Video interview scheduled for Jan 22",
    matchScore: 95,
    recruiter: {
      name: "Ahmed Hassan",
      avatar: "/professional-arab-man.png",
    },
  },
  {
    id: 2,
    job: {
      title: "Commercial Real Estate Broker",
      company: "CBRE Middle East",
      logo: "/placeholder.svg?height=40&width=40",
      location: "Riyadh, Saudi Arabia",
      type: "Full-time",
      salary: "SAR 18,000 - 25,000/month",
    },
    appliedDate: "2024-01-12",
    status: "under-review",
    stage: "Application Review",
    progress: 30,
    lastUpdate: "5 days ago",
    nextStep: "Waiting for recruiter review",
    matchScore: 88,
    recruiter: {
      name: "Sarah Al-Mansouri",
      avatar: "/professional-arab-woman.png",
    },
  },
  {
    id: 3,
    job: {
      title: "Property Manager",
      company: "Aldar Properties",
      logo: "/placeholder.svg?height=40&width=40",
      location: "Abu Dhabi, UAE",
      type: "Full-time",
      salary: "AED 12,000 - 16,000/month",
    },
    appliedDate: "2024-01-10",
    status: "rejected",
    stage: "Application Rejected",
    progress: 100,
    lastUpdate: "1 week ago",
    nextStep: "Position filled",
    matchScore: 82,
    feedback: "Strong candidate but position required more commercial experience",
  },
  {
    id: 4,
    job: {
      title: "Real Estate Sales Agent",
      company: "Damac Properties",
      logo: "/placeholder.svg?height=40&width=40",
      location: "Dubai, UAE",
      type: "Full-time",
      salary: "AED 8,000 - 12,000/month + Commission",
    },
    appliedDate: "2024-01-08",
    status: "offer",
    stage: "Offer Extended",
    progress: 90,
    lastUpdate: "3 days ago",
    nextStep: "Review and accept offer by Jan 25",
    matchScore: 92,
    offerDetails: {
      salary: "AED 10,000/month",
      commission: "2% on sales",
      benefits: "Health insurance, visa sponsorship",
    },
  },
]

const applicationStats = {
  total: 24,
  active: 8,
  interviews: 3,
  offers: 1,
  rejected: 12,
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "interview":
      return "bg-purple-50 text-purple-700 border-purple-200"
    case "under-review":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "offer":
      return "bg-green-50 text-green-700 border-green-200"
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "interview":
      return <Calendar className="w-3 h-3 mr-1" />
    case "under-review":
      return <Clock className="w-3 h-3 mr-1" />
    case "offer":
      return <CheckCircle2 className="w-3 h-3 mr-1" />
    case "rejected":
      return <XCircle className="w-3 h-3 mr-1" />
    default:
      return <AlertCircle className="w-3 h-3 mr-1" />
  }
}

export function ApplicationsContent() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredApplications = mockApplications.filter((app) => {
    const matchesTab = activeTab === "all" || app.status === activeTab
    const matchesSearch =
      searchQuery === "" ||
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track your job applications and manage your career journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{applicationStats.total}</p>
                <p className="text-xs text-muted-foreground">Total Applied</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{applicationStats.active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{applicationStats.interviews}</p>
                <p className="text-xs text-muted-foreground">Interviews</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{applicationStats.offers}</p>
                <p className="text-xs text-muted-foreground">Offers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{applicationStats.rejected}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Applications</TabsTrigger>
              <TabsTrigger value="under-review">Under Review</TabsTrigger>
              <TabsTrigger value="interview">Interviews</TabsTrigger>
              <TabsTrigger value="offer">Offers</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <div className="relative w-80">
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Applications Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Try adjusting your search" : "Start applying to jobs to see them here"}
                  </p>
                  <Button>Browse Jobs</Button>
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={application.job.logo || "/placeholder.svg"} alt={application.job.company} />
                        <AvatarFallback>
                          {application.job.company
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{application.job.title}</h3>
                            <p className="text-muted-foreground flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              {application.job.company}
                            </p>
                          </div>
                          <Badge variant="outline" className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            {application.stage}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {application.job.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {application.job.type}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            {application.job.salary}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Applied {application.appliedDate}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Application Progress</span>
                            <span className="font-medium">{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} className="h-2" />
                        </div>

                        {/* Next Step */}
                        <div className="p-3 bg-muted rounded-lg mb-4">
                          <div className="flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Next Step</p>
                              <p className="text-sm text-muted-foreground">{application.nextStep}</p>
                            </div>
                          </div>
                        </div>

                        {/* Offer Details */}
                        {application.status === "offer" && application.offerDetails && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                            <h4 className="font-medium text-green-900 mb-2">Offer Details</h4>
                            <div className="space-y-1 text-sm text-green-700">
                              <p>• Base Salary: {application.offerDetails.salary}</p>
                              <p>• Commission: {application.offerDetails.commission}</p>
                              <p>• Benefits: {application.offerDetails.benefits}</p>
                            </div>
                          </div>
                        )}

                        {/* Rejection Feedback */}
                        {application.status === "rejected" && application.feedback && (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                            <h4 className="font-medium text-red-900 mb-2">Feedback</h4>
                            <p className="text-sm text-red-700">{application.feedback}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="secondary">{application.matchScore}% match</Badge>
                            <span className="text-muted-foreground">Updated {application.lastUpdate}</span>
                            {application.recruiter && (
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage
                                    src={application.recruiter.avatar || "/placeholder.svg"}
                                    alt={application.recruiter.name}
                                  />
                                  <AvatarFallback>
                                    {application.recruiter.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-muted-foreground">{application.recruiter.name}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {application.status === "offer" && (
                              <>
                                <Button size="sm" variant="outline">
                                  Decline
                                </Button>
                                <Button size="sm">
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Accept Offer
                                </Button>
                              </>
                            )}
                            {application.status !== "offer" && application.status !== "rejected" && (
                              <>
                                <Button size="sm" variant="outline">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Message
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              </>
                            )}
                            {application.status === "rejected" && (
                              <Button size="sm" variant="outline">
                                <Send className="w-4 h-4 mr-2" />
                                Apply to Similar Jobs
                              </Button>
                            )}
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
    </div>
  )
}
