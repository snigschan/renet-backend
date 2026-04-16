"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Award, Target, Heart, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Seeded diversity data from Bayt 2025 research
const diversityStats = {
  womenInRE: 30,
  diverseLeadership: 25,
  inclusiveCompanies: 45,
  equalPayGap: 12,
}

const inclusiveCompanies = [
  { name: "Emaar Properties", score: 92, initiatives: ["Women in Leadership", "Equal Pay", "Flexible Work"] },
  { name: "Aldar Properties", score: 88, initiatives: ["Diversity Training", "Inclusive Hiring", "Mentorship"] },
  { name: "CBRE Middle East", score: 85, initiatives: ["Gender Balance", "Cultural Diversity", "Career Development"] },
]

export default function DiversityPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Diversity & Inclusion Portal</h1>
          <p className="text-muted-foreground text-lg">
            Bias-free matching, inclusive hiring filters, and diversity statistics from Bayt 2025 research
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Women in UAE RE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{diversityStats.womenInRE}%</p>
              <Progress value={diversityStats.womenInRE} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="h-4 w-4" />
                Diverse Leadership
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{diversityStats.diverseLeadership}%</p>
              <Progress value={diversityStats.diverseLeadership} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                Inclusive Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{diversityStats.inclusiveCompanies}%</p>
              <Progress value={diversityStats.inclusiveCompanies} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Pay Gap Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{diversityStats.equalPayGap}%</p>
              <p className="text-xs text-muted-foreground mt-1">Down from 18% in 2023</p>
            </CardContent>
          </Card>
        </div>

        {/* Inclusive Companies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top Inclusive Employers</CardTitle>
            <CardDescription>Companies leading in diversity and inclusion initiatives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inclusiveCompanies.map((company, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {company.initiatives.map((initiative, i) => (
                          <Badge key={i} variant="secondary">
                            {initiative}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{company.score}</p>
                      <p className="text-xs text-muted-foreground">D&I Score</p>
                    </div>
                  </div>
                  <Progress value={company.score} />
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Bias-Free Matching
              </CardTitle>
              <CardDescription>AI-powered matching without demographic bias</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our AI matching algorithm focuses purely on skills, experience, and qualifications, removing unconscious
                bias from the hiring process.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Anonymous profile screening option</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Skills-based matching algorithm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Blind resume reviews available</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Inclusive Job Filters
              </CardTitle>
              <CardDescription>Find companies committed to diversity</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Filter jobs by companies with proven diversity initiatives and inclusive workplace policies.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Women-Led Firms</Badge>
                <Badge variant="outline">Equal Pay Certified</Badge>
                <Badge variant="outline">Flexible Work</Badge>
                <Badge variant="outline">Parental Leave</Badge>
                <Badge variant="outline">Cultural Diversity</Badge>
                <Badge variant="outline">LGBTQ+ Friendly</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Initiatives */}
        <Card>
          <CardHeader>
            <CardTitle>Our Diversity Commitments</CardTitle>
            <CardDescription>How Renet promotes inclusive hiring in ME real estate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Equal Opportunity</p>
                  <p className="text-sm text-muted-foreground">
                    All candidates evaluated on merit and qualifications only
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Inclusive Training</p>
                  <p className="text-sm text-muted-foreground">Free diversity and inclusion courses for all members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Transparent Reporting</p>
                  <p className="text-sm text-muted-foreground">Regular diversity statistics and progress updates</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
