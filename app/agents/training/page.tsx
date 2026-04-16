"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Award,
  Clock,
  Play,
  CheckCircle,
  Star,
  Calendar,
  Users,
  TrendingUp,
  Briefcase as Certificate,
  Video,
  FileText,
  Headphones,
} from "lucide-react"

export default function AgentTrainingPage() {
  const [activeTab, setActiveTab] = useState("courses")

  const courses = [
    {
      id: 1,
      title: "UAE Real Estate Law & Regulations",
      description: "Comprehensive guide to UAE property laws and RERA regulations",
      duration: "4 hours",
      modules: 8,
      progress: 75,
      status: "In Progress",
      instructor: "Dr. Ahmed Al-Mansouri",
      rating: 4.8,
      students: 1247,
      type: "video",
      thumbnail: "/uae-real-estate-law-course.jpg",
    },
    {
      id: 2,
      title: "Advanced Sales Techniques",
      description: "Master the art of closing deals and building client relationships",
      duration: "3 hours",
      modules: 6,
      progress: 100,
      status: "Completed",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 892,
      type: "video",
      thumbnail: "/sales-techniques-training.jpg",
    },
    {
      id: 3,
      title: "Digital Marketing for Real Estate",
      description: "Leverage social media and digital platforms to generate leads",
      duration: "5 hours",
      modules: 10,
      progress: 0,
      status: "Not Started",
      instructor: "Mark Thompson",
      rating: 4.7,
      students: 654,
      type: "interactive",
      thumbnail: "/digital-marketing-real-estate.jpg",
    },
  ]

  const certifications = [
    {
      id: 1,
      name: "RERA Certified Agent",
      issuer: "Real Estate Regulatory Agency",
      status: "Active",
      expiryDate: "2025-06-15",
      credentialId: "RERA-2024-AH-001",
      badge: "/rera-certification-badge.jpg",
    },
    {
      id: 2,
      name: "Luxury Property Specialist",
      issuer: "Dubai Real Estate Institute",
      status: "Active",
      expiryDate: "2025-12-20",
      credentialId: "DREI-LPS-2024-156",
      badge: "/luxury-property-specialist-badge.jpg",
    },
    {
      id: 3,
      name: "Commercial Real Estate Expert",
      issuer: "UAE Property Council",
      status: "Pending Renewal",
      expiryDate: "2024-03-10",
      credentialId: "UPC-CRE-2023-089",
      badge: "/commercial-real-estate-badge.jpg",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Dubai Property Market Outlook 2024",
      date: "March 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Dubai World Trade Centre",
      type: "Seminar",
      speakers: ["Dr. Sarah Al-Zahra", "Michael Roberts"],
      price: "Free",
    },
    {
      id: 2,
      title: "Negotiation Masterclass",
      date: "March 22, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "Online",
      type: "Workshop",
      speakers: ["James Wilson"],
      price: "AED 500",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending Renewal":
        return "bg-amber-100 text-amber-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "interactive":
        return Play
      case "document":
        return FileText
      case "audio":
        return Headphones
      default:
        return BookOpen
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Training & Development</h1>
              <p className="text-muted-foreground">Enhance your skills and maintain certifications</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Courses Completed</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Certifications</p>
                  <p className="text-2xl font-bold text-amber-600">5</p>
                </div>
                <Certificate className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Hours</p>
                  <p className="text-2xl font-bold text-blue-600">47</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Skill Level</p>
                  <p className="text-2xl font-bold text-purple-600">Expert</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const TypeIcon = getTypeIcon(course.type)
                return (
                  <Card key={course.id} className="border-border/50 hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <Badge
                        className={`absolute top-3 left-3 ${
                          course.status === "Completed"
                            ? "bg-green-600"
                            : course.status === "In Progress"
                              ? "bg-amber-600"
                              : "bg-blue-600"
                        }`}
                      >
                        {course.status}
                      </Badge>
                      <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <TypeIcon className="w-3 h-3" />
                        {course.type}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{course.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {course.modules} modules
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">By {course.instructor}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">{course.rating}</span>
                            <span className="text-muted-foreground">({course.students})</span>
                          </div>
                        </div>

                        <Button className="w-full" variant={course.status === "Not Started" ? "default" : "outline"}>
                          {course.status === "Completed"
                            ? "Review"
                            : course.status === "In Progress"
                              ? "Continue"
                              : "Start Course"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id} className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <img src={cert.badge || "/placeholder.svg"} alt={cert.name} className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>

                    <Badge className={getStatusColor(cert.status)} variant="secondary">
                      {cert.status}
                    </Badge>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expires:</span>
                        <span className="font-medium">{cert.expiryDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID:</span>
                        <span className="font-mono text-xs">{cert.credentialId}</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      <Award className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <Badge variant="outline">{event.type}</Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {event.price}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {event.date} • {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {event.speakers.join(", ")}
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">📍 {event.location}</p>
                      </div>

                      <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600">
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Path Progress</CardTitle>
                  <CardDescription>Track your skill development journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: "Sales & Negotiation", progress: 85, level: "Advanced" },
                    { skill: "Market Analysis", progress: 70, level: "Intermediate" },
                    { skill: "Digital Marketing", progress: 45, level: "Beginner" },
                    { skill: "Legal Compliance", progress: 90, level: "Expert" },
                  ].map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.skill}</span>
                        <Badge variant="outline">{skill.level}</Badge>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                      <div className="text-sm text-muted-foreground text-right">{skill.progress}% Complete</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Completed Advanced Sales Course", date: "2 days ago", icon: CheckCircle },
                    { title: "Earned Luxury Property Certification", date: "1 week ago", icon: Award },
                    { title: "Attended Market Outlook Seminar", date: "2 weeks ago", icon: Calendar },
                    { title: "Reached 50 Learning Hours", date: "3 weeks ago", icon: Clock },
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <achievement.icon className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
