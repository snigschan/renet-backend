"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, BookOpen, TrendingUp, FileText, Video, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"

// Seeded career resources (20 PDFs/guides)
const resources = [
  {
    id: 1,
    title: "Complete Guide to RERA Licensing in UAE",
    category: "Licensing",
    type: "PDF Guide",
    pages: 45,
    downloads: 1250,
    description:
      "Comprehensive guide covering RERA licensing requirements, exam preparation, and renewal procedures for Dubai real estate professionals.",
    topics: ["RERA Requirements", "Exam Preparation", "Licensing Process", "Renewal Guidelines"],
  },
  {
    id: 2,
    title: "Middle East Real Estate Market Report 2025",
    category: "Market Insights",
    type: "Research Report",
    pages: 78,
    downloads: 2100,
    description:
      "In-depth analysis of ME real estate markets including Dubai, Riyadh, Doha with trends, forecasts, and investment opportunities.",
    topics: ["Market Trends", "Investment Analysis", "Vision 2030 Impact", "Price Forecasts"],
  },
  {
    id: 3,
    title: "Mastering Real Estate Negotiation",
    category: "Skills Development",
    type: "E-book",
    pages: 120,
    downloads: 1800,
    description:
      "Advanced negotiation techniques specifically for ME real estate market, including cultural considerations and case studies.",
    topics: ["Negotiation Strategies", "Cultural Awareness", "Deal Closing", "Case Studies"],
  },
  {
    id: 4,
    title: "Digital Marketing for Real Estate Agents",
    category: "Marketing",
    type: "PDF Guide",
    pages: 62,
    downloads: 1650,
    description:
      "Complete guide to digital marketing including social media, SEO, content marketing, and lead generation for ME market.",
    topics: ["Social Media Marketing", "SEO Strategies", "Lead Generation", "Content Creation"],
  },
  {
    id: 5,
    title: "Property Law Essentials - UAE & GCC",
    category: "Legal",
    type: "Legal Guide",
    pages: 95,
    downloads: 980,
    description: "Essential property laws and regulations across UAE and GCC countries for real estate professionals.",
    topics: ["Property Rights", "Contract Law", "Foreign Ownership", "Dispute Resolution"],
  },
]

const courses = [
  { id: 1, title: "RERA Exam Preparation Course", duration: "8 weeks", level: "Beginner", students: 450 },
  { id: 2, title: "Advanced Property Valuation", duration: "6 weeks", level: "Advanced", students: 280 },
  { id: 3, title: "Commercial Real Estate Fundamentals", duration: "10 weeks", level: "Intermediate", students: 320 },
]

