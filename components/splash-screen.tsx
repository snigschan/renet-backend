"use client"

import { useEffect, useState } from "react"
import { AnimatedLogo } from "./animated-logo"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash")

    if (hasSeenSplash) {
      setIsVisible(false)
      return
    }

    const timer = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem("hasSeenSplash", "true")
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center animate-fade-out">
      <div className="text-center">
        <AnimatedLogo size="lg" showAnimation className="mx-auto mb-6" />
        <div className="flex items-center gap-2 justify-center">
          <div className="w-2 h-2 bg-[#E91E63] rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-[#E91E63] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 bg-[#E91E63] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  )
}
