"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Search,
  Users,
  Building,
  MapPin,
  Star,
  UserPlus,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for professional conversations
const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Real Estate Agent",
    company: "Prime Properties NYC",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'd love to discuss potential collaboration opportunities in the NYC market.",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    location: "New York, NY",
    connectionType: "1st degree",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Property Investment Manager",
    company: "Global Realty Group",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for connecting! I saw your portfolio and I'm impressed.",
    timestamp: "1 hour ago",
    unread: 0,
    online: false,
    location: "Los Angeles, CA",
    connectionType: "2nd degree",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Commercial Real Estate Broker",
    company: "Metro Commercial",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can we schedule a call to discuss the Miami commercial project?",
    timestamp: "3 hours ago",
    unread: 1,
    online: true,
    location: "Miami, FL",
    connectionType: "1st degree",
  },
]

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hi! I came across your profile and was impressed by your experience in luxury residential properties.",
    timestamp: "09:30 AM",
    isOwn: false,
    type: "text",
  },
  {
    id: 2,
    sender: "You",
    content: "Thank you! I'd be happy to connect and share insights about the luxury market.",
    timestamp: "09:32 AM",
    isOwn: true,
    type: "text",
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    content: "Perfect! I'm particularly interested in your approach to high-net-worth client acquisition.",
    timestamp: "09:35 AM",
    isOwn: false,
    type: "text",
  },
  {
    id: 4,
    sender: "Sarah Johnson",
    content: "I've been working on expanding our luxury portfolio and would love to learn from your experience.",
    timestamp: "09:36 AM",
    isOwn: false,
    type: "text",
  },
  {
    id: 5,
    sender: "You",
    content: "I'd be happy to share some strategies. Would you like to schedule a call this week?",
    timestamp: "09:40 AM",
    isOwn: true,
    type: "text",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("messages")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Professional Messages</h1>
          <p className="text-muted-foreground">Connect and communicate with real estate professionals worldwide</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[800px]">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search conversations..." className="pl-9" />
                  </div>
                </div>

                <div className="overflow-y-auto h-[calc(100%-80px)]">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation.id === conversation.id ? "bg-muted border-primary/20" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                            <AvatarFallback>
                              {conversation.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-foreground truncate">{conversation.name}</h3>
                            {conversation.unread > 0 && (
                              <Badge
                                variant="destructive"
                                className="h-5 w-5 p-0 flex items-center justify-center text-xs"
                              >
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{conversation.role}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                            <Building className="h-3 w-3" />
                            <span className="truncate">{conversation.company}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-2">{conversation.lastMessage}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                            <Badge variant="outline" className="text-xs">
                              {conversation.connectionType}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedConversation.avatar || "/placeholder.svg"}
                      alt={selectedConversation.name}
                    />
                    <AvatarFallback>
                      {selectedConversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedConversation.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedConversation.role}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building className="h-3 w-3" />
                      <span>{selectedConversation.company}</span>
                      <span>•</span>
                      <MapPin className="h-3 w-3" />
                      <span>{selectedConversation.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="px-4 pt-2">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                    <TabsTrigger value="profile">Professional Info</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="messages" className="flex-1 flex flex-col m-0">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-md rounded-lg p-3 ${
                            message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {!message.isOwn && (
                            <p className="text-xs font-medium text-muted-foreground mb-1">{message.sender}</p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-2 ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-end gap-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="resize-none"
                        />
                      </div>
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="profile" className="flex-1 m-0 p-4 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Professional Profile */}
                    <div className="text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg">
                          {selectedConversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold">{selectedConversation.name}</h3>
                      <p className="text-muted-foreground">{selectedConversation.role}</p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{selectedConversation.company}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{selectedConversation.location}</span>
                      </div>
                    </div>

                    {/* Connection Actions */}
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>

                    {/* Professional Details */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Experience</h4>
                        <p className="text-sm text-muted-foreground">
                          8+ years in luxury residential and commercial real estate
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Luxury Residential</Badge>
                          <Badge variant="outline">Commercial Properties</Badge>
                          <Badge variant="outline">Investment Properties</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Rating</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">4.9 (127 reviews)</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Mutual Connections</h4>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">12 mutual connections</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
