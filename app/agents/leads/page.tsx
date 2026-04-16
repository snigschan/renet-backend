"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Clock,
  DollarSign,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  Star,
  MapPin,
} from "lucide-react"

export default function AgentLeadsPage() {
  const [activeTab, setActiveTab] = useState("active")

  const leads = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+971 50 123 4567",
      status: "Hot",
      source: "Website",
      property: "2BR Apartment - Dubai Marina",
      budget: "AED 2.5M - 3M",
      lastContact: "2 hours ago",
      nextFollowUp: "Today 3:00 PM",
      score: 95,
      avatar: "/professional-woman-diverse.png",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@company.com",
      phone: "+971 55 987 6543",
      status: "Warm",
      source: "Referral",
      property: "Villa - Palm Jumeirah",
      budget: "AED 8M - 12M",
      lastContact: "1 day ago",
      nextFollowUp: "Tomorrow 10:00 AM",
      score: 78,
      avatar: "/professional-man.png",
    },
    {
      id: 3,
      name: "Emma Williams",
      email: "emma.w@gmail.com",
      phone: "+971 52 456 7890",
      status: "Cold",
      source: "Social Media",
      property: "1BR Apartment - Downtown",
      budget: "AED 1.2M - 1.8M",
      lastContact: "5 days ago",
      nextFollowUp: "Next week",
      score: 45,
      avatar: "/young-professional-woman.png",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot":
        return "bg-red-100 text-red-800"
      case "Warm":
        return "bg-amber-100 text-amber-800"
      case "Cold":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Lead Management</h1>
              <p className="text-muted-foreground">Track and nurture your potential clients</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">247</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hot Leads</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                </div>
                <Target className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-green-600">18.5%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Deal Value</p>
                  <p className="text-2xl font-bold text-amber-600">3.2M</p>
                </div>
                <DollarSign className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lead Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="active">Active Leads</TabsTrigger>
              <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
              <TabsTrigger value="converted">Converted</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search leads..." className="pl-10 w-64" />
            </div>
          </div>

          <TabsContent value="active" className="space-y-4">
            {leads.map((lead) => (
              <Card key={lead.id} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <img
                        src={lead.avatar || "/placeholder.svg"}
                        alt={lead.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{lead.name}</h3>
                          <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400" />
                            <span className={`font-semibold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="w-4 h-4" />
                              {lead.email}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4" />
                              {lead.phone}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {lead.property}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              <span className="font-semibold text-amber-600">{lead.budget}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              Last contact: {lead.lastContact}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              Follow-up: {lead.nextFollowUp}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pipeline">
            <div className="grid md:grid-cols-4 gap-6">
              {["New", "Contacted", "Qualified", "Proposal"].map((stage) => (
                <Card key={stage} className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stage}</CardTitle>
                    <div className="text-2xl font-bold">
                      {stage === "New" ? "12" : stage === "Contacted" ? "8" : stage === "Qualified" ? "5" : "3"}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[1, 2].map((item) => (
                      <div key={item} className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium text-sm">Lead Name</p>
                        <p className="text-xs text-muted-foreground">Property Type</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="converted">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Converted Leads</h3>
              <p className="text-muted-foreground">Track your successful conversions and closed deals</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { source: "Website", count: 45, percentage: 35 },
                      { source: "Referrals", count: 32, percentage: 25 },
                      { source: "Social Media", count: 28, percentage: 22 },
                      { source: "Walk-ins", count: 23, percentage: 18 },
                    ].map((item) => (
                      <div key={item.source} className="flex items-center justify-between">
                        <span className="text-sm">{item.source}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">18.5%</div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-600">AED 3.2M</div>
                      <p className="text-sm text-muted-foreground">Average Deal Size</p>
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
