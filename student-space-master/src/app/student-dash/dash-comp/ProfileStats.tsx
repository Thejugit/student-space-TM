"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Book, Star, Crown, Sparkles } from "lucide-react";

const classwiseLeaderboard = [
  { name: "Priya Sharma", score: "98.5%", xp: "3,200" },
  { name: "Aryan Patel", score: "96.2%", xp: "2,847" },
  { name: "Rahul Singh", score: "95.8%", xp: "2,750" },
  { name: "Aisha Khan", score: "94.3%", xp: "2,600" },
  { name: "Dev Patel", score: "93.7%", xp: "2,500" },
];

const overallLeaderboard = [
  { name: "Riya Mehta", score: "99.1%", xp: "3,500" },
  { name: "Priya Sharma", score: "98.5%", xp: "3,200" },
  { name: "Aryan Patel", score: "97.0%", xp: "3,000" },
  { name: "Sahil Verma", score: "96.8%", xp: "2,950" },
  { name: "Aisha Khan", score: "96.0%", xp: "2,900" },
];

export default function ProfileStats() {
  const [rankingType, setRankingType] = useState<"classwise" | "overall">("classwise");
  const [positionType, setPositionType] = useState<"classwise" | "overall">("classwise");

  // Position data for both dropdowns
  const positionData = {
    classwise: { rank: 2, total: 45, percent: 96.2 },
    overall: { rank: 3, total: 180, percent: 97.0 },
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 mt-4 sm:mt-6">
      {/* Mobile Layout (320px - 639px) */}
      <div className="block sm:hidden space-y-4">
        {/* Position Card - Mobile */}
        <Card className="bg-white rounded-2xl shadow-lg border-0">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base text-blue-900 font-bold">Your Position</CardTitle>
              <Select value={positionType} onValueChange={v => setPositionType(v as "classwise" | "overall")}>
                <SelectTrigger className="w-24 bg-blue-50 border-0 text-blue-900 text-xs font-medium focus:ring-2 focus:ring-blue-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classwise">Class</SelectItem>
                  <SelectItem value="overall">Overall</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-2">
              <div className="text-3xl font-bold text-blue-900 mb-1">
                #{positionData[positionType].rank}
              </div>
              <div className="text-xs text-blue-700 mb-2">
                out of {positionData[positionType].total} students
              </div>
              <div className="flex justify-between text-xs text-blue-700 mb-1">
                <span>Performance</span>
                <span>{positionData[positionType].percent}%</span>
              </div>
              <Progress value={positionData[positionType].percent} className="h-2 bg-blue-100" />
            </div>
          </CardContent>
        </Card>

        {/* Hall of Fame Card - Mobile */}
        <Card className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl shadow-lg border-0">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-white font-bold text-base">
                <Crown className="h-4 w-4 text-yellow-400" />
                Hall of Fame
              </CardTitle>
              <Select value={rankingType} onValueChange={v => setRankingType(v as "classwise" | "overall")}>
                <SelectTrigger className="w-24 bg-white/10 border-0 text-white text-xs font-medium focus:ring-2 focus:ring-blue-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classwise">Class</SelectItem>
                  <SelectItem value="overall">Overall</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(rankingType === "classwise" ? classwiseLeaderboard : overallLeaderboard).slice(0, 3).map((student, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    student.name === "Aryan Patel" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs
                      ${index === 0 ? "bg-yellow-400 text-blue-900" : "bg-white/20 text-white"}`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{student.name}</div>
                      <div className="text-xs opacity-75">{student.xp} XP</div>
                    </div>
                  </div>
                  <div className="font-semibold text-sm">{student.score}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Card - Mobile */}
        <Card className="bg-white rounded-2xl shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900 font-bold">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                <Target className="h-4 w-4 text-blue-700" />
                Current Mission
              </h3>
              <div className="mt-2 bg-blue-50 rounded-lg p-2 text-blue-900 text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-blue-700" />
                Dominate board exams & crack IIT 🚀
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                <Star className="h-4 w-4 text-yellow-500" />
                Bio
              </h3>
              <div className="mt-2 bg-blue-50 rounded-lg p-2 text-blue-900 text-sm">
                Math wizard | Physics enthusiast | Future engineer
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900 mb-2">
                <Trophy className="h-4 w-4 text-purple-700" />
                Superpowers
              </h3>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">🧮 Problem Solving</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">➗ Mathematics</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">👑 Leadership</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">⚡ Physics</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900 mb-2">
                  <Book className="h-4 w-4 text-green-700" />
                  Active Courses
                </h3>
                <ul className="space-y-1">
                  <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Advanced Mathematics</li>
                  <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Physics Mastery</li>
                  <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Chemistry Foundation</li>
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900 mb-2">
                  <Trophy className="h-4 w-4 text-purple-700" />
                  Side Quests
                </h3>
                <ul className="space-y-1">
                  <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Science Club President</li>
                  <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Math Olympiad Training</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tablet Layout (640px - 769px) */}
      <div className="hidden sm:block md:hidden">
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column - Profile Card */}
          <Card className="bg-white rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 font-bold">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                  <Target className="h-4 w-4 text-blue-700" />
                  Current Mission
                </h3>
                <div className="mt-2 bg-blue-50 rounded-lg p-2 text-blue-900 text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-blue-700" />
                  Dominate board exams & crack IIT 🚀
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Bio
                </h3>
                <div className="mt-2 bg-blue-50 rounded-lg p-2 text-blue-900 text-sm">
                  Math wizard | Physics enthusiast | Future engineer
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900 mb-2">
                  <Trophy className="h-4 w-4 text-purple-700" />
                  Superpowers
                </h3>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">🧮 Problem Solving</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">➗ Mathematics</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">👑 Leadership</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0 text-xs">⚡ Physics</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900 mb-2">
                    <Book className="h-4 w-4 text-green-700" />
                    Active Courses
                  </h3>
                  <ul className="space-y-1">
                    <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Advanced Mathematics</li>
                    <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Physics Mastery</li>
                    <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Chemistry Foundation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900 mb-2">
                    <Trophy className="h-4 w-4 text-purple-700" />
                    Side Quests
                  </h3>
                  <ul className="space-y-1">
                    <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Science Club President</li>
                    <li className="bg-blue-50 rounded-lg p-2 text-xs text-blue-900">• Math Olympiad Training</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Position Card */}
            <Card className="bg-white rounded-2xl shadow-lg border-0">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base text-blue-900 font-bold">Your Position</CardTitle>
                  <Select value={positionType} onValueChange={v => setPositionType(v as "classwise" | "overall")}>
                    <SelectTrigger className="w-24 bg-blue-50 border-0 text-blue-900 text-xs font-medium focus:ring-2 focus:ring-blue-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classwise">Class</SelectItem>
                      <SelectItem value="overall">Overall</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-3">
                  <div className="text-4xl font-bold text-blue-900 mb-1">
                    #{positionData[positionType].rank}
                  </div>
                  <div className="text-xs text-blue-700 mb-2">
                    out of {positionData[positionType].total} students
                  </div>
                  <div className="flex justify-between text-xs text-blue-700 mb-1">
                    <span>Performance</span>
                    <span>{positionData[positionType].percent}%</span>
                  </div>
                  <Progress value={positionData[positionType].percent} className="h-2 bg-blue-100" />
                </div>
              </CardContent>
            </Card>

            {/* Hall of Fame Card */}
            <Card className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl shadow-lg border-0">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-white font-bold text-base">
                    <Crown className="h-4 w-4 text-yellow-400" />
                    Hall of Fame
                  </CardTitle>
                  <Select value={rankingType} onValueChange={v => setRankingType(v as "classwise" | "overall")}>
                    <SelectTrigger className="w-24 bg-white/10 border-0 text-white text-xs font-medium focus:ring-2 focus:ring-blue-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classwise">Class</SelectItem>
                      <SelectItem value="overall">Overall</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(rankingType === "classwise" ? classwiseLeaderboard : overallLeaderboard).map((student, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded-lg ${
                        student.name === "Aryan Patel" ? "bg-white/20" : "hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs
                          ${index === 0 ? "bg-yellow-400 text-blue-900" : "bg-white/20 text-white"}`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{student.name}</div>
                          <div className="text-xs opacity-75">{student.xp} XP</div>
                        </div>
                      </div>
                      <div className="font-semibold text-sm">{student.score}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Desktop Layout (770px+) - Original Layout */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <Card className="col-span-2 bg-white rounded-2xl shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-blue-900 font-bold">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="flex items-center gap-2 text-base font-semibold text-blue-900">
                <Target className="h-5 w-5 text-blue-700" />
                Current Mission
              </h3>
              <div className="mt-2 bg-blue-50 rounded-lg p-3 text-blue-900 font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-700" />
                Dominate board exams & crack IIT 🚀
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-base font-semibold text-blue-900">
                <Star className="h-5 w-5 text-yellow-500" />
                Bio
              </h3>
              <div className="mt-2 bg-blue-50 rounded-lg p-3 text-blue-900">
                Math wizard | Physics enthusiast | Future engineer
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-base font-semibold text-blue-900 mb-2">
                <Trophy className="h-5 w-5 text-purple-700" />
                Superpowers
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">🧮 Problem Solving</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">➗ Mathematics</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">👑 Leadership</Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">⚡ Physics</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="flex items-center gap-2 text-base font-semibold text-blue-900 mb-2">
                  <Book className="h-5 w-5 text-green-700" />
                  Active Courses
                </h3>
                <ul className="space-y-2">
                  <li className="bg-blue-50 rounded-lg p-2 text-sm text-blue-900">• Advanced Mathematics</li>
                  <li className="bg-blue-50 rounded-lg p-2 text-sm text-blue-900">• Physics Mastery</li>
                  <li className="bg-blue-50 rounded-lg p-2 text-sm text-blue-900">• Chemistry Foundation</li>
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-base font-semibold text-blue-900 mb-2">
                  <Trophy className="h-5 w-5 text-purple-700" />
                  Side Quests
                </h3>
                <ul className="space-y-2">
                  <li className="bg-blue-50 rounded-lg p-2 text-sm text-blue-900">• Science Club President</li>
                  <li className="bg-blue-50 rounded-lg p-2 text-sm text-blue-900">• Math Olympiad Training</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Position Card */}
          <Card className="bg-white rounded-2xl shadow-lg border-0">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-blue-900 font-bold">Your Position</CardTitle>
                <Select value={positionType} onValueChange={v => setPositionType(v as "classwise" | "overall")}>
                  <SelectTrigger className="w-28 bg-blue-50 border-0 text-blue-900 font-medium focus:ring-2 focus:ring-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classwise">Classwise</SelectItem>
                    <SelectItem value="overall">Overall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-5xl font-bold text-blue-900 mb-1">
                  #{positionData[positionType].rank}
                </div>
                <div className="text-sm text-blue-700 mb-2">
                  out of {positionData[positionType].total} students
                </div>
                <div className="flex justify-between text-xs text-blue-700 mb-1">
                  <span>Performance</span>
                  <span>{positionData[positionType].percent}%</span>
                </div>
                <Progress value={positionData[positionType].percent} className="h-2 bg-blue-100" />
              </div>
            </CardContent>
          </Card>

          {/* Hall of Fame Card */}
          <Card className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl shadow-lg border-0">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-white font-bold">
                  <Crown className="h-5 w-5 text-yellow-400" />
                  Hall of Fame
                </CardTitle>
                <Select value={rankingType} onValueChange={v => setRankingType(v as "classwise" | "overall")}>
                  <SelectTrigger className="w-28 bg-white/10 border-0 text-white font-medium focus:ring-2 focus:ring-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classwise">Classwise</SelectItem>
                    <SelectItem value="overall">Overall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(rankingType === "classwise" ? classwiseLeaderboard : overallLeaderboard).map((student, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      student.name === "Aryan Patel" ? "bg-white/20" : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 flex items-center justify-center rounded-full font-bold
                        ${index === 0 ? "bg-yellow-400 text-blue-900" : "bg-white/20 text-white"}`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs opacity-75">{student.xp} XP</div>
                      </div>
                    </div>
                    <div className="font-semibold">{student.score}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
