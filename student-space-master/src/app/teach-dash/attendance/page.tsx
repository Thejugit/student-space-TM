"use client";

import { useState, useEffect } from "react";
import { Menu, Bell, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Sidebar from "@/app/teach-dash/components/Sidebar";
import Side1 from "@/app/teach-dash/components/Side1";
import ClassAttendance from "./classAttendance";
import PersonalAttendance from "./personalAttendance";

export default function AttendancePage() {
  const [tab, setTab] = useState<"class" | "personal">("class");
  const [screenWidth, setScreenWidth] = useState<number>(0);

  // Add screen width detection
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Show for screens >768px */}
      {screenWidth > 768 && (
        <div
          className={`${
            screenWidth > 1024 ? "w-64" : "w-20"
          } flex-shrink-0 fixed h-screen bg-[#1E3A8A] text-white transition-all duration-300`}
        >
          <Sidebar />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 ${
          screenWidth > 768 ? (screenWidth > 1024 ? "ml-64" : "ml-20") : ""
        } min-h-screen`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex justify-between items-center px-3 sm:px-6 py-4">
            {/* Mobile Menu */}
            <div className="lg:hidden">
              {screenWidth <= 768 && <Side1 />}
            </div>

            {/* Title */}
            <h1
              className={`text-base sm:text-lg lg:text-xl font-bold text-[#1E3A8A] ${
                screenWidth <= 768 ? "ml-2" : ""
              }`}
            >
              Attendance
            </h1>

            {/* Notifications & Profile */}
            {screenWidth > 768 && (
              <div className="flex items-center gap-2 sm:gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-3 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Tabs Section */}
            <div className="mb-4 sm:mb-6">
              <Tabs
                value={tab}
                onValueChange={(val) => setTab(val as "class" | "personal")}
              >
                <TabsList className="w-full sm:w-auto flex bg-transparent border-b border-gray-200">
                  <TabsTrigger
                    value="class"
                    className={`flex-1 sm:flex-none px-2 sm:px-6 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors duration-200 ${
                      tab === "class"
                        ? "border-[#1E3A8A] text-[#1E3A8A]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Class Attendance
                  </TabsTrigger>
                  <TabsTrigger
                    value="personal"
                    className={`flex-1 sm:flex-none px-2 sm:px-6 py-2 text-xs sm:text-sm font-semibold border-b-2 transition-colors duration-200 ${
                      tab === "personal"
                        ? "border-[#1E3A8A] text-[#1E3A8A]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Personal Attendance
                  </TabsTrigger>
                </TabsList>

                {/* Tab Content with updated padding */}
                <TabsContent value="class" className="mt-4 sm:mt-6">
                  <ClassAttendance />
                </TabsContent>

                <TabsContent value="personal" className="mt-4 sm:mt-6">
                  <PersonalAttendance />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
