"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Star,
  TrendingUp,
  Users,
  Building2,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
  Globe,
  MessageSquare,
  Phone,
  Mail,
  Heart,
  Share2,
  ArrowRight,
  Target,
  Zap,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export default function HireTalentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [viewMode, setViewMode] = useState<"browse" | "ai-match">("browse")

  // Mock featured candidates with ME focus
  const featuredCandidates = [
    {
      id: "1",
      name: "Ahmed Al Mansoori",
      role: "Senior Real Estate Agent",
      location: "Dubai Marina, UAE",
      experience: "8 years",
      skills: ["Luxury Sales", "Property Valuation", "Client Relations", "RERA Certified"],
      languages: ["Arabic", "English", "French"],
      availability: "Immediate",
      matchScore: 96,
      rating: 4.9,
      deals: 127,
      verified: true,
      avatar: "/professional-arab-man.png",
      bio: "Experienced luxury property specialist with proven track record in Dubai's premium market.",
      salary: "AED 18,000 + Commission",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Property Manager",
      location: "Abu Dhabi, UAE",
      experience: "6 years",
      skills: ["Property Management", "Tenant Relations", "Budget Management", "RERA License"],
      languages: ["English", "Arabic"],
      availability: "2 weeks notice",
      matchScore: 89,
      rating: 4.7,
      deals: 89,
      verified: true,
      avatar: "/professional-woman-diverse.png",
      bio: "Dedicated property manager specializing in residential and commercial portfolios.",
      salary: "AED 14,000 + Benefits",
    },
    {
      id: "3",
      name: "Khalid Al-Rashid",
      role: "Commercial Broker",
      location: "Riyadh, Saudi Arabia",
      experience: "10 years",
      skills: ["Commercial RE", "Investment Analysis", "Portfolio Management", "Strategic Planning"],
      languages: ["Arabic", "English"],
      availability: "Immediate",
      matchScore: 93,
      rating: 4.8,
      deals: 156,
      verified: true,
      avatar: "/professional-man.jpg",
      bio: "Senior commercial broker with expertise in high-value transactions across GCC.",
      salary: "SAR 22,000 + Commission",
    },
    {
      id: "4",
      name: "Fatima Al-Zahra",
      role: "Leasing Specialist",
      location: "Doha, Qatar",
      experience: "4 years",
      skills: ["Leasing", "Contract Management", "Customer Service", "CRM Systems"],
      languages: ["Arabic", "English", "French"],
      availability: "1 month notice",
      matchScore: 84,
      rating: 4.6,
      deals: 72,
      verified: false,
      avatar: "/professional-blonde-woman.png",
      bio: "Enthusiastic leasing specialist focused on residential properties in Doha.",
      salary: "QAR 12,000 + Benefits",
    },
    {
      id: "5",
      name: "Rajesh Kumar",
      role: "Real Estate Consultant",
      location: "Dubai, UAE",
      experience: "5 years",
      skills: ["Sales", "Market Analysis", "Negotiation", "Client Acquisition"],
      languages: ["English", "Hindi", "Arabic"],
      availability: "Immediate",
      matchScore: 78,
      rating: 4.5,
      deals: 94,
      verified: true,
      avatar: "/professional-indian-man.png",
      bio: "Results-driven consultant with strong track record in residential sales.",
      salary: "AED 12,000 + Commission",
    },
    {
      id: "6",
      name: "Elena Petrova",
      role: "Property Valuation Expert",
      location: "Dubai, UAE",
      experience: "7 years",
      skills: ["Property Valuation", "Market Research", "Financial Analysis", "Reporting"],
      languages: ["English", "Russian", "Arabic"],
      availability: "2 weeks notice",
      matchScore: 91,
      rating: 4.8,
      deals: 103,
      verified: true,
      avatar: "/professional-blonde-woman.png",
      bio: "Certified valuation expert specializing in luxury and commercial properties.",
      salary: "AED 16,000 + Benefits",
    },
  ]

  const platformStats = [
    { label: "Active Talents", value: "15,000+", icon: Users, color: "text-blue-600" },
    { label: "Successful Hires", value: "3,200+", icon: CheckCircle2, color: "text-green-600" },
    { label: "Avg. Match Score", value: "87%", icon: Target, color: "text-amber-600" },
    { label: "Time to Hire", value: "12 days", icon: Clock, color: "text-purple-600" },
  ]

  const benefits = [
    {
      icon: Sparkles,
      title: "AI-Powered Matching",
      description: "95% accuracy in candidate-job matching using advanced AI algorithms",
    },
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All candidates undergo thorough verification and background checks",
    },
    {
      icon: Zap,
      title: "Fast Hiring Process",
      description: "Average time-to-hire reduced by 60% with streamlined workflows",
    },
    {
      icon: Globe,
      title: "Middle East Focus",
      description: "Specialized talent pool across UAE, Saudi Arabia, Qatar, and 9 more countries",
    },
  ]

  const filteredCandidates = featuredCandidates.filter((candidate) => {
    const matchesSearch =
      searchQuery === "" ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesRole = selectedRole === "all" || candidate.role.toLowerCase().includes(selectedRole.toLowerCase())
    const matchesLocation =
      selectedLocation === "all" || candidate.location.toLowerCase().includes(selectedLocation.toLowerCase())
    const matchesExperience =
      selectedExperience === "all" ||
      (selectedExperience === "entry" && Number.parseInt(candidate.experience) <= 2) ||
      (selectedExperience === "mid" &&
        Number.parseInt(candidate.experience) >= 3 &&
        Number.parseInt(candidate.experience) <= 5) ||
      (selectedExperience === "senior" && Number.parseInt(candidate.experience) >= 6)

    return matchesSearch && matchesRole && matchesLocation && matchesExperience
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-teal-50 dark:from-gray-900 dark:via-background dark:to-gray-900 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-200">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Talent Matching
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Hire Top Real Estate Talent Across the Middle East
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Connect with 15,000+ verified real estate professionals in UAE, Saudi Arabia, Qatar, and beyond. Find your
              perfect match in days, not months.
            </p>

            {/* Search Bar */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by role, skills, or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="md:w-48 h-12">
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="dubai">Dubai, UAE</SelectItem>
                    <SelectItem value="abu dhabi">Abu Dhabi, UAE</SelectItem>
                    <SelectItem value="riyadh">Riyadh, Saudi Arabia</SelectItem>
                    <SelectItem value="doha">Doha, Qatar</SelectItem>
                    <SelectItem value="kuwait">Kuwait City</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-teal-600 hover:from-amber-600 hover:to-teal-700 h-12"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Talents
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {platformStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Hire Through RENet?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The Middle East's leading platform for real estate talent acquisition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border/50 hover:border-amber-500/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Talent Browser */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="browse" className="space-y-8">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="browse" onClick={() => setViewMode("browse")}>
                  <Users className="w-4 h-4 mr-2" />
                  Browse Talents
                </TabsTrigger>
                <TabsTrigger value="ai-match" onClick={() => setViewMode("ai-match")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Matching
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-48">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="agent">Real Estate Agent</SelectItem>
                    <SelectItem value="manager">Property Manager</SelectItem>
                    <SelectItem value="broker">Broker</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="leasing">Leasing Specialist</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger className="w-48">
                    <Award className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="entry">Entry (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (6+ years)</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            {/* Browse Talents Tab */}
            <TabsContent value="browse" className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredCandidates.length}</span> talents
                </p>
                <Select defaultValue="match">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Best Match</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="recent">Recently Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates.map((candidate) => (
                  <Card
                    key={candidate.id}
                    className="border-border/50 hover:border-amber-500/50 transition-all hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                          <AvatarFallback className="bg-gradient-to-br from-amber-500 to-teal-600 text-white text-lg">
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {candidate.matchScore}% Match
                          </Badge>
                          {candidate.verified && (
                            <Badge variant="outline" className="border-blue-500 text-blue-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>

                      <CardTitle className="text-lg">{candidate.name}</CardTitle>
                      <CardDescription>{candidate.role}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{candidate.bio}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {candidate.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          {candidate.experience} experience
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          {candidate.rating} • {candidate.deals} deals closed
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {candidate.availability}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{candidate.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="font-medium text-amber-600">{candidate.salary}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          View Profile
                        </Button>
                        <Button className="flex-1 bg-gradient-to-r from-amber-500 to-teal-600 hover:from-amber-600 hover:to-teal-700">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredCandidates.length === 0 && (
                <Card className="border-border/50">
                  <CardContent className="p-12 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No talents found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedRole("all")
                        setSelectedLocation("all")
                        setSelectedExperience("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* AI Matching Tab */}
            <TabsContent value="ai-match" className="space-y-6">
              <Card className="border-border/50 bg-gradient-to-br from-amber-50 to-teal-50 dark:from-gray-900 dark:to-background">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">AI-Powered Talent Matching</h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Let our advanced AI analyze your requirements and find the perfect candidates with 95% accuracy.
                    Simply describe your ideal hire, and we'll do the rest.
                  </p>

                  <div className="max-w-xl mx-auto space-y-4">
                    <Input
                      placeholder="Describe your ideal candidate (e.g., Senior agent with luxury experience in Dubai...)"
                      className="h-12"
                    />
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-500 to-teal-600 hover:from-amber-600 hover:to-teal-700"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Find My Perfect Match
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <Target className="w-8 h-8 text-amber-600 mb-3" />
                      <h4 className="font-semibold text-foreground mb-2">Precise Matching</h4>
                      <p className="text-sm text-muted-foreground">
                        AI analyzes 50+ data points to find candidates that perfectly match your needs
                      </p>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <Zap className="w-8 h-8 text-teal-600 mb-3" />
                      <h4 className="font-semibold text-foreground mb-2">Instant Results</h4>
                      <p className="text-sm text-muted-foreground">
                        Get matched with top candidates in seconds, not days or weeks
                      </p>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                      <h4 className="font-semibold text-foreground mb-2">Continuous Learning</h4>
                      <p className="text-sm text-muted-foreground">
                        Our AI improves with every hire, ensuring better matches over time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Dream Team?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 500+ agencies and developers who have successfully hired through RENet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register?type=agency">
              <Button size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-white/90">
                Create Agency Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/agency/missions/create">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Post Your First Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-foreground">RENet</div>
                <div className="text-xs text-muted-foreground">Middle East Real Estate Network</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
              <Link href="/faq" className="hover:text-foreground">
                FAQ
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
