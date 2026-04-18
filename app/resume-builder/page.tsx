"use client"

import type { ReactNode } from "react"
import { useRef, useState } from "react"
import { jsPDF } from "jspdf"
import { Download, Eye, Globe, Plus, Sparkles, Trash2 } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const templates = [
  { id: 1, name: "Dubai Professional", style: "modern", language: "English", preview: "/professional-resume-template.png" },
  { id: 2, name: "Arabic/English Dual", style: "bilingual", language: "Arabic/English", preview: "/bilingual-arabic-english-resume.jpg" },
  { id: 3, name: "Saudi Executive", style: "executive", language: "Arabic", preview: "/executive-arabic-resume.jpg" },
  { id: 4, name: "Qatar Minimalist", style: "minimal", language: "English", preview: "/minimalist-resume-template.png" },
  { id: 5, name: "UAE Real Estate", style: "industry", language: "English", preview: "/real-estate-resume-template.jpg" },
] as const

const templateThemes = {
  modern: {
    accent: "#0F766E",
    soft: "#E6FFFA",
    deep: "#0F172A",
    muted: "#475569",
    badge: "border-teal-200 bg-teal-50 text-teal-700",
    preview: "border-teal-200",
  },
  bilingual: {
    accent: "#1D4ED8",
    soft: "#EFF6FF",
    deep: "#0F172A",
    muted: "#475569",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    preview: "border-blue-200",
  },
  executive: {
    accent: "#92400E",
    soft: "#FFF7ED",
    deep: "#111827",
    muted: "#57534E",
    badge: "border-amber-200 bg-amber-50 text-amber-800",
    preview: "border-amber-200",
  },
  minimal: {
    accent: "#475569",
    soft: "#F8FAFC",
    deep: "#0F172A",
    muted: "#64748B",
    badge: "border-slate-200 bg-slate-100 text-slate-700",
    preview: "border-slate-200",
  },
  industry: {
    accent: "#7C3AED",
    soft: "#F5F3FF",
    deep: "#111827",
    muted: "#4B5563",
    badge: "border-violet-200 bg-violet-50 text-violet-700",
    preview: "border-violet-200",
  },
} as const

type TemplateStyle = (typeof templates)[number]["style"]

function formatSectionLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim().replace(/^[\u2022*-]\s*/, ""))
    .filter(Boolean)
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "")
  const safeHex = normalized.length === 3 ? normalized.split("").map((char) => `${char}${char}`).join("") : normalized
  const value = Number.parseInt(safeHex, 16)

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function slugifyFileName(value: string) {
  return value.trim().replace(/[<>:"/\\|?*\x00-\x1F]/g, "").replace(/\s+/g, "-")
}

function formatResumeDate(value: string) {
  if (!value) return ""

  const [year, month] = value.split("-")
  if (!year || !month) return value

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const monthIndex = Number(month) - 1
  if (monthIndex < 0 || monthIndex > 11) return year

  return `${monthNames[monthIndex]} ${year}`
}

function formatDateRange(fromDate: string, toDate: string) {
  const fromLabel = formatResumeDate(fromDate)
  const toLabel = formatResumeDate(toDate)

  if (fromLabel && toLabel) return `${fromLabel} - ${toLabel}`
  if (fromLabel) return `${fromLabel} - Present`
  if (toLabel) return toLabel
  return ""
}

type ResumeData = {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
}

type ResumeStep = "personal" | "experience" | "education" | "skills"
type EducationType = "High School" | "Certification" | "Bachelor's Degree" | "Diploma" | "Other" | "Master's Degree" | "PhD"

type ExperienceItem = {
  role: string
  company: string
  description: string
}

type EducationItem = {
  type: EducationType
  title: string
  institution: string
  score: string
  fromDate: string
  toDate: string
}

const createExperienceItem = (overrides: Partial<ExperienceItem> = {}): ExperienceItem => ({
  role: "",
  company: "",
  description: "",
  ...overrides,
})

const createEducationItem = (overrides: Partial<EducationItem> = {}): EducationItem => ({
  type: "Bachelor's Degree",
  title: "",
  institution: "",
  score: "",
  fromDate: "",
  toDate: "",
  ...overrides,
})

const formSteps: Record<
  ResumeStep,
  {
    label: string
    title: string
    description: string
    tip: string
  }
> = {
  personal: {
    label: "Personal",
    title: "Start with your basic details",
    description: "Add the contact details and role you want recruiters to see first.",
    tip: "Use the job title you are targeting, not only your current title.",
  },
  experience: {
    label: "Experience",
    title: "Add achievements, not just responsibilities",
    description: "Add your role, company, and a short description for each experience item.",
    tip: "Keep the description concise and results-focused so recruiters can scan it quickly.",
  },
  education: {
    label: "Education",
    title: "Keep each qualification easy to read",
    description: "Choose a heading, add the qualification, include your score, and select from and to dates on the right.",
    tip: "Use clear headings like High School, Bachelor's Degree, Master's Degree, PhD, or Certification.",
  },
  skills: {
    label: "Skills",
    title: "Add searchable skills recruiters look for",
    description: "Add one skill per field so each one is easy to review, edit, and showcase clearly.",
    tip: "Mix industry skills and tools, for example: Negotiation, CRM, Market Analysis, and RERA.",
  },
}

type PreviewProps = {
  data: ResumeData
  theme: (typeof templateThemes)[TemplateStyle]
  experienceLines: string[]
  educationLines: string[]
  skillsList: string[]
}

function ResumeSection({
  title,
  accent,
  children,
  className = "",
}: {
  title: string
  accent: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={className}>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: accent }}>
        {title}
      </h3>
      {children}
    </section>
  )
}

