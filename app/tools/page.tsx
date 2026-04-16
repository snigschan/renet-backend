import { AIImageGenerator } from "@/components/ai-image-generator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, FileText, ImageIcon, TrendingUp } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

export default function ToolsHub() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Tools Hub</h1>
          <p className="text-muted-foreground">Professional tools for Middle East real estate experts</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-[#D4AF37]" />
                Mortgage Calculator
              </CardTitle>
              <CardDescription>Calculate payments in AED, SAR, QAR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Property Value</label>
                  <input type="number" placeholder="1,000,000" className="w-full border rounded p-2 mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Down Payment %</label>
                  <input type="number" placeholder="20" className="w-full border rounded p-2 mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Interest Rate %</label>
                  <input type="number" placeholder="3.5" className="w-full border rounded p-2 mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Loan Term (years)</label>
                  <input type="number" placeholder="25" className="w-full border rounded p-2 mt-1" />
                </div>
                <button className="w-full bg-[#008080] text-white py-2 rounded hover:bg-[#006666]">Calculate</button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
                Property Value Estimator
              </CardTitle>
              <CardDescription>ME market data-driven estimates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <select className="w-full border rounded p-2 mt-1">
                    <option>Dubai Marina</option>
                    <option>Riyadh - Al Olaya</option>
                    <option>Doha - West Bay</option>
                    <option>Abu Dhabi - Al Reem</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Property Type</label>
                  <select className="w-full border rounded p-2 mt-1">
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Townhouse</option>
                    <option>Penthouse</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Size (sqm)</label>
                  <input type="number" placeholder="150" className="w-full border rounded p-2 mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Bedrooms</label>
                  <input type="number" placeholder="2" className="w-full border rounded p-2 mt-1" />
                </div>
                <button className="w-full bg-[#008080] text-white py-2 rounded hover:bg-[#006666]">
                  Estimate Value
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <AIImageGenerator />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#D4AF37]" />
                Document Templates
              </CardTitle>
              <CardDescription>Arabic & English contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  📄 Sale Agreement (EN/AR)
                </button>
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  📄 Rental Contract (EN/AR)
                </button>
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  📄 Agency Agreement (EN/AR)
                </button>
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  📄 NDA Template (EN/AR)
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-[#D4AF37]" />
                Quick Actions
              </CardTitle>
              <CardDescription>Frequently used tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  🎨 Generate Property Brochure
                </button>
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  📊 Market Analysis Report
                </button>
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  🏷️ Add Watermark to Images
                </button>
                <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
                  📧 Email Template Generator
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
