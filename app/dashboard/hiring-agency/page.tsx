"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { CompanyProfileEditor, type CompanyProfileFormValues } from "@/components/company-profile-editor"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase/client"
import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Filter,
  Globe,
  MapPin,
  MessageSquare,
  Network,
  Plus,
  Search,
  Settings,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

const fallbackAgency = {
  name: "Premium Realty Group",
  logo: "/placeholder.svg?height=60&width=60",
  location: "New York, NY",
  employees: "50-200 employees",
  founded: "2015",
  website: "",
  description: "Boutique brokerage focused on premium residential and commercial placements.",
  activeJobs: 12,
  totalApplications: 156,
  hiredCandidates: 23,
  profileViews: 1247,
  verified: true,
}

const emptyCompanyForm: CompanyProfileFormValues = {
  name: fallbackAgency.name,
  location: fallbackAgency.location,
  website: fallbackAgency.website,
  employee_count_range: fallbackAgency.employees,
  founded_year: fallbackAgency.founded,
  description: fallbackAgency.description,
  logo_url: fallbackAgency.logo,
}

const createSlug = (value: string, userId: string) => {
  const base = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return `${base || "company"}-${userId.slice(0, 8)}`
}

type CompanyRow = {
  id: string
  name: string
  type: "agency" | "developer"
  location: string | null
  employee_count_range: string | null
  founded_year: number | null
  website: string | null
  description: string | null
  logo_url: string | null
  verified: boolean | null
  profile_views: number | null
}

type BasicCompanyRow = {
  id: string
  name: string
  type: "agency" | "developer"
}

type CompanyProfileVersionRow = {
  id: string
  company_id: string
  version_number: number
  snapshot: CompanyProfileFormValues
  created_at: string
}

type JobRow = {
  id: string
  company_id: string
  title: string
  department: string | null
  location: string | null
  job_type: string | null
  experience_level: string | null
  salary_min: number | null
  salary_max: number | null
  description: string | null
  requirements: string | null
  benefits: string | null
  status: "active" | "draft" | "closed"
  views_count: number | null
  created_at: string
}

type CandidateProfileRow = {
  full_name: string | null
  role: string | null
  avatar_url: string | null
}

type JobApplicationRow = {
  id: string
  job_id: string
  candidate_id: string
  status: "new" | "under_review" | "interview_scheduled" | "hired" | "rejected"
  match_score: number | null
  created_at: string
  jobs: Pick<JobRow, "title"> | null
  candidate: CandidateProfileRow | null
}

type JobApplicationQueryRow = {
  id: string
  job_id: string
  candidate_id: string
  status: JobApplicationRow["status"]
  match_score: number | null
  created_at: string
  jobs: Array<Pick<JobRow, "title">> | Pick<JobRow, "title"> | null
  candidate: CandidateProfileRow[] | CandidateProfileRow | null
}

type JobPostFormValues = {
  title: string
  department: string
  location: string
  jobType: string
  experienceLevel: string
  salaryMin: string
  salaryMax: string
  description: string
  requirements: string
  benefits: string
}

const emptyJobForm: JobPostFormValues = {
  title: "",
  department: "",
  location: "",
  jobType: "",
  experienceLevel: "",
  salaryMin: "",
  salaryMax: "",
  description: "",
  requirements: "",
  benefits: "",
}

const mapCompanyToForm = (company?: Partial<CompanyRow> | null): CompanyProfileFormValues => ({
  name: company?.name || fallbackAgency.name,
  location: company?.location || fallbackAgency.location,
  website: company?.website || "",
  employee_count_range: company?.employee_count_range || fallbackAgency.employees,
  founded_year: company?.founded_year ? String(company.founded_year) : fallbackAgency.founded,
  description: company?.description || fallbackAgency.description,
  logo_url: company?.logo_url || fallbackAgency.logo,
})

const isMissingColumnError = (message?: string | null) =>
  Boolean(message && /(column|schema cache|could not find).*?(location|employee_count_range|founded_year|website|description|logo_url|verified|profile_views)/i.test(message))

const isMissingHistoryTableError = (message?: string | null) =>
  Boolean(message && /(company_profile_versions|relation .* does not exist|schema cache)/i.test(message))

const formatHistoryLabel = (isoDate: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoDate))

const buildSnapshotFromForm = (values: CompanyProfileFormValues): CompanyProfileFormValues => ({
  name: values.name,
  location: values.location,
  website: values.website,
  employee_count_range: values.employee_count_range,
  founded_year: values.founded_year,
  description: values.description,
  logo_url: values.logo_url,
})

const isMissingHiringTablesError = (message?: string | null) =>
  Boolean(message && /(jobs|job_applications|job_posting_status|application_status|relation .* does not exist|schema cache)/i.test(message))

