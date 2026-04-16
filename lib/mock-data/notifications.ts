/**
 * RENet Mock Data - Notifications
 * Centralized mock notification data for development and testing
 */

export interface Notification {
  id: string
  type: "job_match" | "profile_view" | "connection" | "message" | "endorsement" | "application" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  avatar?: string
  priority?: "high" | "medium" | "low"
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "job_match",
    title: "New Job Match",
    message: "Senior Real Estate Agent at Emaar Properties matches your profile (95% match)",
    timestamp: "5 min ago",
    read: false,
    actionUrl: "/jobs/JOB-001",
    avatar: "/emaar-logo.jpg",
    priority: "high",
  },
  {
    id: "2",
    type: "profile_view",
    title: "Profile View",
    message: "Ahmed Al Mansoori viewed your profile",
    timestamp: "1 hour ago",
    read: false,
    actionUrl: "/profile/user-1",
    avatar: "/professional-arab-man.png",
    priority: "medium",
  },
  {
    id: "3",
    type: "connection",
    title: "Connection Request",
    message: "Sarah Johnson wants to connect with you",
    timestamp: "2 hours ago",
    read: true,
    actionUrl: "/network/requests",
    avatar: "/professional-woman-diverse.png",
    priority: "medium",
  },
  {
    id: "4",
    type: "message",
    title: "New Message",
    message: "Mohammed Hassan sent you a message",
    timestamp: "3 hours ago",
    read: true,
    actionUrl: "/messages/3",
    avatar: "/professional-man.jpg",
    priority: "high",
  },
  {
    id: "5",
    type: "endorsement",
    title: "New Endorsement",
    message: "Elena Petrova endorsed you for Property Management",
    timestamp: "1 day ago",
    read: true,
    actionUrl: "/endorsements",
    avatar: "/professional-blonde-woman.png",
    priority: "low",
  },
]

export const getUnreadNotifications = (): Notification[] => {
  return mockNotifications.filter((n) => !n.read)
}

export const getNotificationsByType = (type: Notification["type"]): Notification[] => {
  return mockNotifications.filter((n) => n.type === type)
}