function listOrFallback(lines: string[], accent: string, fallback: string) {
  if (!lines.length) {
    return <p className="text-sm leading-7 text-slate-500">{fallback}</p>
  }

  return (
    <ul className="space-y-2 text-sm leading-7 text-slate-700">
      {lines.map((line, index) => (
        <li key={`${line}-${index}`} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

function skillsOrFallback(skillsList: string[], accent: string, soft: string) {
  if (!skillsList.length) {
    return <p className="text-sm leading-7 text-slate-500">Add your key skills to preview them here.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skillsList.map((skill) => (
        <span
          key={skill}
          className="rounded-full border px-3 py-1 text-xs font-semibold"
          style={{ borderColor: accent, color: accent, backgroundColor: soft }}
        >
          {skill}
        </span>
      ))}
    </div>
  )
}

function ModernPreview({ data, theme, experienceLines, educationLines, skillsList }: PreviewProps) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
      <div className="px-8 py-8" style={{ background: `linear-gradient(135deg, ${theme.soft}, white 55%)` }}>
        <div className="flex flex-wrap items-start justify-between gap-6 border-b pb-6" style={{ borderColor: `${theme.accent}30` }}>
          <div>
            <h2 className="text-4xl font-bold" style={{ color: theme.deep }}>
              {data.fullName || "Your Name"}
            </h2>
            <p className="mt-2 text-lg font-medium" style={{ color: theme.accent }}>
              {data.title || "Professional Title"}
            </p>
          </div>
          <div className="space-y-1 text-right text-sm" style={{ color: theme.muted }}>
            <p>{data.email || "email@example.com"}</p>
            <p>{data.phone || "+00 000 000 0000"}</p>
            <p>{data.location || "City, Country"}</p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <ResumeSection title="Professional Summary" accent={theme.accent}>
            <p className="text-sm leading-7 text-slate-700">
              {data.summary || "Add a concise professional summary to preview your resume here."}
            </p>
          </ResumeSection>
          <ResumeSection title="Experience" accent={theme.accent}>
            {listOrFallback(experienceLines, theme.accent, "Add your work experience to preview it here.")}
          </ResumeSection>
          <ResumeSection title="Education" accent={theme.accent}>
            {listOrFallback(educationLines, theme.accent, "Add your education and certifications to preview them here.")}
          </ResumeSection>
          <ResumeSection title="Skills" accent={theme.accent}>
            {skillsOrFallback(skillsList, theme.accent, theme.soft)}
          </ResumeSection>
        </div>
      </div>
    </div>
  )
}

function BilingualPreview({ data, theme, experienceLines, educationLines, skillsList }: PreviewProps) {
  const summary = data.summary || "Add a concise professional summary to preview your resume here."

  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
      <div className="grid md:grid-cols-[1.05fr_0.95fr]">
        <div className="px-8 py-8" style={{ backgroundColor: theme.soft }}>
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
            English
          </p>
          <h2 className="mt-4 text-3xl font-bold" style={{ color: theme.deep }}>
            {data.fullName || "Your Name"}
          </h2>
          <p className="mt-2 text-base font-medium" style={{ color: theme.accent }}>
            {data.title || "Professional Title"}
          </p>

          <div className="mt-6 space-y-4 text-sm" style={{ color: theme.muted }}>
            <p>{data.email || "email@example.com"}</p>
            <p>{data.phone || "+00 000 000 0000"}</p>
            <p>{data.location || "City, Country"}</p>
          </div>

          <ResumeSection title="Skills" accent={theme.accent} className="mt-8">
            {skillsOrFallback(skillsList, theme.accent, "white")}
          </ResumeSection>

          <ResumeSection title="Education" accent={theme.accent} className="mt-8">
            {listOrFallback(educationLines, theme.accent, "Add your education and certifications to preview them here.")}
          </ResumeSection>
        </div>

        <div className="px-8 py-8">
          <div className="flex items-center justify-between border-b pb-5" style={{ borderColor: `${theme.accent}30` }}>
            <div>
              <p className="text-xs uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
                Arabic
              </p>
              <p className="mt-2 text-right text-lg font-semibold" dir="rtl" style={{ color: theme.deep }}>
                {data.fullName || "اسمك هنا"}
              </p>
            </div>
            <div className="h-16 w-px" style={{ backgroundColor: `${theme.accent}30` }} />
          </div>

          <ResumeSection title="Professional Summary" accent={theme.accent} className="mt-6">
            <p className="text-sm leading-7 text-slate-700">{summary}</p>
            <p className="mt-3 text-sm leading-7 text-slate-500" dir="rtl">
              {summary}
            </p>
          </ResumeSection>

          <ResumeSection title="Experience" accent={theme.accent} className="mt-6">
            {listOrFallback(experienceLines, theme.accent, "Add your work experience to preview it here.")}
          </ResumeSection>
        </div>
      </div>
    </div>
  )
}

function ExecutivePreview({ data, theme, experienceLines, educationLines, skillsList }: PreviewProps) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
      <div className="px-8 py-8">
        <div className="rounded-[24px] px-8 py-8" style={{ backgroundColor: theme.deep }}>
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#FCD34D" }}>
            Executive Profile
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white">{data.fullName || "Your Name"}</h2>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
            <span>{data.title || "Professional Title"}</span>
            <span>{data.email || "email@example.com"}</span>
            <span>{data.phone || "+00 000 000 0000"}</span>
            <span>{data.location || "City, Country"}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <ResumeSection title="Professional Summary" accent={theme.accent}>
              <p className="text-sm leading-7 text-slate-700">
                {data.summary || "Add a concise professional summary to preview your resume here."}
              </p>
            </ResumeSection>
            <ResumeSection title="Leadership Experience" accent={theme.accent}>
              {listOrFallback(experienceLines, theme.accent, "Add your work experience to preview it here.")}
            </ResumeSection>
          </div>

          <div className="rounded-[20px] p-6" style={{ backgroundColor: theme.soft }}>
            <ResumeSection title="Education" accent={theme.accent}>
              {listOrFallback(educationLines, theme.accent, "Add your education and certifications to preview them here.")}
            </ResumeSection>
            <ResumeSection title="Core Strengths" accent={theme.accent} className="mt-6">
              {skillsOrFallback(skillsList, theme.accent, "white")}
            </ResumeSection>
          </div>
        </div>
      </div>
    </div>
  )
}