const formatRelativeDate = (isoDate: string) => {
  const date = new Date(isoDate)
  const diffMs = Date.now() - date.getTime()
  const dayMs = 24 * 60 * 60 * 1000
  const days = Math.max(0, Math.floor(diffMs / dayMs))

  if (days === 0) return "Today"
  if (days === 1) return "1 day ago"
  if (days < 7) return `${days} days ago`

  const weeks = Math.floor(days / 7)
  if (weeks === 1) return "1 week ago"
  if (weeks < 5) return `${weeks} weeks ago`

  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date)
}

const formatCurrencyRange = (min?: number | null, max?: number | null) => {
  const format = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      notation: value >= 1000 ? "compact" : "standard",
    }).format(value)

  if (min && max) return `${format(min)} - ${format(max)}`
  if (min) return `From ${format(min)}`
  if (max) return `Up to ${format(max)}`
  return "Salary not specified"
}

const formatRoleLabel = (role?: string | null) =>
  role
    ? role
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "Candidate"

const formatApplicationStatus = (status: JobApplicationRow["status"]) =>
  status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

const formatJobStatus = (status: JobRow["status"]) => status.charAt(0).toUpperCase() + status.slice(1)

export default function HiringAgencyDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [agency, setAgency] = useState(fallbackAgency)
  const [companyForm, setCompanyForm] = useState<CompanyProfileFormValues>(emptyCompanyForm)
  const [editorOpen, setEditorOpen] = useState(false)
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [profileMessage, setProfileMessage] = useState("")
  const [profileError, setProfileError] = useState("")
  const [profileHistory, setProfileHistory] = useState<CompanyProfileVersionRow[]>([])
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [jobs, setJobs] = useState<JobRow[]>([])
  const [applications, setApplications] = useState<JobApplicationRow[]>([])
  const [isHiringDataLoading, setIsHiringDataLoading] = useState(true)
  const [hiringError, setHiringError] = useState("")
  const [jobForm, setJobForm] = useState<JobPostFormValues>(emptyJobForm)
  const [jobFormMessage, setJobFormMessage] = useState("")
  const [jobFormError, setJobFormError] = useState("")
  const [isSubmittingJob, setIsSubmittingJob] = useState(false)
  const [candidateSearch, setCandidateSearch] = useState("")

  const loadHiringData = async (currentCompanyId: string) => {
    setIsHiringDataLoading(true)
    setHiringError("")

    const { data: jobsData, error: jobsError } = await supabase
      .from("jobs")
      .select(
        "id, company_id, title, department, location, job_type, experience_level, salary_min, salary_max, description, requirements, benefits, status, views_count, created_at",
      )
      .eq("company_id", currentCompanyId)
      .order("created_at", { ascending: false })

    if (jobsError) {
      if (!isMissingHiringTablesError(jobsError.message)) {
        setHiringError(jobsError.message)
      } else {
        setHiringError("Run the latest Supabase migration to enable job posting and candidate review.")
      }
      setJobs([])
      setApplications([])
      setAgency((current) => ({ ...current, activeJobs: 0, totalApplications: 0, hiredCandidates: 0 }))
      setIsHiringDataLoading(false)
      return
    }

    const nextJobs = (jobsData as JobRow[] | null) ?? []
    setJobs(nextJobs)

    const jobIds = nextJobs.map((job) => job.id)

    if (jobIds.length === 0) {
      setApplications([])
      setAgency((current) => ({ ...current, activeJobs: 0, totalApplications: 0, hiredCandidates: 0 }))
      setIsHiringDataLoading(false)
      return
    }

    const { data: applicationsData, error: applicationsError } = await supabase
      .from("job_applications")
      .select(
        "id, job_id, candidate_id, status, match_score, created_at, jobs!inner(title), candidate:profiles!job_applications_candidate_id_fkey(full_name, role, avatar_url)",
      )
      .in("job_id", jobIds)
      .order("created_at", { ascending: false })

    if (applicationsError) {
      if (!isMissingHiringTablesError(applicationsError.message)) {
        setHiringError(applicationsError.message)
      } else {
        setHiringError("Run the latest Supabase migration to enable candidate review.")
      }
      setApplications([])
      setAgency((current) => ({
        ...current,
        activeJobs: nextJobs.filter((job) => job.status === "active").length,
        totalApplications: 0,
        hiredCandidates: 0,
      }))
      setIsHiringDataLoading(false)
      return
    }

    const nextApplications =
      ((applicationsData as JobApplicationQueryRow[] | null) ?? []).map((application) => ({
        ...application,
        jobs: Array.isArray(application.jobs) ? application.jobs[0] ?? null : application.jobs,
        candidate: Array.isArray(application.candidate) ? application.candidate[0] ?? null : application.candidate,
      })) as JobApplicationRow[]
    setApplications(nextApplications)
    setAgency((current) => ({
      ...current,
      activeJobs: nextJobs.filter((job) => job.status === "active").length,
      totalApplications: nextApplications.length,
      hiredCandidates: nextApplications.filter((application) => application.status === "hired").length,
    }))
    setIsHiringDataLoading(false)
  }

  useEffect(() => {
    let isMounted = true

    const loadCompanyProfile = async () => {
      setIsProfileLoading(true)
      setProfileError("")

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        if (!isMounted) return
        setProfileError("Sign in to manage your company profile.")
        setIsProfileLoading(false)
        return
      }

      const { data: profile, error: profileLookupError } = await supabase
        .from("profiles")
        .select("id, full_name, company_id, account_type")
        .eq("id", user.id)
        .maybeSingle()

      if (profileLookupError) {
        if (!isMounted) return
        setProfileError(profileLookupError.message)
        setIsProfileLoading(false)
        return
      }

      const storageKey = `company-profile-draft:${user.id}`
      const localDraft =
        typeof window !== "undefined"
          ? (() => {
              const raw = window.localStorage.getItem(storageKey)
              return raw ? (JSON.parse(raw) as Partial<CompanyProfileFormValues>) : null
            })()
          : null

      let company: CompanyRow | null = null

      if (profile?.company_id) {
        const { data, error } = await supabase
          .from("companies")
          .select(
            "id, name, type, location, employee_count_range, founded_year, website, description, logo_url, verified, profile_views",
          )
          .eq("id", profile.company_id)
          .maybeSingle()

        if (error && !isMissingColumnError(error.message)) {
          if (!isMounted) return
          setProfileError(error.message)
          setIsProfileLoading(false)
          return
        }

        if (error && isMissingColumnError(error.message)) {
          const { data: basicData } = await supabase.from("companies").select("id, name, type").eq("id", profile.company_id).maybeSingle()
          company = basicData ? ({ ...basicData } as CompanyRow) : null
        } else {
          company = data as CompanyRow | null
        }
      }

      if (!company) {
        const { data, error } = await supabase
          .from("companies")
          .select(
            "id, name, type, location, employee_count_range, founded_year, website, description, logo_url, verified, profile_views",
          )
          .eq("created_by", user.id)
          .maybeSingle()

        if (error && !isMissingColumnError(error.message)) {
          if (!isMounted) return
          setProfileError(error.message)
          setIsProfileLoading(false)
          return
        }

        if (error && isMissingColumnError(error.message)) {
          const { data: basicData } = await supabase.from("companies").select("id, name, type").eq("created_by", user.id).maybeSingle()
          company = basicData ? ({ ...basicData } as CompanyRow) : null
        } else {
          company = data as CompanyRow | null
        }

        if (company && profile?.company_id !== company.id) {
          await supabase.from("profiles").update({ company_id: company.id }).eq("id", user.id)
        }
      }

      const mappedForm = {
        ...(company
          ? mapCompanyToForm(company)
          : {
              ...emptyCompanyForm,
              name: profile?.full_name ? `${profile.full_name} Company` : emptyCompanyForm.name,
            }),
        ...(localDraft ?? {}),
      }

      if (!isMounted) return

      setCompanyId(company?.id ?? null)
      setCompanyForm(mappedForm)
      setAgency({
        ...fallbackAgency,
        name: mappedForm.name,
        logo: mappedForm.logo_url || fallbackAgency.logo,
        location: mappedForm.location || fallbackAgency.location,
        employees: mappedForm.employee_count_range || fallbackAgency.employees,
        founded: mappedForm.founded_year || fallbackAgency.founded,
        website: mappedForm.website,
        description: mappedForm.description || fallbackAgency.description,
        profileViews: company?.profile_views ?? fallbackAgency.profileViews,
        verified: company?.verified ?? fallbackAgency.verified,
      })

      if (company?.id) {
        await loadHiringData(company.id)
      } else {
        setJobs([])
        setApplications([])
        setIsHiringDataLoading(false)
      }

      if (company?.id) {
        const { data: versionData, error: versionError } = await supabase
          .from("company_profile_versions")
          .select("id, company_id, version_number, snapshot, created_at")
          .eq("company_id", company.id)
          .order("version_number", { ascending: false })
          .limit(5)

        if (!versionError) {
          setProfileHistory((versionData as CompanyProfileVersionRow[]) ?? [])
        } else if (!isMissingHistoryTableError(versionError.message)) {
          setProfileError(versionError.message)
        }
      } else {
        setProfileHistory([])
      }

      setIsProfileLoading(false)
    }

    loadCompanyProfile()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSaveCompanyProfile = async (values: CompanyProfileFormValues) => {
    setIsSavingProfile(true)
    setProfileError("")
    setProfileMessage("")
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        setProfileError("Your session has expired. Please sign in again.")
        return
      }

      const { data: profile, error: profileLookupError } = await supabase
        .from("profiles")
        .select("id, company_id, account_type")
        .eq("id", user.id)
        .maybeSingle()

      if (profileLookupError || !profile) {
        setProfileError(profileLookupError?.message || "We could not find your profile.")
        return
      }

      const storageKey = `company-profile-draft:${user.id}`
      const foundedYear = Number.parseInt(values.founded_year, 10)
      const normalizedValues = {
        name: values.name.trim(),
        location: values.location.trim() || null,
        website: values.website.trim() || null,
        employee_count_range: values.employee_count_range.trim() || null,
        founded_year: Number.isNaN(foundedYear) ? null : foundedYear,
        description: values.description.trim() || null,
        logo_url: values.logo_url.trim() || null,
      }

      const fullPayload = {
        ...normalizedValues,
        slug: createSlug(normalizedValues.name, user.id),
        type: profile.account_type === "developer_company" ? "developer" : "agency",
        created_by: user.id,
      }

      const basicPayload = {
        name: normalizedValues.name,
        slug: createSlug(normalizedValues.name, user.id),
        type: profile.account_type === "developer_company" ? "developer" : "agency",
        created_by: user.id,
      }

      let companyId = profile.company_id

      if (!companyId) {
        const { data: existingCompany } = await supabase.from("companies").select("id").eq("created_by", user.id).maybeSingle()
        companyId = existingCompany?.id ?? null
      }

      let savedCompany: CompanyRow | null = null
      let usedFallbackSchema = false
      let previousSnapshot: CompanyProfileFormValues | null = null
      let nextVersionNumber = 1

      if (companyId) {
        const { data: existingVersions, error: versionsError } = await supabase
          .from("company_profile_versions")
          .select("version_number")
          .eq("company_id", companyId)
          .order("version_number", { ascending: false })
          .limit(1)

        if (!versionsError) {
          nextVersionNumber = ((existingVersions?.[0]?.version_number as number | undefined) ?? 0) + 1
        } else if (!isMissingHistoryTableError(versionsError.message)) {
          setProfileError(versionsError.message)
          return
        }

        const { data: existingCompanyProfile, error: existingCompanyError } = await supabase
          .from("companies")
          .select("name, location, website, employee_count_range, founded_year, description, logo_url")
          .eq("id", companyId)
          .maybeSingle()

        if (!existingCompanyError) {
          previousSnapshot = {
            name: existingCompanyProfile?.name || agency.name,
            location: existingCompanyProfile?.location || agency.location,
            website: existingCompanyProfile?.website || agency.website,
            employee_count_range: existingCompanyProfile?.employee_count_range || agency.employees,
            founded_year: existingCompanyProfile?.founded_year ? String(existingCompanyProfile.founded_year) : agency.founded,
            description: existingCompanyProfile?.description || agency.description,
            logo_url: existingCompanyProfile?.logo_url || agency.logo,
          }
        } else if (isMissingColumnError(existingCompanyError.message)) {
          previousSnapshot = buildSnapshotFromForm(companyForm)
        } else {
          setProfileError(existingCompanyError.message)
          return
        }
      }

      const fullMutation = companyId
        ? await supabase
            .from("companies")
            .update(fullPayload)
            .eq("id", companyId)
            .select(
              "id, name, type, location, employee_count_range, founded_year, website, description, logo_url, verified, profile_views",
            )
            .single()
        : await supabase
            .from("companies")
            .insert(fullPayload)
            .select(
              "id, name, type, location, employee_count_range, founded_year, website, description, logo_url, verified, profile_views",
            )
            .single()

      if (fullMutation.error && isMissingColumnError(fullMutation.error.message)) {
        usedFallbackSchema = true

        const basicMutation = companyId
          ? await supabase.from("companies").update({ name: basicPayload.name, slug: basicPayload.slug }).eq("id", companyId).select("id, name, type").single()
          : await supabase.from("companies").insert(basicPayload).select("id, name, type").single()

        if (basicMutation.error) {
          setProfileError(basicMutation.error.message)
          return
        }

        savedCompany = {
          ...(basicMutation.data as BasicCompanyRow),
          location: normalizedValues.location,
          employee_count_range: normalizedValues.employee_count_range,
          founded_year: normalizedValues.founded_year,
          website: normalizedValues.website,
          description: normalizedValues.description,
          logo_url: normalizedValues.logo_url,
          verified: false,
          profile_views: agency.profileViews,
        }
      } else if (fullMutation.error) {
        setProfileError(fullMutation.error.message)
        return
      } else {
        savedCompany = fullMutation.data as CompanyRow
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(storageKey)
        }
      }

      if (!savedCompany) {
        setProfileError("We could not save the company profile.")
        return
      }

      if (profile.company_id !== savedCompany.id) {
        const { error: profileUpdateError } = await supabase
          .from("profiles")
          .update({ company_id: savedCompany.id })
          .eq("id", user.id)

        if (profileUpdateError) {
          setProfileError(profileUpdateError.message)
          return
        }
      }

      if (usedFallbackSchema && typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, JSON.stringify(values))
      }

      const nextForm = usedFallbackSchema ? values : mapCompanyToForm(savedCompany)

      if (savedCompany.id) {
        const snapshotsToInsert: CompanyProfileFormValues[] = []

        if (
          previousSnapshot &&
          JSON.stringify(buildSnapshotFromForm(previousSnapshot)) !== JSON.stringify(buildSnapshotFromForm(nextForm))
        ) {
          snapshotsToInsert.push(buildSnapshotFromForm(previousSnapshot))
        }

        snapshotsToInsert.push(buildSnapshotFromForm(nextForm))

        let versionCursor = nextVersionNumber
        const insertedHistory: CompanyProfileVersionRow[] = []

        for (const snapshot of snapshotsToInsert) {
          const { data: insertedVersion, error: insertVersionError } = await supabase
            .from("company_profile_versions")
            .insert({
              company_id: savedCompany.id,
              version_number: versionCursor,
              snapshot,
              changed_by: user.id,
            })
            .select("id, company_id, version_number, snapshot, created_at")
            .single()

          if (insertVersionError) {
            if (!isMissingHistoryTableError(insertVersionError.message)) {
              setProfileError(insertVersionError.message)
              return
            }
            break
          }

          insertedHistory.push(insertedVersion as CompanyProfileVersionRow)
          versionCursor += 1
        }

        if (insertedHistory.length > 0) {
          setProfileHistory((current) =>
            [...insertedHistory, ...current]
              .sort((a, b) => b.version_number - a.version_number)
              .slice(0, 5),
          )
        }
      }

      setCompanyForm(nextForm)
      setCompanyId(savedCompany.id)
      setAgency((current) => ({
        ...current,
        name: nextForm.name,
        logo: nextForm.logo_url || fallbackAgency.logo,
        location: nextForm.location || fallbackAgency.location,
        employees: nextForm.employee_count_range || fallbackAgency.employees,
        founded: nextForm.founded_year || fallbackAgency.founded,
        website: nextForm.website,
        description: nextForm.description || fallbackAgency.description,
        profileViews: savedCompany.profile_views ?? current.profileViews,
        verified: savedCompany.verified ?? current.verified,
      }))
      setProfileMessage(
        usedFallbackSchema
          ? "Profile updated in the UI and basic company details saved. Run the latest Supabase migration to persist all new fields."
          : "Company profile saved successfully.",
      )
      setEditorOpen(false)

      await loadHiringData(savedCompany.id)
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleJobFormChange = (field: keyof JobPostFormValues, value: string) => {
    setJobForm((current) => ({ ...current, [field]: value }))
  }

  const handlePostJob = async (status: "active" | "draft") => {
    setJobFormError("")
    setJobFormMessage("")

    if (!companyId) {
      setJobFormError("Save your company profile first so we know which agency should own the job.")
      setActiveTab("post-job")
      return
    }

    if (!jobForm.title.trim()) {
      setJobFormError("Job title is required.")
      return
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      setJobFormError("Your session has expired. Please sign in again.")
      return
    }

    setIsSubmittingJob(true)

    const salaryMin = Number.parseInt(jobForm.salaryMin, 10)
    const salaryMax = Number.parseInt(jobForm.salaryMax, 10)

    const payload = {
      company_id: companyId,
      created_by: user.id,
      title: jobForm.title.trim(),
      department: jobForm.department.trim() || null,
      location: jobForm.location.trim() || null,
      job_type: jobForm.jobType || null,
      experience_level: jobForm.experienceLevel || null,
      salary_min: Number.isNaN(salaryMin) ? null : salaryMin,
      salary_max: Number.isNaN(salaryMax) ? null : salaryMax,
      description: jobForm.description.trim() || null,
      requirements: jobForm.requirements.trim() || null,
      benefits: jobForm.benefits.trim() || null,
      status,
    }

    const { error } = await supabase.from("jobs").insert(payload)

    if (error) {
      setJobFormError(
        isMissingHiringTablesError(error.message)
          ? "Run the latest Supabase migration to save jobs to the database."
          : error.message,
      )
      setIsSubmittingJob(false)
      return
    }

    setJobForm(emptyJobForm)
    setJobFormMessage(status === "active" ? "Job published and added to your dashboard." : "Job saved as draft.")
    await loadHiringData(companyId)
    setActiveTab("jobs")
    setIsSubmittingJob(false)
  }

  const jobsWithCounts = useMemo(() => {
    const counts = applications.reduce<Record<string, number>>((accumulator, application) => {
      accumulator[application.job_id] = (accumulator[application.job_id] ?? 0) + 1
      return accumulator
    }, {})

    return jobs.map((job) => ({
      ...job,
      applicationsCount: counts[job.id] ?? 0,
    }))
  }, [applications, jobs])

  const filteredApplications = useMemo(() => {
    const query = candidateSearch.trim().toLowerCase()

    if (!query) return applications

    return applications.filter((application) => {
      const candidateName = application.candidate?.full_name?.toLowerCase() ?? ""
      const role = formatRoleLabel(application.candidate?.role).toLowerCase()
      const jobTitle = application.jobs?.title?.toLowerCase() ?? ""
      return candidateName.includes(query) || role.includes(query) || jobTitle.includes(query)
    })
  }, [applications, candidateSearch])

  const successRate = agency.totalApplications > 0 ? Math.round((agency.hiredCandidates / agency.totalApplications) * 100) : 0
  const initials =
    agency.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "PR"

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <Network className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">RENet</h1>
              <p className="text-xs text-muted-foreground">Hiring Agency Dashboard</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Button onClick={() => setActiveTab("post-job")}>
              <Plus className="mr-2 h-4 w-4" />
              Post Job
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={agency.logo || "/placeholder.svg"} alt={agency.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-1">
            <Card className="overflow-hidden rounded-[28px] border-primary/10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
              <div className="h-24 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
              <CardContent className="relative p-6 pt-0">
                <div className="-mt-10 flex justify-between gap-4">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-md">
                    <AvatarImage src={agency.logo || "/placeholder.svg"} alt={agency.name} />
                    <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">{initials}</AvatarFallback>
                  </Avatar>
                  <Badge
                    variant="secondary"
                    className="mt-4 h-fit rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-primary"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {agency.verified ? "Verified" : "Profile active"}
                  </Badge>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{agency.name}</h2>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{agency.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {isProfileLoading ? "Loading..." : agency.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        {agency.employees}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        Founded {agency.founded}
                      </span>
                    </div>

                    {agency.website && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-4 w-4 text-primary" />
                        <a
                          href={agency.website}
                          target="_blank"
                          rel="noreferrer"
                          className="truncate text-primary hover:underline"
                        >
                          {agency.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
                      <div className="text-2xl font-semibold text-primary">{agency.activeJobs}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Active Jobs</div>
                    </div>
                    <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
                      <div className="text-2xl font-semibold text-primary">{agency.profileViews}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Profile Views</div>
                    </div>
                  </div>

                  <Button className="w-full rounded-xl bg-primary py-6 text-sm font-semibold hover:bg-primary/90" onClick={() => setEditorOpen(true)}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Edit Company Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Hiring Stats</CardTitle>
                <CardDescription>Quick performance snapshot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-muted/30 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Applications</span>
                  </div>
                  <Badge variant="outline">{agency.totalApplications}</Badge>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-muted/30 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Hired</span>
                  </div>
                  <Badge variant="outline">{agency.hiredCandidates}</Badge>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-muted/30 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Success Rate</span>
                  </div>
                  <Badge variant="outline">{successRate}%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Profile History</CardTitle>
                <CardDescription>Current and previously saved company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Current</div>
                  <div className="mt-2 text-sm font-semibold text-foreground">{companyForm.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {companyForm.location || "No location"} • {companyForm.employee_count_range || "No team size"} • Founded{" "}
                    {companyForm.founded_year || "N/A"}
                  </div>
                </div>

                {profileHistory.length > 0 ? (
                  profileHistory.map((entry) => (
                    <div key={entry.id} className="rounded-2xl border border-border/80 bg-muted/30 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-medium text-foreground">{entry.snapshot.name}</div>
                        <Badge variant="outline">v{entry.version_number}</Badge>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{formatHistoryLabel(entry.created_at)}</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {entry.snapshot.location || "No location"} • {entry.snapshot.employee_count_range || "No team size"} •
                        Founded {entry.snapshot.founded_year || "N/A"}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                    Saved versions will appear here after the migration is applied and the profile is saved again.
                  </div>
                )}
              </CardContent>
            </Card>

            {(profileMessage || profileError) && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  profileError
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {profileError || profileMessage}
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="jobs">Job Postings</TabsTrigger>
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="post-job">Post Job</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-2 text-xl font-semibold">Welcome to your hiring dashboard</h2>
                    <p className="mb-4 text-muted-foreground">
                      Track your latest openings and review incoming candidates from one place.
                    </p>
                    <div className="flex gap-4">
                      <Button onClick={() => setActiveTab("candidates")}>
                        <Users className="mr-2 h-4 w-4" />
                        Review Candidates
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab("post-job")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {hiringError && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    {hiringError}
                  </div>
                )}

                <div className="grid gap-6 xl:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Jobs Posted
                      </CardTitle>
                      <CardDescription>Latest jobs saved for your agency</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {jobsWithCounts.length > 0 ? (
                        jobsWithCounts.slice(0, 4).map((job) => (
                          <div key={job.id} className="rounded-lg border border-border p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="font-medium">{job.title}</h4>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {job.location || "Location not set"}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    {formatCurrencyRange(job.salary_min, job.salary_max)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatRelativeDate(job.created_at)}
                                  </span>
                                </div>
                              </div>
                              <Badge variant="outline">{formatJobStatus(job.status)}</Badge>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{job.applicationsCount} applications</span>
                              <Button variant="ghost" size="sm" onClick={() => setActiveTab("jobs")}>
                                View all
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                          {isHiringDataLoading ? "Loading jobs..." : "No jobs posted yet. Use Post Job to add one to the database."}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Candidates
                      </CardTitle>
                      <CardDescription>Recent applications from candidates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {applications.length > 0 ? (
                        applications.slice(0, 4).map((application) => {
                          const candidateName = application.candidate?.full_name || "Candidate"
                          const candidateInitials =
                            candidateName
                              .split(" ")
                              .filter(Boolean)
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase() || "CA"

                          return (
                            <div key={application.id} className="rounded-lg border border-border p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={application.candidate?.avatar_url || "/placeholder.svg"} alt={candidateName} />
                                    <AvatarFallback>{candidateInitials}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-medium">{candidateName}</h4>
                                    <p className="text-sm text-muted-foreground">{formatRoleLabel(application.candidate?.role)}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                      Applied for: {application.jobs?.title || "Untitled job"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  {application.match_score !== null && <Badge variant="secondary">{application.match_score}% match</Badge>}
                                  <Badge variant={application.status === "new" ? "default" : "outline"}>
                                    {formatApplicationStatus(application.status)}
                                  </Badge>
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{formatRelativeDate(application.created_at)}</span>
                                <Button variant="ghost" size="sm" onClick={() => setActiveTab("candidates")}>
                                  Review
                                </Button>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                          {isHiringDataLoading ? "Loading candidates..." : "Candidate applications will appear here once people apply."}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="jobs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Job Postings</CardTitle>
                        <CardDescription>Manage your active and draft job postings</CardDescription>
                      </div>
                      <Button onClick={() => setActiveTab("post-job")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Job
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobsWithCounts.length > 0 ? (
                        jobsWithCounts.map((job) => (
                          <div key={job.id} className="rounded-lg border border-border p-6 transition-colors hover:bg-muted/50">
                            <div className="mb-4 flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {job.location || "Location not set"}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {formatCurrencyRange(job.salary_min, job.salary_max)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Briefcase className="h-4 w-4" />
                                    {job.job_type || "Type not set"}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {formatRelativeDate(job.created_at)}
                                  </span>
                                </div>
                              </div>
                              <Badge variant="outline">{formatJobStatus(job.status)}</Badge>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>{job.applicationsCount} applications</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                  <span>{job.views_count ?? 0} views</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" onClick={() => setActiveTab("post-job")}>
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setActiveTab("candidates")}>
                                  View Applications
                                </Button>
                                <Button size="sm" onClick={() => setActiveTab("analytics")}>
                                  <BarChart3 className="mr-2 h-4 w-4" />
                                  Analytics
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                          {isHiringDataLoading ? "Loading jobs..." : "No jobs posted yet."}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="candidates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Candidate Management</CardTitle>
                        <CardDescription>Review and manage job applications</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                        <div className="relative">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search candidates..."
                            className="w-64 pl-10"
                            value={candidateSearch}
                            onChange={(event) => setCandidateSearch(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredApplications.length > 0 ? (
                        filteredApplications.map((application) => {
                          const candidateName = application.candidate?.full_name || "Candidate"
                          const candidateInitials =
                            candidateName
                              .split(" ")
                              .filter(Boolean)
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase() || "CA"

                          return (
                            <div key={application.id} className="rounded-lg border border-border p-6 transition-colors hover:bg-muted/50">
                              <div className="mb-4 flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage
                                      src={application.candidate?.avatar_url || "/placeholder.svg"}
                                      alt={candidateName}
                                    />
                                    <AvatarFallback>{candidateInitials}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-lg font-semibold">{candidateName}</h3>
                                    <p className="text-muted-foreground">{formatRoleLabel(application.candidate?.role)}</p>
                                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        Applied {formatRelativeDate(application.created_at)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  {application.match_score !== null && (
                                    <Badge variant="secondary">{application.match_score}% match</Badge>
                                  )}
                                  <Badge variant={application.status === "new" ? "default" : "outline"}>
                                    {formatApplicationStatus(application.status)}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Applied for: {application.jobs?.title || "Untitled job"}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Button variant="outline" size="sm">
                                    View Profile
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Message
                                  </Button>
                                  <Button size="sm">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Schedule Interview
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                          {isHiringDataLoading ? "Loading candidates..." : "No candidate applications found."}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Hiring Analytics
                    </CardTitle>
                    <CardDescription>Track your recruitment performance and metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-lg border border-border p-4 text-center">
                        <div className="mb-2 text-2xl font-bold text-primary">{agency.totalApplications}</div>
                        <div className="text-sm text-muted-foreground">Total Applications</div>
                        <div className="mt-1 text-xs text-green-600">+12% this month</div>
                      </div>
                      <div className="rounded-lg border border-border p-4 text-center">
                        <div className="mb-2 text-2xl font-bold text-primary">{agency.hiredCandidates}</div>
                        <div className="text-sm text-muted-foreground">Successful Hires</div>
                        <div className="mt-1 text-xs text-green-600">+8% this month</div>
                      </div>
                      <div className="rounded-lg border border-border p-4 text-center">
                        <div className="mb-2 text-2xl font-bold text-primary">{successRate}%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                        <div className="mt-1 text-xs text-green-600">+2% this month</div>
                      </div>
                      <div className="rounded-lg border border-border p-4 text-center">
                        <div className="mb-2 text-2xl font-bold text-primary">18</div>
                        <div className="text-sm text-muted-foreground">Avg. Days to Hire</div>
                        <div className="mt-1 text-xs text-red-600">+3 days</div>
                      </div>
                    </div>

                    <div className="py-12 text-center">
                      <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-medium">Detailed Analytics Coming Soon</h3>
                      <p className="text-muted-foreground">Advanced charts and insights will be available here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="post-job" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post a New Job</CardTitle>
                    <CardDescription>Create a new job posting to attract top real estate talent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form
                      className="space-y-6"
                      onSubmit={async (event) => {
                        event.preventDefault()
                        await handlePostJob("active")
                      }}
                    >
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            placeholder="e.g. Senior Real Estate Agent"
                            value={jobForm.title}
                            onChange={(event) => handleJobFormChange("title", event.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select value={jobForm.department} onValueChange={(value) => handleJobFormChange("department", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="luxury">Luxury Properties</SelectItem>
                              <SelectItem value="management">Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            placeholder="e.g. New York, NY"
                            value={jobForm.location}
                            onChange={(event) => handleJobFormChange("location", event.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobType">Job Type</Label>
                          <Select value={jobForm.jobType} onValueChange={(value) => handleJobFormChange("jobType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="freelance">Freelance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience Level</Label>
                          <Select
                            value={jobForm.experienceLevel}
                            onValueChange={(value) => handleJobFormChange("experienceLevel", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                              <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                              <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                              <SelectItem value="executive">Executive (10+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="salaryMin">Minimum Salary</Label>
                          <Input
                            id="salaryMin"
                            placeholder="e.g. 80000"
                            type="number"
                            value={jobForm.salaryMin}
                            onChange={(event) => handleJobFormChange("salaryMin", event.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salaryMax">Maximum Salary</Label>
                          <Input
                            id="salaryMax"
                            placeholder="e.g. 120000"
                            type="number"
                            value={jobForm.salaryMax}
                            onChange={(event) => handleJobFormChange("salaryMax", event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                          rows={6}
                          value={jobForm.description}
                          onChange={(event) => handleJobFormChange("description", event.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requirements">Requirements</Label>
                        <Textarea
                          id="requirements"
                          placeholder="List the required qualifications, skills, and experience..."
                          rows={4}
                          value={jobForm.requirements}
                          onChange={(event) => handleJobFormChange("requirements", event.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="benefits">Benefits & Perks</Label>
                        <Textarea
                          id="benefits"
                          placeholder="Describe the benefits, perks, and what makes your company great..."
                          rows={3}
                          value={jobForm.benefits}
                          onChange={(event) => handleJobFormChange("benefits", event.target.value)}
                        />
                      </div>

                      {(jobFormMessage || jobFormError) && (
                        <div
                          className={`rounded-2xl border px-4 py-3 text-sm ${
                            jobFormError
                              ? "border-red-200 bg-red-50 text-red-700"
                              : "border-emerald-200 bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {jobFormError || jobFormMessage}
                        </div>
                      )}

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmittingJob}>
                          Publish Job
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isSubmittingJob}
                          onClick={async () => {
                            await handlePostJob("draft")
                          }}
                        >
                          Save as Draft
                        </Button>
                        <Button type="button" variant="outline" disabled>
                          Preview
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <CompanyProfileEditor
        open={editorOpen}
        onOpenChange={setEditorOpen}
        values={companyForm}
        onSave={handleSaveCompanyProfile}
        isSaving={isSavingProfile}
        errorMessage={profileError}
      />
    </div>
  )
}
