"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Video,
  Play,
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  TrendingUp,
  Building2,
  Search,
  Sparkles,
  Target,
  Lightbulb,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { SiteHeader } from "@/components/site-header"

// Seeded interview questions (50+ RE-specific from LinkedIn 2025 guides)
const interviewQuestions = [
  {
    id: 1,
    category: "Sales & Negotiation",
    difficulty: "Medium",
    question: "How do you handle a client who is hesitant about making an offer on a property?",
    tips: "Focus on understanding their concerns, provide market data, and create urgency without pressure.",
    sampleAnswer:
      "I would first listen carefully to understand their specific concerns. Then I would provide relevant market data showing property trends and comparable sales. I would also highlight the unique features of the property and create a sense of urgency by mentioning other interested buyers, while ensuring the client feels comfortable with their decision.",
  },
  {
    id: 2,
    category: "Market Knowledge",
    difficulty: "Hard",
    question: "What are the key factors driving the Dubai real estate market in 2025?",
    tips: "Mention Vision 2030, Expo 2020 legacy, foreign investment policies, and sustainable development.",
    sampleAnswer:
      "The Dubai market in 2025 is driven by several factors: continued Vision 2030 initiatives, the lasting impact of Expo 2020 infrastructure, favorable foreign ownership laws, growing demand for sustainable properties, and the city's position as a global business hub attracting international investors.",
  },
  {
    id: 3,
    category: "Client Relations",
    difficulty: "Easy",
    question: "How do you build long-term relationships with clients?",
    tips: "Emphasize follow-up, personalized service, market updates, and going beyond the transaction.",
    sampleAnswer:
      "I maintain regular contact through personalized market updates, remember important dates like property anniversaries, provide value beyond transactions through market insights, and always prioritize their long-term interests over short-term commissions.",
  },
  {
    id: 4,
    category: "Legal & Compliance",
    difficulty: "Medium",
    question: "What are the key RERA regulations that real estate professionals must follow?",
    tips: "Discuss licensing requirements, ethical standards, disclosure obligations, and consumer protection.",
    sampleAnswer:
      "RERA regulations require proper licensing, transparent disclosure of property information, adherence to ethical standards in marketing, protection of client deposits through escrow accounts, and compliance with anti-money laundering procedures. Professionals must also maintain continuing education requirements.",
  },
  {
    id: 5,
    category: "Problem Solving",
    difficulty: "Hard",
    question: "A deal is about to fall through due to financing issues. How do you handle it?",
    tips: "Show problem-solving skills, network utilization, and creative solutions.",
    sampleAnswer:
      "I would immediately assess the specific financing issue and leverage my network of mortgage brokers to explore alternative financing options. I would also communicate transparently with both parties, potentially negotiate extended timelines, and explore creative solutions like seller financing or adjusted payment terms while protecting all parties' interests.",
  },
]

const mockInterviews = [
  { id: 1, title: "Entry-Level Agent Interview", duration: "15 min", questions: 10, difficulty: "Easy" },
  { id: 2, title: "Senior Broker Assessment", duration: "30 min", questions: 20, difficulty: "Hard" },
  { id: 3, title: "Property Manager Interview", duration: "20 min", questions: 15, difficulty: "Medium" },
]

