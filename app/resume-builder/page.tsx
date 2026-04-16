"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Sparkles, Eye, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"

// Seeded resume templates (10+ ME-specific)
const templates = [
  {
    id: 1,
    name: "Dubai Professional",
    style: "modern",
    language: "English",
    preview: "/professional-resume-template.png",
  },
  {
    id: 2,
    name: "Arabic/English Dual",
    style: "bilingual",
    language: "Arabic/English",
    preview: "/bilingual-arabic-english-resume.jpg",
  },
  { id: 3, name: "Saudi Executive", style: "executive", language: "Arabic", preview: "/executive-arabic-resume.jpg" },
  {
    id: 4,
    name: "Qatar Minimalist",
    style: "minimal",
    language: "English",
    preview: "/minimalist-resume-template.png",
  },
  {
    id: 5,
    name: "UAE Real Estate",
    style: "industry",
    language: "English",
    preview: "/real-estate-resume-template.jpg",
  },
]

export default function ResumeBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  })
  const [aiOptimizing, setAiOptimizing] = useState(false)
  const [atsScore, setAtsScore] = useState(0)

  const handleAiOptimize = () => {
    setAiOptimizing(true)
    // Simulate AI keyword optimization
    setTimeout(() => {
      setAtsScore(87)
      setFormData((prev) => ({
        ...prev,
        summary:
          prev.summary +
          " RERA-licensed real estate professional with proven track record in Dubai luxury property market. Expert in client relationship management and sales negotiation.",
        skills: prev.skills + ", RERA Certification, Dubai Property Law, CRM Systems, Market Analysis",
      }))
      setAiOptimizing(false)
    }, 2000)
  }

  const handleAutoFill = () => {
    // Auto-fill from profile simulation
    setFormData({
      fullName: "Ahmed Al-Mansouri",
      title: "Senior Real Estate Broker",
      email: "ahmed.almansouri@example.com",
      phone: "+971 50 123 4567",
      location: "Dubai, UAE",
      summary: "Results-driven real estate professional with 8+ years of experience in Dubai luxury property market.",
      experience:
        "Senior Broker at Emaar Properties (2020-Present)\n• Achieved 150% of annual sales targets\n• Managed portfolio of AED 50M+ properties\n• Led team of 5 junior agents",
      education: "Bachelor of Business Administration\nAmerican University of Dubai (2015)",
      skills: "Property Sales, Client Relations, Market Analysis, Negotiation",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Resume Builder</h1>
          <p className="text-muted-foreground text-lg">
            Create ATS-optimized resumes with 10+ Middle East-specific templates and AI keyword optimizer
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
                <CardDescription>Select a ME-specific design</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${selectedTemplate.id === template.id ? "border-primary border-2" : ""}`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={template.preview || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                      <h3 className="font-semibold mb-1">{template.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{template.style}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {template.language}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Resume Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Build Your Resume</CardTitle>
                    <CardDescription>Fill in your details or auto-fill from profile</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleAutoFill}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Auto-Fill
                    </Button>
                    <Button variant="outline" onClick={handleAiOptimize} disabled={aiOptimizing}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {aiOptimizing ? "Optimizing..." : "AI Optimize"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Ahmed Al-Mansouri"
                        />
                      </div>
                      <div>
                        <Label>Professional Title</Label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Senior Real Estate Broker"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="ahmed@example.com"
                        />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 123 4567"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Dubai, UAE"
                      />
                    </div>
                    <div>
                      <Label>Professional Summary</Label>
                      <Textarea
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Brief overview of your experience and expertise..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4 mt-4">
                    <div>
                      <Label>Work Experience</Label>
                      <Textarea
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="List your work experience with achievements..."
                        rows={10}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Tip: Use bullet points and quantify achievements (e.g., "Increased sales by 150%")
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4 mt-4">
                    <div>
                      <Label>Education & Certifications</Label>
                      <Textarea
                        value={formData.education}
                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                        placeholder="List your education and professional certifications..."
                        rows={8}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4 mt-4">
                    <div>
                      <Label>Skills & Competencies</Label>
                      <Textarea
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="List your key skills (comma-separated)..."
                        rows={6}
                      />
                      {atsScore > 0 && (
                        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">ATS Optimization Score</p>
                            <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                              {atsScore}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Your resume is optimized for Applicant Tracking Systems used by Indeed, LinkedIn, and ME job
                            boards.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 mt-6">
                  <Button className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Resume
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* ATS Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">ATS Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Include ME-specific keywords: RERA, DLD, Dubai Property Law, GCC market
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Quantify achievements with numbers and percentages
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Use standard section headings (Experience, Education, Skills)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Include both Arabic and English versions for ME markets
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
