"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, ImageIcon, Wand2, Download, Share2 } from "lucide-react"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export function AIImageGenerator() {
  const [description, setDescription] = useState("")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [style, setStyle] = useState("realistic")
  const [quality, setQuality] = useState("standard")

  const handleGenerate = async () => {
    if (!description.trim()) return

    setLoading(true)
    try {
      // Call AI image generation API
      const response = await fetch(`${API_BASE_URL}/api/ai/generate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: description,
          style,
          quality,
        }),
      })

      const data = await response.json()
      setGeneratedImage(data.imageUrl)
    } catch (error) {
      console.error("Image generation failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVirtualStaging = async (file: File) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("style", style)

      const response = await fetch(`${API_BASE_URL}/api/ai/virtual-staging`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      setGeneratedImage(data.imageUrl)
    } catch (error) {
      console.error("Virtual staging failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#D4AF37]" />
          AI Image Generator
        </CardTitle>
        <CardDescription>Create stunning property visuals with AI - virtual staging, renders, and more</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">
              <ImageIcon className="h-4 w-4 mr-2" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="staging">
              <Wand2 className="h-4 w-4 mr-2" />
              Virtual Staging
            </TabsTrigger>
            <TabsTrigger value="enhance">
              <Sparkles className="h-4 w-4 mr-2" />
              Enhance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Describe your image</Label>
              <Input
                id="description"
                placeholder="e.g., Luxury villa in Dubai with modern architecture and pool"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="architectural">Architectural</SelectItem>
                    <SelectItem value="artistic">Artistic</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quality</Label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="hd">HD</SelectItem>
                    <SelectItem value="ultra">Ultra HD (Premium)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className="w-full bg-[#008080] hover:bg-[#006666]"
            >
              {loading ? "Generating..." : "Generate Image"}
            </Button>
          </TabsContent>

          <TabsContent value="staging" className="space-y-4">
            <div className="space-y-2">
              <Label>Upload empty room photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleVirtualStaging(file)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Furniture Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="traditional">Traditional Arabic</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground">Upload an empty room and we'll add furniture virtually</p>
          </TabsContent>

          <TabsContent value="enhance" className="space-y-4">
            <div className="space-y-2">
              <Label>Upload image to enhance</Label>
              <Input type="file" accept="image/*" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Brightness</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
              <div className="space-y-2">
                <Label>Contrast</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
              <div className="space-y-2">
                <Label>Saturation</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </div>

            <Button className="w-full bg-[#008080] hover:bg-[#006666]">Apply Enhancements</Button>
          </TabsContent>
        </Tabs>

        {generatedImage && (
          <div className="mt-6 space-y-4">
            <div className="relative rounded-lg overflow-hidden border">
              <img src={generatedImage || "/placeholder.svg"} alt="Generated" className="w-full h-auto" />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
