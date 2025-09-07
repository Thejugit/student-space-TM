"use client";

import React, { useState, useEffect } from "react";
import { 
  Card, 

  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Bell, 
  User,
  ChevronLeft,
  ChevronRight,
  Search,
  BookOpen,
  Calendar,
  Trophy,
  FileText,
  CreditCard
} from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/app/teach-dash/components/Sidebar";
import Side1 from "@/app/teach-dash/components/Side1";
import { useMediaQuery } from "@/hooks/use-media-query";
import
{ 
    ChartContainer, 
    ChartTooltip, 
    ChartTooltipContent 
  } from "@/components/ui/chart";
  import { 
    Line, 
    LineChart
  } from "recharts";
  

const studentData = [
  {
    id: "RA22I1O03O11601",
    name: "Rahul Sharma",
    class: "11 A2",
    avatar: "/avatars/rahul.jpg",
    attendance: 92,
    contact: "rahul.sharma@example.com | +91 9876543210",
    address: "123 Main St, Mumbai, Maharashtra",
    joinDate: "15 Jun 2022",
    feePayments: [
      { month: "Jan 2025", amount: 15000, status: "Paid", date: "05 Jan 2025" },
      { month: "Feb 2025", amount: 15000, status: "Pending", date: "" },
      { month: "Mar 2025", amount: 15000, status: "Pending", date: "" },
    ],
    totalFees: 45000,
    paidFees: 15000,
    subjects: [
      { name: "Mathematics", marks: 85, grade: "A" },
      { name: "Physics", marks: 78, grade: "B+" },
      { name: "Chemistry", marks: 82, grade: "A" },
      { name: "English", marks: 91, grade: "A+" },
      { name: "Computer Science", marks: 95, grade: "A+" },
    ],
    performance: [
      { name: "Mid-Term", score: 82 },
      { name: "Quarterly", score: 78 },
      { name: "Half-Yearly", score: 85 },
      { name: "Final", score: 88 },
    ],
    activities: [
      {
        type: 'achievement',
        date: '2024-12-15',
        description: 'Won first place in inter-school cricket tournament',
        category: 'Sports'
      },
      {
        type: 'achievement',
        date: '2024-11-20',
        description: 'Represented school in state-level science exhibition',
        category: 'Academic'
      },
      {
        type: 'misconduct',
        date: '2024-10-05',
        description: 'Late submission of three consecutive assignments',
        severity: 'low'
      }
    ],
  },
  {
    id: "RA22I1O03O11602",
    name: "Priya Patel",
    class: "11 A2",
    avatar: "/avatars/priya.jpg",
    attendance: 88,
    contact: "priya.patel@example.com | +91 9876543211",
    address: "456 Oak Ave, Delhi",
    joinDate: "15 Jun 2022",
    feePayments: [
      { month: "Jan 2025", amount: 15000, status: "Paid", date: "03 Jan 2025" },
      { month: "Feb 2025", amount: 15000, status: "Paid", date: "02 Feb 2025" },
      { month: "Mar 2025", amount: 15000, status: "Pending", date: "" },
    ],
    totalFees: 45000,
    paidFees: 30000,
    subjects: [
      { name: "Mathematics", marks: 90, grade: "A+" },
      { name: "Physics", marks: 85, grade: "A" },
      { name: "Chemistry", marks: 78, grade: "B+" },
      { name: "English", marks: 88, grade: "A" },
      { name: "Computer Science", marks: 92, grade: "A+" },
    ],
    performance: [
      { name: "Mid-Term", score: 85 },
      { name: "Quarterly", score: 82 },
      { name: "Half-Yearly", score: 88 },
      { name: "Final", score: 90 },
    ],
    activities: [
      {
        type: 'achievement',
        date: '2024-11-30',
        description: 'First place in National Mathematics Olympiad',
        category: 'Academic'
      },
      {
        type: 'achievement',
        date: '2024-10-15',
        description: 'Basketball team captain - Led team to state finals',
        category: 'Sports'
      },
      {
        type: 'misconduct',
        date: '2024-09-20',
        description: 'Unauthorized use of mobile phone during class',
        severity: 'medium'
      }
    ],
  },
  {
    id: "RA22I1O03O11603",
    name: "Amit Singh",
    class: "11 A2",
    avatar: "/avatars/amit.jpg",
    attendance: 95,
    contact: "amit.singh@example.com | +91 9876543212",
    address: "789 Pine Rd, Bangalore, Karnataka",
    joinDate: "15 Jun 2022",
    feePayments: [
      { month: "Jan 2025", amount: 15000, status: "Paid", date: "10 Jan 2025" },
      { month: "Feb 2025", amount: 15000, status: "Paid", date: "08 Feb 2025" },
      { month: "Mar 2025", amount: 15000, status: "Paid", date: "05 Mar 2025" },
    ],
    totalFees: 45000,
    paidFees: 45000,
    subjects: [
      { name: "Mathematics", marks: 78, grade: "B+" },
      { name: "Physics", marks: 82, grade: "A" },
      { name: "Chemistry", marks: 85, grade: "A" },
      { name: "English", marks: 90, grade: "A+" },
      { name: "Computer Science", marks: 88, grade: "A" },
    ],
    performance: [
      { name: "Mid-Term", score: 80 },
      { name: "Quarterly", score: 82 },
      { name: "Half-Yearly", score: 85 },
      { name: "Final", score: 87 },
    ],
    activities: [
      {
        type: 'achievement',
        date: '2024-12-01',
        description: 'Best performer in Annual Cultural Fest',
        category: 'Cultural'
      },
      {
        type: 'misconduct',
        date: '2024-11-10',
        description: 'Involved in classroom disruption',
        severity: 'medium'
      },
      {
        type: 'misconduct',
        date: '2024-10-25',
        description: 'Missed important team project meeting',
        severity: 'low'
      }
    ],
  },
  {
    id: "RA22I1O03O11604",
    name: "Neha Gupta",
    class: "11 A5",
    avatar: "/avatars/neha.jpg",
    attendance: 85,
    contact: "neha.gupta@example.com | +91 9876543213",
    address: "321 Elm St, Kolkata, West Bengal",
    joinDate: "15 Jun 2022",
    feePayments: [
      { month: "Jan 2025", amount: 15000, status: "Paid", date: "12 Jan 2025" },
      { month: "Feb 2025", amount: 15000, status: "Late", date: "20 Feb 2025" },
      { month: "Mar 2025", amount: 15000, status: "Pending", date: "" },
    ],
    totalFees: 45000,
    paidFees: 30000,
    subjects: [
      { name: "Mathematics", marks: 82, grade: "A" },
      { name: "Physics", marks: 75, grade: "B+" },
      { name: "Chemistry", marks: 80, grade: "A" },
      { name: "English", marks: 85, grade: "A" },
      { name: "Computer Science", marks: 90, grade: "A+" },
    ],
    performance: [
      { name: "Mid-Term", score: 78 },
      { name: "Quarterly", score: 80 },
      { name: "Half-Yearly", score: 82 },
      { name: "Final", score: 85 },
    ],
    activities: [
      {
        type: 'achievement',
        date: '2024-12-10',
        description: 'Published research paper in school science journal',
        category: 'Academic'
      },
      {
        type: 'achievement',
        date: '2024-11-25',
        description: 'Won gold medal in state-level swimming championship',
        category: 'Sports'
      }
    ],
  },
  {
    id: "RA22I1O03O11605",
    name: "Vikram Joshi",
    class: "11 A5",
    avatar: "/avatars/vikram.jpg",
    attendance: 90,
    contact: "vikram.joshi@example.com | +91 9876543214",
    address: "654 Maple Ave, Hyderabad, Telangana",
    joinDate: "15 Jun 2022",
    feePayments: [
      { month: "Jan 2025", amount: 15000, status: "Pending", date: "" },
      { month: "Feb 2025", amount: 15000, status: "Pending", date: "" },
      { month: "Mar 2025", amount: 15000, status: "Pending", date: "" },
    ],
    totalFees: 45000,
    paidFees: 0,
    subjects: [
      { name: "Mathematics", marks: 75, grade: "B+" },
      { name: "Physics", marks: 70, grade: "B" },
      { name: "Chemistry", marks: 78, grade: "B+" },
      { name: "English", marks: 82, grade: "A" },
      { name: "Computer Science", marks: 85, grade: "A" },
    ],
    performance: [
      { name: "Mid-Term", score: 75 },
      { name: "Quarterly", score: 72 },
      { name: "Half-Yearly", score: 78 },
      { name: "Final", score: 80 },
    ],
    activities: [
      {
        type: 'achievement',
        date: '2024-11-15',
        description: 'Organized successful charity drive for local orphanage',
        category: 'Social Service'
      },
      {
        type: 'misconduct',
        date: '2024-10-30',
        description: 'Multiple instances of homework incompletion',
        severity: 'medium'
      },
      {
        type: 'misconduct',
        date: '2024-09-15',
        description: 'Inappropriate behavior during assembly',
        severity: 'high'
      }
    ],
  },
  {
    id: "RA22I1O03O11606",
    name: "Ananya Reddy",
    class: "12 A3",
    avatar: "/avatars/ananya.jpg",
    attendance: 94,
    contact: "ananya.reddy@example.com | +91 9876543215",
    address: "987 Cedar Ln, Chennai, Tamil Nadu",
    joinDate: "15 Jun 2021",
    feePayments: [
      { month: "Jan 2025", amount: 18000, status: "Paid", date: "02 Jan 2025" },
      { month: "Feb 2025", amount: 18000, status: "Paid", date: "01 Feb 2025" },
      { month: "Mar 2025", amount: 18000, status: "Paid", date: "01 Mar 2025" },
    ],
    totalFees: 54000,
    paidFees: 54000,
    subjects: [
      { name: "Mathematics", marks: 92, grade: "A+" },
      { name: "Physics", marks: 88, grade: "A" },
      { name: "Chemistry", marks: 90, grade: "A+" },
      { name: "English", marks: 95, grade: "A+" },
      { name: "Computer Science", marks: 98, grade: "A+" },
    ],
    performance: [
      { name: "Mid-Term", score: 90 },
      { name: "Quarterly", score: 88 },
      { name: "Half-Yearly", score: 92 },
      { name: "Final", score: 94 },
    ],
    activities: [
      {
        type: 'achievement',
        date: '2024-12-20',
        description: 'Selected for National Youth Parliament',
        category: 'Leadership'
      },
      {
        type: 'achievement',
        date: '2024-11-05',
        description: 'Won first prize in Inter-school Debate Competition',
        category: 'Academic'
      }
    ],
  }
];

