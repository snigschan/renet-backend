"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageCircle,
  Calendar,
  MapPin,
  Star,
  Building2,
  Phone,
  UserPlus,
  Search,
  Filter,
  Briefcase,
  TrendingUp,
  Globe,
} from "lucide-react"

export default function AgentNetworkPage() {
  const [activeTab, setActiveTab] = useState("connections")

  const connections = [
    {
      id: 1,
      name: "Sarah Al-Zahra",
      title: "Senior Property Consultant",
      company: "Emirates Real Estate",
      location: "Dubai Marina",
      specialization: "Luxury Residential",
      rating: 4.9,
      deals: 127,
      avatar: "/professional-arab-woman.png",
      status: "online",
      mutualConnections: 23,
      lastInteraction: "2 days ago",
    },
    {
      id: 2,
      name: "Michael Roberts",
      title: "Commercial Property Director",
      company: "Dubai Properties Group",
      location: "Business Bay",
      specialization: "Commercial & Office",
      rating: 4.8,
      deals: 89,
      avatar: "/professional-businessman.png",
      status: "offline",
      mutualConnections: 15,
      lastInteraction: "1 week ago",
    },
    {
      id: 3,
      name: "Fatima Hassan",
      title: "Investment Advisor",
      company: "Gulf Investment Properties",
      location: "Downtown Dubai",
      specialization: "Investment Properties",
      rating: 4.7,
      deals: 156,
      avatar: "/professional-arab-businesswoman.jpg",
      status: "online",
      mutualConnections: 31,
      lastInteraction: "Yesterday",
    },
  ]

  const events = [
    {
      id: 1,
      title: "Dubai Real Estate Networking Mixer",
      date: "March 20, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Burj Al Arab, Dubai",
      attendees: 150,
      type: "Networking",
      organizer: "Dubai Real Estate Association",
      image: "/dubai-real-estate-networking-event.jpg",
    },
    {
      id: 2,
      title: "PropTech Innovation Summit",
      date: "March 25, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Dubai World Trade Centre",
      attendees: 500,
      type: "Conference",
      organizer: "UAE PropTech Council",
      image: "/proptech-innovation-summit-dubai.jpg",
    },
  ]

  const groups = [
    {
      id: 1,
      name: "Dubai Marina Specialists",
      members: 234,
      description: "Connect with agents specializing in Dubai Marina properties",
      category: "Location-based",
      activity: "Very Active",
      image: "/dubai-marina-group.jpg",
    },
    {
      id: 2,
      name: "Luxury Property Network",
      members: 156,
      description: "High-end property professionals and luxury market experts",
      category: "Specialization",
      activity: "Active",
      image: "/luxury-property-network.jpg",
    },
    {
      id: 3,
      name: "New Agent Mentorship",
      members: 89,
      description: "Support and guidance for new real estate professionals",
      category: "Mentorship",
      activity: "Moderate",
      image: "/mentorship-group.jpg",
    },
  ]

  const getStatusColor = (status: string) => {
    return status === "online" ? "bg-green-500" : "bg-gray-400"
  }

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "Very Active":
        return "text-green-600"
      case "Active":
        return "text-amber-600"
      case "Moderate":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Professional Network</h1>
              <p className="text-muted-foreground">Connect, collaborate, and grow with industry professionals</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600">
                <UserPlus className="w-4 h-4 mr-2" />
                Find Connections
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Network Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Connections</p>
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
                  <p className="text-sm text-muted-foreground">Groups Joined</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Events Attended</p>
                  <p className="text-2xl font-bold text-amber-600">8</p>
                </div>
                <Calendar className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Network Score</p>
                  <p className="text-2xl font-bold text-purple-600">8.7</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
            </TabsList>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search network..." className="pl-10 w-64" />
            </div>
          </div>

          <TabsContent value="connections" className="space-y-4">
            {connections.map((connection) => (
              <Card key={connection.id} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={connection.avatar || "/placeholder.svg"}
                          alt={connection.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(connection.status)}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{connection.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">{connection.rating}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-muted-foreground">{connection.title}</p>
                          <p className="text-sm text-muted-foreground">{connection.company}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {connection.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {connection.specialization}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <Badge variant="secondary">{connection.deals} deals closed</Badge>
                          <span className="text-muted-foreground">
                            {connection.mutualConnections} mutual connections
                          </span>
                          <span className="text-muted-foreground">Last interaction: {connection.lastInteraction}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">{group.description}</p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{group.members} members</span>
                          </div>
                          <Badge variant="outline">{group.category}</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${getActivityColor(group.activity)}`}>
                            {group.activity}
                          </span>
                          <Button size="sm" variant="outline">
                            Join Group
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="border-border/50 overflow-hidden">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{event.type}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {event.attendees} attending
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg">{event.title}</h3>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date} • {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Organized by {event.organizer}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600">
                        Register for Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discover">
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Discover New Connections</h3>
              <p className="text-muted-foreground mb-6">
                Find professionals based on location, specialization, or mutual connections
              </p>
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600">
                <Search className="w-4 h-4 mr-2" />
                Start Discovering
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
