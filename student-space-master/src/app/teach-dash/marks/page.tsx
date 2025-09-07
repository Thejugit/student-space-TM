"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, User, ChevronDown, ChevronUp, Bookmark, Search, Award, BarChart2, LineChart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/app/teach-dash/components/Sidebar";

// Add type definitions
type Subject = "Mathematics" | "Physics" | "Chemistry" | "English" | "Computer Science";
type ClassName = "11 A2" | "11 A5" | "12 A3" | "12 A4";

interface MarksData {
  [key: string]: {
    [key: string]: number[];
  };
}

interface StudentMarks {
  Mathematics: number;
  Physics: number;
  Chemistry: number;
  English: number;
  "Computer Science": number;
}

interface TopStudent {
  id: string;
  name: string;
  class: ClassName;
  avatar: string;
  marks: StudentMarks;
  total: number;
  rank: number;
}

interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

const subjects: Subject[] = ["Mathematics", "Physics", "Chemistry", "English", "Computer Science"];
const classes: ClassName[] = ["11 A2", "11 A5", "12 A3", "12 A4"];

const marksData: MarksData = {
  "11 A2": {
    Mathematics: [85, 78, 92, 88, 95, 82, 90, 85, 88, 92],
    Physics: [78, 82, 85, 75, 80, 78, 82, 85, 78, 80],
    Chemistry: [82, 78, 85, 80, 82, 85, 78, 82, 85, 80],
    English: [91, 88, 85, 90, 88, 85, 90, 88, 85, 90],
    "Computer Science": [95, 92, 88, 95, 92, 88, 95, 92, 88, 95],
  },
  "11 A5": {
    Mathematics: [78, 82, 85, 78, 82, 85, 78, 82, 85, 78],
    Physics: [75, 78, 80, 75, 78, 80, 75, 78, 80, 75],
    Chemistry: [80, 78, 82, 80, 78, 82, 80, 78, 82, 80],
    English: [85, 82, 88, 85, 82, 88, 85, 82, 88, 85],
    "Computer Science": [90, 88, 92, 90, 88, 92, 90, 88, 92, 90],
  },
  "12 A3": {
    Mathematics: [92, 88, 95, 92, 88, 95, 92, 88, 95, 92],
    Physics: [85, 82, 88, 85, 82, 88, 85, 82, 88, 85],
    Chemistry: [88, 85, 90, 88, 85, 90, 88, 85, 90, 88],
    English: [95, 92, 88, 95, 92, 88, 95, 92, 88, 95],
    "Computer Science": [98, 95, 92, 98, 95, 92, 98, 95, 92, 98],
  },
  "12 A4": {
    Mathematics: [88, 85, 90, 88, 85, 90, 88, 85, 90, 88],
    Physics: [82, 80, 85, 82, 80, 85, 82, 80, 85, 82],
    Chemistry: [85, 82, 88, 85, 82, 88, 85, 82, 88, 85],
    English: [92, 90, 85, 92, 90, 85, 92, 90, 85, 92],
    "Computer Science": [95, 92, 98, 95, 92, 98, 95, 92, 98, 95],
  },
};

const topStudents: TopStudent[] = [
  {
    id: "RA22I1O03O11601",
    name: "Rahul Sharma",
    class: "11 A2",
    avatar: "/avatars/rahul.jpg",
    marks: {
      Mathematics: 95,
      Physics: 88,
      Chemistry: 90,
      English: 92,
      "Computer Science": 98,
    },
    total: 463,
    rank: 1,
  },
  {
    id: "RA22I1O03O11602",
    name: "Priya Patel",
    class: "11 A2",
    avatar: "/avatars/priya.jpg",
    marks: {
      Mathematics: 92,
      Physics: 85,
      Chemistry: 88,
      English: 95,
      "Computer Science": 95,
    },
    total: 455,
    rank: 2,
  },
  {
    id: "RA22I1O03O11603",
    name: "Amit Singh",
    class: "11 A5",
    avatar: "/avatars/amit.jpg",
    marks: {
      Mathematics: 90,
      Physics: 82,
      Chemistry: 85,
      English: 88,
      "Computer Science": 92,
    },
    total: 437,
    rank: 1,
  },
  {
    id: "RA22I1O03O11604",
    name: "Neha Gupta",
    class: "11 A5",
    avatar: "/avatars/neha.jpg",
    marks: {
      Mathematics: 88,
      Physics: 80,
      Chemistry: 82,
      English: 85,
      "Computer Science": 90,
    },
    total: 425,
    rank: 2,
  },
  {
    id: "RA22I1O03O11606",
    name: "Ananya Reddy",
    class: "12 A3",
    avatar: "/avatars/ananya.jpg",
    marks: {
      Mathematics: 98,
      Physics: 92,
      Chemistry: 95,
      English: 98,
      "Computer Science": 98,
    },
    total: 481,
    rank: 1,
  },
];

