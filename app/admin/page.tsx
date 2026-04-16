"use client"

import { useState } from "react"
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Search,
  Filter,
  Download,
  Eye,
  Ban,
  UserCheck,
  MessageSquare,
  Star,
  Calendar,
  Globe,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for admin analytics
const platformStats = {
  totalProfessionals: 1247,
  totalAgencies: 89,
  activeMissions: 156,
  completedMissions: 892,
  totalRevenue: 2450000,
  monthlyGrowth: 12.5,
  verificationsPending: 23,
  flaggedContent: 7,
}

const recentActivity = [
  {
    id: 1,
    type: "verification",
    user: "Ahmed Al-Rashid",
    action: "Profile verification completed",
    timestamp: "2 hours ago",
    status: "approved",
  },
  {
    id: 2,
    type: "mission",
    user: "Emaar Properties",
    action: "New mission posted: Luxury Villa Sales",
    timestamp: "4 hours ago",
    status: "active",
  },
  {
    id: 3,
    type: "payment",
    user: "Sarah Mitchell",
    action: "Payment processed: 15,000 AED",
    timestamp: "6 hours ago",
    status: "completed",
  },
  {
    id: 4,
    type: "flag",
    user: "System Alert",
    action: "Suspicious activity detected",
    timestamp: "8 hours ago",
    status: "pending",
  },
]

const pendingVerifications = [
  {
    id: 1,
    name: "Omar Hassan",
    type: "Professional",
    documents: ["RERA License", "Emirates ID", "Experience Certificate"],
    submittedDate: "2024-01-15",
    priority: "high",
  },
  {
    id: 2,
    name: "Dubai Properties Group",
    type: "Agency",
    documents: ["Trade License", "RERA Registration", "Company Profile"],
    submittedDate: "2024-01-14",
    priority: "medium",
  },
  {
    id: 3,
    name: "Fatima Al-Zahra",
    type: "Professional",
    documents: ["RERA License", "Portfolio", "References"],
    submittedDate: "2024-01-13",
    priority: "low",
  },
]

const topPerformers = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    type: "Professional",
    rating: 4.9,
    completedMissions: 127,
    revenue: 185000,
    growth: 15.2,
  },
  {
    id: 2,
    name: "Emaar Properties",
    type: "Agency",
    rating: 4.8,
    postedMissions: 45,
    revenue: 890000,
    growth: 22.1,
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    type: "Professional",
    rating: 4.8,
    completedMissions: 89,
    revenue: 142000,
    growth: 18.7,
  },
]

const userManagement = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    email: "ahmed@example.com",
    type: "Professional",
    status: "Active",
    joinDate: "2023-12-15",
    lastActive: "2 hours ago",
    rating: 4.9,
    completedJobs: 127,
    revenue: 185000,
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    id: 2,
    name: "Emaar Properties",
    email: "contact@emaar.ae",
    type: "Agency",
    status: "Active",
    joinDate: "2023-11-20",
    lastActive: "1 day ago",
    rating: 4.8,
    postedJobs: 45,
    revenue: 890000,
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    email: "sarah@example.com",
    type: "Professional",
    status: "Suspended",
    joinDate: "2023-10-05",
    lastActive: "1 week ago",
    rating: 4.2,
    completedJobs: 23,
    revenue: 45000,
    avatar: "/placeholder.svg?height=40&width=40",
    verified: false,
  },
]

const missionManagement = [
  {
    id: 1,
    title: "Luxury Villa Sales - Palm Jumeirah",
    agency: "Emaar Properties",
    professional: "Ahmed Al-Rashid",
    status: "Active",
    budget: 25000,
    progress: 65,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    category: "Sales",
    priority: "High",
  },
  {
    id: 2,
    title: "Commercial Property Management",
    agency: "DAMAC Properties",
    professional: "Sarah Mitchell",
    status: "Completed",
    budget: 18000,
    progress: 100,
    startDate: "2023-12-01",
    endDate: "2024-02-29",
    category: "Management",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Investment Portfolio Analysis",
    agency: "Dubai Properties",
    professional: "Omar Hassan",
    status: "Disputed",
    budget: 35000,
    progress: 80,
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    category: "Analysis",
    priority: "High",
  },
]

