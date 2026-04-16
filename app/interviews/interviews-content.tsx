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
import { Video, Calendar, Clock, Users, Play, MessageSquare, FileText, CheckCircle2, MapPin } from "lucide-react"

const mockInterviews = [
  {
    id: 1,
    candidate: {
      name: "Sarah Al-Mansouri",
      avatar: "/professional-arab-woman.png",
      position: "Senior Property Consultant",
      location: "Dubai, UAE",
    },
    type: "live",
    status: "scheduled",
    date: "2024-01-20",
    time: "14:00",
    timezone: "GST (GMT+4)",
    duration: "45 min",
    interviewer: "Ahmed Hassan",
    meetingLink: "https://meet.renet.com/abc123",
  },
  {
    id: 2,
    candidate: {
      name: "Mohammed Al-Rashid",
      avatar: "/professional-arab-man.png",
      position: "Commercial Broker",
      location: "Riyadh, Saudi Arabia",
    },
    type: "async",
    status: "completed",
    submittedDate: "2024-01-18",
    questionsAnswered: 5,
    totalQuestions: 5,
    averageResponseTime: "3 min",
  },
  {
    id: 3,
    candidate: {
      name: "Fatima Hassan",
      avatar: "/professional-woman-diverse.png",
      position: "Property Manager",
      location: "Abu Dhabi, UAE",
    },
    type: "live",
    status: "pending",
    proposedDates: ["2024-01-22 10:00", "2024-01-23 14:00", "2024-01-24 16:00"],
  },
]

const asyncQuestions = [
  {
    id: 1,
    question: "Tell us about your experience in the GCC real estate market",
    timeLimit: "5 min",
    required: true,
  },
  {
    id: 2,
    question: "How do you handle difficult clients or challenging negotiations?",
    timeLimit: "3 min",
    required: true,
  },
  {
    id: 3,
    question: "Describe a successful deal you closed and what made it successful",
    timeLimit: "4 min",
    required: true,
  },
  {
    id: 4,
    question: "What are your thoughts on sustainable real estate development in the Middle East?",
    timeLimit: "3 min",
    required: false,
  },
  {
    id: 5,
    question: "Why do you want to work with our company?",
    timeLimit: "2 min",
    required: true,
  },
]

export function InterviewsContent() {
  const [activeTab, setActiveTab] = useState("scheduled")
  const [selectedInterview, setSelectedInterview] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Video Interview Hub</h1>
          <p className="text-muted-foreground">Schedule live interviews or send async video questions to candidates</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="async">Async Interviews</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="create">Create Interview</TabsTrigger>
          </TabsList>

          {/* Scheduled Interviews */}
          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Scheduled Live Interviews
                </CardTitle>
                <CardDescription>Upcoming video interviews with candidates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockInterviews
                  .filter((i) => i.type === "live" && i.status === "scheduled")
                  .map((interview) => (
                    <div key={interview.id} className="p-6 border border-border rounded-lg hover:bg-muted/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={interview.candidate.avatar || "/placeholder.svg"}
                              alt={interview.candidate.name}
                            />
                            <AvatarFallback>
                              {interview.candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{interview.candidate.name}</h3>
                            <p className="text-muted-foreground">{interview.candidate.position}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {interview.candidate.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">Live Interview</Badge>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {interview.date}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {interview.time} {interview.timezone}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          Interviewer: {interview.interviewer}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Duration: {interview.duration}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Meeting Link: <span className="text-primary">{interview.meetingLink}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Reminder
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Reschedule
                          </Button>
                          <Button size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Join Interview
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Async Interviews */}
          <TabsContent value="async" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Async Video Interviews
                </CardTitle>
                <CardDescription>One-way video interviews with pre-recorded questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockInterviews
                  .filter((i) => i.type === "async")
                  .map((interview) => (
                    <div key={interview.id} className="p-6 border border-border rounded-lg hover:bg-muted/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={interview.candidate.avatar || "/placeholder.svg"}
                              alt={interview.candidate.name}
                            />
                            <AvatarFallback>
                              {interview.candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{interview.candidate.name}</h3>
                            <p className="text-muted-foreground">{interview.candidate.position}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {interview.candidate.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-purple-500 text-white">Async Interview</Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Submitted: {interview.submittedDate}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="w-4 h-4" />
                          {interview.questionsAnswered}/{interview.totalQuestions} questions answered
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Avg. response: {interview.averageResponseTime}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            All Questions Answered
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            View Transcript
                          </Button>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Watch Responses
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Async Question Template */}
            <Card>
              <CardHeader>
                <CardTitle>Async Interview Questions</CardTitle>
                <CardDescription>Standard questions sent to candidates for one-way video responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {asyncQuestions.map((q, index) => (
                    <div key={q.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-1">
                            Q{index + 1}
                          </Badge>
                          <div>
                            <p className="font-medium">{q.question}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Time limit: {q.timeLimit}
                              </span>
                              {q.required && (
                                <Badge variant="outline" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Completed Interviews */}
          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Completed Interviews
                </CardTitle>
                <CardDescription>Past interviews with candidate evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Completed Interviews Yet</h3>
                  <p className="text-muted-foreground">
                    Completed interviews will appear here with recordings and notes
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Interview */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Live Interview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Schedule Live Interview
                  </CardTitle>
                  <CardDescription>Set up a real-time video interview with a candidate</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="candidate">Select Candidate</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose candidate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Sarah Al-Mansouri - Senior Property Consultant</SelectItem>
                          <SelectItem value="2">Mohammed Al-Rashid - Commercial Broker</SelectItem>
                          <SelectItem value="3">Fatima Hassan - Property Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Interview Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gst">GST (GMT+4) - Dubai, Abu Dhabi</SelectItem>
                          <SelectItem value="ast">AST (GMT+3) - Riyadh, Kuwait</SelectItem>
                          <SelectItem value="gmt">GMT (GMT+0) - London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interviewer">Interviewer</Label>
                      <Input id="interviewer" placeholder="Enter interviewer name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Interview Notes (Optional)</Label>
                      <Textarea id="notes" placeholder="Add any notes or topics to cover..." rows={3} />
                    </div>

                    <Button type="submit" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Live Interview
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Async Interview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Send Async Interview
                  </CardTitle>
                  <CardDescription>Send pre-recorded questions for one-way video responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="async-candidate">Select Candidate</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose candidate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Sarah Al-Mansouri - Senior Property Consultant</SelectItem>
                          <SelectItem value="2">Mohammed Al-Rashid - Commercial Broker</SelectItem>
                          <SelectItem value="3">Fatima Hassan - Property Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="template">Question Template</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Real Estate (5 questions)</SelectItem>
                          <SelectItem value="senior">Senior Position (7 questions)</SelectItem>
                          <SelectItem value="commercial">Commercial Focus (6 questions)</SelectItem>
                          <SelectItem value="custom">Custom Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Response Deadline</Label>
                      <Input id="deadline" type="date" />
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <h4 className="font-medium text-sm">Template Preview: Standard Real Estate</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Experience in GCC real estate market (5 min)</li>
                        <li>• Handling difficult clients (3 min)</li>
                        <li>• Successful deal example (4 min)</li>
                        <li>• Sustainable development thoughts (3 min)</li>
                        <li>• Why join our company (2 min)</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Custom Message (Optional)</Label>
                      <Textarea id="message" placeholder="Add a personal message to the candidate..." rows={3} />
                    </div>

                    <Button type="submit" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Send Async Interview
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