export default function MarksPage() {
  const [selectedClass1, setSelectedClass1] = useState<ClassName>("11 A2");
  const [selectedClass2, setSelectedClass2] = useState<ClassName>("11 A5");
  const [selectedSubject, setSelectedSubject] = useState<Subject>("Mathematics");
  const [activeTab, setActiveTab] = useState("class");

  const prepareChartData = (): ChartDataPoint[] => {
    const class1Data = marksData[selectedClass1][selectedSubject].map((mark: number, index: number) => ({
      name: `S${index + 1}`,
      [selectedClass1]: mark,
      [selectedClass2]: marksData[selectedClass2][selectedSubject][index],
    }));

    return class1Data;
  };

  const chartData = prepareChartData();

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64 bg-gray-100 border-r hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A]">Academic Marks Analysis</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="subject" className="mb-2 block">Subject</Label>
              <Select
                value={selectedSubject}
                onValueChange={(value: Subject) => setSelectedSubject(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="class1" className="mb-2 block">Class 1</Label>
              <Select
                value={selectedClass1}
                onValueChange={(value: ClassName) => setSelectedClass1(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="class2" className="mb-2 block">Class 2</Label>
              <Select
                value={selectedClass2}
                onValueChange={(value: ClassName) => setSelectedClass2(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.filter(c => c !== selectedClass1).map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="bg-[#1E3A8A] text-white w-full">
                <BarChart2 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-medium ${activeTab === "class" ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]" : "text-gray-500"}`}
              onClick={() => setActiveTab("class")}
            >
              <LineChart className="inline w-4 h-4 mr-2" /> Class Comparison
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === "top" ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A]" : "text-gray-500"}`}
              onClick={() => setActiveTab("top")}
            >
              <Award className="inline w-4 h-4 mr-2" /> Top Performers
            </button>
          </div>

          {/* Content */}
          {activeTab === "class" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Class Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E3A8A]">
                    {selectedSubject} Marks Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={selectedClass1} fill="#1E3A8A" />
                      <Bar dataKey={selectedClass2} fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Trend Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E3A8A]">
                    Performance Trend - {selectedSubject}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={selectedClass1}
                        stroke="#1E3A8A"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey={selectedClass2}
                        stroke="#82ca9d"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Class Averages */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-[#1E3A8A]">
                    Class Averages - {selectedSubject}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">{selectedClass1}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-[#1E3A8A]">
                            {Math.round(
                              marksData[selectedClass1][selectedSubject].reduce((a: number, b: number) => a + b, 0) /
                              marksData[selectedClass1][selectedSubject].length
                            )}
                            <span className="text-sm text-gray-500">/100</span>
                          </p>
                          <p className="text-sm text-gray-600">Average Score</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            {Math.max(...marksData[selectedClass1][selectedSubject])}
                          </p>
                          <p className="text-sm text-gray-600">Highest</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            {Math.min(...marksData[selectedClass1][selectedSubject])}
                          </p>
                          <p className="text-sm text-gray-600">Lowest</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">{selectedClass2}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-[#1E3A8A]">
                            {Math.round(
                              marksData[selectedClass2][selectedSubject].reduce((a: number, b: number) => a + b, 0) /
                              marksData[selectedClass2][selectedSubject].length
                            )}
                            <span className="text-sm text-gray-500">/100</span>
                          </p>
                          <p className="text-sm text-gray-600">Average Score</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            {Math.max(...marksData[selectedClass2][selectedSubject])}
                          </p>
                          <p className="text-sm text-gray-600">Highest</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            {Math.min(...marksData[selectedClass2][selectedSubject])}
                          </p>
                          <p className="text-sm text-gray-600">Lowest</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "top" && (
            <div className="space-y-6">
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E3A8A]">
                    <Award className="inline w-5 h-5 mr-2" />
                    Top Performers - {selectedSubject}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead className="text-right">Marks</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topStudents
                        .filter((student) => student.class === selectedClass1 || student.class === selectedClass2)
                        .sort((a, b) => b.total - a.total)
                        .slice(0, 5)
                        .map((student: TopStudent) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                student.rank === 1 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                #{student.rank}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={student.avatar} alt={student.name} />
                                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{student.name}</p>
                                  <p className="text-sm text-gray-500">{student.class}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{student.marks[selectedSubject]}</TableCell>
                            <TableCell className="text-right">{student.total}/500</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Subject-wise Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1E3A8A]">
                    Subject-wise Performance of Top Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topStudents.slice(0, 5)}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis
                          dataKey="name"
                          type="category"
                          width={100}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="marks.Mathematics" name="Mathematics" fill="#1E3A8A" />
                        <Bar dataKey="marks.Physics" name="Physics" fill="#82ca9d" />
                        <Bar dataKey="marks.Chemistry" name="Chemistry" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}