import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Award, Users, Play } from "lucide-react"

export default function TrainingAcademy() {
  const courses = [
    {
      title: "Dubai Real Estate Licensing Preparation",
      description: "Complete guide to obtaining your RERA license in Dubai",
      duration: "8 weeks",
      students: 1250,
      rating: 4.9,
      modules: 12,
      language: "English & Arabic",
      certificate: true,
      image: "/dubai-real-estate-training.jpg",
    },
    {
      title: "Saudi Property Law & Regulations",
      description: "Master Saudi real estate laws and Vision 2030 initiatives",
      duration: "6 weeks",
      students: 890,
      rating: 4.8,
      modules: 10,
      language: "Arabic & English",
      certificate: true,
      image: "/saudi-property-law.jpg",
    },
    {
      title: "Luxury Property Marketing in the ME",
      description: "Advanced strategies for high-end property sales",
      duration: "4 weeks",
      students: 650,
      rating: 4.7,
      modules: 8,
      language: "English",
      certificate: true,
      image: "/luxury-property-marketing.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">RENet Training Academy</h1>
          <p className="text-muted-foreground">Professional development courses for Middle East real estate experts</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">45+</h3>
              <p className="text-muted-foreground">Courses Available</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-[#008080] mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">12,500+</h3>
              <p className="text-muted-foreground">Students Enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">8,900+</h3>
              <p className="text-muted-foreground">Certificates Issued</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="bg-gradient-to-r from-[#008080] to-[#006666] text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">AI Study Assistant</h2>
              <p className="mb-4">
                Get instant answers to your questions, personalized study plans, and AI-generated study materials
              </p>
              <Button className="bg-white text-[#008080] hover:bg-gray-100">Try AI Tutor</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {courses.map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground mb-4">{course.description}</p>
                    </div>
                    {course.certificate && <Award className="h-8 w-8 text-[#D4AF37]" />}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-[#008080]" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-[#008080]" />
                      <span>{course.modules} Modules</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-[#008080]" />
                      <span>{course.students} Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#D4AF37]">★</span>
                      <span>{course.rating}/5.0</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Available in: {course.language}</div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Play className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button className="bg-[#008080] hover:bg-[#006666]">Enroll Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
