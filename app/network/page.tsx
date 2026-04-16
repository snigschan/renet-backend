import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, MessageCircle, UserPlus, MapPin, Building, Star, Filter } from "lucide-react"

// Mock data for networking
const connections = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    company: "Prime Properties NYC",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualConnections: 12,
    isConnected: true,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Property Investment Manager",
    company: "Global Realty Group",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualConnections: 8,
    isConnected: true,
    lastActive: "1 day ago",
  },
]

const suggestions = [
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "Commercial Real Estate Broker",
    company: "Metro Commercial",
    location: "Miami, FL",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualConnections: 5,
    isConnected: false,
    matchScore: 92,
  },
  {
    id: 4,
    name: "David Kim",
    title: "Real Estate Developer",
    company: "Urban Development Co",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualConnections: 3,
    isConnected: false,
    matchScore: 87,
  },
]

const groups = [
  {
    id: 1,
    name: "NYC Real Estate Professionals",
    members: 2847,
    description: "Connect with real estate professionals in New York City",
    isJoined: true,
    activity: "15 new posts today",
  },
  {
    id: 2,
    name: "Commercial Property Investors",
    members: 1523,
    description: "Discussion group for commercial real estate investment",
    isJoined: false,
    activity: "8 new posts today",
  },
]

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Professional Network</h1>
          <p className="text-muted-foreground">
            Connect with real estate professionals worldwide and grow your network
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search professionals, companies, or locations..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="connections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="connections">My Network</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* My Network Tab */}
          <TabsContent value="connections" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Connections ({connections.length})</h2>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Connections
              </Button>
            </div>

            <div className="grid gap-4">
              {connections.map((connection) => (
                <Card key={connection.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {connection.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{connection.name}</h3>
                          <p className="text-sm text-muted-foreground">{connection.title}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {connection.company}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {connection.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {connection.mutualConnections} mutual connections • Active {connection.lastActive}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">People You May Know</h2>
              <Button variant="outline">See All</Button>
            </div>

            <div className="grid gap-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={suggestion.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {suggestion.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{suggestion.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              {suggestion.matchScore}% match
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{suggestion.title}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {suggestion.company}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {suggestion.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {suggestion.mutualConnections} mutual connections
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Professional Groups</h2>
              <Button variant="outline">Create Group</Button>
            </div>

            <div className="grid gap-4">
              {groups.map((group) => (
                <Card key={group.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{group.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{group.members.toLocaleString()} members</span>
                          <span>{group.activity}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {group.isJoined ? (
                          <Button variant="outline" size="sm">
                            Joined
                          </Button>
                        ) : (
                          <Button size="sm">Join Group</Button>
                        )}
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Messages</h2>
              <Button variant="outline">New Message</Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start networking and connect with professionals to begin conversations
                  </p>
                  <Button>Browse Network</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
