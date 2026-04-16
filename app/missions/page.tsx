"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Briefcase,
  Star,
  Clock,
  ArrowRight,
  Heart,
  Share2,
} from "lucide-react"
import Link from "next/link"

export default function MissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")

  const missions = [
    {
      id: 1,
      title: "Senior Real Estate Agent - Luxury Properties",
      company: "Emirates Properties",
      companyLogo: "/agency-logo.png",
      location: "Palm Jumeirah",
      type: "Full-time",
      experience: "5-8 years",
      salary: "AED 15,000 + Commission",
      posted: "2 days ago",
      applications: 28,
      description:
        "Join our prestigious team specializing in luxury waterfront properties. Lead high-value transactions and work with international clientele.",
      benefits: ["Health Insurance", "Visa Sponsorship", "Commission Structure", "Car Allowance"],
      urgent: false,
      featured: true,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Commercial Property Consultant",
      company: "Dubai Real Estate Group",
      companyLogo: "/agency-2.png",
      location: "DIFC",
      type: "Contract",
      experience: "3-5 years",
      salary: "AED 12,000 + Benefits",
      posted: "5 days ago",
      applications: 45,
      description:
        "Opportunity to work with leading commercial real estate projects in Dubai's financial district. Focus on office spaces and retail developments.",
      benefits: ["Performance Bonus", "Training Programs", "Career Development"],
      urgent: true,
      featured: false,
      rating: 4.6,
    },
    {
      id: 3,
      title: "Property Manager - Residential Communities",
      company: "Emaar Properties",
      companyLogo: "/agency-3.png",
      location: "Downtown Dubai",
      type: "Full-time",
      experience: "3-5 years",
      salary: "AED 10,000 + Benefits",
      posted: "1 week ago",
      applications: 67,
      description:
        "Manage premium residential communities in Downtown Dubai. Oversee tenant relations, maintenance coordination, and community development.",
      benefits: ["Health Insurance", "Housing Allowance", "Performance Bonus"],
      urgent: false,
      featured: false,
      rating: 4.9,
    },
    {
      id: 4,
      title: "Real Estate Investment Advisor",
      company: "Capital Properties",
      companyLogo: "/agency-4.png",
      location: "Business Bay",
      type: "Full-time",
      experience: "5-8 years",
      salary: "AED 18,000 + Commission",
      posted: "3 days ago",
      applications: 23,
      description:
        "Guide high-net-worth individuals in real estate investment decisions. Analyze market trends and provide strategic investment advice.",
      benefits: ["Health Insurance", "Visa Sponsorship", "Commission Structure", "Training Programs"],
      urgent: false,
      featured: true,
      rating: 4.7,
    },
    {
      id: 5,
      title: "Leasing Specialist - Retail Properties",
      company: "Mall Management Co",
      companyLogo: "/agency-5.png",
      location: "Dubai Marina",
      type: "Full-time",
      experience: "2-4 years",
      salary: "AED 8,000 + Commission",
      posted: "4 days ago",
      applications: 34,
      description:
        "Specialize in retail leasing for premium shopping destinations. Work with international brands and local businesses.",
      benefits: ["Health Insurance", "Performance Bonus", "Career Development"],
      urgent: false,
      featured: false,
      rating: 4.5,
    },
  ]

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch =
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = locationFilter === "all" || mission.location === locationFilter
    const matchesType = typeFilter === "all" || mission.type === typeFilter
    const matchesExperience = experienceFilter === "all" || mission.experience === experienceFilter

    return matchesSearch && matchesLocation && matchesType && matchesExperience
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-foreground">RealEstate Pro</div>
                <div className="text-xs text-muted-foreground">Mission Board</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link href="/auth/login">
                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="border-border/50 mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search missions by title, company, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Palm Jumeirah">Palm Jumeirah</SelectItem>
                    <SelectItem value="DIFC">DIFC</SelectItem>
                    <SelectItem value="Downtown Dubai">Downtown Dubai</SelectItem>
                    <SelectItem value="Business Bay">Business Bay</SelectItem>
                    <SelectItem value="Dubai Marina">Dubai Marina</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Experience</SelectItem>
                    <SelectItem value="0-2 years">Entry Level</SelectItem>
                    <SelectItem value="3-5 years">Mid Level</SelectItem>
                    <SelectItem value="5-8 years">Senior Level</SelectItem>
                    <SelectItem value="8+ years">Expert Level</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="w-full bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Available Missions</h1>
            <p className="text-muted-foreground">{filteredMissions.length} opportunities found</p>
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="salary-high">Highest Salary</SelectItem>
              <SelectItem value="salary-low">Lowest Salary</SelectItem>
              <SelectItem value="applications">Most Applications</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mission Cards */}
        <div className="space-y-6">
          {filteredMissions.map((mission) => (
            <Card
              key={mission.id}
              className={`border-border/50 hover:shadow-lg transition-all duration-300 ${mission.featured ? "ring-2 ring-amber-500/20" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mission.companyLogo || "/placeholder.svg"} alt={mission.company} />
                      <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                        {mission.company
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-semibold text-foreground">{mission.title}</h2>
                        {mission.featured && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                            Featured
                          </Badge>
                        )}
                        {mission.urgent && (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Urgent</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-muted-foreground">{mission.company}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-muted-foreground">{mission.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{mission.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {mission.benefits.slice(0, 3).map((benefit) => (
                          <Badge key={benefit} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {mission.benefits.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{mission.benefits.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {mission.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {mission.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mission.posted}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {mission.salary}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{mission.applications} applications</span>
                    <Link href={`/missions/${mission.id}`}>
                      <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Missions
          </Button>
        </div>
      </div>
    </div>
  )
}
