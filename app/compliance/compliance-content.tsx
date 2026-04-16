"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calculator,
  FileText,
  TrendingUp,
  Globe,
  Award,
  Building2,
} from "lucide-react"

export function ComplianceContent() {
  const [activeTab, setActiveTab] = useState("overview")

  // Emiratization Calculator State
  const [totalEmployees, setTotalEmployees] = useState("")
  const [emiratiEmployees, setEmiratiEmployees] = useState("")
  const [emiratizationResult, setEmiratizationResult] = useState<any>(null)

  // Nitaqat Calculator State
  const [companySize, setCompanySize] = useState("")
  const [saudiEmployees, setSaudiEmployees] = useState("")
  const [nitaqatResult, setNitaqatResult] = useState<any>(null)

  const calculateEmiratization = () => {
    const total = Number.parseInt(totalEmployees)
    const emirati = Number.parseInt(emiratiEmployees)

    if (total && emirati) {
      const percentage = (emirati / total) * 100
      const target = 2 // UAE target is 2% for private sector
      const gap = target - percentage
      const employeesNeeded = gap > 0 ? Math.ceil((target * total) / 100 - emirati) : 0

      setEmiratizationResult({
        percentage: percentage.toFixed(2),
        target,
        gap: gap.toFixed(2),
        employeesNeeded,
        status: percentage >= target ? "compliant" : "non-compliant",
      })
    }
  }

  const calculateNitaqat = () => {
    const total = Number.parseInt(companySize)
    const saudi = Number.parseInt(saudiEmployees)

    if (total && saudi) {
      const percentage = (saudi / total) * 100

      // Simplified Nitaqat bands (actual bands vary by sector)
      let band = "Red"
      let target = 0

      if (total >= 10 && total < 50) {
        target = 10
        if (percentage >= 20) band = "Platinum"
        else if (percentage >= 15) band = "Green"
        else if (percentage >= 10) band = "Yellow"
      } else if (total >= 50 && total < 500) {
        target = 15
        if (percentage >= 25) band = "Platinum"
        else if (percentage >= 20) band = "Green"
        else if (percentage >= 15) band = "Yellow"
      } else if (total >= 500) {
        target = 20
        if (percentage >= 30) band = "Platinum"
        else if (percentage >= 25) band = "Green"
        else if (percentage >= 20) band = "Yellow"
      }

      const gap = target - percentage
      const employeesNeeded = gap > 0 ? Math.ceil((target * total) / 100 - saudi) : 0

      setNitaqatResult({
        percentage: percentage.toFixed(2),
        band,
        target,
        gap: gap > 0 ? gap.toFixed(2) : 0,
        employeesNeeded,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">GCC Compliance Hub</h1>
          <p className="text-muted-foreground">
            Manage Emiratization, Nitaqat, visa compliance, and regional hiring regulations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="emiratization">Emiratization</TabsTrigger>
            <TabsTrigger value="nitaqat">Nitaqat</TabsTrigger>
            <TabsTrigger value="visa">Visa Checker</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Compliant
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">UAE Emiratization</h3>
                  <p className="text-2xl font-bold text-primary mb-2">2.5%</p>
                  <p className="text-sm text-muted-foreground">Target: 2% | Status: Above target</p>
                  <Progress value={125} className="mt-3" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-8 h-8 text-primary" />
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      Green Band
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Saudi Nitaqat</h3>
                  <p className="text-2xl font-bold text-primary mb-2">18%</p>
                  <p className="text-sm text-muted-foreground">Target: 15% | Status: Green Band</p>
                  <Progress value={120} className="mt-3" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Globe className="w-8 h-8 text-primary" />
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Visa Compliance</h3>
                  <p className="text-2xl font-bold text-primary mb-2">156</p>
                  <p className="text-sm text-muted-foreground">Active work visas across GCC</p>
                  <div className="flex items-center gap-2 mt-3 text-xs">
                    <Badge variant="outline">12 expiring soon</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compliance Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Compliance Alerts
                </CardTitle>
                <CardDescription>Important compliance notifications and deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-yellow-900">12 Work Visas Expiring in 60 Days</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Review and renew expiring work visas for employees in Dubai and Abu Dhabi
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900">Emiratization Target Achieved</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Your company has successfully met the 2% Emiratization requirement for Q1 2024
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900">Quarterly Compliance Report Due</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Submit your Q1 2024 compliance report to MOHRE by January 31, 2024
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GCC Countries Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  GCC Compliance by Country
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: "UAE", employees: 85, nationals: 3, target: 2, status: "compliant" },
                    { country: "Saudi Arabia", employees: 62, nationals: 11, target: 15, status: "warning" },
                    { country: "Qatar", employees: 28, nationals: 2, target: 5, status: "non-compliant" },
                    { country: "Kuwait", employees: 15, nationals: 1, target: 3, status: "warning" },
                  ].map((item) => (
                    <div
                      key={item.country}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.country}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.employees} total employees • {item.nationals} nationals
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{((item.nationals / item.employees) * 100).toFixed(1)}%</p>
                          <p className="text-xs text-muted-foreground">Target: {item.target}%</p>
                        </div>
                        <Badge
                          variant={item.status === "compliant" ? "secondary" : "outline"}
                          className={
                            item.status === "compliant"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : item.status === "warning"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {item.status === "compliant" ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : item.status === "warning" ? (
                            <AlertTriangle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emiratization Calculator */}
          <TabsContent value="emiratization" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Emiratization Calculator
                  </CardTitle>
                  <CardDescription>Calculate your UAE Emiratization compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      calculateEmiratization()
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="totalEmployees">Total Number of Employees</Label>
                      <Input
                        id="totalEmployees"
                        type="number"
                        placeholder="e.g., 100"
                        value={totalEmployees}
                        onChange={(e) => setTotalEmployees(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emiratiEmployees">Number of Emirati Employees</Label>
                      <Input
                        id="emiratiEmployees"
                        type="number"
                        placeholder="e.g., 3"
                        value={emiratiEmployees}
                        onChange={(e) => setEmiratiEmployees(e.target.value)}
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium text-sm mb-2">UAE Emiratization Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Private sector target: 2% Emirati employees</li>
                        <li>• Skilled positions: 10% by 2026</li>
                        <li>• Companies with 50+ employees must comply</li>
                        <li>• Penalties for non-compliance: AED 6,000/month per position</li>
                      </ul>
                    </div>

                    <Button type="submit" className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Compliance
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {emiratizationResult && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Emiratization Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-6 border border-border rounded-lg">
                      <div className="text-4xl font-bold text-primary mb-2">{emiratizationResult.percentage}%</div>
                      <p className="text-muted-foreground">Current Emiratization Rate</p>
                      <Badge
                        variant="secondary"
                        className={
                          emiratizationResult.status === "compliant"
                            ? "bg-green-50 text-green-700 border-green-200 mt-3"
                            : "bg-red-50 text-red-700 border-red-200 mt-3"
                        }
                      >
                        {emiratizationResult.status === "compliant" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {emiratizationResult.status === "compliant" ? "Compliant" : "Non-Compliant"}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <span className="text-sm text-muted-foreground">Target Rate</span>
                        <span className="font-medium">{emiratizationResult.target}%</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <span className="text-sm text-muted-foreground">Gap to Target</span>
                        <span className="font-medium">
                          {emiratizationResult.gap > 0 ? `${emiratizationResult.gap}%` : "Target Met"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <span className="text-sm text-muted-foreground">Emiratis Needed</span>
                        <span className="font-medium">
                          {emiratizationResult.employeesNeeded > 0
                            ? `${emiratizationResult.employeesNeeded} employees`
                            : "None"}
                        </span>
                      </div>
                    </div>

                    {emiratizationResult.status === "non-compliant" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-medium text-red-900 mb-2">Action Required</h4>
                        <p className="text-sm text-red-700">
                          You need to hire {emiratizationResult.employeesNeeded} Emirati employee(s) to meet the 2%
                          target. Potential penalty: AED {emiratizationResult.employeesNeeded * 6000}/month
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Nitaqat Calculator */}
          <TabsContent value="nitaqat" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Nitaqat Calculator
                  </CardTitle>
                  <CardDescription>Calculate your Saudi Arabia Nitaqat band status</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      calculateNitaqat()
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Total Number of Employees</Label>
                      <Input
                        id="companySize"
                        type="number"
                        placeholder="e.g., 100"
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="saudiEmployees">Number of Saudi Employees</Label>
                      <Input
                        id="saudiEmployees"
                        type="number"
                        placeholder="e.g., 15"
                        value={saudiEmployees}
                        onChange={(e) => setSaudiEmployees(e.target.value)}
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Nitaqat Color Bands</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • <span className="text-purple-600 font-medium">Platinum</span>: Highest Saudization (25-30%+)
                        </li>
                        <li>
                          • <span className="text-green-600 font-medium">Green</span>: Above minimum (15-25%)
                        </li>
                        <li>
                          • <span className="text-yellow-600 font-medium">Yellow</span>: At minimum (10-15%)
                        </li>
                        <li>
                          • <span className="text-red-600 font-medium">Red</span>: Below minimum (&lt;10%)
                        </li>
                      </ul>
                    </div>

                    <Button type="submit" className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Nitaqat Band
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {nitaqatResult && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Nitaqat Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-6 border border-border rounded-lg">
                      <div className="text-4xl font-bold text-primary mb-2">{nitaqatResult.percentage}%</div>
                      <p className="text-muted-foreground mb-3">Current Saudization Rate</p>
                      <Badge
                        variant="secondary"
                        className={
                          nitaqatResult.band === "Platinum"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : nitaqatResult.band === "Green"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : nitaqatResult.band === "Yellow"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {nitaqatResult.band} Band
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <span className="text-sm text-muted-foreground">Target Rate</span>
                        <span className="font-medium">{nitaqatResult.target}%</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <span className="text-sm text-muted-foreground">Gap to Next Band</span>
                        <span className="font-medium">
                          {nitaqatResult.gap > 0 ? `${nitaqatResult.gap}%` : "Target Met"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <span className="text-sm text-muted-foreground">Saudis Needed</span>
                        <span className="font-medium">
                          {nitaqatResult.employeesNeeded > 0 ? `${nitaqatResult.employeesNeeded} employees` : "None"}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Band Benefits & Restrictions</h4>
                      {nitaqatResult.band === "Platinum" && (
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>✓ Unlimited visa issuance</li>
                          <li>✓ Instant visa renewals</li>
                          <li>✓ Transfer employees from other companies</li>
                          <li>✓ Priority government services</li>
                        </ul>
                      )}
                      {nitaqatResult.band === "Green" && (
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>✓ Normal visa issuance</li>
                          <li>✓ Can hire foreign workers</li>
                          <li>✓ Standard processing times</li>
                        </ul>
                      )}
                      {nitaqatResult.band === "Yellow" && (
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>⚠ Limited visa issuance</li>
                          <li>⚠ Must improve Saudization</li>
                          <li>⚠ 6-month grace period</li>
                        </ul>
                      )}
                      {nitaqatResult.band === "Red" && (
                        <ul className="text-sm text-red-600 space-y-1">
                          <li>✗ No new visa issuance</li>
                          <li>✗ Cannot renew existing visas</li>
                          <li>✗ Cannot transfer employees</li>
                          <li>✗ Penalties and fines apply</li>
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Visa Checker */}
          <TabsContent value="visa" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Visa Eligibility Checker
                </CardTitle>
                <CardDescription>Check visa requirements and eligibility for GCC countries</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Candidate Nationality</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uae">UAE National</SelectItem>
                          <SelectItem value="saudi">Saudi National</SelectItem>
                          <SelectItem value="gcc">Other GCC National</SelectItem>
                          <SelectItem value="expat">Expat/Foreign National</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetCountry">Target Country</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uae">United Arab Emirates</SelectItem>
                          <SelectItem value="saudi">Saudi Arabia</SelectItem>
                          <SelectItem value="qatar">Qatar</SelectItem>
                          <SelectItem value="kuwait">Kuwait</SelectItem>
                          <SelectItem value="bahrain">Bahrain</SelectItem>
                          <SelectItem value="oman">Oman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position/Role</Label>
                    <Input id="position" placeholder="e.g., Senior Property Consultant" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full">
                    <Globe className="w-4 h-4 mr-2" />
                    Check Visa Eligibility
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Visa Processing Information</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• UAE work visa processing: 2-4 weeks</li>
                    <li>• Saudi work visa processing: 3-6 weeks</li>
                    <li>• GCC nationals have simplified visa procedures</li>
                    <li>• Skilled positions may qualify for Golden Visa (UAE)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Compliance Reports
                </CardTitle>
                <CardDescription>Generate and download compliance reports for regulatory submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Emiratization Quarterly Report",
                      description: "Q1 2024 compliance report for MOHRE",
                      dueDate: "Due: Jan 31, 2024",
                    },
                    {
                      title: "Nitaqat Annual Report",
                      description: "2024 Saudization compliance report",
                      dueDate: "Due: Feb 15, 2024",
                    },
                    {
                      title: "Visa Status Report",
                      description: "Current visa status across all GCC countries",
                      dueDate: "Updated: Today",
                    },
                    {
                      title: "Workforce Demographics",
                      description: "Nationality breakdown and compliance metrics",
                      dueDate: "Updated: Today",
                    },
                  ].map((report, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h4 className="font-medium mb-2">{report.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{report.dueDate}</span>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            Generate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
