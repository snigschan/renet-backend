/**
 * RENet Mock Data - Jobs
 * Centralized mock job data for development and testing
 */

export interface Job {
  id: string
  jobId?: string
  title: string
  jobTitle?: string
  company: string
  location: string
  type: string
  salary: string
  experience: string
  posted: string
  description: string
  requirements: string[]
  benefits?: string[]
  matchScore?: number
  applicants?: number
  views?: number
  status?: string
}

export const mockJobs: Job[] = [
  {
    id: "1",
    jobId: "JOB-001",
    title: "Senior Real Estate Agent",
    jobTitle: "Senior Real Estate Agent",
    company: "Emaar Properties",
    location: "Dubai Marina, UAE",
    type: "Full-time",
    salary: "AED 15,000 - 25,000/month + Commission",
    experience: "5+ years",
    posted: "2 days ago",
    description: "Leading real estate developer seeking experienced agent for luxury properties in Dubai Marina.",
    requirements: [
      "5+ years in UAE real estate",
      "RERA certified",
      "Proven track record in luxury sales",
      "Excellent communication skills",
      "Fluent in English and Arabic",
    ],
    benefits: ["Commission structure", "Health insurance", "Visa sponsorship"],
    matchScore: 95,
    applicants: 24,
    views: 156,
    status: "Active",
  },
  {
    id: "2",
    jobId: "JOB-002",
    title: "Property Manager",
    jobTitle: "Property Manager",
    company: "Dubai Properties",
    location: "Business Bay, UAE",
    type: "Full-time",
    salary: "AED 12,000 - 18,000/month",
    experience: "3-5 years",
    posted: "1 week ago",
    description: "Manage portfolio of commercial and residential properties in prime Dubai locations.",
    requirements: [
      "3+ years property management",
      "RERA certification required",
      "Strong negotiation skills",
      "Knowledge of UAE property laws",
    ],
    benefits: ["Annual bonus", "Health insurance", "Professional development"],
    matchScore: 88,
    applicants: 18,
    views: 203,
    status: "Active",
  },
  {
    id: "3",
    jobId: "JOB-003",
    title: "Real Estate Consultant",
    jobTitle: "Real Estate Consultant",
    company: "Damac Properties",
    location: "Downtown Dubai, UAE",
    type: "Full-time",
    salary: "AED 10,000 - 20,000/month + Commission",
    experience: "2-4 years",
    posted: "3 days ago",
    description: "Join our dynamic team to sell premium residential properties in iconic Dubai locations.",
    requirements: [
      "2+ years real estate experience",
      "Valid UAE driving license",
      "Strong sales background",
      "Customer-focused approach",
    ],
    benefits: ["High commission rates", "Training programs", "Career growth"],
    matchScore: 82,
    applicants: 31,
    views: 287,
    status: "Active",
  },
  {
    id: "4",
    jobId: "JOB-004",
    title: "Leasing Specialist",
    jobTitle: "Leasing Specialist",
    company: "Nakheel",
    location: "Palm Jumeirah, UAE",
    type: "Full-time",
    salary: "AED 8,000 - 12,000/month",
    experience: "1-3 years",
    posted: "5 days ago",
    description: "Handle residential and commercial leasing for premium Palm Jumeirah properties.",
    requirements: [
      "1+ years leasing experience",
      "Knowledge of tenancy contracts",
      "Excellent interpersonal skills",
      "Proficient in property management software",
    ],
    benefits: ["Performance bonuses", "Health coverage", "Flexible hours"],
    matchScore: 76,
    applicants: 42,
    views: 198,
    status: "Active",
  },
  {
    id: "5",
    jobId: "JOB-005",
    title: "Commercial Real Estate Broker",
    jobTitle: "Commercial Real Estate Broker",
    company: "CBRE Middle East",
    location: "DIFC, UAE",
    type: "Full-time",
    salary: "AED 18,000 - 30,000/month + Commission",
    experience: "7+ years",
    posted: "1 day ago",
    description: "Lead commercial real estate transactions for high-profile clients in Dubai Financial District.",
    requirements: [
      "7+ years commercial real estate",
      "Established client network",
      "Strong analytical skills",
      "MBA or relevant degree preferred",
    ],
    benefits: ["Competitive commission", "International exposure", "Executive benefits"],
    matchScore: 91,
    applicants: 15,
    views: 134,
    status: "Active",
  },
]

export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find((job) => job.id === id || job.jobId === id)
}

export const filterJobs = (filters: {
  location?: string
  type?: string
  experience?: string
  minSalary?: number
}): Job[] => {
  return mockJobs.filter((job) => {
    if (filters.location && !job.location.includes(filters.location)) {
      return false
    }
    if (filters.type && job.type !== filters.type) {
      return false
    }
    if (filters.experience && job.experience !== filters.experience) {
      return false
    }
    return true
  })
}
