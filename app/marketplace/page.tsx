import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Maximize, Eye } from "lucide-react"
import { AIImageGenerator } from "@/components/ai-image-generator"

export default function PropertyMarketplace() {
  const properties = [
    {
      title: "Luxury Villa in Dubai Hills",
      location: "Dubai Hills Estate, Dubai",
      price: "AED 8,500,000",
      beds: 5,
      baths: 6,
      area: "6,500 sqft",
      image: "/luxury-villa-dubai.png",
      agency: "Premium Properties ME",
      views: 1250,
    },
    {
      title: "Modern Apartment in Riyadh",
      location: "Al Olaya District, Riyadh",
      price: "SAR 2,100,000",
      beds: 3,
      baths: 3,
      area: "2,200 sqft",
      image: "/modern-apartment-riyadh.jpg",
      agency: "Saudi Elite Realty",
      views: 890,
    },
    {
      title: "Waterfront Penthouse Doha",
      location: "West Bay, Doha",
      price: "QAR 4,500,000",
      beds: 4,
      baths: 5,
      area: "4,800 sqft",
      image: "/waterfront-penthouse-doha.jpg",
      agency: "Qatar Luxury Homes",
      views: 1560,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Property Marketplace</h1>
          <p className="text-muted-foreground">Exclusive listings from verified agencies across the Middle East</p>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>List Your Property</CardTitle>
              <CardDescription>Generate professional property images with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <AIImageGenerator />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                  {property.price}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full text-sm">
                  <Eye className="h-4 w-4" />
                  {property.views}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>

                <p className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 text-[#008080]" />
                  {property.location}
                </p>

                <div className="flex gap-4 mb-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-[#D4AF37]" />
                    {property.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-[#D4AF37]" />
                    {property.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="h-4 w-4 text-[#D4AF37]" />
                    {property.area}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Listed by: <span className="font-medium text-foreground">{property.agency}</span>
                </p>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#008080] hover:bg-[#006666]">View Details</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Properties
          </Button>
        </div>
      </div>
    </div>
  )
}