function MinimalPreview({ data, theme, experienceLines, educationLines, skillsList }: PreviewProps) {
  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-sm">
      <div className="px-10 py-10">
        <div className="border-b pb-6" style={{ borderColor: "#E2E8F0" }}>
          <h2 className="text-3xl font-semibold tracking-tight" style={{ color: theme.deep }}>
            {data.fullName || "Your Name"}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.28em]" style={{ color: theme.muted }}>
            {data.title || "Professional Title"}
          </p>
          <p className="mt-4 text-sm" style={{ color: theme.muted }}>
            {[data.email || "email@example.com", data.phone || "+00 000 000 0000", data.location || "City, Country"].join("  •  ")}
          </p>
        </div>

        <div className="mt-8 space-y-8">
          <ResumeSection title="Summary" accent={theme.accent}>
            <p className="text-sm leading-7 text-slate-700">
              {data.summary || "Add a concise professional summary to preview your resume here."}
            </p>
          </ResumeSection>
          <ResumeSection title="Experience" accent={theme.accent}>
            {listOrFallback(experienceLines, theme.accent, "Add your work experience to preview it here.")}
          </ResumeSection>
          <ResumeSection title="Education" accent={theme.accent}>
            {listOrFallback(educationLines, theme.accent, "Add your education and certifications to preview them here.")}
          </ResumeSection>
          <ResumeSection title="Skills" accent={theme.accent}>
            <p className="text-sm leading-7 text-slate-700">
              {skillsList.length ? skillsList.join(" • ") : "Add your key skills to preview them here."}
            </p>
          </ResumeSection>
        </div>
      </div>
    </div>
  )
}

function IndustryPreview({ data, theme, experienceLines, educationLines, skillsList }: PreviewProps) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
      <div className="grid md:grid-cols-[0.72fr_1.28fr]">
        <aside className="px-7 py-8 text-white" style={{ background: `linear-gradient(180deg, ${theme.accent}, #4C1D95)` }}>
          <h2 className="text-3xl font-bold">{data.fullName || "Your Name"}</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.28em] text-violet-100">{data.title || "Professional Title"}</p>

          <div className="mt-8 space-y-5 text-sm text-violet-50">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-violet-200">Contact</p>
              <p className="mt-2">{data.email || "email@example.com"}</p>
              <p>{data.phone || "+00 000 000 0000"}</p>
              <p>{data.location || "City, Country"}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-violet-200">Skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(skillsList.length ? skillsList : ["Add skills here"]).map((skill) => (
                  <span key={skill} className="rounded-full border border-violet-200/40 px-3 py-1 text-xs font-semibold text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-violet-200">Education</p>
              <div className="mt-3 space-y-2 text-sm leading-6">{educationLines.length ? educationLines.map((line) => <p key={line}>{line}</p>) : <p>Add your education and certifications to preview them here.</p>}</div>
            </div>
          </div>
        </aside>

        <main className="px-8 py-8">
          <ResumeSection title="Profile" accent={theme.accent}>
            <p className="text-sm leading-7 text-slate-700">
              {data.summary || "Add a concise professional summary to preview your resume here."}
            </p>
          </ResumeSection>

          <ResumeSection title="Experience" accent={theme.accent} className="mt-8">
            {listOrFallback(experienceLines, theme.accent, "Add your work experience to preview it here.")}
          </ResumeSection>
        </main>
      </div>
    </div>
  )
}

function TemplatePreview(props: PreviewProps & { style: TemplateStyle }) {
  switch (props.style) {
    case "bilingual":
      return <BilingualPreview {...props} />
    case "executive":
      return <ExecutivePreview {...props} />
    case "minimal":
      return <MinimalPreview {...props} />
    case "industry":
      return <IndustryPreview {...props} />
    default:
      return <ModernPreview {...props} />
  }
}

