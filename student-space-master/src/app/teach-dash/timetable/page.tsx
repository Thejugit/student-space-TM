"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import Sidebar from "@/app/teach-dash/components/Sidebar";
import Side1 from "@/app/teach-dash/components/Side1";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown } from "lucide-react";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ClassSession {
  subject: string;
  classType: string;
  timeSlot: string;
  teacher: string;
  isBreak?: boolean;
  room?: string;
}

const TimetablePage = () => {
  const [activeDay, setActiveDay] = useState<string>("Monday");
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmallScreen = useMediaQuery("(min-width: 320px) and (max-width: 480px)");

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add this useEffect hook after your existing hooks
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

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
      { subject: "Physical Education", classType: "Phy activity", timeSlot: "12:15 - 12:50", teacher: "Mrs. Divya V." },
      { subject: "Physical Education", classType: "Phy activity", timeSlot: "12:55 - 1:25", teacher: "Mrs. Divya V." },
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "1:30 - 2:10", teacher: "Mrs. Divya V." },
    ],
    "Tuesday": [
      { subject: "English", classType: "Theory Classes", timeSlot: "7:30 - 8:10", teacher: "Mrs. Divya V." },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "8:15 - 8:50", teacher: "Mrs. Divya V." },
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "8:55 - 9:30", teacher: "Mrs. Divya V." },
      { subject: "Short Break", classType: "", timeSlot: "9:30 - 9:40", teacher: "", isBreak: true },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "9:45 - 10:20", teacher: "Mrs. Divya V." },
      { subject: "Computer Science", classType: "Lab Class", timeSlot: "10:25 - 11:05", teacher: "Mr. Yogeshwaran V" },
      { subject: "Economics", classType: "Theory Class", timeSlot: "11:10 - 11:40", teacher: "Mrs. Divya V." },
      { subject: "Lunch Break", classType: "", timeSlot: "11:40 - 12:10", teacher: "", isBreak: true },
      { subject: "Physical Education", classType: "Phy activity", timeSlot: "12:15 - 12:50", teacher: "Mrs. Divya V." },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "12:55 - 1:25", teacher: "Mrs. Divya V." },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "1:30 - 2:10", teacher: "Mrs. Divya V." },
    ],
    "Wednesday": [
      { subject: "Economics", classType: "Theory Class", timeSlot: "7:30 - 8:10", teacher: "Mrs. Divya V." },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "8:15 - 8:50", teacher: "Mrs. Divya V." },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "8:55 - 9:30", teacher: "Mrs. Divya V." },
      { subject: "Short Break", classType: "", timeSlot: "9:30 - 9:40", teacher: "", isBreak: true },
      { subject: "English", classType: "Theory Classes", timeSlot: "9:45 - 10:20", teacher: "Mrs. Divya V." },
      { subject: "Computer Science", classType: "Lab Class", timeSlot: "10:25 - 11:05", teacher: "Mr. Yogeshwaran V" },
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "11:10 - 11:40", teacher: "Mrs. Divya V." },
      { subject: "Lunch Break", classType: "", timeSlot: "11:40 - 12:10", teacher: "", isBreak: true },
      { subject: "Physical Education", classType: "Phy activity", timeSlot: "12:15 - 12:50", teacher: "Mrs. Divya V." },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "12:55 - 1:25", teacher: "Mrs. Divya V." },
      { subject: "English", classType: "Theory Classes", timeSlot: "1:30 - 2:10", teacher: "Mrs. Divya V." },
    ],
    "Thursday": [
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "7:30 - 8:10", teacher: "Mrs. Divya V." },
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "8:15 - 8:50", teacher: "Mrs. Divya V." },
      { subject: "Computer Science", classType: "Lab Class", timeSlot: "8:55 - 9:30", teacher: "Mr. Yogeshwaran V" },
      { subject: "Short Break", classType: "", timeSlot: "9:30 - 9:40", teacher: "", isBreak: true },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "9:45 - 10:20", teacher: "Mrs. Divya V." },
      { subject: "English", classType: "Theory Classes", timeSlot: "10:25 - 11:05", teacher: "Mrs. Divya V." },
      { subject: "Economics", classType: "Theory Class", timeSlot: "11:10 - 11:40", teacher: "Mrs. Divya V." },
      { subject: "Lunch Break", classType: "", timeSlot: "11:40 - 12:10", teacher: "", isBreak: true },
      { subject: "Physical Education", classType: "Phy activity", timeSlot: "12:15 - 12:50", teacher: "Mrs. Divya V." },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "12:55 - 1:25", teacher: "Mrs. Divya V." },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "1:30 - 2:10", teacher: "Mrs. Divya V." },
    ],
    "Friday": [
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "7:30 - 8:10", teacher: "Mrs. Divya V." },
      { subject: "Computer Science", classType: "Lab Class", timeSlot: "8:15 - 8:50", teacher: "Mr. Yogeshwaran V" },
      { subject: "English", classType: "Theory Classes", timeSlot: "8:55 - 9:30", teacher: "Mrs. Divya V." },
      { subject: "Short Break", classType: "", timeSlot: "9:30 - 9:40", teacher: "", isBreak: true },
      { subject: "Business Studies", classType: "Theory Class", timeSlot: "9:45 - 10:20", teacher: "Mrs. Divya V." },
      { subject: "Economics", classType: "Theory Class", timeSlot: "10:25 - 11:05", teacher: "Mrs. Divya V." },
      { subject: "Mathematics", classType: "Theory Class", timeSlot: "11:10 - 11:40", teacher: "Mrs. Divya V." },
      { subject: "Lunch Break", classType: "", timeSlot: "11:40 - 12:10", teacher: "", isBreak: true },
      { subject: "Physical Education", classType: "Phy activity", timeSlot: "12:15 - 12:50", teacher: "Mrs. Divya V." },
      { subject: "Accountancy", classType: "Theory Class", timeSlot: "12:55 - 1:25", teacher: "Mrs. Divya V." },
      { subject: "English", classType: "Theory Classes", timeSlot: "1:30 - 2:10", teacher: "Mrs. Divya V." },
    ],
  };

  const reminders = [
    {
      subject: "Meeting Update",
      content: (
        <>
          Teacher's meet for the next event to be conducted.<br />
          <b>Time</b> : 10:40 am, 14 Nov/2024<br />
          <b>Venue</b> : 2nd Floor Staff Room
        </>
      ),
      teacher: "Teacher Name"
    },
    {
      subject: "Class Substitution",
      content: (
        <>
          Class substitution for 11A3<br />
          <b>Day</b> : Tuesday, 16 Nov/2024<br />
          <b>Period</b> : 5th, 10:40 am
        </>
      ),
      teacher: "Teacher Name"
    }
  ];

  // Update the return statement to match teacher dashboard layout
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Fixed width on large screens */}
      <div className="hidden lg:block w-64 flex-shrink-0 fixed h-screen bg-[#1E3A8A] text-white">
        <Sidebar />
      </div>

      {/* Main Content - Add left margin to match sidebar width on large screens */}
      <div className="flex-1 lg:ml-64 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex justify-between items-center px-6 py-4">
            {/* Left side with hamburger for mobile/tablet */}
            <div className="lg:hidden">
              <Side1 />
            </div>

            {/* Title */}
            <h1 className={ `text-xl lg:text-2xl font-bold text-[#1E3A8A] ${screenWidth <= 768 ? 'text-lg' : ''}`}>
              Personal Timetable
            </h1>

            {/* Right side notifications */}
            {screenWidth > 768 && (
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
        <div className={`p-6 ${isSmallScreen ? 'p-3' : ''}`}>
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Rest of your existing content */}
            {/* Day Selector */}
            <div className="mb-6">
              {screenWidth <= 480 ? (
                // Mobile View (≤480px) - Dropdown with same style as student timetable
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
              ) : (
                // Desktop and Tablet View (>480px)
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
            </div>

            {/* Timetable Content */}
            <div className={`grid ${
              screenWidth <= 1024 ? 'grid-cols-1' : 'grid-cols-3'
            } gap-6`}>
              {/* Class Schedule */}
              <div className={screenWidth <= 768 ? '' : 'col-span-2'}>
                <div className="space-y-2">
                  {timetableData[activeDay]?.map((session, index) => (
                    <Card 
                      key={index} 
                      className={`${
                        session.isBreak ? 'bg-[#1E3A8A] text-white' : 'bg-white'
                      } ${isSmallScreen ? 'shadow-sm' : ''}`}
                    >
                      <CardContent className={`${
                        isSmallScreen ? 'p-3' : screenWidth <= 768 ? 'p-4' : 'py-2 px-4'
                      }`}>
                        <div className={`grid ${
                          isSmallScreen ? 'grid-cols-1 gap-1' : 
                          screenWidth <= 768 ? 'grid-cols-1 gap-2' : 
                          'grid-cols-3'
                        } items-center`}>
                          <div>
                            <p className={`font-medium ${isSmallScreen ? 'text-sm' : ''}`}>
                              {session.subject}
                            </p>
                            {!session.isBreak && (
                              <p className={`${
                                isSmallScreen ? 'text-xs' : 'text-sm'
                              } text-gray-500`}>
                                {session.classType}
                              </p>
                            )}
                          </div>
                          <div className={`${
                            isSmallScreen ? 'text-xs mt-1' : 
                            screenWidth <= 768 ? '' : 'text-center'
                          }`}>
                            <p>{session.timeSlot}</p>
                          </div>
                          {!session.isBreak && (
                            <div className={`${
                              isSmallScreen ? 'text-xs mt-1' : 
                              screenWidth <= 768 ? '' : 'text-right'
                            }`}>
                              <p>{session.room}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reminders Section */}
              <div className={`${screenWidth <= 768 ? 'mt-6' : ''} ${isSmallScreen ? 'space-y-3' : ''}`}>
                <h2 className={`font-bold mb-4 text-[#1E3A8A] ${isSmallScreen ? 'text-lg' : 'text-xl'}`}>
                  Reminders
                </h2>
                <div className={`space-y-${isSmallScreen ? '3' : '4'}`}>
                  {reminders.map((reminder, index) => (
                    <Card key={index}>
                      <CardContent className={`${isSmallScreen ? 'p-3' : 'p-4'}`}>
                        <h3 className={`font-bold mb-2 ${isSmallScreen ? 'text-base' : 'text-lg'}`}>
                          {reminder.subject}
                        </h3>
                        <div className={`${isSmallScreen ? 'text-xs' : 'text-sm'} mb-4`}>
                          {reminder.content}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className={`${isSmallScreen ? 'h-5 w-5' : 'h-6 w-6'} rounded-full bg-gray-300`}></div>
                          <span className={isSmallScreen ? 'text-xs' : 'text-sm'}>
                            {reminder.teacher}
                          </span>
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
      </div>
    </div>
  );
};

export default TimetablePage;
