"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { FileText, Clock, CheckCircle2, XCircle, Award, TrendingUp, Plus, Play, Eye, BarChart3 } from "lucide-react"

const mockAssessments = [
  {
    id: 1,
    title: "GCC Real Estate Market Knowledge",
    description: "Test understanding of Middle East real estate markets, regulations, and trends",
    type: "knowledge",
    questions: 20,
    duration: "30 min",
    difficulty: "Intermediate",
    passScore: 70,
    category: "Real Estate",
  },
  {
    id: 2,
    title: "Property Valuation Skills",
    description: "Assess ability to evaluate property values and conduct market analysis",
    type: "skill",
    questions: 15,
    duration: "25 min",
    difficulty: "Advanced",
    passScore: 75,
    category: "Valuation",
  },
  {
    id: 3,
    title: "Customer Service & Negotiation",
    description: "Evaluate client handling and negotiation capabilities",
    type: "behavioral",
    questions: 12,
    duration: "20 min",
    difficulty: "Beginner",
    passScore: 65,
    category: "Soft Skills",
  },
  {
    id: 4,
    title: "PropTech & CRM Systems",
    description: "Test proficiency with real estate technology and CRM platforms",
    type: "technical",
    questions: 18,
    duration: "35 min",
    difficulty: "Intermediate",
    passScore: 70,
    category: "Technology",
  },
]

const mockResults = [
  {
    id: 1,
    candidate: {
      name: "Sarah Al-Mansouri",
      avatar: "/professional-arab-woman.png",
      position: "Senior Property Consultant",
    },
    assessment: "GCC Real Estate Market Knowledge",
    score: 85,
    passScore: 70,
    completedDate: "2024-01-18",
    duration: "28 min",
    questionsCorrect: 17,
    totalQuestions: 20,
    status: "passed",
  },
  {
    id: 2,
    candidate: {
      name: "Mohammed Al-Rashid",
      avatar: "/professional-arab-man.png",
      position: "Commercial Broker",
    },
    assessment: "Property Valuation Skills",
    score: 92,
    passScore: 75,
    completedDate: "2024-01-17",
    duration: "23 min",
    questionsCorrect: 14,
    totalQuestions: 15,
    status: "passed",
  },
  {
    id: 3,
    candidate: {
      name: "Fatima Hassan",
      avatar: "/professional-woman-diverse.png",
      position: "Property Manager",
    },
    assessment: "Customer Service & Negotiation",
    score: 58,
    passScore: 65,
    completedDate: "2024-01-16",
    duration: "22 min",
    questionsCorrect: 7,
    totalQuestions: 12,
    status: "failed",
  },
]

const sampleQuestions = [
  {
    id: 1,
    question: "What is the current Emiratization target for private sector companies in the UAE?",
    type: "multiple-choice",
    options: ["1%", "2%", "5%", "10%"],
    correctAnswer: "2%",
    points: 5,
  },
  {
    id: 2,
    question: "Which of the following are key factors in property valuation? (Select all that apply)",
    type: "multiple-select",
    options: ["Location", "Property size", "Market trends", "Owner's preference", "Condition of property"],
    correctAnswers: ["Location", "Property size", "Market trends", "Condition of property"],
    points: 10,
  },
  {
    id: 3,
    question: "Describe your approach to handling a difficult client who is unhappy with property options.",
    type: "text",
    points: 15,
  },
]

