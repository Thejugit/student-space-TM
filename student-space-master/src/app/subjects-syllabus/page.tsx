"use client";
import { BookOpen, Download, Search, Users, FileText, Bookmark, Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Sidebar from "../student-dash/components/Sidebar";
import Side1 from "../student-dash/components/Side1";
import { useState, useEffect } from "react";

export default function SubjectsSyllabusPage() {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("XI-A Commerce");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [activeTab, setActiveTab] = useState("mathematics");
  const [notificationCount, setNotificationCount] = useState(3);
  const [isSubjectsDropdownOpen, setIsSubjectsDropdownOpen] = useState<boolean>(false);
  // Add screen width state near the top of the component
  const [screenWidth, setScreenWidth] = useState<number>(0);

  // Sample data - in a real app, this would come from an API
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Mathematics",
      class: "XI-A Commerce",
      teacher: "Mrs. Divya V.",
      syllabus: "Chapters 1-12",
      textbook: "Mathematics for Commerce - Vol. II",
      resources: 5
    },
    {
      id: 2,
      name: "Accountancy",
      class: "XI-A Commerce",
      teacher: "Mrs. Geetha R.",
      syllabus: "Chapters 1-8, Practicals",
      textbook: "Accountancy Principles - CBSE",
      resources: 3
    },
    {
      id: 3,
      name: "Computer Science",
      class: "XI-A Commerce",
      teacher: "Mr. Yogeshwaran V",
      syllabus: "Python Programming, Database Concepts",
      textbook: "Computer Science with Python",
      resources: 7
    },
    {
      id: 4,
      name: "Business Studies",
      class: "XI-A Commerce",
      teacher: "Mrs. Divya V.",
      syllabus: "Business Environment, Marketing",
      textbook: "Business Studies - NCERT",
      resources: 4
    },
    {
      id: 5,
      name: "Economics",
      class: "XI-A Commerce",
      teacher: "Mr. Rajesh K.",
      syllabus: "Micro & Macro Economics",
      textbook: "Introductory Economics",
      resources: 2
    }
  ]);

  const syllabusDetails = {
    mathematics: [
      { unit: "I", topic: "Relations and Functions", chapters: ["1. Relations", "2. Functions"] },
      { unit: "II", topic: "Algebra", chapters: ["3. Matrices", "4. Determinants"] },
      { unit: "III", topic: "Calculus", chapters: ["5. Continuity", "6. Differentiation", "7. Applications of Derivatives"] },
      { unit: "IV", topic: "Probability", chapters: ["8. Probability"] }
    ],
    accountancy: [
      { unit: "I", topic: "Financial Statements", chapters: ["1. Introduction", "2. Preparation"] },
      { unit: "II", topic: "Accounting Ratios", chapters: ["3. Liquidity Ratios", "4. Profitability Ratios"] },
      { unit: "III", topic: "Computerized Accounting", chapters: ["5. Basics", "6. Practical"] }
    ],
    computer: [
      { unit: "I", topic: "Python Programming", chapters: ["1. Basics", "2. Functions", "3. OOP"] },
      { unit: "II", topic: "Database Concepts", chapters: ["4. SQL", "5. Normalization"] },
      { unit: "III", topic: "Computer Networks", chapters: ["6. Basics", "7. Protocols"] }
    ]
  };

  const classes = ["XI-A Commerce", "XI-B Commerce", "XII-A Commerce", "XII-B Commerce"];
  const teachers = ["Mrs. Divya V.", "Mr. Yogeshwaran V", "Mrs. Geetha R.", "Mr. Rajesh K."];
  const subjectsList = ["Mathematics", "Accountancy", "Computer Science"];

  // Filter subjects based on search and filters
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         subject.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? subject.class === selectedClass : true;
    const matchesTeacher = selectedTeacher === "all" ? true : subject.teacher === selectedTeacher;
    
    return matchesSearch && matchesClass && matchesTeacher;
  });

  // Function to handle syllabus download
  const handleDownloadSyllabus = (subjectName: string) => {
    console.log(`Downloading syllabus for ${subjectName}`);
    // In a real app, this would trigger a file download
    alert(`Downloading syllabus for ${subjectName}`);
  };

  // Function to handle view details
  const handleViewDetails = (subjectId: number) => {
    console.log(`Viewing details for subject ID ${subjectId}`);
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      setActiveTab(subject.name.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  // Function to clear notifications
  const clearNotifications = () => {
    setNotificationCount(0);
  };

  // Add useEffect for screen width tracking
  useEffect(() => {
    // Set initial width
    setScreenWidth(window.innerWidth);

    // Add resize listener
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setIsSubjectsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-gray-100">
      {/* Sidebar - only show on desktop */}
      {screenWidth > 768 && <Sidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            {/* Mobile hamburger menu */}
            {screenWidth <= 768 && (
              <div className="flex-none">
                <Side1 />
              </div>
            )}

            {/* Page title */}
            <div className="flex-1 text-center">
              <h1 className={`font-bold text-[#1E3A8A] ${
                screenWidth <= 768 ? 'text-xl' : 'text-2xl'
              }`}>
                Subjects & Syllabus
              </h1>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" className="relative p-1 text-gray-600 hover:bg-gray-100">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            <div className="space-y-6">
              {/* Subject Selection */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-[#1E3A8A] mb-2">Select Subject</h2>
                  <p className="text-sm text-gray-600">Choose a subject to view its detailed syllabus</p>
                </div>
                
                {/* Desktop and Tablet View (>520px) */}
                {screenWidth > 520 && (
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-1 grid grid-cols-3 gap-0">
                    {subjectsList.map((subject) => (
                      <Button
                        key={subject}
                        variant="ghost"
                        className={`text-sm px-3 py-2 ${
                          activeTab === subject.toLowerCase() 
                            ? "bg-white text-[#1E3A8A] shadow-sm font-medium" 
                            : "text-gray-600 hover:text-[#1E3A8A] hover:bg-white/50"
                        }`}
                        onClick={() => setActiveTab(subject.toLowerCase())}
                      >
                        {subject}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Mobile View (≤520px) */}
                {screenWidth <= 520 && (
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="w-full flex justify-between items-center border-[#1E3A8A] text-[#1E3A8A] py-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSubjectsDropdownOpen(!isSubjectsDropdownOpen);
                      }}
                    >
                      <span className="font-medium">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isSubjectsDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Button>
                    
                    <div 
                      className={`
                        absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg
                        transition-all duration-200 origin-top
                        ${isSubjectsDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
                      `}
                    >
                      {subjectsList.map((subject) => (
                        <button
                          key={subject}
                          className={`w-full px-4 py-3 text-left transition-colors ${
                            activeTab === subject.toLowerCase()
                              ? 'bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]' 
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab(subject.toLowerCase());
                            setIsSubjectsDropdownOpen(false);
                          }}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Subject Content */}
              <div className="space-y-6">
                {/* Mathematics Content */}
                {activeTab === "mathematics" && (
                  <Card className="rounded-xl border-gray-200 shadow-sm">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-[#1E3A8A]" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-[#1E3A8A] font-bold">Mathematics Syllabus</CardTitle>
                          <CardDescription className="text-gray-600">
                            Complete syllabus breakdown for Class XI Commerce
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="space-y-6">
                        {syllabusDetails.mathematics.map(unit => (
                          <div key={unit.unit} className="border-l-4 border-[#1E3A8A]/20 pl-4 py-3 bg-gray-50/50 rounded-r-lg">
                            <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                              Unit {unit.unit}: {unit.topic}
                            </h3>
                            <ul className="space-y-2">
                              {unit.chapters.map((chapter, idx) => (
                                <li key={idx} className="text-gray-700 flex items-start">
                                  <span className="mr-3 mt-1 w-2 h-2 bg-[#1E3A8A] rounded-full flex-shrink-0"></span>
                                  <span className="text-sm">{chapter}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50/30">
                      <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">Textbook:</span> Mathematics for Commerce - Vol. II
                        </div>
                        <Button 
                          className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white w-full sm:w-auto"
                          onClick={() => handleDownloadSyllabus("Mathematics")}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Syllabus
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )}

                {/* Accountancy Content */}
                {activeTab === "accountancy" && (
                  <Card className="rounded-xl border-gray-200 shadow-sm">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-[#1E3A8A]" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-[#1E3A8A] font-bold">Accountancy Syllabus</CardTitle>
                          <CardDescription className="text-gray-600">
                            Complete syllabus breakdown for Class XI Commerce
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="space-y-6">
                        {syllabusDetails.accountancy.map(unit => (
                          <div key={unit.unit} className="border-l-4 border-[#1E3A8A]/20 pl-4 py-3 bg-gray-50/50 rounded-r-lg">
                            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Unit {unit.unit}: {unit.topic}</h3>
                            <ul className="space-y-2">
                              {unit.chapters.map((chapter, idx) => (
                                <li key={idx} className="text-gray-700 flex items-start">
                                  <span className="mr-3 mt-1 w-2 h-2 bg-[#1E3A8A] rounded-full flex-shrink-0"></span>
                                  <span className="text-sm">{chapter}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50/30">
                      <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">Textbook:</span> Accountancy Principles - CBSE
                        </div>
                        <Button 
                          className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white w-full sm:w-auto"
                          onClick={() => handleDownloadSyllabus("Accountancy")}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Syllabus
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )}

                {/* Computer Science Content */}
                {activeTab === "computer science" && (
                  <Card className="rounded-xl border-gray-200 shadow-sm">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-[#1E3A8A]" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-[#1E3A8A] font-bold">Computer Science Syllabus</CardTitle>
                          <CardDescription className="text-gray-600">
                            Complete syllabus breakdown for Class XI Commerce
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="space-y-6">
                        {syllabusDetails.computer.map(unit => (
                          <div key={unit.unit} className="border-l-4 border-[#1E3A8A]/20 pl-4 py-3 bg-gray-50/50 rounded-r-lg">
                            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Unit {unit.unit}: {unit.topic}</h3>
                            <ul className="space-y-2">
                              {unit.chapters.map((chapter, idx) => (
                                <li key={idx} className="text-gray-700 flex items-start">
                                  <span className="mr-3 mt-1 w-2 h-2 bg-[#1E3A8A] rounded-full flex-shrink-0"></span>
                                  <span className="text-sm">{chapter}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50/30">
                      <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">Textbook:</span> Computer Science with Python
                        </div>
                        <Button 
                          className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white w-full sm:w-auto"
                          onClick={() => handleDownloadSyllabus("Computer Science")}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Syllabus
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )}
              </div>

              {/* Reference Materials */}
              <Card className="rounded-xl border-gray-200 shadow-sm">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">
                      <Bookmark className="h-5 w-5 text-[#1E3A8A]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-[#1E3A8A] font-bold">Reference Materials</CardTitle>
                      <CardDescription className="text-gray-600">
                        Additional resources for your subjects
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="rounded-xl border-gray-200 hover:shadow-md transition-all duration-200 hover:border-[#1E3A8A]/30">
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">
                            <Bookmark className="h-4 w-4 text-[#1E3A8A]" />
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold text-gray-900">Math Reference Guide</CardTitle>
                            <CardDescription className="text-xs text-gray-600 mt-1">
                              Formulas and problem-solving techniques
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                          onClick={() => alert("Downloading Math Reference Guide")}
                        >
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="rounded-xl border-gray-200 hover:shadow-md transition-all duration-200 hover:border-[#1E3A8A]/30">
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">
                            <Bookmark className="h-4 w-4 text-[#1E3A8A]" />
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold text-gray-900">Accountancy Workbook</CardTitle>
                            <CardDescription className="text-xs text-gray-600 mt-1">
                              Practice problems with solutions
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                          onClick={() => alert("Downloading Accountancy Workbook")}
                        >
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="rounded-xl border-gray-200 hover:shadow-md transition-all duration-200 hover:border-[#1E3A8A]/30">
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">
                            <Bookmark className="h-4 w-4 text-[#1E3A8A]" />
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold text-gray-900">Python Cheat Sheet</CardTitle>
                            <CardDescription className="text-xs text-gray-600 mt-1">
                              Quick reference for Python syntax
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white"
                          onClick={() => alert("Downloading Python Cheat Sheet")}
                        >
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}