const analyticsData = {
  userGrowth: [
    { month: "Jan", professionals: 120, agencies: 8 },
    { month: "Feb", professionals: 145, agencies: 12 },
    { month: "Mar", professionals: 180, agencies: 15 },
    { month: "Apr", professionals: 220, agencies: 18 },
    { month: "May", professionals: 280, agencies: 25 },
    { month: "Jun", professionals: 340, agencies: 32 },
  ],
  revenueGrowth: [
    { month: "Jan", revenue: 180000 },
    { month: "Feb", revenue: 220000 },
    { month: "Mar", revenue: 280000 },
    { month: "Apr", revenue: 350000 },
    { month: "May", revenue: 420000 },
    { month: "Jun", revenue: 480000 },
  ],
  geographicDistribution: [
    { region: "Dubai", users: 456, percentage: 45 },
    { region: "Abu Dhabi", users: 234, percentage: 23 },
    { region: "Sharjah", users: 156, percentage: 15 },
    { region: "Ajman", users: 89, percentage: 9 },
    { region: "Other Emirates", users: 78, percentage: 8 },
  ],
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform management and analytics overview</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Professionals</p>
                  <p className="text-3xl font-bold text-foreground">
                    {platformStats.totalProfessionals.toLocaleString()}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{platformStats.monthlyGrowth}% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Agencies</p>
                  <p className="text-3xl font-bold text-foreground">{platformStats.totalAgencies}</p>
                </div>
                <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8.2% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Missions</p>
                  <p className="text-3xl font-bold text-foreground">{platformStats.activeMissions}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Activity className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">{platformStats.completedMissions} completed</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">
                    {(platformStats.totalRevenue / 1000000).toFixed(1)}M AED
                  </p>
                </div>
                <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+18.5% this quarter</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100">Pending Verifications</h3>
                  <p className="text-amber-700 dark:text-amber-300">
                    {platformStats.verificationsPending} profiles awaiting review
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto border-amber-300 text-amber-700 bg-transparent">
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-100">Flagged Content</h3>
                  <p className="text-red-700 dark:text-red-300">
                    {platformStats.flaggedContent} items require attention
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto border-red-300 text-red-700 bg-transparent">
                  Investigate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          {activity.type === "verification" && <Shield className="h-4 w-4 text-blue-600" />}
                          {activity.type === "mission" && <Briefcase className="h-4 w-4 text-green-600" />}
                          {activity.type === "payment" && <DollarSign className="h-4 w-4 text-emerald-600" />}
                          {activity.type === "flag" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                        </div>
                        <Badge
                          variant={
                            activity.status === "approved" || activity.status === "completed"
                              ? "default"
                              : activity.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((performer, index) => (
                      <div key={performer.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{performer.name}</p>
                            <p className="text-sm text-muted-foreground">{performer.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {(performer.revenue / 1000).toFixed(0)}k AED
                          </p>
                          <p className="text-xs text-green-600">+{performer.growth}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="verifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Pending Verifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerifications.map((verification) => (
                    <div key={verification.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{verification.name}</h3>
                          <p className="text-sm text-muted-foreground">{verification.type}</p>
                          <p className="text-xs text-muted-foreground">Submitted: {verification.submittedDate}</p>
                        </div>
                        <Badge
                          variant={
                            verification.priority === "high"
                              ? "destructive"
                              : verification.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {verification.priority} priority
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Documents Submitted:</p>
                        <div className="flex flex-wrap gap-2">
                          {verification.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Review Documents
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 bg-transparent">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Platform Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Professional Registrations</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Agency Partnerships</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Mission Completion Rate</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>User Satisfaction</span>
                        <span>91%</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.geographicDistribution.map((region) => (
                      <div key={region.region} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-full"></div>
                          <span className="text-sm">{region.region}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{region.users} users</span>
                          <div className="text-xs text-muted-foreground">{region.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Commission Fees</span>
                    </div>
                    <span className="text-sm font-medium">1.8M AED (73%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">Premium Subscriptions</span>
                    </div>
                    <span className="text-sm font-medium">450k AED (18%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Verification Fees</span>
                    </div>
                    <span className="text-sm font-medium">150k AED (6%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Other Services</span>
                    </div>
                    <span className="text-sm font-medium">50k AED (3%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name, email, or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* User List */}
                <div className="space-y-4">
                  {userManagement.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{user.name}</h3>
                              {user.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>{user.type}</span>
                              <span>•</span>
                              <span>Joined {user.joinDate}</span>
                              <span>•</span>
                              <span>Active {user.lastActive}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{user.rating}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {user.type === "Professional"
                                  ? `${user.completedJobs} jobs`
                                  : `${user.postedJobs} posted`}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {(user.revenue / 1000).toFixed(0)}k AED revenue
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              user.status === "Active"
                                ? "default"
                                : user.status === "Suspended"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {user.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          {user.status === "Active" ? (
                            <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                              <Ban className="h-4 w-4 mr-1" />
                              Suspend
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" className="text-green-600 bg-transparent">
                              <UserCheck className="h-4 w-4 mr-1" />
                              Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="missions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Mission Management
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {missionManagement.map((mission) => (
                    <div key={mission.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{mission.title}</h3>
                            <Badge
                              variant={
                                mission.priority === "High"
                                  ? "destructive"
                                  : mission.priority === "Medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {mission.priority}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Agency:</span> {mission.agency}
                            </div>
                            <div>
                              <span className="font-medium">Professional:</span> {mission.professional}
                            </div>
                            <div>
                              <span className="font-medium">Budget:</span> {mission.budget.toLocaleString()} AED
                            </div>
                            <div>
                              <span className="font-medium">Category:</span> {mission.category}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {mission.startDate} - {mission.endDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              mission.status === "Active"
                                ? "default"
                                : mission.status === "Completed"
                                  ? "secondary"
                                  : mission.status === "Disputed"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {mission.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{mission.progress}%</span>
                        </div>
                        <Progress value={mission.progress} className="h-2" />
                      </div>

                      {mission.status === "Disputed" && (
                        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">Dispute Resolution Required</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 bg-transparent">
                              Review Dispute
                            </Button>
                            <Button size="sm" variant="outline">
                              Contact Parties
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
