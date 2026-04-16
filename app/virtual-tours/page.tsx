"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Eye,
  Share2,
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  Camera,
  Headphones,
  Smartphone,
  Monitor,
  Star,
  Clock,
} from "lucide-react"

export default function VirtualToursPage() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"3d" | "ar" | "vr">("3d")

  const tours = [
    {
      id: "1",
      title: "Luxury Penthouse - Burj Khalifa View",
      location: "Downtown Dubai",
      price: "AED 15,000,000",
      agent: "Sarah Al-Mansouri",
      rating: 4.9,
      views: 2847,
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 5,
      area: "4,200 sq ft",
      image: "/dubai-penthouse-skyline.png",
      tourTypes: ["3D", "AR", "VR"],
      duration: "12 min",
      highlights: ["Panoramic City Views", "Private Pool", "Smart Home System", "Premium Finishes"],
    },
    {
      id: "2",
      title: "Modern Villa - Palm Jumeirah",
      location: "Palm Jumeirah",
      price: "AED 25,000,000",
      agent: "Ahmed Hassan",
      rating: 4.8,
      views: 1923,
      type: "Villa",
      bedrooms: 6,
      bathrooms: 7,
      area: "8,500 sq ft",
      image: "/modern-villa-palm-jumeirah-beach.jpg",
      tourTypes: ["3D", "VR"],
      duration: "18 min",
      highlights: ["Beachfront Access", "Private Marina", "Home Cinema", "Wine Cellar"],
    },
    {
      id: "3",
      title: "Contemporary Apartment - Marina Walk",
      location: "Dubai Marina",
      price: "AED 3,200,000",
      agent: "Fatima Al-Zahra",
      rating: 4.7,
      views: 3156,
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 3,
      area: "1,800 sq ft",
      image: "/dubai-marina-apartment.png",
      tourTypes: ["3D", "AR"],
      duration: "8 min",
      highlights: ["Marina Views", "Modern Kitchen", "Balcony", "Gym Access"],
    },
  ]

  const featuredTechnologies = [
    {
      name: "3D Virtual Tours",
      icon: Monitor,
      description: "Immersive 360° property exploration",
      features: ["High-resolution imagery", "Interactive hotspots", "Floor plan integration"],
    },
    {
      name: "Augmented Reality",
      icon: Smartphone,
      description: "Overlay digital information on real spaces",
      features: ["Furniture placement", "Renovation previews", "Measurement tools"],
    },
    {
      name: "Virtual Reality",
      icon: Headphones,
      description: "Complete immersion in property spaces",
      features: ["VR headset compatible", "Realistic lighting", "Spatial audio"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Virtual Property Tours</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Experience UAE's finest properties through cutting-edge 3D, AR, and VR technology
          </p>
        </div>

        {/* Technology Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredTechnologies.map((tech) => (
            <Card key={tech.name} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <tech.icon className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <CardTitle className="text-xl">{tech.name}</CardTitle>
                <CardDescription>{tech.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tech.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-8 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-amber-600" />
              Browse Virtual Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Input placeholder="Search properties..." />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="downtown">Downtown Dubai</SelectItem>
                  <SelectItem value="marina">Dubai Marina</SelectItem>
                  <SelectItem value="palm">Palm Jumeirah</SelectItem>
                  <SelectItem value="jbr">JBR</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tour Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tours</SelectItem>
                  <SelectItem value="3d">3D Tours</SelectItem>
                  <SelectItem value="ar">AR Tours</SelectItem>
                  <SelectItem value="vr">VR Tours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Virtual Tours Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Card
              key={tour.id}
              className="overflow-hidden border-amber-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-600 text-white">{tour.type}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {tour.tourTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700"
                    onClick={() => setSelectedTour(tour.id)}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Tour
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 text-balance">{tour.title}</h3>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{tour.location}</span>
                </div>

                <div className="text-2xl font-bold text-amber-600 mb-4">{tour.price}</div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {tour.bedrooms}
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {tour.bathrooms}
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {tour.area}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    {tour.views.toLocaleString()} views
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {tour.duration}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Agent: <span className="font-medium">{tour.agent}</span>
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700">
                      <Play className="h-4 w-4 mr-1" />
                      Tour
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tour Viewer Modal */}
        {selectedTour && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Virtual Property Tour</CardTitle>
                <div className="flex items-center gap-4">
                  <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                    <TabsList>
                      <TabsTrigger value="3d">3D Tour</TabsTrigger>
                      <TabsTrigger value="ar">AR View</TabsTrigger>
                      <TabsTrigger value="vr">VR Mode</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button variant="outline" onClick={() => setSelectedTour(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 bg-gray-900 flex items-center justify-center text-white">
                  <div className="text-center">
                    <Monitor className="h-16 w-16 mx-auto mb-4 text-amber-500" />
                    <h3 className="text-xl font-semibold mb-2">
                      {viewMode === "3d" && "3D Virtual Tour"}
                      {viewMode === "ar" && "Augmented Reality View"}
                      {viewMode === "vr" && "Virtual Reality Experience"}
                    </h3>
                    <p className="text-gray-400">Interactive tour viewer would be integrated here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Statistics */}
        <Card className="mt-12 border-amber-200">
          <CardHeader>
            <CardTitle className="text-center">Virtual Tours Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-2">95%</div>
                <p className="text-sm text-gray-600">Faster Decision Making</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-2">78%</div>
                <p className="text-sm text-gray-600">Reduced Site Visits</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-2">156%</div>
                <p className="text-sm text-gray-600">Increased Engagement</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 mb-2">89%</div>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
