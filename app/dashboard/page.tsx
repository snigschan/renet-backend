"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Users,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  User,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const user = {
    name: "Amira AL rashid", // Updated name from Ahmed Al-Rashid to Amira AL rashid
    role: "Senior Real Estate Agent",
    avatar: "/professional-headshot.png",
    rating: 4.9,
    reviews: 127,
    location: "Dubai Marina",
    phone: "+971 50 123 4567",
    email: "ahmed@example.com",
    verified: true,
    joinDate: "2023-01-15",
  }

  const stats = [
    { label: "Active Missions", value: "12", icon: Briefcase, color: "text-blue-600" },
    { label: "Completed Projects", value: "89", icon: TrendingUp, color: "text-green-600" },
    { label: "Client Rating", value: "4.9", icon: Star, color: "text-amber-600" },
    { label: "Network Connections", value: "234", icon: Users, color: "text-purple-600" },
  ]

  const recentMissions = [
    {
      id: 1,
      title: "Luxury Villa Sales Agent - Palm Jumeirah",
      company: "Emirates Properties",
      location: "Palm Jumeirah",
      type: "Full-time",
      salary: "AED 15,000 + Commission",
      posted: "2 days ago",
      status: "Applied",
    },
    {
      id: 2,
      title: "Commercial Property Consultant",
      company: "Dubai Real Estate Group",
      location: "DIFC",
      type: "Contract",
      salary: "AED 12,000 + Benefits",
      posted: "5 days ago",
      status: "Interview",
    },
    {
      id: 3,
      title: "Senior Leasing Specialist",
      company: "Emaar Properties",
      location: "Downtown Dubai",
      type: "Full-time",
      salary: "AED 18,000 + Commission",
      posted: "1 week ago",
      status: "Shortlisted",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-foreground">RealEstate Pro</div>
                  <div className="text-xs text-muted-foreground">UAE Network</div>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Profile */}
          <div className="lg:col-span-1">
            <Card className="border-border/50">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  {user.verified && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <CardDescription>{user.role}</CardDescription>

                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{user.rating}</span>
                  <span className="text-muted-foreground">({user.reviews} reviews)</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Missions */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Mission Applications</CardTitle>
                    <CardDescription>Track your latest applications and their status</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMissions.map((mission) => (
                    <div
                      key={mission.id}
                      className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{mission.title}</h3>
                          <p className="text-sm text-muted-foreground">{mission.company}</p>
                        </div>
                        <Badge
                          variant={mission.status === "Interview" ? "default" : "secondary"}
                          className={
                            mission.status === "Interview"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : mission.status === "Shortlisted"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : ""
                          }
                        >
                          {mission.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {mission.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {mission.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {mission.posted}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-amber-600">{mission.salary}</span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link href="/missions">
                    <Button variant="outline">View All Missions</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
