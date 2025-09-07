"use client";

import { Calendar, Clock, BookOpen, Download, Bell, Search, Filter, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Sidebar from "../student-dash/components/Sidebar";
import Side1 from "../student-dash/components/Side1";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ExamSchedulePage() {
  // States
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "calendar">("upcoming");
  const [isTabsDropdownOpen, setIsTabsDropdownOpen] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>("All Types");

  // Screen width effect
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click outside effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setIsTabsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tab change handler
  const handleTabChange = (value: "upcoming" | "past" | "calendar") => {
    setActiveTab(value);
    setIsTabsDropdownOpen(false);
  };

  const upcomingExams = [
    {
      id: 1,
      subject: "Mathematics",
      date: "27 Nov 2024",
      time: "9:00 AM - 11:30 AM",
      duration: "2h 30m",
      venue: "Main Hall",
      type: "Cluster Examination",
      syllabus: "Chapters 6-9",
      status: "upcoming",
      teacher: "Mrs. Divya V.",
      importance: "High"
    },
    {
      id: 2,
      subject: "Computer Science",
      date: "16 Jan 2025",
      time: "10:00 AM - 12:00 PM",
      duration: "2h",
      venue: "Computer Lab",
      type: "Term Examination",
      syllabus: "All Experiments",
      status: "upcoming",
      teacher: "Mr. Yogeshwaran V",
      importance: "Medium"
    },
    {
      id: 3,
      subject: "Accountancy",
      date: "18 Jan 2025",
      time: "9:00 AM - 11:00 AM",
      duration: "2h",
      venue: "Room 12",
      type: "Term Examination",
      syllabus: "Chapters 1-5",
      status: "upcoming",
      teacher: "Mrs. Divya V.",
      importance: "High"
    }
  ];

  const pastExams = [
    {
      id: 4,
      subject: "Business Studies",
      date: "15 Oct 2024",
      time: "9:00 AM - 11:00 AM",
      duration: "2h",
      venue: "Room 8",
      type: "Unit Test",
      syllabus: "Chapters 1-3",
      status: "completed",
      score: "28/35",
      teacher: "Mrs. Divya V.",
      performance: "Good"
    },
    {
      id: 5,
      subject: "Economics",
      date: "18 Oct 2024",
      time: "9:00 AM - 11:00 AM",
      duration: "2h",
      venue: "Room 10",
      type: "Unit Test",
      syllabus: "Chapters 1-4",
      status: "completed",
      score: "32/40",
      teacher: "Mrs. Divya V.",
      performance: "Excellent"
    }
  ];

  const filteredUpcomingExams = upcomingExams.filter(exam => 
    filterType === "All Types" ? true : exam.type === filterType
  );

  const filteredPastExams = pastExams.filter(exam => 
    filterType === "All Types" ? true : exam.type === filterType
  );

  // First, add this CSS utility class at the top of your component
  const tableCellClass = (screenWidth: number) => 
    screenWidth <= 520 ? "block w-full before:content-[attr(data-label)] before:float-left before:font-bold before:text-gray-600 mb-1" : "";

  const tableRowClass = (screenWidth: number) =>
    screenWidth <= 520 ? "block border-b py-4" : "hover:bg-gray-50";

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-gray-100">
      {/* Responsive Sidebar - only show on desktop */}
      {screenWidth > 768 && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side with hamburger for mobile/tablet */}
            {screenWidth <= 768 && (
              <div className="flex-none">
                <Side1 />
              </div>
            )}

            {/* Title - centered */}
            <div className="flex-1 text-center">
              <h1 className={`font-bold text-[#1E3A8A] ${
                screenWidth <= 768 ? 'text-xl' : 'text-2xl'
              }`}>
                Exam Schedule
              </h1>
            </div>

            {/* Right side notifications */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative p-1 text-gray-600 hover:bg-gray-100">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
              <User className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                {/* Search - hide on mobile */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search exams..."
                    className="pl-10 w-[200px] lg:w-[300px] bg-gray-50 border-gray-200"
                  />
                </div>
                
                {/* New Filter Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white">
                      <Filter className="h-4 w-4" />
                      {filterType}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterType("All Types")}>
                      All Types
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("Cluster Examination")}>
                      Cluster Examination
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("Term Examination")}>
                      Term Examination
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("Unit Test")}>
                      Unit Test
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Export button - adjust size for mobile */}
              <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white ml-auto">
                <Download className="mr-2 h-4 w-4" />
                {screenWidth > 768 ? 'Export Schedule' : 'Export'}
              </Button>
            </div>

            {/* Tabs/Dropdown Section */}
            {screenWidth > 520 ? (
              <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as "upcoming" | "past" | "calendar")}>
                <TabsList className="bg-gray-100 border border-gray-200 w-full grid grid-cols-3 gap-0">
                  <TabsTrigger 
                    value="upcoming" 
                    className="text-sm px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]"
                  >
                    {screenWidth > 768 ? 'Upcoming Exams' : 'Upcoming'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="past"
                    className="text-sm px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]"
                  >
                    {screenWidth > 768 ? 'Past Exams' : 'Past'}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="calendar"
                    className="text-sm px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]"
                  >
                    {screenWidth > 768 ? 'Calendar View' : 'Calendar'}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            ) : (
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                  onClick={() => setIsTabsDropdownOpen(!isTabsDropdownOpen)}
                >
                  <span className="capitalize">
                    {activeTab === "upcoming" ? "Upcoming Exams" : 
                     activeTab === "past" ? "Past Exams" : 
                     "Calendar View"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isTabsDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg
                    transition-all duration-200 origin-top
                    ${isTabsDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}
                  `}
                >
                  {["upcoming", "past", "calendar"].map((tab) => (
                    <button
                      key={tab}
                      className={`w-full px-4 py-2 text-left transition-colors ${
                        activeTab === tab
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setActiveTab(tab as "upcoming" | "past" | "calendar");
                        setIsTabsDropdownOpen(false);
                      }}
                    >
                      {tab === "upcoming" ? "Upcoming Exams" : 
                       tab === "past" ? "Past Exams" : 
                       "Calendar View"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Content sections remain the same, just controlled by activeTab state */}
            <div className="mt-4">
              {activeTab === "upcoming" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg text-[#1E3A8A] font-bold">Upcoming Examinations</h2>
                      <p className="text-gray-600 text-sm">Your scheduled exams</p>
                    </div>
                    <Badge className="bg-[#1E3A8A] text-white">
                      {filteredUpcomingExams.length} Exams
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUpcomingExams.map(exam => (
                      <Card key={exam.id} className="rounded-xl border-gray-200 hover:shadow-md transition-shadow">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-lg text-[#1E3A8A] font-bold mb-2">
                                {exam.subject}
                              </CardTitle>
                              <div className="flex gap-2 mb-3">
                                <Badge 
                                  variant="outline" 
                                  className="text-xs border-[#1E3A8A] text-[#1E3A8A]"
                                >
                                  {exam.type}
                                </Badge>
                                <Badge
                                  variant={exam.importance === "High" ? "default" : "secondary"}
                                  className={`text-xs ${
                                    exam.importance === "High" 
                                      ? "bg-red-100 text-red-800" 
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {exam.importance}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="px-4 py-2">
                          <div className="space-y-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="mr-2 h-4 w-4 text-[#1E3A8A]" />
                              <span className="font-medium">{exam.date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="mr-2 h-4 w-4 text-[#1E3A8A]" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <BookOpen className="mr-2 h-4 w-4 text-[#1E3A8A]" />
                              <span>{exam.venue}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">Duration:</span> {exam.duration}
                            </div>
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">Syllabus:</span> {exam.syllabus}
                            </div>
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">Teacher:</span> {exam.teacher}
                            </div>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="p-4 pt-0">
                          <div className="flex gap-2 w-full">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 text-xs border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                            >
                              <Bell className="mr-1.5 h-3.5 w-3.5" />
                              Set Reminder
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1 text-xs bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                            >
                              <Download className="mr-1.5 h-3.5 w-3.5" />
                              Download Syllabus
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  {filteredUpcomingExams.length === 0 && (
                    <Card className="rounded-xl border-gray-200">
                      <CardContent className="p-8 text-center">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No Upcoming Exams</h3>
                        <p className="text-gray-500">You don't have any upcoming examinations scheduled.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {activeTab === "past" && (
                <>
                  <Card className="rounded-xl border-gray-200">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg text-[#1E3A8A] font-bold">Past Examination Records</CardTitle>
                      <CardDescription className="text-gray-600">
                        Your previous exam performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader className={`bg-gray-50 ${screenWidth <= 520 ? "hidden" : ""}`}>
                          <TableRow>
                            <TableHead className="text-gray-600">Subject</TableHead>
                            <TableHead className="text-gray-600">Date</TableHead>
                            <TableHead className="text-gray-600">Type</TableHead>
                            <TableHead className="text-gray-600">Score</TableHead>
                            <TableHead className="text-gray-600">Performance</TableHead>
                            <TableHead className="text-gray-600">Teacher</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredPastExams.map(exam => (
                            <TableRow key={exam.id} className={tableRowClass(screenWidth)}>
                              <TableCell className={tableCellClass(screenWidth)} data-label="Subject">
                                {exam.subject}
                              </TableCell>
                              <TableCell className={tableCellClass(screenWidth)} data-label="Date">
                                {exam.date}
                              </TableCell>
                              <TableCell className={tableCellClass(screenWidth)} data-label="Type">
                                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                  {exam.type}
                                </Badge>
                              </TableCell>
                              <TableCell className={tableCellClass(screenWidth)} data-label="Score">
                                <Badge
                                  variant={exam.performance === "Excellent" ? "default" : "secondary"}
                                  className={exam.performance === "Excellent" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                                >
                                  {exam.score}
                                </Badge>
                              </TableCell>
                              <TableCell className={tableCellClass(screenWidth)} data-label="Performance">
                                {exam.performance}
                              </TableCell>
                              <TableCell className={tableCellClass(screenWidth)} data-label="Teacher">
                                {exam.teacher}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 p-4">
                      <Button variant="ghost" className="text-[#1E3A8A] hover:bg-[#1E3A8A]/10">
                        <Download className="mr-2 h-4 w-4" />
                        Download All Results
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card className="rounded-xl border-gray-200 mt-6">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg text-[#1E3A8A] font-bold">Performance Analysis</CardTitle>
                      <CardDescription className="text-gray-600">
                        Your progress across subjects
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="border rounded-lg p-4 text-center">
                          <div className="text-sm text-gray-500">Average Score</div>
                          <div className="text-2xl font-bold text-[#1E3A8A]">75%</div>
                        </div>
                        <div className="border rounded-lg p-4 text-center">
                          <div className="text-sm text-gray-500">Highest Score</div>
                          <div className="text-2xl font-bold text-green-600">92%</div>
                        </div>
                        <div className="border rounded-lg p-4 text-center">
                          <div className="text-sm text-gray-500">Improvement</div>
                          <div className="text-2xl font-bold text-yellow-600">+8%</div>
                        </div>
                        <div className="border rounded-lg p-4 text-center">
                          <div className="text-sm text-gray-500">Exams Taken</div>
                          <div className="text-2xl font-bold text-gray-600">12</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {activeTab === "calendar" && (
                <Card className="rounded-xl border-gray-200">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg text-[#1E3A8A] font-bold">Exam Calendar</CardTitle>
                    <CardDescription className="text-gray-600">
                      Visual representation of your exam schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50 rounded-lg p-8">
                    <Calendar className="mx-auto h-12 w-12 text-[#1E3A8A] mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Interactive Calendar View</h3>
                    <p className="mt-2 text-gray-600">Coming soon - will show all exams in calendar format</p>
                    <Button className="mt-4 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
                      Subscribe to Calendar
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}