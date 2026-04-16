import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Briefcase, Star, Volume2 } from "lucide-react"

export default function MemberDirectory() {
  const members = [
    {
      name: "Ahmed Al-Mansoori",
      title: "Senior Real Estate Broker",
      location: "Dubai, UAE",
      expertise: "Luxury Properties",
      rating: 4.9,
      connections: 1250,
      verified: true,
      hasVoiceIntro: true,
    },
    {
      name: "Sarah Al-Rashid",
      title: "Property Investment Consultant",
      location: "Riyadh, Saudi Arabia",
      expertise: "Commercial Real Estate",
      rating: 4.8,
      connections: 980,
      verified: true,
      hasVoiceIntro: true,
    },
    {
      name: "Mohammed Al-Thani",
      title: "Real Estate Developer",
      location: "Doha, Qatar",
      expertise: "Residential Development",
      rating: 4.7,
      connections: 1450,
      verified: true,
      hasVoiceIntro: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Member Directory</h1>
          <p className="text-muted-foreground">
            Connect with verified real estate professionals across the Middle East
          </p>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, expertise, or location..." className="pl-10" />
          </div>
          <Button className="bg-[#008080] hover:bg-[#006666]">Search</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Filter by Country</div>
              <select className="w-full border rounded p-2">
                <option>All Countries</option>
                <option>UAE</option>
                <option>Saudi Arabia</option>
                <option>Qatar</option>
                <option>Kuwait</option>
                <option>Oman</option>
                <option>Bahrain</option>
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Expertise</div>
              <select className="w-full border rounded p-2">
                <option>All Expertise</option>
                <option>Luxury Properties</option>
                <option>Commercial</option>
                <option>Residential</option>
                <option>Investment</option>
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Rating</div>
              <select className="w-full border rounded p-2">
                <option>All Ratings</option>
                <option>4.5+ Stars</option>
                <option>4.0+ Stars</option>
                <option>3.5+ Stars</option>
              </select>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {members.map((member, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#008080] flex items-center justify-center text-white text-2xl font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      {member.verified && <span className="text-[#008080]">✓</span>}
                      {member.hasVoiceIntro && (
                        <button className="text-[#D4AF37] hover:text-[#B8941F]">
                          <Volume2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-2">{member.title}</p>

                    <div className="flex flex-wrap gap-4 text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-[#008080]" />
                        {member.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4 text-[#D4AF37]" />
                        {member.expertise}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]" />
                        {member.rating}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {member.connections.toLocaleString()} connections
                    </p>

                    <div className="flex gap-2">
                      <Button className="bg-[#008080] hover:bg-[#006666]">Connect</Button>
                      <Button variant="outline">View Profile</Button>
                      <Button variant="outline">Message</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Members
          </Button>
        </div>
      </div>
    </div>
  )
}
