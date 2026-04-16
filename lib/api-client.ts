/**
 * RENet API Client
 * Centralized API request handler for the RENet platform
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message)
    this.name = "APIError"
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

/**
 * Core API request function with error handling
 */
export async function apiRequest<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  const { params, ...fetchOptions } = options || {}

  // Build URL with query parameters
  let url = `${API_BASE_URL}${endpoint}`
  if (params) {
    const searchParams = new URLSearchParams(params)
    url += `?${searchParams.toString()}`
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions?.headers,
      },
    })

    if (!response.ok) {
      throw new APIError(`API request failed: ${response.statusText}`, response.status, response.statusText)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError(error instanceof Error ? error.message : "Unknown error occurred", 500, "Internal Server Error")
  }
}

/**
 * RENet AI Services
 */
export const aiService = {
  /**
   * Match jobs for a professional based on their profile
   */
  matchJobs: async (userProfile: {
    name: string
    role: string
    experience: string
    skills: string[]
    location: string
    preferences: string
  }) => {
    return apiRequest("/api/ai/match-jobs", {
      method: "POST",
      body: JSON.stringify({ userProfile }),
    })
  },

  /**
   * Match candidates for an agency based on job requirements
   */
  matchCandidates: async (jobRequirements: {
    jobTitle: string
    company: string
    requirements: string
    location: string
    experienceLevel: string
    skills: string[]
  }) => {
    return apiRequest("/api/ai/match-candidates", {
      method: "POST",
      body: JSON.stringify({ jobRequirements }),
    })
  },

  /**
   * Get market insights and career advice
   */
  getSearchInsights: async (searchQuery: {
    query: string
    userRole: string
    location: string
    experience: string
  }) => {
    return apiRequest("/api/ai/search-insights", {
      method: "POST",
      body: JSON.stringify({ searchQuery }),
    })
  },

  /**
   * Get profile optimization recommendations
   */
  optimizeProfile: async (profile: {
    name: string
    role: string
    experience: string
    skills: string[]
    bio: string
    achievements: string[]
  }) => {
    return apiRequest("/api/ai/optimize-profile", {
      method: "POST",
      body: JSON.stringify({ profile }),
    })
  },
}

/**
 * RENet Data Services
 */
export const dataService = {
  /**
   * Fetch user profile data
   */
  getUserProfile: async (userId: string) => {
    return apiRequest(`/api/users/${userId}`, {
      method: "GET",
    })
  },

  /**
   * Update user profile
   */
  updateUserProfile: async (userId: string, data: Record<string, unknown>) => {
    return apiRequest(`/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  /**
   * Fetch jobs list
   */
  getJobs: async (filters?: Record<string, string>) => {
    return apiRequest("/api/jobs", {
      method: "GET",
      params: filters,
    })
  },

  /**
   * Fetch candidates list
   */
  getCandidates: async (filters?: Record<string, string>) => {
    return apiRequest("/api/candidates", {
      method: "GET",
      params: filters,
    })
  },

  /**
   * Fetch messages
   */
  getMessages: async (userId: string) => {
    return apiRequest(`/api/messages/${userId}`, {
      method: "GET",
    })
  },

  /**
   * Send a message
   */
  sendMessage: async (data: {
    recipientId: string
    content: string
    attachments?: string[]
  }) => {
    return apiRequest("/api/messages", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Fetch notifications
   */
  getNotifications: async (userId: string) => {
    return apiRequest(`/api/notifications/${userId}`, {
      method: "GET",
    })
  },

  /**
   * Mark notification as read
   */
  markNotificationRead: async (notificationId: string) => {
    return apiRequest(`/api/notifications/${notificationId}/read`, {
      method: "PUT",
    })
  },

  /**
   * Fetch network connections
   */
  getConnections: async (userId: string) => {
    return apiRequest(`/api/network/${userId}/connections`, {
      method: "GET",
    })
  },

  /**
   * Send connection request
   */
  sendConnectionRequest: async (targetUserId: string, message?: string) => {
    return apiRequest("/api/network/connect", {
      method: "POST",
      body: JSON.stringify({ targetUserId, message }),
    })
  },

  /**
   * Fetch endorsements
   */
  getEndorsements: async (userId: string) => {
    return apiRequest(`/api/endorsements/${userId}`, {
      method: "GET",
    })
  },

  /**
   * Give an endorsement
   */
  giveEndorsement: async (data: {
    userId: string
    skill: string
    recommendation?: string
  }) => {
    return apiRequest("/api/endorsements", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}

/**
 * RENet Admin Services
 */
export const adminService = {
  /**
   * Fetch platform analytics
   */
  getAnalytics: async (timeRange?: string) => {
    return apiRequest("/api/admin/analytics", {
      method: "GET",
      params: timeRange ? { timeRange } : undefined,
    })
  },

  /**
   * Fetch users for admin management
   */
  getUsers: async (filters?: Record<string, string>) => {
    return apiRequest("/api/admin/users", {
      method: "GET",
      params: filters,
    })
  },

  /**
   * Verify a user
   */
  verifyUser: async (userId: string, verificationType: string) => {
    return apiRequest(`/api/admin/users/${userId}/verify`, {
      method: "POST",
      body: JSON.stringify({ verificationType }),
    })
  },

  /**
   * Resolve a dispute
   */
  resolveDispute: async (disputeId: string, resolution: string) => {
    return apiRequest(`/api/admin/disputes/${disputeId}/resolve`, {
      method: "POST",
      body: JSON.stringify({ resolution }),
    })
  },
}
