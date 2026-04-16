"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Briefcase,
  Users,
  MessageCircle,
  Star,
  Eye,
  UserPlus,
  CheckCircle,
  Settings,
  Filter,
  Trash2,
} from "lucide-react"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "job_match",
    title: "New Job Match",
    message: "Senior Property Consultant at Premium Realty Group matches your profile (95% match)",
    timestamp: "5 minutes ago",
    read: false,
    icon: Briefcase,
    actionUrl: "/search?job=1",
    priority: "high",
  },
  {
    id: 2,
    type: "profile_view",
    title: "Profile Viewed",
    message: "Michael Chen from Global Realty Group viewed your profile",
    timestamp: "1 hour ago",
    read: false,
    icon: Eye,
    actionUrl: "/profile/michael-chen",
    priority: "medium",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    type: "connection_request",
    title: "Connection Request",
    message: "Emma Rodriguez wants to connect with you",
    timestamp: "2 hours ago",
    read: false,
    icon: UserPlus,
    actionUrl: "/network/requests",
    priority: "high",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    type: "message",
    title: "New Message",
    message: "Sarah Johnson sent you a message about collaboration opportunities",
    timestamp: "3 hours ago",
    read: true,
    icon: MessageCircle,
    actionUrl: "/messages/1",
    priority: "high",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    type: "endorsement",
    title: "New Endorsement",
    message: "David Kim endorsed you for Commercial Real Estate",
    timestamp: "5 hours ago",
    read: true,
    icon: Star,
    actionUrl: "/profile#endorsements",
    priority: "medium",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    type: "application_update",
    title: "Application Update",
    message: "Your application for Commercial Real Estate Broker has been reviewed",
    timestamp: "1 day ago",
    read: true,
    icon: CheckCircle,
    actionUrl: "/applications/2",
    priority: "high",
  },
  {
    id: 7,
    type: "job_match",
    title: "New Job Match",
    message: "Luxury Property Specialist at Elite Estates matches your profile (82% match)",
    timestamp: "1 day ago",
    read: true,
    icon: Briefcase,
    actionUrl: "/search?job=3",
    priority: "medium",
  },
  {
    id: 8,
    type: "network_activity",
    title: "Network Update",
    message: "3 of your connections changed jobs",
    timestamp: "2 days ago",
    read: true,
    icon: Users,
    actionUrl: "/network",
    priority: "low",
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList(notificationList.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList(notificationList.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList(notificationList.filter((n) => n.id !== id))
  }

  const filterNotifications = (type: string) => {
    if (type === "all") return notificationList
    if (type === "unread") return notificationList.filter((n) => !n.read)
    return notificationList.filter((n) => n.type === type)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your professional activities and opportunities</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <span className="font-medium">
                    You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <Badge variant="default">{unreadCount}</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notification Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">
              All
              <Badge variant="outline" className="ml-2">
                {notificationList.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="job_match">Jobs</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="connection_request">Network</TabsTrigger>
            <TabsTrigger value="endorsement">Endorsements</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filterNotifications(activeTab).length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === "unread"
                      ? "You're all caught up!"
                      : "You'll see notifications here when you have new activity"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filterNotifications(activeTab).map((notification) => {
                const IconComponent = notification.icon
                return (
                  <Card
                    key={notification.id}
                    className={`transition-all hover:shadow-md ${!notification.read ? "border-primary/30 bg-primary/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon or Avatar */}
                        <div className="flex-shrink-0">
                          {notification.avatar ? (
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                <IconComponent className="h-6 w-6" />
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div
                              className={`h-12 w-12 rounded-full flex items-center justify-center ${
                                !notification.read ? "bg-primary/10" : "bg-muted"
                              }`}
                            >
                              <IconComponent
                                className={`h-6 w-6 ${!notification.read ? "text-primary" : "text-muted-foreground"}`}
                              />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3
                              className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getPriorityColor(notification.priority)}`}></div>
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-8"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Mark Read
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="h-8 bg-transparent">
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Preferences */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Job Matches</h4>
                  <p className="text-sm text-muted-foreground">Get notified when new jobs match your profile</p>
                </div>
                <Button variant="outline" size="sm">
                  Enabled
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Profile Views</h4>
                  <p className="text-sm text-muted-foreground">Know when someone views your profile</p>
                </div>
                <Button variant="outline" size="sm">
                  Enabled
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Connection Requests</h4>
                  <p className="text-sm text-muted-foreground">Get notified of new connection requests</p>
                </div>
                <Button variant="outline" size="sm">
                  Enabled
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Messages</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                </div>
                <Button variant="outline" size="sm">
                  Enabled
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Endorsements</h4>
                  <p className="text-sm text-muted-foreground">Get notified when someone endorses your skills</p>
                </div>
                <Button variant="outline" size="sm">
                  Enabled
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
