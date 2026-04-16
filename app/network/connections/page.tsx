import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, UserMinus, Building, MapPin, Star, Users, Filter } from "lucide-react"

// Mock data for connections
const connections = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    company: "Prime Properties NYC",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualConnections: 12,
    connectedDate: "Connected 3 months ago",
    rating: 4.9,
    specializations: ["Luxury Residential", "Commercial Properties"],
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
    connectedDate: "Connected 1 month ago",
    rating: 4.8,
    specializations: ["Investment Properties", "Portfolio Management"],
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "Commercial Real Estate Broker",
    company: "Metro Commercial",
    location: "Miami, FL",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualConnections: 15,
    connectedDate: "Connected 2 weeks ago",
    rating: 4.9,
    specializations: ["Commercial Leasing", "Retail Properties"],
    lastActive: "3 hours ago",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Real Estate Developer",
    company: "Urban Development Co",
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualConnections: 6,
    connectedDate: "Connected 1 week ago",
    rating: 4.7,
    specializations: ["Development", "Construction Management"],
    lastActive: "5 hours ago",
  },
]

export default function ConnectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Connections</h1>
          <p className="text-muted-foreground">
            Manage your professional network of {connections.length} real estate professionals
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search connections by name, company, or location..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Connections Grid */}
        <div className="grid gap-6">
          {connections.map((connection) => (
            <Card key={connection.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {connection.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{connection.name}</h3>
                      <p className="text-muted-foreground">{connection.title}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Building className="h-3 w-3" />
                        {connection.company}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {connection.location}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{connection.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{connection.mutualConnections} mutual connections</span>
                        </div>
                      </div>

                      {/* Specializations */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {connection.specializations.map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>

                      {/* Connection Info */}
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span>{connection.connectedDate}</span>
                        <span>•</span>
                        <span>Active {connection.lastActive}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Connections</Button>
        </div>
      </div>
    </div>
  )
}
