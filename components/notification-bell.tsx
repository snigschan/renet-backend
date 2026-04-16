"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Check, X } from "lucide-react"
import { getWebSocketClient } from "@/lib/websocket/client"
import Link from "next/link"

interface Notification {
  id: string
  type: "job-match" | "message" | "application" | "interview" | "connection"
  title: string
  message: string
  timestamp: Date
  read: boolean
  link?: string
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "job-match",
      title: "New Job Match",
      message: "3 new positions match your profile",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      link: "/search",
    },
    {
      id: "2",
      type: "application",
      title: "Application Update",
      message: "Your application for Senior Agent at Emaar has been viewed",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      link: "/applications",
    },
  ])
  const [isConnected, setIsConnected] = useState(false)
  const wsClient = getWebSocketClient()

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    // Connect to WebSocket for real-time notifications
    wsClient
      .connect("user-123")
      .then(() => {
        setIsConnected(true)
        console.log("[v0] Notifications connected")
      })
      .catch((error) => {
        console.error("[v0] Notifications connection error:", error)
      })

    // Listen for new notifications
    wsClient.on("notification", (data: any) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: data.type,
        title: data.title,
        message: data.message,
        timestamp: new Date(),
        read: false,
        link: data.link,
      }
      setNotifications((prev) => [newNotification, ...prev])
    })

    return () => {
      wsClient.disconnect()
    }
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-12 w-96 max-h-[600px] shadow-xl z-50">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                  Mark all read
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-muted/50 transition-colors ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          {notification.link ? (
                            <Link
                              href={notification.link}
                              onClick={() => {
                                markAsRead(notification.id)
                                setIsOpen(false)
                              }}
                            >
                              <h4 className="font-semibold text-sm hover:text-primary">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </Link>
                          ) : (
                            <>
                              <h4 className="font-semibold text-sm">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeNotification(notification.id)}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
