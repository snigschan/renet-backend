"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Building2, ArrowLeft, Save, Eye, MapPin, DollarSign, Calendar, Users, Briefcase, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateMissionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [missionData, setMissionData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    experience: "",
    salary: "",
    benefits: [] as string[],
    requirements: [] as string[],
    responsibilities: [] as string[],
    deadline: "",
    urgency: "normal",
    remote: false,
    visa: false,
  })
  const router = useRouter()

  const updateMissionData = (field: string, value: string | boolean | string[]) => {
    setMissionData((prev) => ({ ...prev, [field]: value }))
  }

  const addToArray = (field: string, value: string) => {
    if (value.trim()) {
      const currentArray = missionData[field as keyof typeof missionData] as string[]
      updateMissionData(field, [...currentArray, value.trim()])
    }
  }

  const removeFromArray = (field: string, index: number) => {
    const currentArray = missionData[field as keyof typeof missionData] as string[]
    updateMissionData(
      field,
      currentArray.filter((_, i) => i !== index),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate mission creation
    setTimeout(() => {
      setIsLoading(false)
      router.push("/agency/dashboard")
    }, 2000)
  }

  const benefitOptions = [
    "Health Insurance",
    "Visa Sponsorship",
    "Commission Structure",
    "Car Allowance",
    "Housing Allowance",
    "Performance Bonus",
    "Training Programs",
    "Career Development",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/agency/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Post New Mission</div>
                  <div className="text-xs text-muted-foreground">Create job opportunity</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                form="mission-form"
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Publishing..." : "Publish Mission"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form id="mission-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential details about the position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Real Estate Agent - Luxury Properties"
                  value={missionData.title}
                  onChange={(e) => updateMissionData("title", e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Select
                      value={missionData.location}
                      onValueChange={(value) => updateMissionData("location", value)}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                        <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                        <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                        <SelectItem value="difc">DIFC</SelectItem>
                        <SelectItem value="business-bay">Business Bay</SelectItem>
                        <SelectItem value="jlt">JLT</SelectItem>
                        <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="sharjah">Sharjah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Select value={missionData.type} onValueChange={(value) => updateMissionData("type", value)}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Select
                      value={missionData.experience}
                      onValueChange={(value) => updateMissionData("experience", value)}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                        <SelectItem value="expert">Expert Level (8+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="salary"
                      placeholder="e.g., AED 15,000 + Commission"
                      value={missionData.salary}
                      onChange={(e) => updateMissionData("salary", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, company culture, and what makes this opportunity unique..."
                  value={missionData.description}
                  onChange={(e) => updateMissionData("description", e.target.value)}
                  rows={6}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Requirements & Responsibilities */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Requirements & Responsibilities</CardTitle>
              <CardDescription>Define what you're looking for and what the role involves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Requirements</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {missionData.requirements.map((req, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {req}
                      <button type="button" onClick={() => removeFromArray("requirements", index)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add requirement (e.g., RERA License)" id="new-requirement" />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("new-requirement") as HTMLInputElement
                      if (input?.value) {
                        addToArray("requirements", input.value)
                        input.value = ""
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Key Responsibilities</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {missionData.responsibilities.map((resp, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {resp}
                      <button type="button" onClick={() => removeFromArray("responsibilities", index)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add responsibility (e.g., Client relationship management)"
                    id="new-responsibility"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("new-responsibility") as HTMLInputElement
                      if (input?.value) {
                        addToArray("responsibilities", input.value)
                        input.value = ""
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits & Perks */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
              <CardDescription>Highlight what makes your offer attractive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {benefitOptions.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <Checkbox
                      id={benefit}
                      checked={missionData.benefits.includes(benefit)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateMissionData("benefits", [...missionData.benefits, benefit])
                        } else {
                          updateMissionData(
                            "benefits",
                            missionData.benefits.filter((b) => b !== benefit),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={benefit} className="text-sm cursor-pointer">
                      {benefit}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Additional Settings</CardTitle>
              <CardDescription>Configure posting preferences and deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="deadline"
                      type="date"
                      value={missionData.deadline}
                      onChange={(e) => updateMissionData("deadline", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={missionData.urgency} onValueChange={(value) => updateMissionData("urgency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Standard posting</SelectItem>
                      <SelectItem value="normal">Normal - Featured posting</SelectItem>
                      <SelectItem value="high">High - Priority posting</SelectItem>
                      <SelectItem value="urgent">Urgent - Top placement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={missionData.remote}
                    onCheckedChange={(checked) => updateMissionData("remote", checked as boolean)}
                  />
                  <Label htmlFor="remote" className="cursor-pointer">
                    Remote work options available
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="visa"
                    checked={missionData.visa}
                    onCheckedChange={(checked) => updateMissionData("visa", checked as boolean)}
                  />
                  <Label htmlFor="visa" className="cursor-pointer">
                    Visa sponsorship provided
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
