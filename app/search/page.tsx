"use client"

import { useState, useEffect } from "react"
import {
  Search,
  MapPin,
  DollarSign,
  Users,
  Building2,
  Briefcase,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("jobs")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [aiInsights, setAiInsights] = useState(null)
  const [matchedResults, setMatchedResults] = useState([])
  const [filters, setFilters] = useState({
    location: "",
    specialty: "",
    experience: [0, 15],
    salary: [0, 200000],
    availability: "",
    rating: [0, 5],
  })

  // Mock user profile for AI matching
  const userProfile = {
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    location: "New York, NY",
    experience: "8 years",
    skills: ["Luxury Properties", "Commercial Real Estate", "Investment Properties"],
    preferences: {
      salaryRange: [80000, 150000],
      locations: ["Manhattan", "Brooklyn", "Queens"],
      jobTypes: ["Full-time", "Contract"],
    },
  }

  // AI-powered job matching
  const performAIJobMatch = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/match-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userProfile,
          preferences: userProfile.preferences,
          location: userProfile.location,
        }),
      })
      const data = await response.json()
      setMatchedResults(data.matches || [])
      setAiInsights(data.searchInsights)
    } catch (error) {
      console.error("AI matching failed:", error)
      // Fallback to mock data
      setMatchedResults(mockJobs)
    }
    setIsLoading(false)
  }

  // AI-powered candidate matching for agencies
  const performAICandidateMatch = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/match-candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRequirements: {
            title: searchQuery || "Real Estate Professional",
            skills: ["Real Estate", "Sales", "Client Relations"],
            experience: "5+ years",
          },
          companyProfile: {
            name: "Premium Realty Group",
            type: "Real Estate Agency",
            size: "50-200 employees",
          },
          location: "New York, NY",
          salaryRange: filters.salary,
        }),
      })
      const data = await response.json()
      setMatchedResults(data.matches || [])
      setAiInsights(data.hiringInsights)
    } catch (error) {
      console.error("AI matching failed:", error)
      // Fallback to mock data
      setMatchedResults(mockProfessionals)
    }
    setIsLoading(false)
  }

  // Get AI search insights
  const getSearchInsights = async () => {
    try {
      const response = await fetch("/api/ai/search-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userProfile,
          searchQuery,
          location: userProfile.location,
        }),
      })
      const data = await response.json()
      setAiInsights(data)
    } catch (error) {
      console.error("Failed to get AI insights:", error)
    }
  }

  useEffect(() => {
    if (activeTab === "jobs") {
      performAIJobMatch()
    } else {
      performAICandidateMatch()
    }
    getSearchInsights()
  }, [activeTab])

  const handleSearch = () => {
    if (activeTab === "jobs") {
      performAIJobMatch()
    } else {
      performAICandidateMatch()
    }
  }

  // Mock data fallbacks
  const mockJobs = [
    {
      jobId: "1",
      jobTitle: "Senior Property Consultant",
      company: "Premium Realty Group",
      location: "Manhattan, NY",
      salary: "$80K - $120K",
      matchScore: 95,
      matchReasons: ["Perfect skill match", "Ideal location", "Salary aligned"],
      requirements: ["8+ years experience", "Luxury property expertise", "Strong client relations"],
      benefits: ["Health insurance", "Commission structure", "Professional development"],
    },
    {
      jobId: "2",
      jobTitle: "Commercial Real Estate Broker",
      company: "Global Properties Inc",
      location: "Brooklyn, NY",
      salary: "$90K - $150K",
      matchScore: 88,
      matchReasons: ["Commercial experience match", "Location preference", "Growth opportunity"],
      requirements: ["Commercial real estate license", "5+ years experience", "Network of contacts"],
      benefits: ["Base + commission", "Flexible schedule", "Team support"],
    },
  ]

  const mockProfessionals = [
    {
      candidateId: "1",
      name: "Michael Chen",
      title: "Commercial Real Estate Specialist",
      location: "New York, NY",
      experience: "6 years",
      matchScore: 92,
      matchReasons: ["Strong commercial background", "Local market expertise", "Excellent track record"],
      skills: ["Commercial Leasing", "Investment Analysis", "Client Relations"],
      strengths: ["Negotiation skills", "Market knowledge", "Professional network"],
      interviewQuestions: ["Tell us about your largest commercial deal", "How do you approach market analysis?"],
    },
    {
      candidateId: "2",
      name: "Emily Rodriguez",
      title: "Luxury Property Consultant",
      location: "Manhattan, NY",
      experience: "4 years",
      matchScore: 87,
      matchReasons: ["Luxury market focus", "Manhattan expertise", "Strong sales record"],
      skills: ["Luxury Sales", "High-net-worth clients", "Property Marketing"],
      strengths: ["Client relationship management", "Marketing expertise", "Attention to detail"],
      interviewQuestions: ["How do you approach luxury client relationships?", "Describe your marketing strategy"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">RENet Search</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Matching</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {activeTab === "jobs" ? "Find Your Perfect Real Estate Job" : "Discover Top Real Estate Talent"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {activeTab === "jobs"
              ? "AI-powered job matching based on your profile and preferences"
              : "Intelligent candidate matching for your hiring needs"}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12 px-6">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </Button>
              <Button onClick={handleSearch} className="h-12 px-8 bg-primary hover:bg-primary/90" disabled={isLoading}>
                <Sparkles className="h-5 w-5 mr-2" />
                {isLoading ? "AI Matching..." : "AI Search"}
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => setFilters({ ...filters, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manhattan">Manhattan, NY</SelectItem>
                      <SelectItem value="brooklyn">Brooklyn, NY</SelectItem>
                      <SelectItem value="queens">Queens, NY</SelectItem>
                      <SelectItem value="bronx">Bronx, NY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {activeTab === "jobs" ? "Job Type" : "Specialty"}
                  </label>
                  <Select
                    value={filters.specialty}
                    onValueChange={(value) => setFilters({ ...filters, specialty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeTab === "jobs" ? (
                        <>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="residential">Residential Sales</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="luxury">Luxury Properties</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {activeTab === "jobs" ? "Salary Range ($)" : "Experience (Years)"}
                  </label>
                  <div className="px-2 py-4">
                    <Slider
                      value={
                        activeTab === "jobs" ? [filters.salary[0] / 1000, filters.salary[1] / 1000] : filters.experience
                      }
                      onValueChange={(value) => {
                        if (activeTab === "jobs") {
                          setFilters({ ...filters, salary: [value[0] * 1000, value[1] * 1000] })
                        } else {
                          setFilters({ ...filters, experience: value })
                        }
                      }}
                      max={activeTab === "jobs" ? 200 : 15}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>
                        {activeTab === "jobs" ? `$${filters.salary[0] / 1000}k` : `${filters.experience[0]} yrs`}
                      </span>
                      <span>
                        {activeTab === "jobs" ? `$${filters.salary[1] / 1000}k` : `${filters.experience[1]} yrs`}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Match Score</label>
                  <div className="px-2 py-4">
                    <Slider
                      value={[filters.rating[0] * 20, filters.rating[1] * 20]}
                      onValueChange={(value) => setFilters({ ...filters, rating: [value[0] / 20, value[1] / 20] })}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{filters.rating[0] * 20}%</span>
                      <span>{filters.rating[1] * 20}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Job Search
            </TabsTrigger>
            <TabsTrigger value="candidates" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Find Talent
            </TabsTrigger>
          </TabsList>

          {/* AI Insights Panel */}
          {aiInsights && (
            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  AI Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeTab === "jobs" && aiInsights.topSkills && (
                    <div>
                      <h4 className="font-medium mb-2">In-Demand Skills</h4>
                      <div className="space-y-1">
                        {aiInsights.topSkills.slice(0, 3).map((skill, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {aiInsights.salaryRange && (
                    <div>
                      <h4 className="font-medium mb-2">Salary Range</h4>
                      <div className="text-sm text-muted-foreground">
                        ${aiInsights.salaryRange.min?.toLocaleString()} - $
                        {aiInsights.salaryRange.max?.toLocaleString()}
                      </div>
                    </div>
                  )}
                  {aiInsights.recommendations && (
                    <div>
                      <h4 className="font-medium mb-2">AI Recommendations</h4>
                      <div className="text-sm text-muted-foreground">{aiInsights.recommendations[0]}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <TabsContent value="jobs">
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">AI is finding your perfect matches...</p>
                </div>
              ) : (
                matchedResults.map((job, index) => (
                  <Card key={job.jobId || index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground mb-2">{job.jobTitle}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{job.matchScore}%</div>
                            <div className="text-xs text-muted-foreground">AI Match</div>
                          </div>
                          <Progress value={job.matchScore} className="w-16 h-2" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Why This Matches</h4>
                          <div className="space-y-1">
                            {job.matchReasons?.map((reason, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <Target className="w-3 h-3 text-primary" />
                                {reason}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Key Requirements</h4>
                          <div className="flex flex-wrap gap-1">
                            {job.requirements?.slice(0, 3).map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Save Job
                          </Button>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="candidates">
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">AI is finding the best candidates...</p>
                </div>
              ) : (
                matchedResults.map((candidate, index) => (
                  <Card key={candidate.candidateId || index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src="/placeholder.svg" alt={candidate.name} />
                            <AvatarFallback>
                              {candidate.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "??"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{candidate.name}</h3>
                            <p className="text-muted-foreground">{candidate.title}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{candidate.location}</span>
                              </div>
                              <span>{candidate.experience} experience</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{candidate.matchScore}%</div>
                            <div className="text-xs text-muted-foreground">AI Match</div>
                          </div>
                          <Progress value={candidate.matchScore} className="w-16 h-2" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Match Reasons</h4>
                          <div className="space-y-1">
                            {candidate.matchReasons?.map((reason, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <Target className="w-3 h-3 text-primary" />
                                {reason}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Key Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills?.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            Save Candidate
                          </Button>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Contact Candidate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
