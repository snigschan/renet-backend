/**
 * RENet Mock Data - Messages
 * Centralized mock message data for development and testing
 */

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  read: boolean
  attachments?: string[]
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantRole: string
  participantAvatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online?: boolean
  connectionDegree?: string
}

export const mockConversations: Conversation[] = [
  {
    id: "1",
    participantId: "user-1",
    participantName: "Ahmed Al Mansoori",
    participantRole: "Senior Real Estate Agent",
    participantAvatar: "/professional-arab-man.png",
    lastMessage: "Thanks for connecting! Looking forward to collaborating.",
    timestamp: "10 min ago",
    unread: 2,
    online: true,
    connectionDegree: "1st",
  },
  {
    id: "2",
    participantId: "user-2",
    participantName: "Sarah Johnson",
    participantRole: "Property Manager",
    participantAvatar: "/professional-woman-diverse.png",
    lastMessage: "I have some properties that might interest you.",
    timestamp: "1 hour ago",
    unread: 0,
    online: false,
    connectionDegree: "1st",
  },
  {
    id: "3",
    participantId: "user-3",
    participantName: "Mohammed Hassan",
    participantRole: "Real Estate Consultant",
    participantAvatar: "/professional-man.jpg",
    lastMessage: "Can we schedule a meeting next week?",
    timestamp: "2 hours ago",
    unread: 1,
    online: true,
    connectionDegree: "2nd",
  },
]

export const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "user-1",
      senderName: "Ahmed Al Mansoori",
      senderAvatar: "/professional-arab-man.png",
      content: "Hi! I saw your profile and would love to connect.",
      timestamp: "2024-01-15 10:30 AM",
      read: true,
    },
    {
      id: "m2",
      senderId: "current-user",
      senderName: "You",
      senderAvatar: "/professional-person.png",
      content: "Hello Ahmed! Thanks for reaching out.",
      timestamp: "2024-01-15 10:35 AM",
      read: true,
    },
    {
      id: "m3",
      senderId: "user-1",
      senderName: "Ahmed Al Mansoori",
      senderAvatar: "/professional-arab-man.png",
      content: "Thanks for connecting! Looking forward to collaborating.",
      timestamp: "2024-01-15 10:40 AM",
      read: false,
    },
  ],
}

export const getConversationById = (id: string): Conversation | undefined => {
  return mockConversations.find((conv) => conv.id === id)
}

export const getMessagesByConversationId = (conversationId: string): Message[] => {
  return mockMessages[conversationId] || []
}
