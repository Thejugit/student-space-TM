"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Book, Star, Crown, Sparkles } from "lucide-react";

// --- Data (can be fetched from an API) ---
const leaderboard = [
  { name: "Priya Sharma", score: "98.5%", xp: "3,200" },
  { name: "Aryan Patel", score: "96.2%", xp: "2,847" },
  { name: "Rahul Singh", score: "95.8%", xp: "2,750" },
  { name: "Aisha Khan", score: "94.3%", xp: "2,600" },
  { name: "Dev Patel", score: "93.7%", xp: "2,500" },
];

export default function ProfileStats() {
  const [rankingType, setRankingType] = useState("classwise");
  const [positionType, setPositionType] = useState("classwise");

  return (
    // Responsive grid layout: 1 column on mobile, 3 on medium screens and up.
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      
      {/* --- Left Column: Profile Card (spans 2 columns on medium screens) --- */}
      <Card className="md:col-span-2 bg-white rounded-2xl shadow-lg border-0">
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
            <h3 className="flex items-center gap-2 text-base font-semibold text-blue-900 mb-3">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="flex items-center gap-2 text-base font-semibold text-blue-900 mb-3">
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
              <h3 className="flex items-center gap-2 text-base font-semibold text-blue-900 mb-3">
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

      {/* --- Right Column: Position and Hall of Fame Cards --- */}
      <div className="flex flex-col space-y-6">
        {/* --- Position Card --- */}
        <Card className="bg-white rounded-2xl shadow-lg border-0">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-blue-900 font-bold">Your Position</CardTitle>
              <Select value={positionType} onValueChange={setPositionType}>
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
            {/* Centered content with adjusted vertical spacing */}
            <div className="text-center py-4 space-y-2">
              <div className="text-5xl font-bold text-blue-900">#2</div>
              <div className="text-sm text-blue-700 pb-2">out of 45 students</div>
              {/* Full-width progress bar section */}
              <div className="pt-2">
                <div className="flex justify-between text-xs text-blue-700 mb-1">
                  <span>Performance</span>
                  <span>96.2%</span>
                </div>
                <Progress value={96.2} className="h-2 bg-blue-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- Hall of Fame Card --- */}
        <Card className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl shadow-lg border-0">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-white font-bold">
                <Crown className="h-5 w-5 text-yellow-400" />
                Hall of Fame
              </CardTitle>
              <Select value={rankingType} onValueChange={setRankingType}>
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
            {/* Increased spacing between leaderboard items */}
            <div className="space-y-3">
              {leaderboard.map((student, index) => (
                <div
                  key={index}
                  // Dynamic highlight for a specific student
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    student.name === "Aryan Patel" ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Special styling for the #1 rank */}
                    <div
                      className={`w-7 h-7 flex items-center justify-center rounded-full font-bold text-sm ${
                        index === 0 ? "bg-yellow-400 text-blue-900" : "bg-white/20 text-white"
                      }`}
                    >
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
  );
}
