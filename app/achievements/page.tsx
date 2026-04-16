"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Users, Award, Crown, Zap, Gift, CheckCircle, Lock, Share2 } from "lucide-react"

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const userStats = {
    level: 12,
    xp: 8750,
    nextLevelXp: 10000,
    totalEarnings: "AED 2,450,000",
    completedMissions: 47,
    clientRating: 4.9,
    streak: 23,
  }

  const achievements = [
    {
      id: "1",
      title: "First Sale Champion",
      description: "Complete your first property sale",
      icon: Trophy,
      category: "sales",
      rarity: "common",
      xp: 100,
      unlocked: true,
      unlockedDate: "2024-01-15",
      progress: 100,
    },
    {
      id: "2",
      title: "Million Dirham Club",
      description: "Generate AED 1,000,000 in sales",
      icon: Crown,
      category: "sales",
      rarity: "legendary",
      xp: 1000,
      unlocked: true,
      unlockedDate: "2024-08-22",
      progress: 100,
    },
    {
      id: "3",
      title: "Client Whisperer",
      description: "Maintain 4.8+ rating for 6 months",
      icon: Star,
      category: "service",
      rarity: "epic",
      xp: 500,
      unlocked: true,
      unlockedDate: "2024-09-10",
      progress: 100,
    },
    {
      id: "4",
      title: "Speed Demon",
      description: "Close 5 deals in one month",
      icon: Zap,
      category: "performance",
      rarity: "rare",
      xp: 300,
      unlocked: false,
      progress: 80,
    },
    {
      id: "5",
      title: "Network Builder",
      description: "Connect with 100 professionals",
      icon: Users,
      category: "networking",
      rarity: "uncommon",
      xp: 200,
      unlocked: false,
      progress: 65,
    },
    {
      id: "6",
      title: "Luxury Specialist",
      description: "Sell 10 properties over AED 5M",
      icon: Award,
      category: "sales",
      rarity: "epic",
      xp: 750,
      unlocked: false,
      progress: 30,
    },
  ]

  const challenges = [
    {
      id: "1",
      title: "Weekly Warrior",
      description: "Complete 3 missions this week",
      progress: 2,
      target: 3,
      reward: "150 XP",
      timeLeft: "4 days",
      type: "weekly",
    },
    {
      id: "2",
      title: "Client Satisfaction",
      description: "Maintain 4.5+ rating this month",
      progress: 4.7,
      target: 4.5,
      reward: "300 XP + Badge",
      timeLeft: "12 days",
      type: "monthly",
    },
    {
      id: "3",
      title: "Revenue Target",
      description: "Generate AED 500K in sales",
      progress: 320000,
      target: 500000,
      reward: "500 XP + Title",
      timeLeft: "18 days",
      type: "monthly",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Ahmed Al-Rashid", level: 18, xp: 15420, avatar: "/professional-headshot.png" },
    { rank: 2, name: "Sarah Johnson", level: 16, xp: 13890, avatar: "/professional-headshot.png" },
    { rank: 3, name: "Mohammed Hassan", level: 15, xp: 12750, avatar: "/professional-headshot.png" },
    { rank: 4, name: "You", level: 12, xp: 8750, avatar: "/professional-headshot.png" },
    { rank: 5, name: "Fatima Al-Zahra", level: 11, xp: 8200, avatar: "/professional-headshot.png" },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 bg-gray-100"
      case "uncommon":
        return "text-green-600 bg-green-100"
      case "rare":
        return "text-blue-600 bg-blue-100"
      case "epic":
        return "text-purple-600 bg-purple-100"
      case "legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const filteredAchievements =
    selectedCategory === "all" ? achievements : achievements.filter((a) => a.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Achievements & Gamification</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            Level up your real estate career with our comprehensive achievement system
          </p>
        </div>

        {/* User Progress Card */}
        <Card className="mb-8 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Level {userStats.level}</CardTitle>
                <CardDescription>Real Estate Professional</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-600">{userStats.xp.toLocaleString()}</div>
                <div className="text-sm text-gray-600">XP</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Level {userStats.level + 1}</span>
                <span>
                  {userStats.xp}/{userStats.nextLevelXp} XP
                </span>
              </div>
              <Progress value={(userStats.xp / userStats.nextLevelXp) * 100} className="h-3" />
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{userStats.totalEarnings}</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{userStats.completedMissions}</div>
                <div className="text-sm text-gray-600">Missions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{userStats.clientRating}</div>
                <div className="text-sm text-gray-600">Client Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{userStats.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="achievements" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            {/* Achievement Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory === "all" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "sales" ? "default" : "outline"}
                onClick={() => setSelectedCategory("sales")}
                className={selectedCategory === "sales" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                Sales
              </Button>
              <Button
                variant={selectedCategory === "service" ? "default" : "outline"}
                onClick={() => setSelectedCategory("service")}
                className={selectedCategory === "service" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                Service
              </Button>
              <Button
                variant={selectedCategory === "performance" ? "default" : "outline"}
                onClick={() => setSelectedCategory("performance")}
                className={selectedCategory === "performance" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                Performance
              </Button>
              <Button
                variant={selectedCategory === "networking" ? "default" : "outline"}
                onClick={() => setSelectedCategory("networking")}
                className={selectedCategory === "networking" ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                Networking
              </Button>
            </div>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border-amber-200 transition-all duration-300 ${
                    achievement.unlocked
                      ? "hover:shadow-lg bg-gradient-to-br from-white to-amber-50"
                      : "opacity-75 bg-gray-50"
                  }`}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto p-4 rounded-full mb-4 ${
                        achievement.unlocked ? "bg-amber-100" : "bg-gray-200"
                      }`}
                    >
                      {achievement.unlocked ? (
                        <achievement.icon className="h-8 w-8 text-amber-600" />
                      ) : (
                        <Lock className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                        </Badge>
                        <div className="text-sm font-medium text-amber-600">+{achievement.xp} XP</div>
                      </div>

                      {!achievement.unlocked && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      )}

                      {achievement.unlocked && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Unlocked {achievement.unlockedDate}
                          </div>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <Badge
                        variant="outline"
                        className={
                          challenge.type === "weekly"
                            ? "border-blue-200 text-blue-600"
                            : "border-purple-200 text-purple-600"
                        }
                      >
                        {challenge.type}
                      </Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>
                            {typeof challenge.progress === "number" && challenge.progress > 100
                              ? challenge.progress.toLocaleString()
                              : challenge.progress}
                            {" / "}
                            {typeof challenge.target === "number" && challenge.target > 100
                              ? challenge.target.toLocaleString()
                              : challenge.target}
                          </span>
                        </div>
                        <Progress
                          value={
                            typeof challenge.progress === "number" && typeof challenge.target === "number"
                              ? (challenge.progress / challenge.target) * 100
                              : 0
                          }
                          className="h-3"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-amber-600">{challenge.reward}</div>
                          <div className="text-xs text-gray-500">{challenge.timeLeft} left</div>
                        </div>
                        <Gift className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-600" />
                  Top Performers This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        user.name === "You" ? "bg-amber-50 border border-amber-200" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1
                              ? "bg-yellow-500 text-white"
                              : user.rank === 2
                                ? "bg-gray-400 text-white"
                                : user.rank === 3
                                  ? "bg-amber-600 text-white"
                                  : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {user.rank}
                        </div>
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">Level {user.level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-amber-600">{user.xp.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
