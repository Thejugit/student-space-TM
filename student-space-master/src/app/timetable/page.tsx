"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import Sidebar from "@/app/student-dash/components/Sidebar";
import Side1 from "../student-dash/components/Side1";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";

interface ClassSession {
  subject: string;
  classType: string;
  timeSlot: string;
  teacher: string;
  isBreak?: boolean;
}

const ClassTimetablePage = () => {
  const [activeDay, setActiveDay] = useState<string>("Monday");
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const timetableData: Record<string, ClassSession[]> = {
    "Monday": [
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "7:30 - 8:10", teacher: "Mrs. Divya V." },
      { subject: "Economics", classType: "Theory Class", timeSlot: "8:15 - 8:50", teacher: "Mrs. Divya V." },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "8:55 - 9:30", teacher: "Mrs. Divya V." },
      { subject: "Short Break", classType: "", timeSlot: "9:30 - 9:40", teacher: "", isBreak: true },
      { subject: "Computer Science", classType: "Lab Class", timeSlot: "9:45 - 10:20", teacher: "Mr. Yogeshwaran V" },
      { subject: "Computer Science", classType: "Lab Class", timeSlot: "10:25 - 11:05", teacher: "Mr. Yogeshwaran V" },
      { subject: "English", classType: "Theory Classes", timeSlot: "11:10 - 11:40", teacher: "Mrs. Divya V." },
      { subject: "Lunch Break", classType: "", timeSlot: "11:40 - 12:10", teacher: "", isBreak: true },
      { subject: "Physical Educ...", classType: "Phy activity", timeSlot: "12:15 - 12:50", teacher: "Mrs. Divya V." },
      { subject: "Physical Educ...", classType: "Phy activity", timeSlot: "12:55 - 1:25", teacher: "Mrs. Divya V." },
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "1:30 - 2:10", teacher: "Mrs. Divya V." },
    ],
    "Tuesday": [
      { subject: "Physics", classType: "Theory Class", timeSlot: "7:30 - 8:10", teacher: "Mr. Rajesh K." },
      { subject: "Chemistry", classType: "Theory Class", timeSlot: "8:15 - 8:50", teacher: "Mrs. Priya S." },
      { subject: "Computer Science", classType: "Theory Class", timeSlot: "8:55 - 9:30", teacher: "Mr. Yogeshwaran V" },
      { subject: "Short Break", classType: "", timeSlot: "9:30 - 9:40", teacher: "", isBreak: true },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "9:45 - 10:20", teacher: "Mrs. Divya V." },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "10:25 - 11:05", teacher: "Mrs. Divya V." },
      { subject: "English", classType: "Theory Classes", timeSlot: "11:10 - 11:40", teacher: "Mrs. Divya V." },
      { subject: "Lunch Break", classType: "", timeSlot: "11:40 - 12:10", teacher: "", isBreak: true },
      { subject: "Economics", classType: "Theory Class", timeSlot: "12:15 - 12:50", teacher: "Mrs. Divya V." },
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "12:55 - 1:25", teacher: "Mrs. Divya V." },
      { subject: "Library", classType: "Reading", timeSlot: "1:30 - 2:10", teacher: "Mrs. Lakshmi R." },
    ],
    "Wednesday": [
      { subject: "Computer Science", classType: "Lab Class", timeSlot: "7:30 - 8:10", teacher: "Mr. Yogeshwaran V" },
      { subject: "Computer Science", classType: "Lab Class", timeSlot: "8:15 - 8:50", teacher: "Mr. Yogeshwaran V" },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "8:55 - 9:30", teacher: "Mrs. Divya V." },
      { subject: "Short Break", classType: "", timeSlot: "9:30 - 9:40", teacher: "", isBreak: true },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "9:45 - 10:20", teacher: "Mrs. Divya V." },
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "10:25 - 11:05", teacher: "Mrs. Divya V." },
      { subject: "Economics", classType: "Theory Class", timeSlot: "11:10 - 11:40", teacher: "Mrs. Divya V." },
      { subject: "Lunch Break", classType: "", timeSlot: "11:40 - 12:10", teacher: "", isBreak: true },
      { subject: "English", classType: "Theory Classes", timeSlot: "12:15 - 12:50", teacher: "Mrs. Divya V." },
      { subject: "Physical Educ...", classType: "Phy activity", timeSlot: "12:55 - 1:25", teacher: "Mrs. Divya V." },
      { subject: "Club Activities", classType: "Extra-curricular", timeSlot: "1:30 - 2:10", teacher: "Various" },
    ],
    "Thursday": [
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "7:30 - 8:10", teacher: "Mrs. Divya V." },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "8:15 - 8:50", teacher: "Mrs. Divya V." },
      { subject: "English", classType: "Theory Classes", timeSlot: "8:55 - 9:30", teacher: "Mrs. Divya V." },
      { subject: "Short Break", classType: "", timeSlot: "9:30 - 9:40", teacher: "", isBreak: true },
      { subject: "Economics", classType: "Theory Class", timeSlot: "9:45 - 10:20", teacher: "Mrs. Divya V." },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "10:25 - 11:05", teacher: "Mrs. Divya V." },
      { subject: "Computer Science", classType: "Theory Class", timeSlot: "11:10 - 11:40", teacher: "Mr. Yogeshwaran V" },
      { subject: "Lunch Break", classType: "", timeSlot: "11:40 - 12:10", teacher: "", isBreak: true },
      { subject: "Mathematics Quiz", classType: "Assessment", timeSlot: "12:15 - 12:50", teacher: "Mrs. Divya V." },
      { subject: "Physical Educ...", classType: "Phy activity", timeSlot: "12:55 - 1:25", teacher: "Mrs. Divya V." },
      { subject: "Career Guidance", classType: "Counseling", timeSlot: "1:30 - 2:10", teacher: "Mr. Sanjay N." },
    ],
    "Friday": [
      { subject: "English", classType: "Theory Classes", timeSlot: "7:30 - 8:10", teacher: "Mrs. Divya V." },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "8:15 - 8:50", teacher: "Mrs. Divya V." },
      { subject: "Economics", classType: "Theory Class", timeSlot: "8:55 - 9:30", teacher: "Mrs. Divya V." },
      { subject: "Short Break", classType: "", timeSlot: "9:30 - 9:40", teacher: "", isBreak: true },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "9:45 - 10:20", teacher: "Mrs. Divya V." },
      { subject: "Computer Science", classType: "Theory Class", timeSlot: "10:25 - 11:05", teacher: "Mr. Yogeshwaran V" },
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "11:10 - 11:40", teacher: "Mrs. Divya V." },
      { subject: "Lunch Break", classType: "", timeSlot: "11:40 - 12:10", teacher: "", isBreak: true },
      { subject: "Assembly", classType: "School Activity", timeSlot: "12:15 - 12:50", teacher: "All Teachers" },
      { subject: "Moral Science", classType: "Value Education", timeSlot: "12:55 - 1:25", teacher: "Mrs. Lakshmi R." },
      { subject: "Class Test", classType: "Assessment", timeSlot: "1:30 - 2:10", teacher: "Mrs. Divya V." },
    ],
  };

  const reminders = [
    {
      subject: "Computer Science",
      content: "Complete Experiment 6 in Lab Record and submit the copy in cabin. Prepare for Viva for Experiment 4 and 5.",
      dueDate: "28 Nov'24",
      teacher: "Teacher Name"
    },
    {
      subject: "Mathematics",
      content: "Quiz will be conducted for Chapters 6 and 7 on 28 Nov'24, Thursday. Be prepared.",
      dueDate: "28 Nov'24",
      teacher: "Teacher Name"
    }
  ];

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-white">
      {/* Responsive Sidebar */}
      {screenWidth > 768 && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative">
          {/* Mobile Menu */}
          <div className="flex items-center">
            {screenWidth <= 768 && (
              <div>
                <Side1 />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            {screenWidth <= 768 && (
              <h1 className="text-2xl pb-2 font-bold text-[#1E3A8A]">Class Timetable</h1>
            )}
            {screenWidth > 768 && (
              <h1 className="text-2xl p-4 font-bold text-[#1E3A8A]">Class Timetable</h1>
            )}
          </div>

          {/* Notifications & Profile */}
          <div>
            {screenWidth > 768 && (
              <div className="flex items-center gap-4 pt-4 pb-4">
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

        {/* Day Selector */}
        <div className="mb-6">
          {/* Desktop and Tablet View (>480px) */}
          {screenWidth > 520 && (
            <div className={`flex ${screenWidth <= 768 ? 'overflow-x-auto pb-4' : 'flex-wrap'} gap-2`}>
              {days.map((day) => (
                <Button
                  key={day}
                  variant={activeDay === day ? "default" : "outline"}
                  className={`${
                    activeDay === day ? "bg-[#1E3A8A] text-white" : ""
                  } ${screenWidth <= 768 ? "whitespace-nowrap" : ""}`}
                  onClick={() => setActiveDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          )}

          {/* Mobile View (≤480px) */}
          {screenWidth <= 520 && (
            <div className="relative">
              <Button
                variant="outline"
                className="w-full flex justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                <span>{activeDay}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                  ${isDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
                `}
              >
                {days.map((day) => (
                  <button
                    key={day}
                    className={`w-full px-4 py-2 text-left transition-colors ${
                      activeDay === day 
                        ? 'bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDay(day);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Timetable Content */}
        <div className={`grid ${screenWidth <= 768 ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
          {/* Class Schedule */}
          <div className={screenWidth <= 768 ? '' : 'col-span-2'}>
            <div className="space-y-2">
              {timetableData[activeDay]?.map((session, index) => (
                <Card 
                  key={index} 
                  className={session.isBreak ? 'bg-[#1E3A8A] text-white' : 'bg-white'}
                >
                  <CardContent className={screenWidth <= 768 ? 'p-4' : 'py-2 px-4'}>
                    <div className={`grid ${screenWidth <= 768 ? 'grid-cols-1 gap-2' : 'grid-cols-3'} items-center`}>
                      <div>
                        <p className="font-medium">{session.subject}</p>
                        {!session.isBreak && (
                          <p className="text-sm text-gray-500">{session.classType}</p>
                        )}
                      </div>
                      <div className={screenWidth <= 768 ? '' : 'text-center'}>
                        <p>{session.timeSlot}</p>
                      </div>
                      {!session.isBreak && (
                        <div className={screenWidth <= 768 ? '' : 'text-right'}>
                          <p>{session.teacher}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Reminders Section */}
          <div className={screenWidth <= 768 ? 'mt-6' : ''}>
            <h2 className="text-xl font-bold mb-4 text-[#1E3A8A]">Reminders</h2>
            <div className="space-y-4">
              {reminders.map((reminder, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{reminder.subject}</h3>
                    <p className="text-sm mb-4">{reminder.content}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <p>Due Date: {reminder.dueDate}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                        <span>{reminder.teacher}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Exam Schedule */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-[#1E3A8A]">Exam Schedule</h2>
          <Card>
            <CardContent className={`${isMobile ? "p-6" : "p-8"} text-center`}>
              <p className="text-gray-500">No exams scheduled yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClassTimetablePage;