export function AssessmentsContent() {
  const [activeTab, setActiveTab] = useState("library")
  const [selectedAssessment, setSelectedAssessment] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Assessment & Testing Hub</h1>
          <p className="text-muted-foreground">
            Create custom assessments, skill tests, and evaluate candidate knowledge
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="library">Assessment Library</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="create">Create Assessment</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Assessment Library */}
          <TabsContent value="library" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Input placeholder="Search assessments..." className="w-80" />
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="valuation">Valuation</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Assessment
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockAssessments.map((assessment) => (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{assessment.title}</CardTitle>
                        <CardDescription>{assessment.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{assessment.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        {assessment.questions} questions
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {assessment.duration}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        {assessment.difficulty}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="w-4 h-4" />
                        Pass: {assessment.passScore}%
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Assign to Candidate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Assessment Results</CardTitle>
                    <CardDescription>View and analyze candidate assessment performance</CardDescription>
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Results</SelectItem>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockResults.map((result) => (
                  <div key={result.id} className="p-6 border border-border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src={result.candidate.avatar || "/placeholder.svg"}
                            alt={result.candidate.name}
                          />
                          <AvatarFallback>
                            {result.candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{result.candidate.name}</h3>
                          <p className="text-muted-foreground">{result.candidate.position}</p>
                          <p className="text-sm text-muted-foreground mt-1">Assessment: {result.assessment}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary mb-1">{result.score}%</div>
                        <Badge
                          variant={result.status === "passed" ? "secondary" : "outline"}
                          className={
                            result.status === "passed"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {result.status === "passed" ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {result.status === "passed" ? "Passed" : "Failed"}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4" />
                        {result.questionsCorrect}/{result.totalQuestions} correct
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Completed in {result.duration}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="w-4 h-4" />
                        Pass score: {result.passScore}%
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        {result.completedDate}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Performance</span>
                        <span className="font-medium">{result.score}%</span>
                      </div>
                      <Progress value={result.score} className="h-2" />
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Detailed Results
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Assessment */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Assessment</CardTitle>
                <CardDescription>Build a custom assessment with multiple question types</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="assessmentTitle">Assessment Title</Label>
                      <Input id="assessmentTitle" placeholder="e.g., GCC Real Estate Market Knowledge" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="real-estate">Real Estate Knowledge</SelectItem>
                          <SelectItem value="valuation">Property Valuation</SelectItem>
                          <SelectItem value="soft-skills">Soft Skills</SelectItem>
                          <SelectItem value="technology">Technology & Tools</SelectItem>
                          <SelectItem value="compliance">Compliance & Regulations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe what this assessment evaluates..." rows={3} />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Time Limit (minutes)</Label>
                      <Input id="duration" type="number" placeholder="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passScore">Pass Score (%)</Label>
                      <Input id="passScore" type="number" placeholder="70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Questions</h3>
                      <Button type="button" size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question
                      </Button>
                    </div>

                    {/* Sample Questions */}
                    <div className="space-y-4">
                      {sampleQuestions.map((q, index) => (
                        <Card key={q.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-3 flex-1">
                                <Badge variant="outline">Q{index + 1}</Badge>
                                <div className="flex-1">
                                  <p className="font-medium mb-2">{q.question}</p>
                                  <Badge variant="secondary" className="text-xs">
                                    {q.type}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{q.points} pts</span>
                                <Button size="sm" variant="ghost">
                                  Edit
                                </Button>
                              </div>
                            </div>

                            {q.type === "multiple-choice" && q.options && (
                              <RadioGroup className="ml-12 space-y-2">
                                {q.options.map((option, i) => (
                                  <div key={i} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`q${q.id}-${i}`} />
                                    <Label htmlFor={`q${q.id}-${i}`} className="font-normal">
                                      {option}
                                    </Label>
                                    {option === q.correctAnswer && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                                  </div>
                                ))}
                              </RadioGroup>
                            )}

                            {q.type === "multiple-select" && q.options && (
                              <div className="ml-12 space-y-2">
                                {q.options.map((option, i) => (
                                  <div key={i} className="flex items-center space-x-2">
                                    <Checkbox id={`q${q.id}-${i}`} />
                                    <Label htmlFor={`q${q.id}-${i}`} className="font-normal">
                                      {option}
                                    </Label>
                                    {q.correctAnswers?.includes(option) && (
                                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {q.type === "text" && (
                              <div className="ml-12">
                                <Textarea placeholder="Candidate will type their answer here..." rows={3} disabled />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      Create Assessment
                    </Button>
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                    <Button type="button" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-primary mb-1">24</p>
                  <p className="text-sm text-muted-foreground">Total Assessments</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-primary mb-1">156</p>
                  <p className="text-sm text-muted-foreground">Completed Tests</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-primary mb-1">78%</p>
                  <p className="text-sm text-muted-foreground">Average Pass Rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-primary mb-1">82%</p>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Assessment Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAssessments.map((assessment) => {
                    const avgScore = Math.floor(Math.random() * 30) + 65
                    const completions = Math.floor(Math.random() * 50) + 20
                    return (
                      <div key={assessment.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{assessment.title}</h4>
                            <p className="text-sm text-muted-foreground">{completions} completions</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">{avgScore}%</p>
                            <p className="text-xs text-muted-foreground">Avg. Score</p>
                          </div>
                        </div>
                        <Progress value={avgScore} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
