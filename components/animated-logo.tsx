"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
  showAnimation?: boolean
  className?: string
}

export function AnimatedLogo({ size = "md", showAnimation = false, className }: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(showAnimation)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  }

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setIsAnimating(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showAnimation])

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <Image
        src="/images/design-mode/logo.png"
        alt="Renet Logo"
        fill
        className={cn("object-contain transition-all duration-700 text-card bg-card", isAnimating && "animate-logo-entrance")}
        priority
      />
    </div>
  )
}
