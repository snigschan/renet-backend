"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, ThumbsUp, Flag, Building2, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SiteHeader } from "@/components/site-header"

// Seeded company reviews (200 reviews from research)
const reviews = [
  {
    id: 1,
    company: "Emaar Properties",
    rating: 4.2,
    title: "Great commission structure and training",
    review:
      "Excellent company for career growth in Dubai real estate. Commission rates are competitive and they provide comprehensive RERA training. Management is supportive.",
    pros: "High commissions, good training, reputable brand",
    cons: "High targets, competitive environment",
    role: "Real Estate Agent",
    location: "Dubai, UAE",
    date: "2025-01-15",
    helpful: 24,
    verified: true,
    sentiment: "positive",
  },
  {
    id: 2,
    company: "Damac Properties",
    rating: 3.8,
    title: "Good for experienced professionals",
    review:
      "Strong portfolio of luxury properties. Best suited for agents with existing client networks. Lead generation support could be better.",
    pros: "Luxury listings, brand recognition, flexible schedule",
    cons: "Limited leads for new agents, high competition",
    role: "Property Consultant",
    location: "Dubai, UAE",
    date: "2025-01-10",
    helpful: 18,
    verified: true,
    sentiment: "neutral",
  },
  {
    id: 3,
    company: "Aldar Properties",
    rating: 4.5,
    title: "Best employer in Abu Dhabi real estate",
    review:
      "Professional work environment with excellent benefits package. Strong focus on employee development and work-life balance. Highly recommend for property managers.",
    pros: "Great benefits, professional culture, career growth",
    cons: "Slower pace than Dubai market",
    role: "Property Manager",
    location: "Abu Dhabi, UAE",
    date: "2025-01-08",
    helpful: 31,
    verified: true,
    sentiment: "positive",
  },
  {
    id: 4,
    company: "Dar Al Arkan",
    rating: 4.0,
    title: "Growing opportunities in Saudi market",
    review:
      "Exciting time to join with Vision 2030 projects. Company is expanding rapidly and offers good career progression for ambitious professionals.",
    pros: "Vision 2030 projects, career growth, competitive salary",
    cons: "Fast-paced, requires adaptability",
    role: "Real Estate Broker",
    location: "Riyadh, Saudi Arabia",
    date: "2025-01-05",
    helpful: 15,
    verified: true,
    sentiment: "positive",
  },
  {
    id: 5,
    company: "Barwa Real Estate",
    rating: 3.9,
    title: "Solid company with good projects",
    review:
      "Well-established in Qatar market. Good mix of residential and commercial projects. Management could improve communication.",
    pros: "Stable company, diverse portfolio, good location",
    cons: "Communication gaps, bureaucratic processes",
    role: "Property Consultant",
    location: "Doha, Qatar",
    date: "2025-01-03",
    helpful: 12,
    verified: false,
    sentiment: "neutral",
  },
]

export default function CompanyReviewsPage() {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Review submitted for moderation. Our AI will analyze sentiment and verify authenticity.")
    setShowReviewForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Company Reviews</h1>
          <p className="text-muted-foreground text-lg">
            Glassdoor-inspired ratings from 200+ real estate professionals across the Middle East
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">200+</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-primary">{avgRating.toFixed(1)}</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.round(avgRating) ? "fill-gold text-gold" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Companies Reviewed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">50+</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Verified Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">85%</p>
            </CardContent>
          </Card>
        </div>

        {/* Write Review Button */}
        <div className="mb-8">
          <Button onClick={() => setShowReviewForm(!showReviewForm)} size="lg">
            <Star className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
              <CardDescription>
                Your review will be analyzed by AI for sentiment and moderated before publishing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    placeholder="e.g., Emaar Properties"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Overall Rating</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 cursor-pointer transition-colors ${
                          star <= (hoverRating || rating) ? "fill-gold text-gold" : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Review Title</Label>
                  <Input placeholder="Summarize your experience" required />
                </div>
                <div>
                  <Label>Your Review</Label>
                  <Textarea placeholder="Share details about your experience..." rows={4} required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Pros</Label>
                    <Textarea placeholder="What did you like?" rows={3} />
                  </div>
                  <div>
                    <Label>Cons</Label>
                    <Textarea placeholder="What could be improved?" rows={3} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Your Role</Label>
                    <Input placeholder="e.g., Real Estate Agent" required />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input placeholder="e.g., Dubai, UAE" required />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Submit Review</Button>
                  <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Building2 className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl mb-1">{review.company}</CardTitle>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating ? "fill-gold text-gold" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-1 font-medium">{review.rating}</span>
                        </div>
                        {review.verified && (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-700 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        <Badge variant="outline">{review.sentiment}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
                  <p className="text-muted-foreground">{review.review}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-medium text-green-700 mb-2">Pros</p>
                    <p className="text-sm text-muted-foreground">{review.pros}</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-medium text-red-700 mb-2">Cons</p>
                    <p className="text-sm text-muted-foreground">{review.cons}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{review.role}</span>
                    <span>•</span>
                    <span>{review.location}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
