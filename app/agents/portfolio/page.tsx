"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Building2,
  MapPin,
  TrendingUp,
  Award,
  Camera,
  Share2,
  Download,
  Search,
  Eye,
  Heart,
  Star,
  Shield,
} from "lucide-react"

export default function AgentPortfolioPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState("all")

  const properties = [
    {
      id: 1,
      title: "Luxury Penthouse - Downtown Dubai",
      type: "Sale",
      price: "AED 15,500,000",
      location: "Downtown Dubai",
      bedrooms: 4,
      bathrooms: 5,
      area: "4,200 sq ft",
      status: "Sold",
      image: "/dubai-penthouse-skyline.png",
      soldDate: "2024-01-15",
      commission: "AED 310,000",
      clientRating: 5,
      views: 2847,
      likes: 156,
    },
    {
      id: 2,
      title: "Modern Villa - Palm Jumeirah",
      type: "Sale",
      price: "AED 28,000,000",
      location: "Palm Jumeirah",
      bedrooms: 6,
      bathrooms: 7,
      area: "8,500 sq ft",
      status: "Active",
      image: "/modern-villa-palm-jumeirah-beach.jpg",
      listingDate: "2024-02-01",
      views: 1923,
      likes: 89,
    },
    {
      id: 3,
      title: "Executive Apartment - Business Bay",
      type: "Rent",
      price: "AED 180,000/year",
      location: "Business Bay",
      bedrooms: 2,
      bathrooms: 3,
      area: "1,800 sq ft",
      status: "Rented",
      image: "/executive-apartment-business-bay-dubai.jpg",
      rentedDate: "2024-01-20",
      commission: "AED 18,000",
      clientRating: 4.8,
      views: 1456,
      likes: 67,
    },
  ]

  const achievements = [
    { title: "Top Performer 2024", icon: Award, color: "text-amber-600" },
    { title: "Client Satisfaction 98%", icon: Star, color: "text-amber-600" },
    { title: "AED 85M+ Sales Volume", icon: TrendingUp, color: "text-green-600" },
    { title: "50+ Properties Sold", icon: Building2, color: "text-blue-600" },
  ]

  const filteredProperties = properties.filter(
    (property) => filterType === "all" || property.type.toLowerCase() === filterType,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">AH</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Ahmed Hassan</h1>
                <p className="text-muted-foreground">Senior Real Estate Consultant</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    RERA Verified
                  </Badge>
                  <Badge variant="outline">Dubai Marina Specialist</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Portfolio
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-amber-500 to-amber-600">
                <Camera className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Achievements */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-4 text-center">
                <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
                <p className="font-semibold text-sm">{achievement.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Portfolio Tabs */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="media">Media Kit</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search properties..." className="pl-10 w-64" />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="all">All Types</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>
            </div>

            {/* Properties Grid */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredProperties.map((property) => (
                <Card
                  key={property.id}
                  className="overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className={`absolute top-3 left-3 ${
                        property.status === "Sold"
                          ? "bg-green-600"
                          : property.status === "Rented"
                            ? "bg-blue-600"
                            : "bg-amber-600"
                      }`}
                    >
                      {property.status}
                    </Badge>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {property.views}
                      </div>
                      <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {property.likes}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{property.type}</Badge>
                      <span className="text-lg font-bold text-amber-600">{property.price}</span>
                    </div>

                    <h3 className="font-semibold text-foreground mb-2">{property.title}</h3>

                    <div className="flex items-center gap-1 text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.area}</span>
                    </div>

                    {property.status === "Sold" || property.status === "Rented" ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Commission:</span>
                          <span className="font-semibold text-green-600">{property.commission}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Client Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold">{property.clientRating}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Listed: {property.listingDate}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Sales Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600 mb-2">AED 85.2M</div>
                  <p className="text-sm text-muted-foreground">+12% from last quarter</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Properties Sold</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">47</div>
                  <p className="text-sm text-muted-foreground">This year</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Days on Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">23</div>
                  <p className="text-sm text-muted-foreground">15% faster than market average</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="space-y-6">
              {[1, 2, 3].map((testimonial) => (
                <Card key={testimonial}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">JD</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">John Doe</h4>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          "Ahmed provided exceptional service throughout our property purchase. His knowledge of the
                          Dubai market and attention to detail made the entire process smooth and stress-free."
                        </p>
                        <p className="text-sm text-muted-foreground">Villa Purchase - Palm Jumeirah</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="media">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Photos</CardTitle>
                  <CardDescription>High-resolution images for marketing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((photo) => (
                      <img
                        key={photo}
                        src={`/professional-headshot.png?key=qkxzf&height=100&width=150&query=professional headshot ${photo}`}
                        alt={`Professional photo ${photo}`}
                        className="w-full h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Marketing Materials</CardTitle>
                  <CardDescription>Brochures, flyers, and digital assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Agent Brochure (PDF)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Logo Package (ZIP)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Social Media Kit (ZIP)
                    </Button>
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
