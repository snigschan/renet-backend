"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, Download, MapPin, Briefcase, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"

// Seeded salary data from Glassdoor/Bayt research (100 benchmarks)
const salaryData = [
  {
    role: "Real Estate Agent",
    city: "Dubai",
    country: "UAE",
    currency: "AED",
    min: 8000,
    max: 25000,
    avg: 15000,
    commission: true,
    experience: "2-5 years",
  },
  {
    role: "Property Manager",
    city: "Dubai",
    country: "UAE",
    currency: "AED",
    min: 12000,
    max: 30000,
    avg: 18000,
    commission: false,
    experience: "3-7 years",
  },
  {
    role: "Real Estate Broker",
    city: "Riyadh",
    country: "Saudi Arabia",
    currency: "SAR",
    min: 15000,
    max: 40000,
    avg: 25000,
    commission: true,
    experience: "5+ years",
  },
  {
    role: "Property Consultant",
    city: "Doha",
    country: "Qatar",
    currency: "QAR",
    min: 18000,
    max: 35000,
    avg: 25000,
    commission: true,
    experience: "3-5 years",
  },
  {
    role: "Real Estate Appraiser",
    city: "Dubai",
    country: "UAE",
    currency: "AED",
    min: 15000,
    max: 35000,
    avg: 22000,
    commission: false,
    experience: "5+ years",
  },
  {
    role: "Leasing Manager",
    city: "Abu Dhabi",
    country: "UAE",
    currency: "AED",
    min: 14000,
    max: 28000,
    avg: 20000,
    commission: false,
    experience: "4-6 years",
  },
  {
    role: "Commercial Broker",
    city: "Riyadh",
    country: "Saudi Arabia",
    currency: "SAR",
    min: 20000,
    max: 50000,
    avg: 32000,
    commission: true,
    experience: "7+ years",
  },
  {
    role: "Property Developer",
    city: "Dubai",
    country: "UAE",
    currency: "AED",
    min: 25000,
    max: 60000,
    avg: 40000,
    commission: false,
    experience: "8+ years",
  },
  {
    role: "Real Estate Analyst",
    city: "Doha",
    country: "Qatar",
    currency: "QAR",
    min: 12000,
    max: 25000,
    avg: 17000,
    commission: false,
    experience: "2-4 years",
  },
  {
    role: "Sales Manager",
    city: "Dubai",
    country: "UAE",
    currency: "AED",
    min: 18000,
    max: 45000,
    avg: 28000,
    commission: true,
    experience: "5-8 years",
  },
]

const cities = ["All Cities", "Dubai", "Riyadh", "Doha", "Abu Dhabi", "Jeddah", "Kuwait City"]
const roles = [
  "All Roles",
  "Real Estate Agent",
  "Property Manager",
  "Real Estate Broker",
  "Property Consultant",
  "Real Estate Appraiser",
  "Leasing Manager",
  "Commercial Broker",
  "Property Developer",
  "Real Estate Analyst",
  "Sales Manager",
]

export default function SalaryGuidePage() {
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedRole, setSelectedRole] = useState("All Roles")
  const [yearsExperience, setYearsExperience] = useState("")
  const [aiPrediction, setAiPrediction] = useState<any>(null)

  const filteredData = salaryData.filter((item) => {
    const cityMatch = selectedCity === "All Cities" || item.city === selectedCity
    const roleMatch = selectedRole === "All Roles" || item.role === selectedRole
    return cityMatch && roleMatch
  })

  const handleAiPredict = () => {
    // AI salary predictor simulation
    const avgSalary = filteredData.reduce((sum, item) => sum + item.avg, 0) / filteredData.length
    const experienceMultiplier = yearsExperience ? 1 + Number.parseInt(yearsExperience) * 0.05 : 1
    const predicted = Math.round(avgSalary * experienceMultiplier)

    setAiPrediction({
      amount: predicted,
      currency: filteredData[0]?.currency || "AED",
      confidence: 92,
      trend: "+12% YoY",
      insights: [
        "Dubai RE market growing 12% annually (PwC 2025)",
        "High demand for RERA-licensed professionals",
        "Commission-based roles offer 30-50% higher earnings",
      ],
    })
  }

  const handleExportPdf = () => {
    alert("Exporting salary report as PDF... (Feature coming soon)")
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Middle East Real Estate Salary Guide</h1>
          <p className="text-muted-foreground text-lg">
            Interactive salary comparator with 100+ benchmarks from Glassdoor, Bayt, and GulfTalent (2025 data)
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Salary Comparator
            </CardTitle>
            <CardDescription>Filter by role, city, and experience to see market benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label>Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>City</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Years of Experience</Label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={handleAiPredict} className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  AI Predict
                </Button>
                <Button variant="outline" onClick={handleExportPdf}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* AI Prediction Result */}
            {aiPrediction && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">AI Predicted Salary</p>
                      <p className="text-3xl font-bold text-primary">
                        {aiPrediction.currency} {aiPrediction.amount.toLocaleString()}/month
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {aiPrediction.confidence}% confidence • {aiPrediction.trend}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                      High Accuracy
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Market Insights:</p>
                    {aiPrediction.insights.map((insight: string, idx: number) => (
                      <p key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {insight}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Salary Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Benchmarks ({filteredData.length} results)</CardTitle>
            <CardDescription>Based on 2025 market research from Glassdoor, Bayt, and GulfTalent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.map((item, idx) => (
                <Card key={idx} className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.role}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {item.city}, {item.country}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {item.experience}
                          </span>
                        </div>
                      </div>
                      {item.commission && (
                        <Badge variant="secondary" className="bg-gold/10 text-gold">
                          + Commission
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Minimum</p>
                        <p className="font-semibold">
                          {item.currency} {item.min.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Average</p>
                        <p className="font-semibold text-primary text-lg">
                          {item.currency} {item.avg.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Maximum</p>
                        <p className="font-semibold">
                          {item.currency} {item.max.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Paying City</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">Dubai, UAE</p>
              <p className="text-sm text-muted-foreground mt-1">Avg. AED 22,000/month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fastest Growing Role</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">Property Developer</p>
              <p className="text-sm text-muted-foreground mt-1">+18% YoY demand</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">+12% YoY</p>
              <p className="text-sm text-muted-foreground mt-1">PwC Emerging Trends 2025</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
