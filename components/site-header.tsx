"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import Link from "next/link"
import { translations, type Language } from "@/lib/i18n/translations"
import { AnimatedLogo } from "./animated-logo"

export function SiteHeader() {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    if (typeof document !== "undefined") {
      const isRTL = language === "ar" || language === "ur" || language === "fa"
      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr")
      document.documentElement.setAttribute("lang", language)
    }
  }, [language])

  const toggleLanguage = () => {
    const languages: Language[] = ["en", "ar", "fr", "ur", "hi", "fa"]
    const currentIndex = languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % languages.length
    setLanguage(languages[nextIndex])
  }

  const currentContent = translations[language]
  const languageLabels = {
    en: "English",
    ar: "العربية",
    fr: "Français",
    ur: "اردو",
    hi: "हिन्दी",
    fa: "فارسی", // Added Farsi label
  }

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            <AnimatedLogo size="md" />
          </div>
          <div>
            <p className="text-xs text-gray-600">
              {language === "ar"
                ? "شبكة العقارات"
                : language === "ur"
                  ? "رئیل اسٹیٹ نیٹ ورک"
                  : language === "hi"
                    ? "रियल एस्टेट नेटवर्क"
                    : language === "fa"
                      ? "شبکه املاک"
                      : "Real Estate Network"}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <Globe className="w-4 h-4" />
            {languageLabels[language]}
          </Button>
          <Link href="/auth/login">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              {currentContent.nav.signIn}
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm" className="bg-[#008080] hover:bg-[#006666] text-white">
              {currentContent.nav.joinNow}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
