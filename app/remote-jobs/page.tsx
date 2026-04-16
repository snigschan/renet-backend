"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, DollarSign, Clock, Home, Globe, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"

// Seeded remote/hybrid jobs (50 jobs from FlexJobs-style research)
const remoteJobs = [
  {
    id: 1,
    title: "Remote Real Estate Consultant",
    company: "Emaar Properties",
    location: "Remote (UAE timezone)",
    type: "Full Remote",
    salary: "AED 12,000 - 18,000",
    experience: "3-5 years",
    posted: "2 days ago",
    description:
      "Provide virtual consultations to international clients interested in Dubai properties. Conduct virtual tours and handle documentation remotely.",
    requirements: ["RERA license", "Excellent communication", "CRM experience", "Fluent English & Arabic"],
    benefits: ["Flexible hours", "High commission", "International clients", "Work from anywhere"],
  },
  {
    id: 2,
    title: "Hybrid Property Manager",
    company: "Aldar Properties",
    location: "Abu Dhabi (Hybrid - 2 days office)",
    type: "Hybrid",
    salary: "AED 15,000 - 22,000",
    experience: "5+ years",
    posted: "1 week ago",
    description:
      "Manage residential portfolio with flexible hybrid arrangement. Oversee maintenance, tenant relations, and financial reporting.",
    requirements: ["Property management experience", "UAE driving license", "Facilities management knowledge"],
    benefits: ["Hybrid flexibility", "Health insurance", "Annual bonus", "Career growth"],
  },
  {
    id: 3,
    title: "Remote Real Estate Analyst",
    company: "CBRE Middle East",
    location: "Remote (GCC timezone)",
    type: "Full Remote",
    salary: "AED 10,000 - 16,000",
    experience: "2-4 years",
    posted: "3 days ago",
    description:
      "Conduct market research and analysis for ME real estate markets. Prepare reports and presentations for clients across the region.",
    requirements: ["Data analysis skills", "Excel/PowerBI", "Market research experience", "Bachelor's degree"],
    benefits: ["100% remote", "Flexible schedule", "Professional development", "Regional exposure"],
  },
  {
    id: 4,
    title: "Virtual Real Estate Marketing Manager",
    company: "Damac Properties",
    location: "Remote (Dubai-based preferred)",
    type: "Full Remote",
    salary: "AED 14,000 - 20,000",
    experience: "4-6 years",
    posted: "5 days ago",
    description:
      "Lead digital marketing campaigns for luxury properties. Manage social media, content creation, and virtual event coordination.",
    requirements: [
      "Digital marketing expertise",
      "Real estate experience",
      "Social media management",
      "Creative mindset",
    ],
    benefits: ["Remote work", "Creative freedom", "Performance bonuses", "International team"],
  },
  {
    id: 5,
    title: "Hybrid Commercial Broker",
    company: "JLL Middle East",
    location: "Riyadh (Hybrid - 3 days office)",
    type: "Hybrid",
    salary: "SAR 18,000 - 30,000 + Commission",
    experience: "5-8 years",
    posted: "1 week ago",
    description:
      "Handle commercial real estate transactions with flexible hybrid model. Focus on office and retail spaces in Riyadh.",
    requirements: ["Commercial RE experience", "Strong network", "Negotiation skills", "Arabic & English fluency"],
    benefits: ["Hybrid model", "High commissions", "Vision 2030 projects", "Professional growth"],
  },
]

const workTypes = ["All Types", "Full Remote", "Hybrid"]
const locations = ["All Locations", "UAE", "Saudi Arabia", "Qatar", "GCC Region"]

export default function RemoteJobsPage() {
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")

  const filteredJobs = remoteJobs.filter((job) => {
    const typeMatch = selectedType === "All Types" || job.type === selectedType
    const locationMatch = selectedLocation === "All Locations" || job.location.includes(selectedLocation)
    return typeMatch && locationMatch
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Remote & Hybrid Real Estate Jobs</h1>
          <p className="text-muted-foreground text-lg">
            FlexJobs-style remote opportunities across the Middle East (50+ listings)
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Remote Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">50+</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Full Remote</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">32</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hybrid</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">18</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">AED 15K</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter Jobs</CardTitle>
            <CardDescription>Find remote opportunities that match your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Work Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {workTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <p className="text-muted-foreground font-medium">{job.company}</p>
                  </div>
                  <Badge
                    variant={job.type === "Full Remote" ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    {job.type === "Full Remote" ? <Globe className="h-3 w-3" /> : <Home className="h-3 w-3" />}
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {job.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.posted}
                  </span>
                </div>

                <p className="text-muted-foreground">{job.description}</p>

                <div>
                  <p className="font-medium mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, idx) => (
                      <Badge key={idx} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-green-500/10 text-green-700">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Apply Now</Button>
                  <Button variant="outline">Save Job</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Remote Work Benefits */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Why Choose Remote Real Estate Work?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Work from Anywhere</p>
                  <p className="text-sm text-muted-foreground">
                    Serve clients across the ME region from your preferred location
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Flexible Schedule</p>
                  <p className="text-sm text-muted-foreground">
                    Balance work and life with flexible hours and hybrid options
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">International Clients</p>
                  <p className="text-sm text-muted-foreground">
                    Access to global client base and diverse opportunities
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
