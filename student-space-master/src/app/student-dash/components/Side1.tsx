

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Side1() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/student-dash" },
    { name: "Attendance", path: "/AttendancePage" },
    { name: "Events", path: "/events" },
    { name: "Marks", path: "/studentmarks" },
    { name: "Timetable", path: "/timetable" },
    { name: "Exam Schedule", path: "/exam-schedule" },
    { name: "Fee Payment", path: "/feepayment" },
    { name: "Digital Notes Space", path: "/notesspace" },
    { name: "Enquiry", path: "/enquiry" },
    { name: "Academic Calendar", path: "/calendar" },
    { name: "Subjects and Syllabus", path: "/subjects-syllabus" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className={cn("lg:hidden fixed top-4 left-4 z-50", isOpen ? "hidden" : "block")}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            // Apply blue background only on the Dashboard page
            pathname === "/student-dash" ? "bg-[#1E3A8A] text-white" : "bg-transparent text-blue-800",
            "hover:bg-blue-800 hover:text-white"
          )}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#1E3A8A] text-white transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 lg:p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl lg:text-2xl font-bold">Dashboard</h1>
            {isOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-white hover:bg-blue-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <nav className="space-y-1 flex-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-1.5 px-3 hover:bg-blue-800 rounded cursor-pointer text-sm lg:text-base ${
                  pathname === item.path ? "bg-[#1E3A8A]" : ""
                }`}
                prefetch={true}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