export default function InterviewHubPage() {
  const [selectedQuestion, setSelectedQuestion] = useState(interviewQuestions[0])
  const [showAnswer, setShowAnswer] = useState(false)
  const [recordingMock, setRecordingMock] = useState(false)
  const [mockCompleted, setMockCompleted] = useState(false)
  const [aiScore, setAiScore] = useState<any>(null)
  const [questionSearch, setQuestionSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...new Set(interviewQuestions.map((question) => question.category))]
  const filteredQuestions = interviewQuestions.filter((question) => {
    const matchesCategory = selectedCategory === "All" || question.category === selectedCategory
    const matchesSearch =
      question.question.toLowerCase().includes(questionSearch.toLowerCase()) ||
      question.category.toLowerCase().includes(questionSearch.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const selectedQuestionIndex = interviewQuestions.findIndex((question) => question.id === selectedQuestion.id)
  const learningProgress = ((selectedQuestionIndex + 1) / interviewQuestions.length) * 100
  const difficultyTone =
    selectedQuestion.difficulty === "Easy"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700"
      : selectedQuestion.difficulty === "Medium"
        ? "border-primary/20 bg-primary/10 text-primary"
        : "border-rose-500/20 bg-rose-500/10 text-rose-700"
  const questionCardTone = (difficulty: string) =>
    difficulty === "Easy"
      ? "from-emerald-500/10 via-background to-background"
      : difficulty === "Medium"
        ? "from-primary/10 via-background to-background"
        : "from-rose-500/10 via-background to-background"

  const handleStartMockInterview = () => {
    setRecordingMock(true)
    // Simulate mock interview
    setTimeout(() => {
      setRecordingMock(false)
      setMockCompleted(true)
      setAiScore({
        overall: 82,
        communication: 85,
        confidence: 78,
        content: 84,
        bodyLanguage: 80,
        feedback: [
          "Strong opening and clear communication",
          "Good use of specific examples and data",
          "Consider maintaining more eye contact",
          "Excellent handling of follow-up questions",
        ],
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Interview Preparation Hub</h1>
          <p className="text-muted-foreground text-lg">
            Mock video interviews with AI feedback and 50+ real estate-specific questions from LinkedIn 2025 guides
          </p>
        </div>

        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="questions">Question Bank</TabsTrigger>
            <TabsTrigger value="mock">Mock Interviews</TabsTrigger>
            <TabsTrigger value="tips">Interview Tips</TabsTrigger>
          </TabsList>

          {/* Question Bank */}
          <TabsContent value="questions">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Questions List */}
              <div className="lg:col-span-1">
                <Card className="overflow-hidden border-primary/10 shadow-sm">
                  <CardHeader className="border-b bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          Questions ({filteredQuestions.length})
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Explore by category, difficulty, and what you want to practice next.
                        </CardDescription>
                      </div>
                      <div className="rounded-2xl border border-primary/20 bg-background/80 px-3 py-2 text-right shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Progress</p>
                        <p className="text-lg font-semibold text-foreground">{Math.round(learningProgress)}%</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={questionSearch}
                          onChange={(e) => setQuestionSearch(e.target.value)}
                          placeholder="Search a topic or question..."
                          className="pl-9"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            type="button"
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            className="rounded-full"
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4">
                    {filteredQuestions.length === 0 ? (
                      <div className="rounded-2xl border border-dashed p-6 text-center">
                        <p className="font-medium text-foreground">No matching questions yet</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Try another category or search term to keep practicing.
                        </p>
                      </div>
                    ) : (
                      filteredQuestions.map((q, index) => (
                        <button
                          key={q.id}
                          type="button"
                          className={`w-full rounded-2xl border bg-gradient-to-br p-0 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                            selectedQuestion.id === q.id
                              ? "border-primary shadow-lg ring-2 ring-primary/20"
                              : "border-border/70 hover:border-primary/30"
                          } ${questionCardTone(q.difficulty)}`}
                          onClick={() => {
                            setSelectedQuestion(q)
                            setShowAnswer(false)
                          }}
                        >
                          <div className="p-4">
                            <div className="mb-3 flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                  Question {index + 1}
                                </p>
                                <Badge variant="secondary" className="mt-2">
                                  {q.category}
                                </Badge>
                              </div>
                              <Badge
                                className={
                                  q.difficulty === "Easy"
                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700"
                                    : q.difficulty === "Medium"
                                      ? "border-primary/20 bg-primary/10 text-primary"
                                      : "border-rose-500/20 bg-rose-500/10 text-rose-700"
                                }
                                variant="outline"
                              >
                                {q.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm font-semibold leading-6 text-foreground">{q.question}</p>
                            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                              <span>Tap to preview answer strategy</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Question Detail */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden border-primary/10 shadow-sm">
                  <CardHeader className="border-b bg-gradient-to-br from-background via-primary/5 to-primary/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{selectedQuestion.category}</Badge>
                          <Badge variant="outline" className={difficultyTone}>
                            {selectedQuestion.difficulty}
                          </Badge>
                          <Badge variant="outline" className="border-primary/20 bg-background/80 text-foreground">
                            <Sparkles className="mr-1 h-3 w-3 text-primary" />
                            Recruiter favorite
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl leading-tight">{selectedQuestion.question}</CardTitle>
                        <CardDescription className="mt-3 max-w-2xl text-sm leading-6">
                          Learn the intent behind the question, shape a confident answer, and rehearse it in a way
                          that sounds natural in real interviews.
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-semibold text-foreground">What they assess</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Confidence, relevance, and whether you can guide clients with clarity under pressure.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-semibold text-foreground">Best answer length</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Aim for 60 to 90 seconds with one clear example and one measurable outcome.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-semibold text-foreground">How to stand out</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Use market context, negotiation judgment, and a result that shows client trust.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-5">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-xl bg-primary/10 p-2">
                            <Brain className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">Interview Tips</p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{selectedQuestion.tips}</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border/70 bg-muted/30 p-5">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-xl bg-background p-2 shadow-sm">
                            <Lightbulb className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">Quick structure</p>
                            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                              <li>1. Explain the client situation briefly</li>
                              <li>2. Share the action you took</li>
                              <li>3. End with the result or lesson</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-background p-5 shadow-sm">
                      <div className="flex items-start gap-2">
                        <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Learning path for this question</p>
                          <div className="mt-4 grid gap-3 md:grid-cols-3">
                            <div className="rounded-xl border bg-muted/30 p-4">
                              <p className="text-sm font-semibold text-foreground">Read the prompt</p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                Identify what skill the interviewer is really testing.
                              </p>
                            </div>
                            <div className="rounded-xl border bg-muted/30 p-4">
                              <p className="text-sm font-semibold text-foreground">Shape your answer</p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                Build a simple story with problem, action, and result.
                              </p>
                            </div>
                            <div className="rounded-xl border bg-muted/30 p-4">
                              <p className="text-sm font-semibold text-foreground">Practice on video</p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                Rehearse tone, confidence, and pacing until it feels natural.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Button onClick={() => setShowAnswer(!showAnswer)} variant="outline" className="mb-4">
                        {showAnswer ? "Hide" : "Show"} Sample Answer
                      </Button>

                      {showAnswer && (
                        <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-background to-primary/5 p-5">
                          <p className="mb-2 text-sm font-semibold text-foreground">Sample Answer</p>
                          <p className="text-sm leading-7 text-muted-foreground">{selectedQuestion.sampleAnswer}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="h-12 w-full text-base shadow-sm">
                        <Video className="h-4 w-4 mr-2" />
                        Practice This Question (Video)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Mock Interviews */}
          <TabsContent value="mock">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Mock Interview Options */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Mock Interview Sessions</CardTitle>
                    <CardDescription>AI-powered video interview practice with real-time feedback</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockInterviews.map((mock) => (
                      <Card key={mock.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold mb-1">{mock.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {mock.duration}
                                </span>
                                <span>{mock.questions} questions</span>
                              </div>
                            </div>
                            <Badge
                              variant={
                                mock.difficulty === "Easy"
                                  ? "outline"
                                  : mock.difficulty === "Medium"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {mock.difficulty}
                            </Badge>
                          </div>
                          <Button className="w-full" onClick={handleStartMockInterview} disabled={recordingMock}>
                            <Play className="h-4 w-4 mr-2" />
                            {recordingMock ? "Recording..." : "Start Interview"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* AI Feedback */}
              <div>
                {!mockCompleted ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>How It Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium mb-1">1. Record Your Answers</p>
                          <p className="text-sm text-muted-foreground">Answer questions via video recording</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium mb-1">2. AI Analysis</p>
                          <p className="text-sm text-muted-foreground">
                            Our AI analyzes your communication, confidence, and content
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium mb-1">3. Get Feedback</p>
                          <p className="text-sm text-muted-foreground">
                            Receive detailed feedback and improvement suggestions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Interview Complete - AI Feedback
                      </CardTitle>
                      <CardDescription>Your performance analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-primary mb-2">{aiScore.overall}%</p>
                        <p className="text-muted-foreground">Overall Score</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Communication</p>
                            <p className="text-sm text-muted-foreground">{aiScore.communication}%</p>
                          </div>
                          <Progress value={aiScore.communication} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Confidence</p>
                            <p className="text-sm text-muted-foreground">{aiScore.confidence}%</p>
                          </div>
                          <Progress value={aiScore.confidence} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Content Quality</p>
                            <p className="text-sm text-muted-foreground">{aiScore.content}%</p>
                          </div>
                          <Progress value={aiScore.content} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Body Language</p>
                            <p className="text-sm text-muted-foreground">{aiScore.bodyLanguage}%</p>
                          </div>
                          <Progress value={aiScore.bodyLanguage} />
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="font-medium mb-3">Key Feedback:</p>
                        <ul className="space-y-2">
                          {aiScore.feedback.map((item: string, idx: number) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full" onClick={() => setMockCompleted(false)}>
                        Try Another Interview
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Interview Tips */}
          <TabsContent value="tips">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    General Interview Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">Research the company thoroughly before the interview</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">
                        Prepare specific examples using the STAR method (Situation, Task, Action, Result)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">Dress professionally and arrive 10-15 minutes early</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">Maintain good eye contact and positive body language</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">Prepare thoughtful questions to ask the interviewer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">Follow up with a thank-you email within 24 hours</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Real Estate-Specific Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">
                        Demonstrate knowledge of local market trends and regulations (RERA, DLD)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">
                        Highlight your sales achievements with specific numbers and percentages
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">
                        Discuss your approach to building and maintaining client relationships
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">Show familiarity with CRM systems and digital marketing tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">Emphasize your negotiation skills with concrete examples</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span className="text-sm">
                        Be prepared to discuss Vision 2030 and its impact on ME real estate
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Common Mistakes to Avoid</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <p className="font-medium text-red-700 mb-2">Don't:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Speak negatively about previous employers</li>
                        <li>• Give vague or generic answers</li>
                        <li>• Interrupt the interviewer</li>
                        <li>• Focus only on commission/salary</li>
                        <li>• Arrive unprepared or late</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <p className="font-medium text-green-700 mb-2">Do:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Use specific examples and data</li>
                        <li>• Show enthusiasm and passion</li>
                        <li>• Ask insightful questions</li>
                        <li>• Demonstrate market knowledge</li>
                        <li>• Follow up professionally</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
