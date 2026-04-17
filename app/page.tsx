"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Globe,
  ArrowRight,
  TrendingUp,
  Shield,
  Briefcase,
  FileText,
  Video,
  BookOpen,
  Laptop,
  DollarSign,
  UserPlus,
  Star,
  Heart,
  Building2,
  Wrench,
  ImageIcon,
  MapPin,
  Newspaper,
  GraduationCap,
  HelpCircle,
  Sparkles,
  UserSearch,
  Code,
  Target,
} from "lucide-react"
import Link from "next/link"
import { translations, type Language } from "@/lib/i18n/translations"
import Image from "next/image"
import { useScrollReveal } from "@/lib/animations/scroll-reveal"
import { SplashScreen } from "@/components/splash-screen"
import { AnimatedLogo } from "@/components/animated-logo"

type UserRole = "job-seeker" | "employer" | "broker" | null

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en")
  const [isRTL, setIsRTL] = useState(false)
  const [counters, setCounters] = useState({ professionals: 0, countries: 0, jobs: 0, companies: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Role-based state and logic
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)
  const [showRoleSelection, setShowRoleSelection] = useState(true)

  useEffect(() => {
    setIsRTL(language === "ar" || language === "ur" || language === "fa")
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute(
        "dir",
        language === "ar" || language === "ur" || language === "fa" ? "rtl" : "ltr",
      )
      document.documentElement.setAttribute("lang", language)
    }
  }, [language])

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole
    if (savedRole) {
      setSelectedRole(savedRole)
      setShowRoleSelection(false)
    }
  }, [])

  useEffect(() => {
    if (hasAnimated) {
      const targets = { professionals: 15000, countries: 12, jobs: 2500, companies: 800 }
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        setCounters({
          professionals: Math.floor(targets.professionals * progress),
          countries: Math.floor(targets.countries * progress),
          jobs: Math.floor(targets.jobs * progress),
          companies: Math.floor(targets.companies * progress),
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounters(targets)
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [hasAnimated])

  const toggleLanguage = () => {
    const languages: Language[] = ["en", "ar", "fr", "ur", "hi", "fa"]
    const currentIndex = languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % languages.length
    setLanguage(languages[nextIndex])
  }

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setShowRoleSelection(false)
    if (role) {
      localStorage.setItem("userRole", role)
    }
  }

  const handleChangeRole = () => {
    setShowRoleSelection(true)
    setSelectedRole(null)
    localStorage.removeItem("userRole")
  }

  const currentContent = translations[language]
  const languageLabels = {
    en: "English",
    ar: "العربية",
    fr: "Français",
    ur: "اردو",
    hi: "हिन्दी",
    fa: "فارسی", // Added Farsi label
  }

  const featureIcons = [Users, Briefcase, TrendingUp, Shield]

  const heroReveal = useScrollReveal()
  const showcaseReveal = useScrollReveal()
  const featuresReveal = useScrollReveal()
  const statsReveal = useScrollReveal()

  useEffect(() => {
    if (statsReveal.isVisible && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [statsReveal.isVisible, hasAnimated])

  const platformPages = {
    jobSeekers: [
      {
        title: "Resume Builder",
        description: "Create ATS-optimized resumes with AI",
        icon: FileText,
        href: "/resume-builder",
      },
      { title: "Interview Hub", description: "Practice with AI mock interviews", icon: Video, href: "/interview-hub" },
      {
        title: "Career Resources",
        description: "Guides, e-books & career simulator",
        icon: BookOpen,
        href: "/career-resources",
      },
      { title: "Remote Jobs", description: "Find hybrid & remote opportunities", icon: Laptop, href: "/remote-jobs" },
      {
        title: "Salary Guide",
        description: "ME salary benchmarks & predictor",
        icon: DollarSign,
        href: "/salary-guide",
      },
    ],
    employers: [
      { title: "Hire Talents", description: "Find verified RE professionals", icon: UserPlus, href: "/hire-talents" },
      { title: "Company Reviews", description: "Build your employer brand", icon: Star, href: "/reviews" },
      { title: "Diversity Portal", description: "Bias-free hiring & inclusion", icon: Heart, href: "/diversity" },
    ],
    marketplace: [
      { title: "Property Marketplace", description: "ME real estate listings", icon: Building2, href: "/marketplace" },
      { title: "Tools Hub", description: "Calculators & templates", icon: Wrench, href: "/tools" },
      { title: "AI Image Generator", description: "Create property visuals", icon: ImageIcon, href: "/tools" },
    ],
    community: [
      { title: "Member Directory", description: "15K+ verified professionals", icon: MapPin, href: "/directory" },
      { title: "News & Insights", description: "ME real estate updates", icon: Newspaper, href: "/news" },
      {
        title: "Training Academy",
        description: "Online courses & certificates",
        icon: GraduationCap,
        href: "/academy",
      },
      { title: "FAQ & Support", description: "Get help with AI chatbot", icon: HelpCircle, href: "/faq" },
    ],
  }

  if (showRoleSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50] flex items-center justify-center p-4">
        <SplashScreen />

        <div className="max-w-6xl w-full animate-fade-in-up">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <AnimatedLogo size="lg" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to Renet</h1>
            <p className="text-xl text-gray-300">Select your role to get a personalized experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Job Seeker */}
            <Card
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 cursor-pointer group hover:scale-105 hover:shadow-2xl"
              onClick={() => handleRoleSelect("job-seeker")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-[#E91E63]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <UserSearch className="w-10 h-10 text-[#E91E63]" />
                </div>
                <CardTitle className="text-2xl text-white">Job Seeker</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-300 text-base leading-relaxed mb-4">
                  Find your dream job in real estate across the Middle East
                </CardDescription>
                <ul className="text-left text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>AI-powered job matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>Resume builder & career tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>Interview preparation hub</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Employer/Developer */}
            <Card
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 cursor-pointer group hover:scale-105 hover:shadow-2xl"
              onClick={() => handleRoleSelect("employer")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-[#E91E63]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Code className="w-10 h-10 text-[#E91E63]" />
                </div>
                <CardTitle className="text-2xl text-white">Employer / Developer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-300 text-base leading-relaxed mb-4">
                  Hire top real estate talent in the Middle East region
                </CardDescription>
                <ul className="text-left text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>Access verified professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>Advanced ATS & screening tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>Video interviews & assessments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Broker */}
            <Card
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 cursor-pointer group hover:scale-105 hover:shadow-2xl"
              onClick={() => handleRoleSelect("broker")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-[#E91E63]/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Building2 className="w-10 h-10 text-[#E91E63]" />
                </div>
                <CardTitle className="text-2xl text-white">Broker / Agency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-300 text-base leading-relaxed mb-4">
                  Connect talent with opportunities in real estate
                </CardDescription>
                <ul className="text-left text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>Dual access to jobs & candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>Commission tracking tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>Client & candidate management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">You can change your role anytime from your profile settings</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm animate-slide-down">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <AnimatedLogo size="md" />
            </div>
            <div>
              <p className="text-xs text-gray-600">
                {language === "ar"
                  ? "شبكة العقارات"
                  : language === "ur"
                    ? "رئیل اسٹیٹ نیٹ ورک"
                    : language === "hi"
                      ? "रियल एस्टेट नेटवर्क"
                      : language === "fa"
                        ? "شبکه املاک"
                        : "Real Estate Network"}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:scale-105 transition-all duration-300"
            >
              <Globe className="w-4 h-4 animate-spin-slow" />
              {languageLabels[language]}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleChangeRole}
              className="text-[#2C3E50] hover:text-[#E91E63] transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              Change Role
            </Button>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent hover:scale-105 hover:shadow-lg transition-all duration-300 border-[#2C3E50] text-[#2C3E50] hover:bg-gray-50"
              >
                {currentContent.nav.signIn}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="sm"
                className="bg-[#008080] hover:bg-[#006666] text-white hover:scale-105 hover:shadow-lg transition-all duration-300 bg-[#E91E63] hover:bg-[#C2185B] text-white"
              >
                {currentContent.nav.joinNow}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Job Seeker View */}
      {selectedRole === "job-seeker" && (
        <>
          <section className="py-20 px-4 bg-gradient-to-br from-[#2C3E50] to-[#34495E] text-white relative overflow-hidden">
            <div className="absolute top-20 left-10 animate-float">
              <Sparkles className="w-8 h-8 text-[#E91E63]/30" />
            </div>
            <div className="absolute bottom-20 right-20 animate-float-delayed">
              <Sparkles className="w-6 h-6 text-[#E91E63]/30" />
            </div>

            <div className="container mx-auto text-center max-w-4xl">
              <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-[#E91E63]/20 text-[#E91E63] border-[#E91E63]/30">
                🎯 For Job Seekers
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">Find Your Dream Real Estate Career</h1>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Connect with top employers across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/search">
                  <Button size="lg" className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-6 text-lg group">
                    Browse Jobs
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/resume-builder">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 text-lg border-2 border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    Build Resume
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Job Seeker Features */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Your Career Toolkit</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Smart Job Matching",
                    description: "AI finds the perfect roles for your skills",
                    icon: Target,
                    href: "/search",
                  },
                  {
                    title: "Resume Builder",
                    description: "Create ATS-optimized resumes in minutes",
                    icon: Users,
                    href: "/resume-builder",
                  },
                  {
                    title: "Interview Prep",
                    description: "Practice with AI mock interviews",
                    icon: Briefcase,
                    href: "/interview-hub",
                  },
                ].map((feature, index) => (
                  <Link key={index} href={feature.href}>
                    <Card className="border-[#2C3E50]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                      <CardHeader>
                        <div className="w-12 h-12 bg-[#E91E63]/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <feature.icon className="w-6 h-6 text-[#E91E63]" />
                        </div>
                        <CardTitle className="text-[#2C3E50]">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Employer View */}
      {selectedRole === "employer" && (
        <>
          <section className="py-20 px-4 bg-gradient-to-br from-[#2C3E50] to-[#34495E] text-white relative overflow-hidden">
            <div className="absolute top-20 right-10 animate-float">
              <Sparkles className="w-8 h-8 text-[#E91E63]/30" />
            </div>
            <div className="absolute bottom-20 left-20 animate-float-delayed">
              <Sparkles className="w-6 h-6 text-[#E91E63]/30" />
            </div>

            <div className="container mx-auto text-center max-w-4xl">
              <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-[#E91E63]/20 text-[#E91E63] border-[#E91E63]/30">
                💼 For Employers & Developers
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">Hire Top Real Estate Talent</h1>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Access 15,000+ verified professionals across the Middle East region
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/hire-talents">
                  <Button size="lg" className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-6 text-lg group">
                    Find Candidates
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/ats">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 text-lg border-2 border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    Post a Job
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Employer Features */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Hiring Made Simple</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Advanced ATS",
                    description: "Manage candidates through hiring pipeline",
                    icon: Target,
                    href: "/ats",
                  },
                  {
                    title: "Video Interviews",
                    description: "Conduct live and async interviews",
                    icon: Users,
                    href: "/interviews",
                  },
                  {
                    title: "Skill Assessments",
                    description: "Test candidates with custom quizzes",
                    icon: Briefcase,
                    href: "/assessments",
                  },
                ].map((feature, index) => (
                  <Link key={index} href={feature.href}>
                    <Card className="border-[#2C3E50]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                      <CardHeader>
                        <div className="w-12 h-12 bg-[#E91E63]/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <feature.icon className="w-6 h-6 text-[#E91E63]" />
                        </div>
                        <CardTitle className="text-[#2C3E50]">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Broker View */}
      {selectedRole === "broker" && (
        <>
          <section className="py-20 px-4 bg-gradient-to-br from-[#2C3E50] to-[#34495E] text-white relative overflow-hidden">
            <div className="absolute top-20 left-1/4 animate-float">
              <Sparkles className="w-8 h-8 text-[#E91E63]/30" />
            </div>
            <div className="absolute bottom-20 right-1/4 animate-float-delayed">
              <Sparkles className="w-6 h-6 text-[#E91E63]/30" />
            </div>

            <div className="container mx-auto text-center max-w-4xl">
              <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-[#E91E63]/20 text-[#E91E63] border-[#E91E63]/30">
                🏢 For Brokers & Agencies
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">Connect Talent with Opportunity</h1>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Access both sides of the market - jobs and candidates in one platform
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/search">
                  <Button size="lg" className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-8 py-6 text-lg group">
                    Browse Jobs
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/hire-talents">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 text-lg border-2 border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    Find Candidates
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Broker Features */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Your Brokerage Toolkit</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Dual Marketplace",
                    description: "Access jobs and candidates in one place",
                    icon: Target,
                    href: "/search",
                  },
                  {
                    title: "Commission Tracker",
                    description: "Track placements and earnings",
                    icon: Users,
                    href: "/dashboard/hiring-agency",
                  },
                  {
                    title: "Client Management",
                    description: "Manage employers and job seekers",
                    icon: Briefcase,
                    href: "/dashboard/hiring-agency",
                  },
                ].map((feature, index) => (
                  <Link key={index} href={feature.href}>
                    <Card className="border-[#2C3E50]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                      <CardHeader>
                        <div className="w-12 h-12 bg-[#2C3E50]/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <feature.icon className="w-6 h-6 text-[#2C3E50]" />
                        </div>
                        <CardTitle className="text-[#2C3E50]">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Hero Section */}
      <section
        ref={heroReveal.ref}
        className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      >
        <div className="absolute top-20 left-10 animate-float">
          <Sparkles className="w-6 h-6 text-[#D4AF37]/30" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed" style={{ animationDelay: "1s" }}>
          <Sparkles className="w-8 h-8 text-[#008080]/30" />
        </div>
        <div className="absolute bottom-20 left-1/3 animate-float" style={{ animationDelay: "3s" }}>
          <Sparkles className="w-5 h-5 text-[#D4AF37]/30" />
        </div>

        <div
          className={`container mx-auto text-center max-w-4xl transition-all duration-1000 ${
            heroReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium bg-[#D4AF37]/10 text-[#B8941F] border-[#D4AF37]/20 animate-bounce-slow"
          >
            🏙️ {currentContent.hero.badge}
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance leading-tight animate-fade-in-up">
            {currentContent.hero.title}
          </h1>

          <p
            className="text-xl text-gray-600 mb-10 text-balance max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {currentContent.hero.subtitle}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-[#008080] hover:bg-[#006666] text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                {currentContent.hero.cta}
                <ArrowRight
                  className={`w-5 h-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"} group-hover:translate-x-1 transition-transform`}
                />
              </Button>
            </Link>
            <Link href="/hire-talents">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Hire Talents
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { src: "/dubai-burj-khalifa-skyline-at-sunset.jpg", alt: "Dubai skyline", delay: "0.6s" },
              { src: "/riyadh-modern-architecture-saudi-arabia.jpg", alt: "Riyadh architecture", delay: "0.8s" },
              { src: "/doha-qatar-luxury-waterfront-properties.jpg", alt: "Doha waterfront", delay: "1s" },
            ].map((image, index) => (
              <div
                key={index}
                className="relative h-32 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up group"
                style={{ animationDelay: image.delay }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section ref={showcaseReveal.ref} className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              showcaseReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Your Career, Anywhere You Go</h2>
            <p className="text-xl text-gray-600 text-balance max-w-2xl mx-auto">
              Access opportunities, connect with professionals, and manage your real estate career from your mobile
              device
            </p>
          </div>

          <div
            className={`grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto transition-all duration-1000 delay-200 ${
              showcaseReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Large lifestyle image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl group animate-fade-in-left">
              <Image
                src="/images/design-mode/showcase-lifestyle.png"
                alt="Renet app with professional lifestyle items"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                <h3 className="text-2xl font-bold mb-2">Professional Excellence</h3>
                <p className="text-white/90 text-lg">
                  Join the elite network of real estate professionals across the Middle East
                </p>
              </div>
            </div>

            {/* Two stacked images */}
            <div className="flex flex-col gap-6">
              {/* Login screen image */}
              <div
                className="relative h-[240px] rounded-2xl overflow-hidden shadow-xl group animate-fade-in-right"
                style={{ animationDelay: "0.2s" }}
              >
                <Image
                  src="/images/design-mode/showcase-login.jpeg"
                  alt="Renet mobile app login screen"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-xl font-bold mb-1">Seamless Access</h3>
                  <p className="text-white/90">Login from anywhere, anytime</p>
                </div>
              </div>

              {/* Gaming setup image */}
              <div
                className="relative h-[240px] rounded-2xl overflow-hidden shadow-xl group animate-fade-in-right"
                style={{ animationDelay: "0.4s" }}
              >
                <Image
                  src="/images/design-mode/showcase-workspace.png"
                  alt="Renet app on desk with modern workspace"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-xl font-bold mb-1">Modern Workspace</h3>
                  <p className="text-white/90">Designed for today's professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              { text: "📱 Mobile-First Design", color: "teal", delay: "0s" },
              { text: "🔒 Secure & Private", color: "gold", delay: "0.1s" },
              { text: "⚡ Lightning Fast", color: "teal", delay: "0.2s" },
              { text: "🌍 Available in 5 Languages", color: "gold", delay: "0.3s" },
            ].map((badge, index) => (
              <Badge
                key={index}
                className={`px-4 py-2 ${
                  badge.color === "teal"
                    ? "bg-[#008080]/10 text-[#008080] border-[#008080]/20"
                    : "bg-[#D4AF37]/10 text-[#B8941F] border-[#D4AF37]/20"
                } text-sm hover:scale-110 transition-transform duration-300 animate-fade-in-up cursor-default`}
                style={{ animationDelay: badge.delay }}
              >
                {badge.text}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Renet Platform Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Explore Renet Platform</h2>
            <p className="text-xl text-gray-600 text-balance max-w-2xl mx-auto">
              Comprehensive tools and resources for real estate professionals across the Middle East
            </p>
          </div>

          {/* For Job Seekers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 animate-fade-in-left">
              <Users className="w-7 h-7 text-[#008080]" />
              For Job Seekers
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {platformPages.jobSeekers.map((page, index) => {
                const Icon = page.icon
                return (
                  <Link key={index} href={page.href}>
                    <Card
                      className="border-gray-200 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 bg-[#008080]/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <Icon className="w-6 h-6 text-[#008080]" />
                        </div>
                        <CardTitle className="text-lg text-gray-900 group-hover:text-[#008080] transition-colors">
                          {page.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed text-gray-600">
                          {page.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* For Employers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 animate-fade-in-left">
              <Briefcase className="w-7 h-7 text-[#D4AF37]" />
              For Employers & Agencies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformPages.employers.map((page, index) => {
                const Icon = page.icon
                return (
                  <Link key={index} href={page.href}>
                    <Card
                      className="border-gray-200 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <Icon className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <CardTitle className="text-lg text-gray-900 group-hover:text-[#D4AF37] transition-colors">
                          {page.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed text-gray-600">
                          {page.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Marketplace & Tools */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 animate-fade-in-left">
              <Building2 className="w-7 h-7 text-[#008080]" />
              Marketplace & Tools
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformPages.marketplace.map((page, index) => {
                const Icon = page.icon
                return (
                  <Link key={index} href={page.href}>
                    <Card
                      className="border-gray-200 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 bg-[#008080]/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <Icon className="w-6 h-6 text-[#008080]" />
                        </div>
                        <CardTitle className="text-lg text-gray-900 group-hover:text-[#008080] transition-colors">
                          {page.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed text-gray-600">
                          {page.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Community & Learning */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 animate-fade-in-left">
              <GraduationCap className="w-7 h-7 text-[#D4AF37]" />
              Community & Learning
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformPages.community.map((page, index) => {
                const Icon = page.icon
                return (
                  <Link key={index} href={page.href}>
                    <Card
                      className="border-gray-200 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <Icon className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <CardTitle className="text-lg text-gray-900 group-hover:text-[#D4AF37] transition-colors">
                          {page.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed text-gray-600">
                          {page.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresReveal.ref} className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              featuresReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">{currentContent.features.title}</h2>
            <p className="text-xl text-gray-600 text-balance max-w-2xl mx-auto">{currentContent.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.features.items.map((feature, index) => {
              const Icon = featureIcons[index]
              return (
                <Card
                  key={index}
                  className={`border-gray-200 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                    featuresReveal.isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <Icon className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <CardTitle className="text-xl text-gray-900 group-hover:text-[#D4AF37] transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsReveal.ref}
        className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl animate-pulse-slow" />
          <div
            className="absolute bottom-10 right-10 w-32 h-32 bg-[#008080]/5 rounded-full blur-2xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              statsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentContent.stats.title}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: `${counters.professionals.toLocaleString()}+`, label: currentContent.stats.items[0].label },
              { number: `${counters.countries}+`, label: currentContent.stats.items[1].label },
              { number: `${counters.jobs.toLocaleString()}+`, label: currentContent.stats.items[2].label },
              { number: `${counters.companies}+`, label: currentContent.stats.items[3].label },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ${
                  statsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2 animate-pulse-slow">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#008080]/5 to-[#D4AF37]/5 relative overflow-hidden">
        <div className="absolute top-10 right-10 animate-float">
          <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full blur-xl" />
        </div>
        <div className="absolute bottom-10 left-10 animate-float-delayed">
          <div className="w-32 h-32 bg-[#008080]/10 rounded-full blur-xl" />
        </div>

        <div className="container mx-auto text-center max-w-3xl animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-balance">{currentContent.cta.title}</h2>
          <p className="text-xl text-gray-600 mb-10 text-balance">{currentContent.cta.subtitle}</p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-[#008080] hover:bg-[#006666] text-white px-8 py-6 text-lg shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group animate-bounce-slow"
            >
              {currentContent.cta.button}
              <ArrowRight
                className={`w-5 h-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"} group-hover:translate-x-2 transition-transform`}
              />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0 group">
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedLogo size="sm" />
              </div>
              <div>
                <div className="text-xs text-gray-600">
                  {language === "ar"
                    ? "شبكة العقارات"
                    : language === "ur"
                      ? "رئیل اسٹیٹ نیٹ ورک"
                      : language === "hi"
                        ? "रियल एस्टेट नेटवर्क"
                        : language === "fa"
                          ? "شبکه املاک"
                          : "Real Estate Network"}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">© 2025 Renet. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