function buildPdf(doc: jsPDF, style: TemplateStyle, data: ResumeData, theme: (typeof templateThemes)[TemplateStyle], experienceLines: string[], educationLines: string[], skillsList: string[]) {
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 44
  const contentWidth = pageWidth - margin * 2
  const accentRgb = hexToRgb(theme.accent)
  const softRgb = hexToRgb(theme.soft)
  const darkRgb = hexToRgb(theme.deep)
  const mutedRgb = hexToRgb(theme.muted)
  let y = margin

  const ensureSpace = (height: number) => {
    if (y + height <= pageHeight - margin) return
    doc.addPage()
    y = margin
  }

  const textBlock = (
    text: string,
    x = margin,
    width = contentWidth,
    fontSize = 11,
    lineHeight = 16,
    color: [number, number, number] = [55, 65, 81],
    styleName: "normal" | "bold" = "normal",
  ) => {
    const lines = doc.splitTextToSize(text, width)
    doc.setFont("helvetica", styleName)
    doc.setFontSize(fontSize)
    doc.setTextColor(color[0], color[1], color[2])
    for (const line of lines) {
      ensureSpace(lineHeight)
      doc.text(line, x, y)
      y += lineHeight
    }
  }

  const sectionTitle = (title: string, x = margin, width = contentWidth) => {
    ensureSpace(30)
    y += 6
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2])
    doc.text(title.toUpperCase(), x, y)
    y += 10
    doc.setDrawColor(accentRgb[0], accentRgb[1], accentRgb[2])
    doc.line(x, y, x + width, y)
    y += 12
  }

  const bulletList = (lines: string[], x = margin, width = contentWidth, color: [number, number, number] = [55, 65, 81]) => {
    if (!lines.length) {
      textBlock("Add content here.", x, width, 11, 16, [100, 116, 139])
      return
    }
    for (const line of lines) {
      ensureSpace(18)
      doc.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2])
      doc.circle(x + 4, y - 4, 2, "F")
      textBlock(line, x + 14, width - 14, 11, 16, color)
    }
  }

  if (style === "modern") {
    doc.setFillColor(softRgb[0], softRgb[1], softRgb[2])
    doc.rect(0, 0, pageWidth, 120, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(24)
    doc.setTextColor(darkRgb[0], darkRgb[1], darkRgb[2])
    doc.text(data.fullName || "Your Name", margin, 62)
    doc.setFontSize(14)
    doc.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2])
    doc.text(data.title || "Professional Title", margin, 84)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(mutedRgb[0], mutedRgb[1], mutedRgb[2])
    doc.text([data.email || "email@example.com", data.phone || "+00 000 000 0000", data.location || "City, Country"].join(" | "), pageWidth - margin, 84, {
      align: "right",
    })
    y = 140
  } else if (style === "bilingual") {
    doc.setFillColor(softRgb[0], softRgb[1], softRgb[2])
    doc.rect(0, 0, pageWidth * 0.38, pageHeight, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2])
    doc.text("ENGLISH", margin, 52)
    doc.setFontSize(22)
    doc.setTextColor(darkRgb[0], darkRgb[1], darkRgb[2])
    doc.text(data.fullName || "Your Name", margin, 80)
    doc.setFontSize(13)
    doc.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2])
    doc.text(data.title || "Professional Title", margin, 100)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(mutedRgb[0], mutedRgb[1], mutedRgb[2])
    doc.text(data.email || "email@example.com", margin, 132)
    doc.text(data.phone || "+00 000 000 0000", margin, 148)
    doc.text(data.location || "City, Country", margin, 164)

    y = 220
    sectionTitle("Skills", margin, pageWidth * 0.3 - margin)
    textBlock(skillsList.length ? skillsList.join(" | ") : "Add your key skills here.", margin, pageWidth * 0.3 - margin, 10, 14, mutedRgb)
    y += 10
    sectionTitle("Education", margin, pageWidth * 0.3 - margin)
    bulletList(educationLines, margin, pageWidth * 0.3 - margin, mutedRgb)

    y = 52
    const rightX = pageWidth * 0.44
    const rightWidth = pageWidth - rightX - margin
    sectionTitle("Arabic", rightX, rightWidth)
    textBlock(data.fullName || "اسمك هنا", rightX, rightWidth, 18, 22, darkRgb, "bold")
    y += 6
    sectionTitle("Professional Summary", rightX, rightWidth)
    textBlock(data.summary || "Add a concise professional summary to preview your resume here.", rightX, rightWidth, 11, 16, [55, 65, 81])
    textBlock(data.summary || "Add a concise professional summary to preview your resume here.", rightX, rightWidth, 11, 16, [107, 114, 128])
    sectionTitle("Experience", rightX, rightWidth)
    bulletList(experienceLines, rightX, rightWidth)
    return
  } else if (style === "executive") {
    doc.setFillColor(darkRgb[0], darkRgb[1], darkRgb[2])
    doc.roundedRect(margin, 36, contentWidth, 120, 14, 14, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(252, 211, 77)
    doc.text("EXECUTIVE PROFILE", margin + 24, 64)
    doc.setFontSize(24)
    doc.setTextColor(255, 255, 255)
    doc.text(data.fullName || "Your Name", margin + 24, 96)
    doc.setFontSize(11)
    doc.setTextColor(226, 232, 240)
    doc.text([data.title || "Professional Title", data.email || "email@example.com", data.phone || "+00 000 000 0000", data.location || "City, Country"].join("   |   "), margin + 24, 122)
    y = 190
  } else if (style === "minimal") {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(24)
    doc.setTextColor(darkRgb[0], darkRgb[1], darkRgb[2])
    doc.text(data.fullName || "Your Name", margin, 62)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(mutedRgb[0], mutedRgb[1], mutedRgb[2])
    doc.text((data.title || "Professional Title").toUpperCase(), margin, 84)
    doc.text([data.email || "email@example.com", data.phone || "+00 000 000 0000", data.location || "City, Country"].join("  •  "), margin, 104)
    doc.setDrawColor(203, 213, 225)
    doc.line(margin, 120, pageWidth - margin, 120)
    y = 146
  } else if (style === "industry") {
    const sidebarWidth = pageWidth * 0.41
    const sidebarX = 34
    const sidebarTextWidth = sidebarWidth - sidebarX - 24
    const mainX = sidebarWidth + 28
    const mainWidth = pageWidth - mainX - margin
    const sidebarTop = 56
    const name = data.fullName || "Your Name"
    const nameFontSize = name.length > 20 ? 19 : 22
    const titleFontSize = 9.5

    doc.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2])
    doc.rect(0, 0, sidebarWidth, pageHeight, "F")

    y = sidebarTop
    textBlock(name, sidebarX, sidebarTextWidth, nameFontSize, 24, [255, 255, 255], "bold")
    y += 6
    textBlock((data.title || "Professional Title").toUpperCase(), sidebarX, sidebarTextWidth, titleFontSize, 13, [233, 213, 255], "bold")
    y += 18
    textBlock(data.email || "email@example.com", sidebarX, sidebarTextWidth, 10, 14, [245, 243, 255])
    textBlock(data.phone || "+00 000 000 0000", sidebarX, sidebarTextWidth, 10, 14, [245, 243, 255])
    textBlock(data.location || "City, Country", sidebarX, sidebarTextWidth, 10, 14, [245, 243, 255])

    const sidebarProfileEnd = y

    y = Math.max(sidebarProfileEnd + 34, 250)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(233, 213, 255)
    doc.text("SKILLS", sidebarX, y)
    y += 16
    textBlock(skillsList.length ? skillsList.join(" | ") : "Add your key skills here.", sidebarX, sidebarTextWidth, 10, 15, [255, 255, 255])
    y += 18
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(233, 213, 255)
    doc.text("EDUCATION", sidebarX, y)
    y += 16
    bulletList(educationLines, sidebarX, sidebarTextWidth, [255, 255, 255])

    y = sidebarTop
    sectionTitle("Profile", mainX, mainWidth)
    textBlock(data.summary || "Add a concise professional summary to preview your resume here.", mainX, mainWidth, 11, 16, [55, 65, 81])
    sectionTitle("Experience", mainX, mainWidth)
    bulletList(experienceLines, mainX, mainWidth)
    return
  }

  if (style === "executive") {
    const leftWidth = contentWidth * 0.62
    const rightX = margin + leftWidth + 24
    const rightWidth = pageWidth - rightX - margin
    const startY = y
    sectionTitle("Professional Summary", margin, leftWidth)
    textBlock(data.summary || "Add a concise professional summary to preview your resume here.", margin, leftWidth)
    sectionTitle("Leadership Experience", margin, leftWidth)
    bulletList(experienceLines, margin, leftWidth)
    const leftEndY = y

    y = startY
    doc.setFillColor(softRgb[0], softRgb[1], softRgb[2])
    doc.roundedRect(rightX - 14, startY - 8, rightWidth + 14, 260, 12, 12, "F")
    sectionTitle("Education", rightX, rightWidth)
    bulletList(educationLines, rightX, rightWidth)
    sectionTitle("Core Strengths", rightX, rightWidth)
    textBlock(skillsList.length ? skillsList.join(" | ") : "Add your key skills to preview them here.", rightX, rightWidth)
    y = Math.max(leftEndY, y)
    return
  }

  sectionTitle(style === "minimal" ? "Summary" : "Professional Summary")
  textBlock(data.summary || "Add a concise professional summary to preview your resume here.")
  sectionTitle("Experience")
  bulletList(experienceLines)
  sectionTitle("Education")
  bulletList(educationLines)
  sectionTitle("Skills")
  textBlock(skillsList.length ? (style === "minimal" ? skillsList.join(" • ") : skillsList.join(" | ")) : "Add your key skills to preview them here.")
}

