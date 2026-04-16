/**
 * RENet Mock Data - Candidates
 * Centralized mock candidate data for development and testing
 */

export interface Candidate {
  id: string
  name: string
  role: string
  location: string
  experience: string
  skills: string[]
  availability: string
  matchScore?: number
  avatar?: string
  bio?: string
  certifications?: string[]
  languages?: string[]
  education?: string
  verified?: boolean
}

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Ahmed Al Mansoori",
    role: "Senior Real Estate Agent",
    location: "Dubai, UAE",
    experience: "8 years",
    skills: ["Luxury Sales", "Property Valuation", "Client Relations", "RERA Certified"],
    availability: "Immediate",
    matchScore: 96,
    avatar: "/professional-arab-man.png",
    bio: "Experienced real estate professional specializing in luxury properties across Dubai.",
    certifications: ["RERA License", "Certified Property Consultant"],
    languages: ["Arabic", "English", "French"],
    education: "Bachelor in Business Administration",
    verified: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Property Manager",
    location: "Abu Dhabi, UAE",
    experience: "6 years",
    skills: ["Property Management", "Tenant Relations", "Maintenance Coordination", "Budget Management"],
    availability: "2 weeks notice",
    matchScore: 89,
    avatar: "/professional-woman-diverse.png",
    bio: "Dedicated property manager with extensive experience in residential and commercial properties.",
    certifications: ["CPM Certification", "RERA License"],
    languages: ["English", "Arabic"],
    education: "Master in Real Estate Management",
    verified: true,
  },
  {
    id: "3",
    name: "Mohammed Hassan",
    role: "Real Estate Consultant",
    location: "Sharjah, UAE",
    experience: "4 years",
    skills: ["Sales", "Market Analysis", "Customer Service", "Negotiation"],
    availability: "Immediate",
    matchScore: 84,
    avatar: "/professional-man.jpg",
    bio: "Results-driven consultant with strong track record in residential property sales.",
    certifications: ["RERA License"],
    languages: ["Arabic", "English", "Urdu"],
    education: "Bachelor in Marketing",
    verified: false,
  },
  {
    id: "4",
    name: "Elena Petrova",
    role: "Leasing Specialist",
    location: "Dubai, UAE",
    experience: "3 years",
    skills: ["Leasing", "Contract Management", "Property Viewing", "CRM Systems"],
    availability: "1 month notice",
    matchScore: 78,
    avatar: "/professional-blonde-woman.png",
    bio: "Enthusiastic leasing specialist focused on matching clients with their ideal properties.",
    certifications: ["RERA License"],
    languages: ["English", "Russian", "Arabic"],
    education: "Bachelor in Hospitality Management",
    verified: true,
  },
  {
    id: "5",
    name: "Rajesh Kumar",
    role: "Commercial Broker",
    location: "Dubai, UAE",
    experience: "10 years",
    skills: ["Commercial Real Estate", "Investment Analysis", "Portfolio Management", "Strategic Planning"],
    availability: "Immediate",
    matchScore: 93,
    avatar: "/professional-indian-man.png",
    bio: "Senior commercial broker with expertise in high-value transactions and investment properties.",
    certifications: ["RERA License", "CCIM Designation", "MBA Real Estate"],
    languages: ["English", "Hindi", "Arabic"],
    education: "MBA in Real Estate Finance",
    verified: true,
  },
]

export const getCandidateById = (id: string): Candidate | undefined => {
  return mockCandidates.find((candidate) => candidate.id === id)
}

export const filterCandidates = (filters: {
  role?: string
  location?: string
  minExperience?: number
  skills?: string[]
}): Candidate[] => {
  return mockCandidates.filter((candidate) => {
    if (filters.role && !candidate.role.toLowerCase().includes(filters.role.toLowerCase())) {
      return false
    }
    if (filters.location && !candidate.location.includes(filters.location)) {
      return false
    }
    if (filters.skills && filters.skills.length > 0) {
      const hasSkills = filters.skills.some((skill) =>
        candidate.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase())),
      )
      if (!hasSkills) return false
    }
    return true
  })
}