const classPerformanceData = [
  {
    name: "11 A2",
    average: 78,
    topStudent: "Rahul Sharma",
    subjects: [
      { name: "Mathematics", average: 72 },
      { name: "Physics", average: 68 },
      { name: "Chemistry", average: 75 },
      { name: "English", average: 82 },
      { name: "Computer Science", average: 85 },
    ],
    students: [
      { name: "Rahul Sharma", total: 431, rank: 1 },
      { name: "Priya Patel", total: 425, rank: 2 },
      { name: "Amit Singh", total: 418, rank: 3 },
      { name: "Neha Gupta", total: 410, rank: 4 },
      { name: "Vikram Joshi", total: 405, rank: 5 },
    ],
    feeStatus: {
      paid: 65,
      pending: 25,
      late: 10,
    },
  },
  {
    name: "11 A5",
    average: 75,
    topStudent: "Neha Gupta",
    subjects: [
      { name: "Mathematics", average: 70 },
      { name: "Physics", average: 65 },
      { name: "Chemistry", average: 72 },
      { name: "English", average: 80 },
      { name: "Computer Science", average: 82 },
    ],
    students: [
      { name: "Neha Gupta", total: 412, rank: 1 },
      { name: "Vikram Joshi", total: 390, rank: 2 },
      { name: "Rohan Mehta", total: 385, rank: 3 },
      { name: "Sonia Verma", total: 380, rank: 4 },
      { name: "Arjun Kapoor", total: 375, rank: 5 },
    ],
    feeStatus: {
      paid: 55,
      pending: 35,
      late: 10,
    },
  },
  {
    name: "12 A3",
    average: 82,
    topStudent: "Ananya Reddy",
    subjects: [
      { name: "Mathematics", average: 78 },
      { name: "Physics", average: 75 },
      { name: "Chemistry", average: 80 },
      { name: "English", average: 85 },
      { name: "Computer Science", average: 88 },
    ],
    students: [
      { name: "Ananya Reddy", total: 463, rank: 1 },
      { name: "Rohan Desai", total: 445, rank: 2 },
      { name: "Meera Nair", total: 438, rank: 3 },
      { name: "Karan Malhotra", total: 430, rank: 4 },
      { name: "Divya Iyer", total: 425, rank: 5 },
    ],
    feeStatus: {
      paid: 75,
      pending: 15,
      late: 10,
    },
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const EducationDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [attendanceView, setAttendanceView] = useState('monthly');
  const [currentDisciplineIndex, setCurrentDisciplineIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [selectedStudent, setSelectedStudent] = useState<string | null>("RA22I1O03O11601");
  const [searchTerm, setSearchTerm] = useState("");
  const [handlingActiveTab, setHandlingActiveTab] = useState("academic");
  const [selectedSection, setSelectedSection] = useState("11 A2");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmallScreen = useMediaQuery("(min-width: 320px) and (max-width: 480px)");

  const sections = [
    { value: "11 A2", label: "11 A2" },
    { value: "11 A5", label: "11 A5" },
    { value: "12 A3", label: "12 A3" },
  ];

  const filteredStudents = studentData.filter(student =>
    student.class === selectedSection &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const currentStudent = selectedStudent 
    ? studentData.find(student => student.id === selectedStudent)
    : studentData[0];

  const currentClass = classPerformanceData.find(cls => cls.name === currentStudent?.class);

  const feeData = [
    { name: 'Paid', value: currentStudent?.paidFees || 0 },
    { name: 'Pending', value: (currentStudent?.totalFees || 0) - (currentStudent?.paidFees || 0) },
  ];

  const classFeeData = [
    { name: 'Paid', value: currentClass?.feeStatus.paid || 0 },
    { name: 'Pending', value: currentClass?.feeStatus.pending || 0 },
    { name: 'Late', value: currentClass?.feeStatus.late || 0 },
  ];

  // Compute alert list for Home dashboard (students needing attention)
  const studentsInSection = studentData.filter(s => s.class === selectedSection);
  const alertStudents = studentsInSection
    .map(s => {
      const averageMarks = s.subjects && s.subjects.length > 0
        ? Math.round(s.subjects.reduce((sum, subj) => sum + subj.marks, 0) / s.subjects.length)
        : 0;
      const attendancePct = typeof s.attendance === 'number' ? s.attendance : 0;
      return { student: s, averageMarks, attendancePct };
    })
    .filter(x => x.averageMarks < 80 || x.attendancePct < 85)
    .sort((a, b) => a.averageMarks - b.averageMarks)
    .slice(0, 6);

  // Add a sample alert for demonstration
  const sampleAlert = {
    student: {
      id: 'SAMPLE',
      name: 'Sample Alert Student',
      class: selectedSection,
    } as any,
    averageMarks: 62,
    attendancePct: 80,
  };
  const alertsToShow = [sampleAlert, ...alertStudents];

  const disciplineItems = [
    {
      title: "Complaints",
      description: "Couple of students caught for misbehaviour in the Economics class.",
      teacher: "Divya S",
      date: "28 Nov '24"
    },
    {
      title: "Maintenance Issues",
      description: "Class projector not working efficiently.",
      date: "28 Nov '24"
    }
  ];

  const handleNext = () => {
    setCurrentDisciplineIndex((prev) => 
      prev === disciplineItems.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentDisciplineIndex((prev) => 
      prev === 0 ? disciplineItems.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
    {/* Sidebar (handles its own fixed positioning and responsiveness) */}
    <Sidebar />

    {/* Main Content - Add left margin to match sidebar width on large screens */}
    <div className="flex-1 min-h-screen lg:pl-64">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Left side with hamburger for mobile/tablet */}
          <div className="lg:hidden">
            <Side1 />
          </div>

          {/* Title */}
          <h1 className="text-xl lg:text-2xl font-bold text-[#1E3A8A]">
            Teachers Dashboard
          </h1>

          {/* Right side notifications */}
          { screenWidth > 768 && (
            <div className="flex items-center gap-4">
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
          )}
        
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Your existing content starts here */}
          {/* Upcoming Class/Meeting Card */}
          <Card className="mb-6 bg-[#1E3A8A] text-white cursor-pointer" onClick={() => window.location.href = '/teach-dash/timetable'}>
  <CardContent className="p-4 sm:pt-6 sm:pb-4">
    {activeTab === "home" ? (
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <h3 className="font-bold text-base sm:text-lg order-2 sm:order-1">Upcoming Class</h3>
          <p className="text-xs sm:text-sm mb-2 sm:mb-0 order-1 sm:order-2">10:40 am, 14 Nov 2024</p>
        </div>
        <div className="flex flex-col space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-300 min-w-[70px]">Subject :</span>
            <span>Economics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-300 min-w-[70px]">Venue :</span>
            <span>11 A2</span>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <h3 className="text-base sm:text-lg font-bold order-2 sm:order-1">Meeting Remainder</h3>
          <p className="text-xs sm:text-sm mb-2 sm:mb-0 order-1 sm:order-2">
            10:40 am, 14 Nov 2024
          </p>
        </div>
        <div className="text-xs sm:text-sm space-y-2">
          <p>Teacher&apos;s meet for the next event to be conducted.</p>
          <div className="flex flex-col sm:flex-row sm:gap-8">
            <p className="flex items-center gap-2">
              <span className="text-gray-300">Time :</span>
              <span>10:40 am, 14 Nov 2024</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-gray-300">Venue :</span>
              <span>2nd floor Staff Room</span>
            </p>
          </div>
        </div>
      </>
    )}
  </CardContent>
</Card>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Button 
              variant={activeTab === "home" ? "default" : "outline"}
              className={`${
                activeTab === "home" ? "bg-[#1E3A8A] text-white" : "bg-white text-[#1E3A8A]"
              } border border-[#1E3A8A] hover:bg-blue-700 hover:text-white h-12 sm:h-16 text-sm sm:text-base`}
              onClick={() => setActiveTab("home")}
            >
              Home Class
            </Button>
            <Button 
              variant={activeTab === "handling" ? "default" : "outline"}
              className={`${
                activeTab === "handling" ? "bg-[#1E3A8A] text-white" : "bg-white text-[#1E3A8A]"
              } border border-[#1E3A8A] hover:bg-blue-700 hover:text-white h-12 sm:h-16 text-sm sm:text-base`}
              onClick={() => setActiveTab("handling")}
            >
              Handling Class
            </Button>
          </div>

          {activeTab === "home" ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Attendance + Fees */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Class Attendance */}
                  <div className="">
                    <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">Class Attendance</h2>
                    <Card className="border rounded-lg overflow-hidden">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                          {/* Attendance Circle */}
                          <div className="relative w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0">
                            <div className="w-full h-full rounded-full border-4 border-slate-100 flex items-center justify-center">
                              <div className="absolute top-0 left-0 w-full h-full">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                  <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="#1e40af"
                                    strokeWidth="10"
                                    strokeDasharray="282.7"
                                    strokeDashoffset={attendanceView === 'monthly' ? '73.5' : '50.5'}
                                    transform="rotate(-90 50 50)"
                                  />
                                </svg>
                              </div>
                              <span className="text-2xl sm:text-xl font-bold">
                                {attendanceView === 'monthly' ? '74%' : '80%'}
                              </span>
                            </div>
                          </div>

                          {/* Attendance Details */}
                          <div className="flex-1 w-full">
                            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4 sm:mb-2 w-full">
                              <h3 className="font-bold text-[#1E3A8A] mb-2 sm:mb-0">November 2024</h3>
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => setAttendanceView('yearly')}
                                  className={`w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center border border-gray-300 ${
                                    attendanceView === 'yearly' ? 'bg-[#1E3A8A] text-white' : 'bg-white text-gray-800'
                                  } text-xs`}
                                >
                                  Y
                                </button>
                                <button 
                                  onClick={() => setAttendanceView('monthly')}
                                  className={`w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center border border-gray-300 ${
                                    attendanceView === 'monthly' ? 'bg-[#1E3A8A] text-white' : 'bg-white text-gray-800'
                                  } text-xs`}
                                >
                                  M
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm w-full">
                              <div className="flex items-center justify-between sm:justify-start">
                                <span className="sm:w-36">Total Working days</span>
                                <span className="font-medium">: {attendanceView === 'monthly' ? '20' : '180'}</span>
                              </div>
                              <div className="flex items-center justify-between sm:justify-start">
                                <span className="sm:w-36">Class Strength</span>
                                <span className="font-medium">: 56</span>
                              </div>
                              <div className="flex items-center justify-between sm:justify-start">
                                <span className="sm:w-36">Average Attendance</span>
                                <span className="font-medium">: {attendanceView === 'monthly' ? '74%' : '82%'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Update Attendance Button - Mobile */}
                    <div className="mt-4 w-full">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto bg-[#1E3A8A] text-white hover:bg-blue-700 hover:text-white text-sm px-4 py-2"
                      >
                        Update Attendance
                      </Button>
                    </div>
                  </div>

                  {/* Alerts Section */}
                  <div className="">
                    <Card className="border border-gray-200">
                      <CardHeader className="p-3 sm:p-4 border-b">
                        <CardTitle className="text-[#1E3A8A] text-base">Alerts</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4">
                        {alertsToShow.length === 0 ? (
                          <div className="text-sm text-gray-600">No alerts for {selectedSection}. Great job!</div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-3 py-2 text-xs font-semibold text-gray-900 text-left">Student</th>
                                  <th className="px-3 py-2 text-xs font-semibold text-gray-900 text-left">Avg Marks</th>
                                  <th className="px-3 py-2 text-xs font-semibold text-gray-900 text-left">Attendance</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {alertsToShow.map(({ student, averageMarks, attendancePct }) => (
                                  <tr key={student.id || `${student.name}-sample`} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">{student.name}</td>
                                    <td className="px-3 py-2 text-sm whitespace-nowrap">
                                      <span className={`px-2 py-1 rounded-full text-xs ${averageMarks < 70 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{averageMarks}%</span>
                                    </td>
                                    <td className="px-3 py-2 text-sm whitespace-nowrap">
                                      <span className={`px-2 py-1 rounded-full text-xs ${attendancePct < 85 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{attendancePct}%</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Right: Class Discipline */}
                <div className="lg:col-span-1">
                  <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">Class Discipline</h2>
                  <div className="relative">
                    <Card className="border border-gray-200 rounded-lg w-full">
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{disciplineItems[currentDisciplineIndex].title}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {disciplineItems[currentDisciplineIndex].description}
                        </p>
                        <div className="text-sm text-gray-500">
                          {disciplineItems[currentDisciplineIndex].teacher && (
                            <p>Teacher: {disciplineItems[currentDisciplineIndex].teacher}</p>
                          )}
                          <p>Date: {disciplineItems[currentDisciplineIndex].date}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="h-6 w-6 rounded-full bg-slate-300 overflow-hidden">
                            <User className="h-full w-full p-1" />
                          </div>
                          <span className="text-sm">Teacher Name</span>
                        </div>
                      </CardContent>
                    </Card>
                    <button
                      onClick={handlePrev}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-5 w-5 text-[#1E3A8A]" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-5 w-5 text-[#1E3A8A]" />
                    </button>
                    <div className="flex justify-center gap-2 mt-4">
                      {disciplineItems.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentDisciplineIndex ? 'bg-[#1E3A8A]' : 'bg-gray-300'
                          }`}
                          onClick={() => setCurrentDisciplineIndex(index)}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
        <>
          {/* Time Table */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4">Time Table</h2>
            <div className="space-y-4">
              {[
                { subject: "Mathematics", time: "7:30 - 8:10", room: "11 A2", type: "Theory Class" },
                { subject: "Economics", time: "8:15 - 8:50", room: "11 A5", type: "Theory Class" },
                { subject: "Business Studies", time: "8:55 - 9:30", room: "12 A3", type: "Theory Class" },
              ].map((cls, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-[#1E3A8A]">{cls.subject}</h3>
                        <p className="text-xs text-gray-500">{cls.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{cls.time}</p>
                        <p className="text-sm">{cls.room}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

         {/* Marks and Notes */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Card className="overflow-hidden relative">
    <CardContent className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-[#1E3A8A]">Marks</h3>
        <Select defaultValue="11A2-Economics">
          <SelectTrigger className="w-[180px] h-8 text-xs">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="11A2-Economics">11 A2 - Economics</SelectItem>
            <SelectItem value="11A2-Mathematics">11 A2 - Mathematics</SelectItem>
            <SelectItem value="12A3-Business">12 A3 - Business Studies</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Navigation buttons positioned on sides */}
      <Button 
        variant="ghost" 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-full px-2 hover:bg-gray-100/50"
        onClick={() => {/* Handle previous */}}
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </Button>
      <Button 
        variant="ghost" 
        className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-2 hover:bg-gray-100/50"
        onClick={() => {/* Handle next */}}
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </Button>
      
      {/* Chart Content */}
      <div className="px-8">
        <div className="h-48">
          <ChartContainer 
            config={{
              marks: {
                label: "Marks",
                color: "#1e40af"
              }
            }} 
            className="w-full h-full"
          >
            <LineChart 
              data={[
                { month: "Sep", marks: 65 },
                { month: "Oct", marks: 75 },
                { month: "Nov", marks: 70 },
                { month: "Dec", marks: 90 },
                { month: "Jan", marks: 95 },
                { month: "Feb", marks: 85 }
              ]}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis 
                hide={true}
                domain={[0, 100]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="marks" 
                stroke="#1e40af" 
                strokeWidth={2}
                dot={{ r: 4, fill: "#1e40af" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="text-xs mt-4 text-center">
          <span className="font-medium">Class Average: 82%</span>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Notes Card with Navigation */}
  <Card className="overflow-hidden relative">
    <CardContent className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-[#1E3A8A]">Recent Notes</h3>
        <Select defaultValue="11A2">
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="11A2">11 A2</SelectItem>
            <SelectItem value="11A5">11 A5</SelectItem>
            <SelectItem value="12A3">12 A3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Navigation buttons */}
      <Button 
        variant="ghost" 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-full px-2 hover:bg-gray-100/50"
        onClick={() => {/* Handle previous */}}
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </Button>
      <Button 
        variant="ghost" 
        className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-2 hover:bg-gray-100/50"
        onClick={() => {/* Handle next */}}
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </Button>

      {/* Notes Content */}
      <div className="px-8">
        <div className="space-y-6">
          {[
            {
              title: "Math Notes",
              description: "Integration notes for Chapter 8",
              date: "22 Nov &apos;24",
              teacher: "Teacher Name"
            },
            {
              title: "Economics Notes",
              description: "Market structures and competition",
              date: "18 Nov &apos;24",
              teacher: "Teacher Name"
            }
          ].map((note, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-[#1E3A8A]">{note.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{note.description}</p>
                <p className="text-xs text-gray-500 mt-1">Updated on {note.date}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-5 w-5 rounded-full bg-slate-300 overflow-hidden">
                    <User className="h-full w-full p-0.5" />
                  </div>
                  <span className="text-xs">{note.teacher}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-[#1E3A8A]">
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
</div>

        </>
      )}
    </div>
  </div>
</div>

    </div>

)};

export default EducationDashboard;
