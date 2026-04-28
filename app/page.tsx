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

  const roleJourneys = {
    "job-seeker": {
      eyebrow: "Career Launchpad",
      title: "Everything a job seeker needs to move from search to shortlist",
      subtitle: "Focused actions, smarter preparation, and a cleaner path to the next offer.",
      stats: [
        { value: "2.5K+", label: "open roles" },
        { value: "AI", label: "resume help" },
        { value: "24/7", label: "prep support" },
      ],
      sections: [
        {
          title: "Apply With Confidence",
          icon: UserSearch,
          accent: "teal",
          pages: [
            { title: "Browse Jobs", description: "Search active roles by market, company, and specialty", icon: Target, href: "/search" },
            platformPages.jobSeekers[0],
            platformPages.jobSeekers[1],
          ],
        },
        {
          title: "Build Your Advantage",
          icon: GraduationCap,
          accent: "gold",
          pages: [
            platformPages.jobSeekers[2],
            platformPages.jobSeekers[3],
            platformPages.jobSeekers[4],
          ],
        },
      ],
    },
    employer: {
      eyebrow: "Hiring Workspace",
      title: "A sharper employer flow for sourcing, screening, and hiring",
      subtitle: "The right tools for building teams without jumping between disconnected pages.",
      stats: [
        { value: "15K+", label: "verified profiles" },
        { value: "ATS", label: "pipeline ready" },
        { value: "Live", label: "interview flow" },
      ],
      sections: [
        {
          title: "Core Hiring Actions",
          icon: Briefcase,
          accent: "gold",
          pages: [...platformPages.employers],
        },
        {
          title: "Recruitment Operations",
          icon: Wrench,
          accent: "teal",
          pages: [
            { title: "ATS Dashboard", description: "Track every candidate from application to offer", icon: Target, href: "/ats" },
            { title: "Interview Hub", description: "Run live and async interviews from one place", icon: Video, href: "/interviews" },
            { title: "Assessments", description: "Validate skill fit before final decisions", icon: FileText, href: "/assessments" },
          ],
        },
      ],
    },
    broker: {
      eyebrow: "Brokerage Flow",
      title: "A broker view built for matching jobs, talent, and client demand",
      subtitle: "Balanced tools for pipeline management, sourcing, and placement activity.",
      stats: [
        { value: "Dual", label: "jobs + talent" },
        { value: "Fast", label: "client follow-up" },
        { value: "360", label: "placement flow" },
      ],
      sections: [
        {
          title: "Broker Actions",
          icon: Building2,
          accent: "teal",
          pages: [
            { title: "Browse Jobs", description: "See active briefs and open hiring demand", icon: Target, href: "/search" },
            { title: "Candidate Search", description: "Source verified professionals for live mandates", icon: UserPlus, href: "/hire-talents" },
            { title: "Agency Dashboard", description: "Manage clients, roles, and placements", icon: Briefcase, href: "/dashboard/hiring-agency" },
          ],
        },
        {
          title: "Brokerage Growth",
          icon: TrendingUp,
          accent: "gold",
          pages: [
            { title: "Directory", description: "Discover employers, developers, and talent pools", icon: MapPin, href: "/directory" },
            { title: "Market News", description: "Stay ahead of regional demand shifts", icon: Newspaper, href: "/news" },
            { title: "Tools Hub", description: "Use templates and calculators for faster execution", icon: Wrench, href: "/tools" },
          ],
        },
      ],
    },
  } as const

  const activeJourney = selectedRole ? roleJourneys[selectedRole] : null
  const accentClasses = {
    teal: {
      icon: "text-[#008080]",
      bg: "bg-[#008080]/10",
      hover: "group-hover:text-[#008080]",
      border: "border-[#008080]/20",
      pill: "bg-[#008080]/10 text-[#008080]",
    },
    gold: {
      icon: "text-[#D4AF37]",
      bg: "bg-[#D4AF37]/10",
      hover: "group-hover:text-[#D4AF37]",
      border: "border-[#D4AF37]/20",
      pill: "bg-[#D4AF37]/10 text-[#9A7400]",
    },
  } as const

  if (showRoleSelection) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_50%_20%,#102C56_0%,#0A2144_35%,#051736_60%,#010915_100%)] flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.12),transparent_28%,transparent_72%,rgba(255,255,255,0.04))]" />
          <div className="absolute top-20 left-[14%] h-56 w-56 rounded-full bg-[#2F61B0]/28 blur-3xl" />
          <div className="absolute right-[12%] top-20 h-64 w-64 rounded-full bg-[#1F4F9F]/30 blur-3xl" />
          <div className="absolute bottom-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#0E3272]/30 blur-3xl" />
        </div>

        <div className="max-w-6xl w-full animate-fade-in-up">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="flex justify-center mb-5">
              <AnimatedLogo size="lg" />
            </div>
            <div className="inline-flex items-center rounded-full border border-[#A5BDE6]/30 bg-[linear-gradient(180deg,rgba(62,96,151,0.58),rgba(40,68,114,0.46))] px-4 py-2 text-sm text-[#E4EEFF] backdrop-blur-sm shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
              Choose your workspace
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF3D90] shadow-[0_0_14px_rgba(255,61,144,0.72)]" />
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Welcome to Renet</h1>
              <div className="h-2.5 w-2.5 rounded-full bg-[#FF3D90] shadow-[0_0_14px_rgba(255,61,144,0.72)]" />
            </div>
            <p className="mt-4 text-base md:text-lg text-[#C8D6F3]">
              Select your role to unlock a more relevant experience from the first screen.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Job Seeker */}
            <Card
              className="relative overflow-hidden rounded-[22px] border border-[#8FA9D8]/30 bg-[linear-gradient(180deg,rgba(18,36,72,0.96)_0%,rgba(11,26,56,0.94)_50%,rgba(6,18,42,0.92)_100%)] backdrop-blur-xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 hover:border-[#FF3D90]/75 hover:shadow-[0_22px_52px_rgba(0,0,0,0.45)]"
              onClick={() => handleRoleSelect("job-seeker")}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF2F80] to-transparent opacity-100" />
              <CardHeader className="text-center pb-3 pt-7 px-5">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full border border-[#8CA4D6]/20 bg-[#314D7D]/45 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#D7E2FD]">
                    Career
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full border border-[#7D98CC]/28 bg-[radial-gradient(circle_at_top,rgba(76,112,176,0.32),rgba(28,52,95,0.62))] flex items-center justify-center mx-auto mb-4 transition-all duration-300 shadow-[0_0_35px_rgba(255,47,128,0.25)] group-hover:shadow-[0_0_50px_rgba(255,47,128,0.5)] group-hover:shadow-[0_0_38px_rgba(255,47,128,0.32)]">
                  <UserSearch className="w-8 h-8 text-[#FF2F80]" />
                </div>
                <CardTitle className="text-[2rem] leading-none text-white">Job Seeker</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-5 pb-5">
                <CardDescription className="text-[#C9D6F1] text-sm leading-7 mb-5">
                  Find your dream job in real estate across the Middle East
                </CardDescription>
                <div className="mb-5 h-px bg-[#89A5DB]/20" />
                <ul className="text-left text-[#D5E1FA] text-sm space-y-2.5">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#FF2F80]/55">
                      <Sparkles className="w-2.5 h-2.5 text-[#FF2F80] flex-shrink-0" />
                    </div>
                    <span>AI-powered job matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#E91E63]/50">
                      <Sparkles className="w-2.5 h-2.5 text-[#E91E63] flex-shrink-0" />
                    </div>
                    <span>Resume builder & career tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#E91E63]/50">
                      <Sparkles className="w-2.5 h-2.5 text-[#E91E63] flex-shrink-0" />
                    </div>
                    <span>Interview preparation hub</span>
                  </li>
                </ul>
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#7F9ACD]/25 bg-[linear-gradient(180deg,rgba(50,76,121,0.5),rgba(33,55,97,0.46))] px-4 py-3 text-sm text-[#E4EBFF]">
                  <span>Explore job tools</span>
                  <ArrowRight className="h-4 w-4 text-[#FF2F80] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>

            {/* Employer/Developer */}
            <Card
              className="relative overflow-hidden rounded-[22px] border border-[#8FA9D8]/30 bg-[linear-gradient(180deg,rgba(18,36,72,0.96)_0%,rgba(11,26,56,0.94)_50%,rgba(6,18,42,0.92)_100%)] backdrop-blur-xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 hover:border-[#FF3D90]/75 hover:shadow-[0_22px_52px_rgba(0,0,0,0.45)]"
              onClick={() => handleRoleSelect("employer")}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF2F80] to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500" />
              <CardHeader className="text-center pb-3 pt-7 px-5">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full border border-[#8CA4D6]/20 bg-[#314D7D]/45 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#D7E2FD]">
                    Hiring
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full border border-[#7D98CC]/28 bg-[radial-gradient(circle_at_top,rgba(76,112,176,0.32),rgba(28,52,95,0.62))] flex items-center justify-center mx-auto mb-4 transition-all duration-300 shadow-[0_0_30px_rgba(30,89,187,0.28)] group-hover:shadow-[0_0_38px_rgba(255,47,128,0.32)]">
                  <Code className="w-8 h-8 text-[#FF2F80]" />
                </div>
                <CardTitle className="text-[2rem] leading-none text-white">Employer / Developer</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-5 pb-5">
                <CardDescription className="text-[#C9D6F1] text-sm leading-7 mb-5">
                  Hire top real estate talent in the Middle East region
                </CardDescription>
                <div className="mb-5 h-px bg-[#89A5DB]/20" />
                <ul className="text-left text-[#D5E1FA] text-sm space-y-2.5">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#FF2F80]/55">
                      <Sparkles className="w-2.5 h-2.5 text-[#FF2F80] flex-shrink-0" />
                    </div>
                    <span>Access verified professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#E91E63]/50">
                      <Sparkles className="w-2.5 h-2.5 text-[#E91E63] flex-shrink-0" />
                    </div>
                    <span>Advanced ATS & screening tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#E91E63]/50">
                      <Sparkles className="w-2.5 h-2.5 text-[#E91E63] flex-shrink-0" />
                    </div>
                    <span>Video interviews & assessments</span>
                  </li>
                </ul>
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#7F9ACD]/25 bg-[linear-gradient(180deg,rgba(50,76,121,0.5),rgba(33,55,97,0.46))] px-4 py-3 text-sm text-[#E4EBFF]">
                  <span>Open hiring workspace</span>
                  <ArrowRight className="h-4 w-4 text-[#FF2F80] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>

            {/* Broker */}
            <Card
              className="relative overflow-hidden rounded-[22px] border border-[#8FA9D8]/30 bg-[linear-gradient(180deg,rgba(18,36,72,0.96)_0%,rgba(11,26,56,0.94)_50%,rgba(6,18,42,0.92)_100%)] backdrop-blur-xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 hover:border-[#FF3D90]/75 hover:shadow-[0_22px_52px_rgba(0,0,0,0.45)]"
              onClick={() => handleRoleSelect("broker")}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF2F80] to-transparent opacity-100" />
              <CardHeader className="text-center pb-3 pt-7 px-5">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full border border-[#8CA4D6]/20 bg-[#314D7D]/45 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#D7E2FD]">
                    Brokerage
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full border border-[#7D98CC]/28 bg-[radial-gradient(circle_at_top,rgba(76,112,176,0.32),rgba(28,52,95,0.62))] flex items-center justify-center mx-auto mb-4 transition-all duration-300 shadow-[0_0_30px_rgba(30,89,187,0.28)] group-hover:shadow-[0_0_38px_rgba(255,47,128,0.32)]">
                  <Building2 className="w-8 h-8 text-[#FF2F80]" />
                </div>
                <CardTitle className="text-[2rem] leading-none text-white">Broker / Agency</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-5 pb-5">
                <CardDescription className="text-[#C9D6F1] text-sm leading-7 mb-5">
                  Connect talent with opportunities in real estate
                </CardDescription>
                <div className="mb-5 h-px bg-[#89A5DB]/20" />
                <ul className="text-left text-[#D5E1FA] text-sm space-y-2.5">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#FF2F80]/55">
                      <Sparkles className="w-2.5 h-2.5 text-[#FF2F80] flex-shrink-0" />
                    </div>
                    <span>Dual access to jobs & candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#E91E63]/50">
                      <Sparkles className="w-2.5 h-2.5 text-[#E91E63] flex-shrink-0" />
                    </div>
                    <span>Commission tracking tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-[#E91E63]/50">
                      <Sparkles className="w-2.5 h-2.5 text-[#E91E63] flex-shrink-0" />
                    </div>
                    <span>Client & candidate management</span>
                  </li>
                </ul>
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#7F9ACD]/25 bg-[linear-gradient(180deg,rgba(50,76,121,0.5),rgba(33,55,97,0.46))] px-4 py-3 text-sm text-[#E4EBFF]">
                  <span>Enter broker mode</span>
                  <ArrowRight className="h-4 w-4 text-[#FF2F80] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[#D6E3FF]">
            <div className="rounded-full border border-[#88A5DB]/35 bg-[linear-gradient(180deg,rgba(36,63,109,0.68),rgba(26,45,82,0.56))] px-5 py-2.5 shadow-[0_16px_28px_rgba(0,0,0,0.24)]">Tailored tools by role</div>
            <div className="rounded-full border border-[#88A5DB]/35 bg-[linear-gradient(180deg,rgba(36,63,109,0.68),rgba(26,45,82,0.56))] px-5 py-2.5 shadow-[0_16px_28px_rgba(0,0,0,0.24)]">Switch anytime later</div>
            <div className="rounded-full border border-[#88A5DB]/35 bg-[linear-gradient(180deg,rgba(36,63,109,0.68),rgba(26,45,82,0.56))] px-5 py-2.5 shadow-[0_16px_28px_rgba(0,0,0,0.24)]">Same Renet network, clearer path</div>
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
            {selectedRole !== "job-seeker" && (
              <>
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
              </>
            )}
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
          {activeJourney ? (
            <>
              <div className="mx-auto mb-14 max-w-5xl text-center animate-fade-in-up">
                <Badge className="mb-5 border-[#2C3E50]/10 bg-[#2C3E50]/5 px-4 py-2 text-[#2C3E50]">
                  {activeJourney.eyebrow}
                </Badge>
                <h2 className="mb-4 text-4xl font-bold text-gray-900 text-balance">{activeJourney.title}</h2>
                <p className="mx-auto max-w-3xl text-xl text-gray-600 text-balance">{activeJourney.subtitle}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {activeJourney.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <span className="font-semibold text-gray-900">{stat.value}</span>
                      <span className="ml-2 text-gray-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeJourney.sections.map((section, sectionIndex) => {
                const SectionIcon = section.icon
                const accent = accentClasses[section.accent]

                return (
                  <div key={section.title} className="mb-16">
                    <div className="mb-6 flex items-center justify-between gap-4 animate-fade-in-left">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent.bg}`}>
                          <SectionIcon className={`h-6 w-6 ${accent.icon}`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-500">Focused actions for your role</p>
                        </div>
                      </div>
                      <div className={`hidden rounded-full px-3 py-1 text-xs font-medium md:block ${accent.pill}`}>
                        {section.pages.length} actions
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {section.pages.map((page, index) => {
                        const Icon = page.icon
                        return (
                          <Link key={page.title} href={page.href}>
                            <Card
                              className={`group h-full cursor-pointer border bg-white/95 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${accent.border}`}
                              style={{ animationDelay: `${sectionIndex * 0.12 + index * 0.08}s` }}
                            >
                              <CardHeader className="pb-4">
                                <div
                                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${accent.bg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                                >
                                  <Icon className={`h-7 w-7 ${accent.icon}`} />
                                </div>
                                <CardTitle className={`text-xl text-gray-900 transition-colors ${accent.hover}`}>
                                  {page.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <CardDescription className="text-sm leading-7 text-gray-600">
                                  {page.description}
                                </CardDescription>
                                <div className="mt-6 flex items-center text-sm font-medium text-gray-900">
                                  Open
                                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Explore Renet Platform</h2>
              <p className="text-xl text-gray-600 text-balance max-w-2xl mx-auto">
                Comprehensive tools and resources for real estate professionals across the Middle East
              </p>
            </div>
          )}
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

