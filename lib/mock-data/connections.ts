/**
 * RENet Mock Data - Network Connections
 * Centralized mock connection data for development and testing
 */

export interface Connection {
  id: string
  name: string
  role: string
  company: string
  location: string
  avatar: string
  connectionDegree: "1st" | "2nd" | "3rd"
  mutualConnections: number
  verified: boolean
  skills?: string[]
  bio?: string
}

export const mockConnections: Connection[] = [
  {
    id: "1",
    name: "Ahmed Al Mansoori",
    role: "Senior Real Estate Agent",
    company: "Emaar Properties",
    location: "Dubai, UAE",
    avatar: "/professional-arab-man.png",
    connectionDegree: "1st",
    mutualConnections: 45,
    verified: true,
    skills: ["Luxury Sales", "Property Valuation", "RERA Certified"],
    bio: "Experienced real estate professional specializing in luxury properties.",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Property Manager",
    company: "Dubai Properties",
    location: "Abu Dhabi, UAE",
    avatar: "/professional-woman-diverse.png",
    connectionDegree: "1st",
    mutualConnections: 32,
    verified: true,
    skills: ["Property Management", "Tenant Relations", "Budget Management"],
    bio: "Dedicated property manager with 6+ years experience.",
  },
  {
    id: "3",
    name: "Mohammed Hassan",
    role: "Real Estate Consultant",
    company: "Damac Properties",
    location: "Sharjah, UAE",
    avatar: "/professional-man.jpg",
    connectionDegree: "2nd",
    mutualConnections: 18,
    verified: false,
    skills: ["Sales", "Market Analysis", "Customer Service"],
    bio: "Results-driven consultant with strong sales track record.",
  },
]

export const getConnectionById = (id: string): Connection | undefined => {
  return mockConnections.find((conn) => conn.id === id)
}

export const getConnectionsByDegree = (degree: "1st" | "2nd" | "3rd"): Connection[] => {
  return mockConnections.filter((conn) => conn.connectionDegree === degree)
}
