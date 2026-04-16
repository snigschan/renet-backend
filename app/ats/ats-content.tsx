"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreVertical,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Send,
  Archive,
  Trash2,
  Eye,
  MessageSquare,
  FileText,
  TrendingUp,
  MapPin,
  Briefcase,
  DollarSign,
} from "lucide-react"

// Mock data for ATS pipeline
const pipelineStages = [
  { id: "new", name: "New Applications", count: 24, color: "bg-blue-500" },
  { id: "screening", name: "Screening", count: 18, color: "bg-yellow-500" },
  { id: "interview", name: "Interview", count: 12, color: "bg-purple-500" },
  { id: "offer", name: "Offer", count: 5, color: "bg-green-500" },
  { id: "hired", name: "Hired", count: 3, color: "bg-emerald-500" },
  { id: "rejected", name: "Rejected", count: 15, color: "bg-red-500" },
]

const mockCandidates = [
  {
    id: 1,
    name: "Sarah Al-Mansouri",
    email: "sarah.almansouri@email.com",
    phone: "+971 50 123 4567",
    position: "Senior Property Consultant",
    location: "Dubai, UAE",
    experience: "8 years",
    salary: "AED 15,000/month",
    avatar: "/professional-arab-woman.png",
    stage: "new",
    appliedDate: "2024-01-15",
    matchScore: 95,
    visaStatus: "UAE Resident",
    languages: ["Arabic", "English"],
    certifications: ["RERA Certified", "Dubai Land Department"],
    compliance: { emiratization: true, nitaqat: "Green" },
  },
  {
    id: 2,
    name: "Mohammed Al-Rashid",
    email: "m.alrashid@email.com",
    phone: "+966 55 987 6543",
    position: "Commercial Real Estate Broker",
    location: "Riyadh, Saudi Arabia",
    experience: "6 years",
    salary: "SAR 18,000/month",
    avatar: "/professional-arab-man.png",
    stage: "screening",
    appliedDate: "2024-01-14",
    matchScore: 88,
    visaStatus: "Saudi National",
    languages: ["Arabic", "English"],
    certifications: ["SCFHS Licensed", "REGA Certified"],
    compliance: { emiratization: false, nitaqat: "Platinum" },
  },
  {
    id: 3,
    name: "Fatima Hassan",
    email: "fatima.hassan@email.com",
    phone: "+971 52 456 7890",
    position: "Property Manager",
    location: "Abu Dhabi, UAE",
    experience: "5 years",
    salary: "AED 12,000/month",
    avatar: "/professional-woman-diverse.png",
    stage: "interview",
    appliedDate: "2024-01-13",
    matchScore: 92,
    visaStatus: "UAE Resident",
    languages: ["Arabic", "English", "French"],
    certifications: ["RERA Certified", "CPM"],
    compliance: { emiratization: true, nitaqat: "Green" },
  },
]

export function ATSContent() {
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesStage = selectedStage === "all" || candidate.stage === selectedStage
    const matchesSearch =
      searchQuery === "" ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStage && matchesSearch
  })

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([])
    } else {
      setSelectedCandidates(filteredCandidates.map((c) => c.id))
    }
  }

  const handleSelectCandidate = (id: number) => {
    setSelectedCandidates((prev) => (prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Applicant Tracking System</h1>
          <p className="text-muted-foreground">
            Manage candidates through your hiring pipeline with GCC compliance tracking
          </p>
        </div>

        {/* Pipeline Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {pipelineStages.map((stage) => (
            <Card
              key={stage.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedStage === stage.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedStage(stage.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <Badge variant="secondary">{stage.count}</Badge>
                </div>
                <h3 className="font-medium text-sm">{stage.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {selectedCandidates.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{selectedCandidates.length} selected</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm">
                        Bulk Actions
                        <MoreVertical className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Send className="w-4 h-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Interview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Move to Next Stage
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Candidates List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Candidates</CardTitle>
                <CardDescription>
                  {filteredCandidates.length} candidate(s) in{" "}
                  {selectedStage === "all" ? "all stages" : pipelineStages.find((s) => s.id === selectedStage)?.name}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-muted-foreground">Select All</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedCandidates.includes(candidate.id)}
                      onCheckedChange={() => handleSelectCandidate(candidate.id)}
                    />
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{candidate.name}</h3>
                          <p className="text-muted-foreground">{candidate.position}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{candidate.matchScore}% match</Badge>
                          <Badge
                            className={pipelineStages.find((s) => s.id === candidate.stage)?.color + " text-white"}
                          >
                            {pipelineStages.find((s) => s.id === candidate.stage)?.name}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {candidate.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          {candidate.experience}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          {candidate.salary}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Applied {candidate.appliedDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {candidate.visaStatus}
                        </Badge>
                        {candidate.compliance.emiratization && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Emiratization Eligible
                          </Badge>
                        )}
                        {candidate.compliance.nitaqat && (
                          <Badge variant="outline" className="text-xs">
                            Nitaqat: {candidate.compliance.nitaqat}
                          </Badge>
                        )}
                        {candidate.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {candidate.certifications.map((cert) => (
                            <Badge key={cert} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download Resume
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="w-4 h-4 mr-2" />
                                Add Notes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Move to Next Stage
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
