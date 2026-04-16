"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronDown, ChevronUp, MessageCircle } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create a RENet account?",
          a: 'Click "Sign Up" in the top right, choose your role (Job Seeker or Agency), and complete the registration form. Verify your email to activate your account.',
        },
        {
          q: "Is RENet available in Arabic?",
          a: "Yes! RENet fully supports Arabic with RTL layout. Click the language selector in the navigation to switch between English, Arabic, and French.",
        },
        {
          q: "Which countries does RENet cover?",
          a: "RENet focuses on 12 Middle East countries: UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, Jordan, Lebanon, Egypt, Iraq, Yemen, and Palestine.",
        },
      ],
    },
    {
      category: "AI Features",
      questions: [
        {
          q: "How does AI image generation work?",
          a: "Our AI Image Generator uses advanced models to create property visuals from text descriptions. Premium users get unlimited generations, while free users get 5 per month.",
        },
        {
          q: "What is virtual staging?",
          a: "Virtual staging uses AI to add furniture and decor to empty room photos, helping visualize properties. Upload a photo in the Tools Hub to try it.",
        },
        {
          q: "How accurate is the AI job matching?",
          a: "Our AI analyzes 50+ factors including skills, experience, location preferences, and market trends to provide 85%+ match accuracy.",
        },
      ],
    },
    {
      category: "Pricing & Payments",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept credit/debit cards, PayPal, and regional payment methods including local bank transfers in AED, SAR, and QAR.",
        },
        {
          q: "Can I upgrade or downgrade my plan?",
          a: "Yes, you can change your plan anytime from Settings > Subscription. Changes take effect immediately with prorated billing.",
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 14-day money-back guarantee for annual plans. Monthly subscriptions are non-refundable but can be canceled anytime.",
        },
      ],
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          q: "How is my data protected?",
          a: "We use bank-level encryption (AES-256), comply with regional data protection laws, and never sell your personal information.",
        },
        {
          q: "Can I browse profiles anonymously?",
          a: 'Yes, Premium users can enable Private Browsing mode in Settings to view profiles without appearing in "Who Viewed Your Profile".',
        },
        {
          q: "How do I delete my account?",
          a: "Go to Settings > Account > Delete Account. Your data will be permanently removed within 30 days per regional regulations.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Find answers to common questions about RENet Middle East</p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <Card className="bg-gradient-to-r from-[#008080] to-[#006666] text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can't find your answer?</h3>
                  <p className="text-white/90">Chat with our AI assistant for instant help</p>
                </div>
                <Button className="bg-white text-[#008080] hover:bg-gray-100">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-4 text-[#008080]">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex
                  const isOpen = openIndex === globalIndex

                  return (
                    <Card key={faqIndex} className="overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold pr-8">{faq.q}</h3>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-[#008080] flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-[#008080] flex-shrink-0" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <Card>
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>
              <CardDescription>Contact our support team for personalized assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Button className="bg-[#008080] hover:bg-[#006666]">Contact Support</Button>
                <Button variant="outline">View Documentation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
