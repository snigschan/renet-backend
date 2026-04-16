import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Newspaper, TrendingUp, MessageSquare, Share2, Sparkles } from "lucide-react"

export default function NewsInsights() {
  const articles = [
    {
      title: "Dubai Property Market Sees 25% Growth in Q1 2025",
      summary:
        "AI Summary: Dubai real estate continues strong performance with luxury segment leading growth. Vision 2030 projects driving demand.",
      source: "Gulf News",
      date: "2 hours ago",
      category: "Market Trends",
      comments: 45,
      image: "/dubai-property-market-growth.jpg",
    },
    {
      title: "Saudi Arabia Announces New NEOM Phase",
      summary:
        "AI Summary: NEOM project unveils residential district with 50,000 units. Expected completion 2027. Investment opportunities emerging.",
      source: "Arab News",
      date: "5 hours ago",
      category: "Development",
      comments: 78,
      image: "/neom-saudi-arabia-development.jpg",
    },
    {
      title: "Qatar Real Estate Investment Reaches Record High",
      summary:
        "AI Summary: Foreign investment in Qatar properties up 40% YoY. World Cup infrastructure driving long-term value.",
      source: "The Peninsula",
      date: "1 day ago",
      category: "Investment",
      comments: 32,
      image: "/qatar-real-estate-investment.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">News & Insights</h1>
          <p className="text-muted-foreground">
            Stay updated with Middle East real estate news, powered by AI summaries
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                Personalized News Feed
              </CardTitle>
              <CardDescription>AI-curated articles based on your interests and location</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Button className="w-full bg-[#008080] hover:bg-[#006666]">Customize Feed</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-[#D4AF37] mb-4" />
              <h3 className="text-2xl font-bold mb-2">+18%</h3>
              <p className="text-sm text-muted-foreground">ME Market Growth (YoY)</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Newspaper className="h-8 w-8 text-[#008080] mb-4" />
              <h3 className="text-2xl font-bold mb-2">250+</h3>
              <p className="text-sm text-muted-foreground">Articles This Week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <MessageSquare className="h-8 w-8 text-[#D4AF37] mb-4" />
              <h3 className="text-2xl font-bold mb-2">1,200+</h3>
              <p className="text-sm text-muted-foreground">Community Discussions</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {articles.map((article, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#008080] text-white text-xs rounded-full">{article.category}</span>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                  </div>

                  <h3 className="text-2xl font-semibold mb-3">{article.title}</h3>

                  <div className="bg-blue-50 border-l-4 border-[#008080] p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-[#008080]" />
                      <span className="text-sm font-medium">AI Summary</span>
                    </div>
                    <p className="text-sm">{article.summary}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Source: {article.source}</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {article.comments} comments
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button size="sm" className="bg-[#008080] hover:bg-[#006666]">
                        Read Full Article
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}
