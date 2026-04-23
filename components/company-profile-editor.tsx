"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Calendar, Globe, MapPin, Users } from "lucide-react"

export type CompanyProfileFormValues = {
  name: string
  location: string
  website: string
  employee_count_range: string
  founded_year: string
  description: string
  logo_url: string
}

type CompanyProfileEditorProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  values: CompanyProfileFormValues
  onSave: (values: CompanyProfileFormValues) => Promise<void>
  isSaving: boolean
  errorMessage?: string
}

export function CompanyProfileEditor({
  open,
  onOpenChange,
  values,
  onSave,
  isSaving,
  errorMessage,
}: CompanyProfileEditorProps) {
  const [formValues, setFormValues] = useState<CompanyProfileFormValues>(values)

  useEffect(() => {
    setFormValues(values)
  }, [values, open])

  const updateField = (field: keyof CompanyProfileFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }))
  }

  const initials =
    formValues.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CP"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-primary/10 p-0 sm:max-w-4xl">
        <div className="grid gap-0 md:grid-cols-[320px_minmax(0,1fr)]">
          <div className="border-b border-border bg-gradient-to-b from-primary/10 via-primary/5 to-background p-6 md:border-r md:border-b-0">
            <div className="rounded-3xl border border-primary/15 bg-background/90 p-6 shadow-sm">
              <div className="mb-6 h-24 rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
              <div className="-mt-14 px-2">
                <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
                  <AvatarImage src={formValues.logo_url || "/placeholder.svg"} alt={formValues.name} />
                  <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold text-foreground">{formValues.name || "Your company name"}</h3>
                  <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary/90">Profile Preview</Badge>
                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                  {formValues.description || "Add a short company description to help candidates understand your brand."}
                </p>

                <div className="space-y-2 rounded-2xl border border-border/80 bg-muted/30 p-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{formValues.location || "Location"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{formValues.employee_count_range || "Team size"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{formValues.founded_year ? `Founded ${formValues.founded_year}` : "Founded year"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="truncate">{formValues.website || "Website URL"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle>Edit Company Profile</DialogTitle>
              <DialogDescription>
                Refine how your company appears to candidates while keeping your brand colors consistent.
              </DialogDescription>
            </DialogHeader>

            <form
              className="space-y-6"
              onSubmit={async (event) => {
                event.preventDefault()
                await onSave(formValues)
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={formValues.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Premium Realty Group"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-location">Location</Label>
                  <Input
                    id="company-location"
                    value={formValues.location}
                    onChange={(event) => updateField("location", event.target.value)}
                    placeholder="New York, NY"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input
                    id="company-website"
                    value={formValues.website}
                    onChange={(event) => updateField("website", event.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee-count">Team Size</Label>
                  <Input
                    id="employee-count"
                    value={formValues.employee_count_range}
                    onChange={(event) => updateField("employee_count_range", event.target.value)}
                    placeholder="50-200 employees"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="founded-year">Founded Year</Label>
                  <Input
                    id="founded-year"
                    value={formValues.founded_year}
                    onChange={(event) => updateField("founded_year", event.target.value)}
                    inputMode="numeric"
                    placeholder="2015"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input
                    id="logo-url"
                    value={formValues.logo_url}
                    onChange={(event) => updateField("logo_url", event.target.value)}
                    placeholder="https://cdn.example.com/logo.png"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company-description">About Company</Label>
                  <Textarea
                    id="company-description"
                    value={formValues.description}
                    onChange={(event) => updateField("description", event.target.value)}
                    placeholder="Describe your culture, expertise, and what makes your company credible."
                    rows={6}
                  />
                </div>
              </div>

              <DialogFooter>
                {errorMessage && (
                  <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSaving}>
                  <Building2 className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Profile"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
