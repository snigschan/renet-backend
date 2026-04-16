"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Star,
  MapPin,
  Phone,
  Mail,
  Upload,
  Shield,
  Award,
  Briefcase,
  GraduationCap,
  Languages,
  Camera,
  Save,
  Edit,
  Plus,
  X,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Ahmed",
    lastName: "Al-Rashid",
    email: "ahmed@example.com",
    phone: "+971 50 123 4567",
    location: "Dubai Marina",
    bio: "Experienced real estate professional with over 8 years in the UAE market. Specialized in luxury properties and commercial real estate across Dubai and Abu Dhabi.",
    specializations: ["Luxury Residential", "Commercial Properties", "Investment Properties"],
    languages: ["English", "Arabic", "Hindi"],
    experience: "8+ years",
    education: "Bachelor's in Business Administration",
    certifications: ["RERA Licensed", "Certified Property Manager", "Real Estate Investment Specialist"],
  })

  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: "Luxury Villa - Palm Jumeirah",
      type: "Sale",
      value: "AED 15M",
      image: "/villa-palm.jpg",
      status: "Sold",
    },
    {
      id: 2,
      title: "Commercial Tower - DIFC",
      type: "Lease",
      value: "AED 2.5M/year",
      image: "/tower-difc.jpg",
      status: "Leased",
    },
    {
      id: 3,
      title: "Penthouse - Downtown Dubai",
      type: "Sale",
      value: "AED 8.5M",
      image: "/penthouse-downtown.jpg",
      status: "Sold",
    },
  ])

  const verificationStatus = {
    identity: { verified: true, date: "2023-01-20" },
    rera: { verified: true, date: "2023-01-25", license: "12345678" },
    education: { verified: true, date: "2023-02-01" },
    experience: { verified: false, pending: true },
  }

  const updateProfileData = (field: string, value: string | string[]) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const addSpecialization = (spec: string) => {
    if (spec && !profileData.specializations.includes(spec)) {
      updateProfileData("specializations", [...profileData.specializations, spec])
    }
  }

  const removeSpecialization = (spec: string) => {
    updateProfileData(
      "specializations",
      profileData.specializations.filter((s) => s !== spec),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-foreground">RealEstate Pro</div>
                <div className="text-xs text-muted-foreground">Professional Profile</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
                className={
                  isEditing
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    : ""
                }
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Header */}
              <div className="lg:col-span-3">
                <Card className="border-border/50">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="relative">
                        <Avatar className="w-32 h-32">
                          <AvatarImage src="/professional-headshot.png" alt="Profile" />
                          <AvatarFallback className="text-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                            {profileData.firstName[0]}
                            {profileData.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0"
                            variant="secondary"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          <span className="font-medium">4.9</span>
                          <span className="text-muted-foreground">(127 reviews)</span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {profileData.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {profileData.experience}
                          </div>
                          <div className="flex items-center gap-2">
                            <Languages className="w-4 h-4" />
                            {profileData.languages.join(", ")}
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>

                        <div className="flex flex-wrap gap-2">
                          {profileData.specializations.map((spec) => (
                            <Badge key={spec} variant="outline">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        value={profileData.email}
                        onChange={(e) => updateProfileData("email", e.target.value)}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => updateProfileData("phone", e.target.value)}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => updateProfileData("location", e.target.value)}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Details */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Select
                      value={profileData.experience}
                      onValueChange={(value) => updateProfileData("experience", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2 years">1-2 years</SelectItem>
                        <SelectItem value="3-5 years">3-5 years</SelectItem>
                        <SelectItem value="5-8 years">5-8 years</SelectItem>
                        <SelectItem value="8+ years">8+ years</SelectItem>
                        <SelectItem value="10+ years">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      value={profileData.education}
                      onChange={(e) => updateProfileData("education", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Certifications</Label>
                    <div className="space-y-2">
                      {profileData.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-600" />
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio & Specializations */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>About & Specializations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => updateProfileData("bio", e.target.value)}
                      rows={4}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Specializations</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profileData.specializations.map((spec) => (
                        <Badge key={spec} variant="outline" className="flex items-center gap-1">
                          {spec}
                          {isEditing && (
                            <button onClick={() => removeSpecialization(spec)} className="ml-1">
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input placeholder="Add specialization" id="new-spec" />
                        <Button
                          size="sm"
                          onClick={() => {
                            const input = document.getElementById("new-spec") as HTMLInputElement
                            if (input?.value) {
                              addSpecialization(input.value)
                              input.value = ""
                            }
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>Complete your verification to unlock premium features and build trust</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Identity Verification */}
                <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        verificationStatus.identity.verified
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <Shield
                        className={`w-6 h-6 ${
                          verificationStatus.identity.verified ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Identity Verification</h3>
                      <p className="text-sm text-muted-foreground">Emirates ID and passport verification</p>
                      {verificationStatus.identity.verified && (
                        <p className="text-xs text-green-600">Verified on {verificationStatus.identity.date}</p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={verificationStatus.identity.verified ? "default" : "secondary"}
                    className={
                      verificationStatus.identity.verified
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : ""
                    }
                  >
                    {verificationStatus.identity.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>

                {/* RERA License */}
                <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        verificationStatus.rera.verified
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <Award
                        className={`w-6 h-6 ${verificationStatus.rera.verified ? "text-green-600" : "text-gray-400"}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">RERA License</h3>
                      <p className="text-sm text-muted-foreground">Real Estate Regulatory Agency license</p>
                      {verificationStatus.rera.verified && (
                        <div>
                          <p className="text-xs text-green-600">Verified on {verificationStatus.rera.date}</p>
                          <p className="text-xs text-muted-foreground">License: {verificationStatus.rera.license}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={verificationStatus.rera.verified ? "default" : "secondary"}
                    className={
                      verificationStatus.rera.verified
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : ""
                    }
                  >
                    {verificationStatus.rera.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>

                {/* Education */}
                <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        verificationStatus.education.verified
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      <GraduationCap
                        className={`w-6 h-6 ${
                          verificationStatus.education.verified ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Education Verification</h3>
                      <p className="text-sm text-muted-foreground">Academic credentials and certifications</p>
                      {verificationStatus.education.verified && (
                        <p className="text-xs text-green-600">Verified on {verificationStatus.education.date}</p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={verificationStatus.education.verified ? "default" : "secondary"}
                    className={
                      verificationStatus.education.verified
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : ""
                    }
                  >
                    {verificationStatus.education.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>

                {/* Experience */}
                <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-900">
                      <Briefcase className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Experience Verification</h3>
                      <p className="text-sm text-muted-foreground">Previous employment and references</p>
                      {verificationStatus.experience.pending && (
                        <p className="text-xs text-amber-600">Under review - 2-3 business days</p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                  >
                    In Review
                  </Badge>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Additional Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Property Portfolio</CardTitle>
                    <CardDescription>Showcase your successful transactions and projects</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Property
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolio.map((property) => (
                    <Card key={property.id} className="border-border/50 overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={`/abstract-geometric-shapes.png?height=200&width=300&query=${property.title}`}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge
                          className={`absolute top-2 right-2 ${
                            property.status === "Sold"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          }`}
                        >
                          {property.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{property.title}</h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{property.type}</span>
                          <span className="font-medium text-amber-600">{property.value}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to agencies and developers
                      </p>
                    </div>
                    <Button variant="outline">Public</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about new missions and messages
                      </p>
                    </div>
                    <Button variant="outline">Enabled</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Setup</Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