export default function ResumeBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[number]>(templates[0])
  const [activeStep, setActiveStep] = useState<ResumeStep>("personal")
  const [formData, setFormData] = useState<ResumeData>({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  })
  const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>([createExperienceItem()])
  const [savedExperienceItems, setSavedExperienceItems] = useState<boolean[]>([false])
  const [educationItems, setEducationItems] = useState<EducationItem[]>([createEducationItem()])
  const [savedEducationItems, setSavedEducationItems] = useState<boolean[]>([false])
  const [skillItems, setSkillItems] = useState<string[]>([])
  const [skillDraft, setSkillDraft] = useState("")
  const [showSkillInput, setShowSkillInput] = useState(true)
  const [aiOptimizing, setAiOptimizing] = useState(false)
  const [atsScore, setAtsScore] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const selectedTheme = templateThemes[selectedTemplate.style]
  const currentStep = formSteps[activeStep]
  const experienceLines = experienceItems
    .map((item) => {
      const role = item.role.trim()
      const company = item.company.trim()
      const description = item.description.trim()
      if (!role && !company && !description) return ""

      const heading = [role, company].filter(Boolean).join(" at ")
      return [heading, description].filter(Boolean).join(": ")
    })
    .filter(Boolean)
  const educationLines = educationItems
    .map((item) => {
      const title = item.title.trim()
      const institution = item.institution.trim()
      const score = item.score.trim()
      const dateRange = formatDateRange(item.fromDate, item.toDate)
      if (!title && !institution && !score && !dateRange) return ""

      const parts = [title, institution].filter(Boolean)
      const detail = parts.join(" - ")
      const heading = item.type.trim()
      const scoreLabel = score ? `Score: ${score}` : ""
      return [heading ? `${heading}:` : "", detail, scoreLabel, dateRange ? `(${dateRange})` : ""].filter(Boolean).join(" ")
    })
    .filter(Boolean)
  const skillsList = skillItems.map((item) => item.trim()).filter(Boolean)

  const updateField = (field: keyof ResumeData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const updateExperienceItem = (index: number, field: keyof ExperienceItem, value: string) => {
    setExperienceItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)))
    setSavedExperienceItems((current) => current.map((saved, itemIndex) => (itemIndex === index ? false : saved)))
  }

  const addExperienceItem = () => {
    setExperienceItems((current) => [...current, createExperienceItem()])
    setSavedExperienceItems((current) => [...current, false])
  }

  const saveExperienceItem = (index: number) => {
    setSavedExperienceItems((current) => current.map((saved, itemIndex) => (itemIndex === index ? true : saved)))
  }

  const removeExperienceItem = (index: number) => {
    setExperienceItems((current) => (current.length === 1 ? [createExperienceItem()] : current.filter((_, itemIndex) => itemIndex !== index)))
    setSavedExperienceItems((current) => (current.length === 1 ? [false] : current.filter((_, itemIndex) => itemIndex !== index)))
  }

  const updateEducationItem = (index: number, field: keyof EducationItem, value: string) => {
    setEducationItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)))
    setSavedEducationItems((current) => current.map((saved, itemIndex) => (itemIndex === index ? false : saved)))
  }

  const addEducationItem = () => {
    setEducationItems((current) => [...current, createEducationItem()])
    setSavedEducationItems((current) => [...current, false])
  }

  const saveEducationItem = (index: number) => {
    setSavedEducationItems((current) => current.map((saved, itemIndex) => (itemIndex === index ? true : saved)))
  }

  const removeEducationItem = (index: number) => {
    setEducationItems((current) => (current.length === 1 ? [createEducationItem()] : current.filter((_, itemIndex) => itemIndex !== index)))
    setSavedEducationItems((current) => (current.length === 1 ? [false] : current.filter((_, itemIndex) => itemIndex !== index)))
  }

  const handleAiOptimize = () => {
    setAiOptimizing(true)
    setTimeout(() => {
      setAtsScore(87)
      setFormData((prev) => ({
        ...prev,
        summary: `${prev.summary}${prev.summary ? " " : ""}RERA-licensed real estate professional with proven track record in Dubai luxury property market. Expert in client relationship management and sales negotiation.`,
      }))
      setSkillItems((prev) => {
        const existing = prev.map((item) => item.trim()).filter(Boolean)
        const aiSkills = ["RERA Certification", "Dubai Property Law", "CRM Systems", "Market Analysis"]
        const merged = [...new Set([...existing, ...aiSkills])]
        return merged
      })
      setSkillDraft("")
      setShowSkillInput(false)
      setAiOptimizing(false)
    }, 2000)
  }

  const handleAutoFill = () => {
    setFormData({
      fullName: "Ahmed Al-Mansouri",
      title: "Senior Real Estate Broker",
      email: "ahmed.almansouri@example.com",
      phone: "+971 50 123 4567",
      location: "Dubai, UAE",
      summary: "Results-driven real estate professional with 8+ years of experience in Dubai luxury property market.",
    })
    setExperienceItems([
      createExperienceItem({
        role: "Senior Broker",
        company: "Emaar Properties",
        description: "Achieved 150% of annual sales targets and managed a portfolio of AED 50M+ properties.",
      }),
      createExperienceItem({
        role: "Team Lead",
        company: "Emaar Properties",
        description: "Led and mentored 5 junior agents to improve deal conversion and client retention.",
      }),
    ])
    setSavedExperienceItems([true, true])
    setEducationItems([
      createEducationItem({
        type: "Bachelor's Degree",
        title: "Bachelor of Business Administration",
        institution: "American University of Dubai",
        score: "3.8 GPA",
        fromDate: "2011-09-01",
        toDate: "2015-05-31",
      }),
      createEducationItem({
        type: "Certification",
        title: "RERA Certification",
        institution: "Dubai Land Department",
        score: "Passed",
        fromDate: "2019-03-01",
        toDate: "2019-06-01",
      }),
    ])
    setSavedEducationItems([true, true])
    setSkillItems(["Property Sales", "Client Relations", "Market Analysis", "Negotiation"])
    setSkillDraft("")
    setShowSkillInput(false)
  }

  const handleSaveSkill = () => {
    const normalizedSkill = skillDraft.trim()
    if (!normalizedSkill) return

    setSkillItems((current) => (current.includes(normalizedSkill) ? current : [...current, normalizedSkill]))
    setSkillDraft("")
    setShowSkillInput(false)
  }

  const handleAddAnotherSkill = () => {
    setShowSkillInput(true)
  }

  const removeSkill = (index: number) => {
    setSkillItems((current) => current.filter((_, itemIndex) => itemIndex !== index))
  }

  const handlePreview = () => {
    setShowPreview(true)
    window.requestAnimationFrame(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" })
    buildPdf(doc, selectedTemplate.style, formData, selectedTheme, experienceLines, educationLines, skillsList)
    doc.save(`${slugifyFileName(formData.fullName || "resume") || "resume"}.pdf`)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Resume Builder</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Create ATS-optimized resumes with Middle East-specific templates and a live local preview.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
                <CardDescription>Select a design before filling in your details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${selectedTemplate.id === template.id ? "border-primary border-2" : ""}`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <img src={template.preview} alt={template.name} className="mb-3 h-40 w-full rounded object-cover" />
                      <h3 className="mb-1 font-semibold">{template.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{template.style}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {template.language}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Build Your Resume</CardTitle>
                    <CardDescription>Fill in your details, preview instantly, and export as PDF</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={handleAutoFill}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Auto-Fill
                    </Button>
                    <Button variant="outline" onClick={handleAiOptimize} disabled={aiOptimizing}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      {aiOptimizing ? "Optimizing..." : "AI Optimize"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{currentStep.title}</p>
                      <p className="text-sm text-slate-600">{currentStep.description}</p>
                    </div>
                    <Badge variant="outline" className="w-fit border-slate-300 bg-white text-slate-700">
                      Tip: {currentStep.tip}
                    </Badge>
                  </div>
                </div>

                <Tabs value={activeStep} onValueChange={(value) => setActiveStep(value as ResumeStep)} className="w-full">
                  <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 md:grid-cols-4">
                    <TabsTrigger value="personal" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      1. {formSteps.personal.label}
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      2. {formSteps.experience.label}
                    </TabsTrigger>
                    <TabsTrigger value="education" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      3. {formSteps.education.label}
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      4. {formSteps.skills.label}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="mt-4 space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-medium text-slate-900">What to add</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Use your full name, a clear job title, active contact details, and a short 2-3 line summary.
                      </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>Full Name</Label>
                        <p className="mb-2 text-xs text-muted-foreground">Write it exactly as you want it on the final resume.</p>
                        <Input value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Ahmed Al-Mansouri" />
                      </div>
                      <div>
                        <Label>Professional Title</Label>
                        <p className="mb-2 text-xs text-muted-foreground">Example: Senior Real Estate Broker, Sales Manager, Leasing Consultant</p>
                        <Input value={formData.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Senior Real Estate Broker" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>Email</Label>
                        <p className="mb-2 text-xs text-muted-foreground">Use a professional email recruiters can reply to quickly.</p>
                        <Input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="ahmed@example.com" />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="mb-2 text-xs text-muted-foreground">Include your country code if you are applying internationally.</p>
                        <Input value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+971 50 123 4567" />
                      </div>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <p className="mb-2 text-xs text-muted-foreground">City and country is enough. Full street address is not needed.</p>
                      <Input value={formData.location} onChange={(e) => updateField("location", e.target.value)} placeholder="Dubai, UAE" />
                    </div>
                    <div>
                      <Label>Professional Summary</Label>
                      <p className="mb-2 text-xs text-muted-foreground">Keep it short and focused on your years of experience, specialty, and strongest result.</p>
                      <Textarea
                        value={formData.summary}
                        onChange={(e) => updateField("summary", e.target.value)}
                        placeholder="Example: Results-driven real estate broker with 8+ years of experience in Dubai luxury property sales, client relationship management, and high-value negotiations."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="mt-4 space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-medium text-slate-900">Simple format</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Add one experience item at a time with your role, company, and a short description of your work or achievements.
                      </p>
                    </div>
                    <div>
                      <Label>Work Experience</Label>
                      <p className="mb-3 text-xs text-muted-foreground">Each item has separate fields for role, company, and description, plus its own save button.</p>
                      <div className="space-y-3">
                        {experienceItems.map((item, index) => (
                          <div key={`experience-${index}`} className="rounded-xl border border-slate-200 bg-white p-3">
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <p className="text-sm font-medium text-slate-900">Experience item {index + 1}</p>
                              <Button
                                type="button"
                                variant="ghost"
                                className="h-8 px-2 text-slate-500 hover:text-red-600"
                                onClick={() => removeExperienceItem(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid gap-3">
                              <div>
                                <p className="mb-2 text-xs text-muted-foreground">Role</p>
                                <Input
                                  value={item.role}
                                  onChange={(e) => updateExperienceItem(index, "role", e.target.value)}
                                  placeholder="Senior Broker"
                                />
                              </div>
                              <div>
                                <p className="mb-2 text-xs text-muted-foreground">Company</p>
                                <Input
                                  value={item.company}
                                  onChange={(e) => updateExperienceItem(index, "company", e.target.value)}
                                  placeholder="Emaar Properties"
                                />
                              </div>
                              <div>
                                <p className="mb-2 text-xs text-muted-foreground">Description</p>
                                <Textarea
                                  value={item.description}
                                  onChange={(e) => updateExperienceItem(index, "description", e.target.value)}
                                  placeholder="Exceeded annual sales target by 150% and managed a premium property portfolio."
                                  rows={3}
                                />
                              </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between gap-3">
                              <p className="text-xs text-muted-foreground">
                                {savedExperienceItems[index] ? "This experience item is saved." : "Save this experience item when you're done editing it."}
                              </p>
                              <Button
                                type="button"
                                variant={savedExperienceItems[index] ? "secondary" : "default"}
                                onClick={() => saveExperienceItem(index)}
                                disabled={savedExperienceItems[index]}
                              >
                                {savedExperienceItems[index] ? "Saved" : "Save Experience Item"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button type="button" variant="outline" className="mt-3 bg-transparent" onClick={addExperienceItem}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Experience Item
                      </Button>
                      <p className="mt-2 text-xs text-muted-foreground">Focus on numbers, deals closed, targets exceeded, leadership, and the kind of work you handled.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="education" className="mt-4 space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-medium text-slate-900">Easy structure to follow</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Choose a heading like High School, Bachelor's Degree, Master's Degree, PhD, or Certification, then pick from and to dates neatly.
                      </p>
                    </div>
                    <div>
                      <Label>Education & Certifications</Label>
                      <p className="mb-3 text-xs text-muted-foreground">Each item now has its own heading, title, school or institute, score, and calendar-based from/to dates on the right.</p>
                      <div className="space-y-3">
                        {educationItems.map((item, index) => (
                          <div key={`education-${index}`} className="rounded-xl border border-slate-200 bg-white p-3">
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <p className="text-sm font-medium text-slate-900">Education item {index + 1}</p>
                              <Button
                                type="button"
                                variant="ghost"
                                className="h-8 px-2 text-slate-500 hover:text-red-600"
                                onClick={() => removeEducationItem(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
                              <div>
                                <p className="mb-2 text-xs text-muted-foreground">Heading</p>
                                <select
                                  value={item.type}
                                  onChange={(e) => updateEducationItem(index, "type", e.target.value)}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                  <option value="High School">High School</option>
                                  <option value="Certification">Certification</option>
                                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                                  <option value="Diploma">Diploma</option>
                                  <option value="Master's Degree">Master's Degree</option>
                                  <option value="PhD">PhD</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                              <div>
                                <p className="mb-2 text-xs text-muted-foreground">From</p>
                                <Input
                                  type="date"
                                  value={item.fromDate}
                                  onChange={(e) => updateEducationItem(index, "fromDate", e.target.value)}
                                  max={item.toDate || undefined}
                                />
                              </div>
                              <div>
                                <p className="mb-2 text-xs text-muted-foreground">To</p>
                                <Input
                                  type="date"
                                  value={item.toDate}
                                  onChange={(e) => updateEducationItem(index, "toDate", e.target.value)}
                                  min={item.fromDate || undefined}
                                />
                              </div>
                            </div>
                            <div className="mt-3 grid gap-3">
                              <div>
                                <p className="mb-2 text-xs text-muted-foreground">
                                  {item.type === "Certification" ? "Certification Name" : item.type === "High School" ? "School Level / Program" : "Qualification Title"}
                                </p>
                                <Input
                                  value={item.title}
                                  onChange={(e) => updateEducationItem(index, "title", e.target.value)}
                                  placeholder={
                                    item.type === "Certification"
                                      ? "RERA Certification"
                                      : item.type === "High School"
                                        ? "Higher Secondary Education"
                                        : "Bachelor of Business Administration"
                                  }
                                />
                              </div>
                              <div>
                                <p className="mb-2 text-xs text-muted-foreground">
                                  {item.type === "High School" ? "School Name" : "College / Institute / Board"}
                                </p>
                                <Input
                                  value={item.institution}
                                  onChange={(e) => updateEducationItem(index, "institution", e.target.value)}
                                  placeholder={
                                    item.type === "Certification"
                                      ? "Dubai Land Department"
                                      : item.type === "High School"
                                        ? "Delhi Public School"
                                      : "American University of Dubai"
                                  }
                                />
                              </div>
                              <div>
                                <p className="mb-2 text-xs text-muted-foreground">Score / GPA / Percentage</p>
                                <Input
                                  value={item.score}
                                  onChange={(e) => updateEducationItem(index, "score", e.target.value)}
                                  placeholder={
                                    item.type === "Certification"
                                      ? "Passed with Distinction"
                                      : item.type === "High School"
                                        ? "88%"
                                        : "3.8 GPA"
                                  }
                                />
                              </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between gap-3">
                              <p className="text-xs text-muted-foreground">
                                {savedEducationItems[index] ? "This education item is saved." : "Save this education item when you're done editing it."}
                              </p>
                              <Button
                                type="button"
                                variant={savedEducationItems[index] ? "secondary" : "default"}
                                onClick={() => saveEducationItem(index)}
                                disabled={savedEducationItems[index]}
                              >
                                {savedEducationItems[index] ? "Saved" : "Save Education Item"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button type="button" variant="outline" className="mt-3 bg-transparent" onClick={addEducationItem}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another Education Item
                      </Button>
                      <p className="mt-2 text-xs text-muted-foreground">Use the heading to separate degrees, certifications, diplomas, and schooling clearly.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-4 space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-medium text-slate-900">Best way to enter skills</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Add one skill per row. Mix tools, industry knowledge, and soft skills that match the role.
                      </p>
                    </div>
                    <div>
                      <Label>Skills & Competencies</Label>
                      <p className="mb-3 text-xs text-muted-foreground">Type one skill, save it on the right, then add the next one when you are ready.</p>
                      {showSkillInput && (
                        <div className="rounded-xl border border-slate-200 bg-white p-3">
                          <p className="mb-2 text-sm font-medium text-slate-900">New skill</p>
                          <div className="flex flex-col gap-3 sm:flex-row">
                            <Input
                              value={skillDraft}
                              onChange={(e) => setSkillDraft(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  handleSaveSkill()
                                }
                              }}
                              placeholder="Property Sales"
                              className="flex-1"
                            />
                            <Button type="button" onClick={handleSaveSkill} disabled={!skillDraft.trim()} className="sm:min-w-28">
                              Save Skill
                            </Button>
                          </div>
                        </div>
                      )}
                      {!!skillItems.length && (
                        <div className="mt-3 space-y-3">
                          {skillItems.map((item, index) => (
                            <div key={`${item}-${index}`} className="rounded-xl border border-slate-200 bg-white p-3">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-medium text-slate-900">Skill {index + 1}</p>
                                  <p className="mt-1 text-sm text-slate-700">{item}</p>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  className="h-8 px-2 text-slate-500 hover:text-red-600"
                                  onClick={() => removeSkill(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {!showSkillInput && (
                        <Button type="button" variant="outline" className="mt-3 bg-transparent" onClick={handleAddAnotherSkill}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Another Skill
                        </Button>
                      )}
                      <p className="mt-2 text-xs text-muted-foreground">{skillsList.length} skill{skillsList.length === 1 ? "" : "s"} ready for preview.</p>
                      {atsScore > 0 && (
                        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="font-medium">ATS Optimization Score</p>
                            <Badge variant="secondary" className="bg-green-500/10 text-green-700">
                              {atsScore}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Your resume is optimized for Applicant Tracking Systems used by Indeed, LinkedIn, and other job boards.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex gap-2">
                  <Button className="flex-1" onClick={handlePreview}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Resume
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleDownloadPdf}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showPreview && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle>Resume Preview</CardTitle>
                      <CardDescription>Live preview based on your selected template and form details</CardDescription>
                    </div>
                    <Badge variant="outline" className={selectedTheme.badge}>
                      {selectedTemplate.name}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div ref={previewRef} className={`rounded-xl border bg-white p-3 shadow-sm transition-all ${selectedTheme.preview}`}>
                    <TemplatePreview
                      style={selectedTemplate.style}
                      data={formData}
                      theme={selectedTheme}
                      experienceLines={experienceLines}
                      educationLines={educationLines}
                      skillsList={skillsList}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">ATS Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">-</span>
                    Include market-specific keywords such as RERA, DLD, Dubai Property Law, and GCC market.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">-</span>
                    Quantify achievements with numbers and percentages wherever possible.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">-</span>
                    Use standard section headings like Experience, Education, and Skills.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">-</span>
                    For multilingual markets, consider preparing both Arabic and English versions.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