export default function CareerResourcesPage() {
  const [selectedResource, setSelectedResource] = useState(resources[0])
  const [showCareerPath, setShowCareerPath] = useState(false)

  const handleDownload = (resourceTitle: string) => {
    alert(`Downloading: ${resourceTitle}`)
  }

  const handleCareerSimulator = () => {
    setShowCareerPath(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Career Resources</h1>
          <p className="text-muted-foreground text-lg">
            20+ downloadable guides, e-books, and AI career path simulator for ME real estate professionals
          </p>
        </div>

        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="guides">Guides & E-books</TabsTrigger>
            <TabsTrigger value="courses">Online Courses</TabsTrigger>
            <TabsTrigger value="career">Career Path Simulator</TabsTrigger>
          </TabsList>

          {/* Guides & E-books */}
          <TabsContent value="guides">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Resources List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Resources ({resources.length})</CardTitle>
                    <CardDescription>Free downloadable content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {resources.map((resource) => (
                      <Card
                        key={resource.id}
                        className={`cursor-pointer transition-all ${selectedResource.id === resource.id ? "border-primary border-2" : ""}`}
                        onClick={() => setSelectedResource(resource)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-2">
                            <FileText className="h-5 w-5 text-primary mt-0.5" />
                            <div className="flex-1">
                              <p className="font-medium text-sm line-clamp-2 mb-1">{resource.title}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{resource.pages} pages</span>
                                <span>•</span>
                                <span>{resource.downloads} downloads</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {resource.category}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Resource Detail */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {selectedResource.category}
                        </Badge>
                        <CardTitle className="text-2xl mb-2">{selectedResource.title}</CardTitle>
                        <CardDescription className="text-base">
                          {selectedResource.type} • {selectedResource.pages} pages
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Downloads</p>
                        <p className="text-2xl font-bold text-primary">{selectedResource.downloads}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{selectedResource.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Topics Covered</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {selectedResource.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">Professional Development</p>
                          <p className="text-sm text-muted-foreground">
                            This resource contributes to your continuing education requirements and professional
                            development goals.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" onClick={() => handleDownload(selectedResource.title)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download {selectedResource.type}
                    </Button>
                  </CardContent>
                </Card>

                {/* Preview */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-8 text-center">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Document preview available after download</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Online Courses */}
          <TabsContent value="courses">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {course.level}
                    </Badge>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>
                      {course.duration} • {course.students} students enrolled
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Video className="h-4 w-4" />
                        <span>Video lectures & assignments</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Award className="h-4 w-4" />
                        <span>Certificate upon completion</span>
                      </div>
                      <Button className="w-full">Enroll Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Learning Path Recommendations</CardTitle>
                <CardDescription>Suggested course progression based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium">RERA Exam Preparation Course</p>
                      <p className="text-sm text-muted-foreground">Start with licensing fundamentals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Commercial Real Estate Fundamentals</p>
                      <p className="text-sm text-muted-foreground">Build core knowledge</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-2">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Advanced Property Valuation</p>
                      <p className="text-sm text-muted-foreground">Specialize in valuation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Career Path Simulator */}
          <TabsContent value="career">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  AI Career Path Simulator
                </CardTitle>
                <CardDescription>
                  Discover personalized career progression paths in ME real estate based on your experience and goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showCareerPath ? (
                  <>
                    <div className="bg-muted/50 rounded-lg p-8 text-center">
                      <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Plan Your Real Estate Career</h3>
                      <p className="text-muted-foreground mb-6">
                        Our AI analyzes your profile, skills, and market trends to suggest optimal career paths with
                        salary projections and skill requirements.
                      </p>
                      <Button size="lg" onClick={handleCareerSimulator}>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Generate My Career Path
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <BookOpen className="h-8 w-8 text-primary mb-3" />
                        <p className="font-medium mb-1">Skill Gap Analysis</p>
                        <p className="text-sm text-muted-foreground">Identify skills needed for your target role</p>
                      </div>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <TrendingUp className="h-8 w-8 text-primary mb-3" />
                        <p className="font-medium mb-1">Salary Projections</p>
                        <p className="text-sm text-muted-foreground">See earning potential at each career stage</p>
                      </div>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <Award className="h-8 w-8 text-primary mb-3" />
                        <p className="font-medium mb-1">Certification Roadmap</p>
                        <p className="text-sm text-muted-foreground">Required certifications and training</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Your Personalized Career Path</h3>
                      <p className="text-muted-foreground mb-4">
                        Based on your profile as a Real Estate Agent with 3 years experience in Dubai
                      </p>
                    </div>

                    {/* Career Stages */}
                    <div className="space-y-4">
                      <Card className="border-l-4 border-l-green-500">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <Badge variant="secondary" className="mb-2">
                                Current Stage
                              </Badge>
                              <h4 className="font-semibold text-lg">Real Estate Agent</h4>
                              <p className="text-sm text-muted-foreground">Years 1-3</p>
                            </div>
                            <p className="text-xl font-bold text-primary">AED 12-18K</p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Build foundation, obtain RERA license, develop client base
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">RERA License</Badge>
                            <Badge variant="outline">Client Relations</Badge>
                            <Badge variant="outline">Market Knowledge</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex justify-center">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>

                      <Card className="border-l-4 border-l-primary">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <Badge variant="default" className="mb-2">
                                Next Stage (2-3 years)
                              </Badge>
                              <h4 className="font-semibold text-lg">Senior Agent / Team Leader</h4>
                              <p className="text-sm text-muted-foreground">Years 4-6</p>
                            </div>
                            <p className="text-xl font-bold text-primary">AED 20-30K</p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Lead small team, specialize in luxury or commercial, mentor juniors
                          </p>
                          <div className="space-y-2 mb-3">
                            <p className="text-sm font-medium">Skills to Develop:</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Leadership</Badge>
                              <Badge variant="outline">Advanced Negotiation</Badge>
                              <Badge variant="outline">Market Analysis</Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Recommended Resources:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Advanced Property Valuation Course</li>
                              <li>• Mastering Real Estate Negotiation Guide</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex justify-center">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>

                      <Card className="border-l-4 border-l-gold">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <Badge variant="secondary" className="bg-gold/10 text-gold mb-2">
                                Future Goal (5-7 years)
                              </Badge>
                              <h4 className="font-semibold text-lg">Broker / Agency Owner</h4>
                              <p className="text-sm text-muted-foreground">Years 7+</p>
                            </div>
                            <p className="text-xl font-bold text-primary">AED 40-80K+</p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Own agency, manage large team, strategic business development
                          </p>
                          <div className="space-y-2 mb-3">
                            <p className="text-sm font-medium">Skills to Develop:</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Business Management</Badge>
                              <Badge variant="outline">Strategic Planning</Badge>
                              <Badge variant="outline">Financial Management</Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Requirements:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Broker License</li>
                              <li>• 7+ years experience</li>
                              <li>• Business registration</li>
                              <li>• Capital investment</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Button variant="outline" onClick={() => setShowCareerPath(false)}>
                      Generate New Path
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
