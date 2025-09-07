// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
// Import icons from react-icons library
import { GiGraduateCap, GiTeacher } from "react-icons/gi";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();

  // Use useEffect to handle redirection when selectedRole changes
  useEffect(() => {
    if (selectedRole) {
      // Add a small delay for better UX, showing the selection before redirect
      const redirectTimer = setTimeout(() => {
        // Redirect to the appropriate dashboard based on role
        switch (selectedRole.toLowerCase()) {
          case "student":
            router.push("/student-dash");
            break;
          case "teacher":
            router.push("/teach-dash");
            break;
          default:
            router.push("/login");
        }
      }, 70); // 70ms delay for visual feedback

      return () => clearTimeout(redirectTimer);
    }
  }, [selectedRole, router]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Welcome to School CRM</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-10">Please select your role to continue</p>
        
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Select user type</h2>
        </div>
        
        <div className="flex flex-col space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          <RoleCard 
            title="Student"
            isSelected={selectedRole === "student"}
            onClick={() => handleRoleSelect("student")}
            description="Access assignments, marks, and attendance"
            icon={<GiGraduateCap className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500" />}
          />
          
          <RoleCard 
            title="Teacher"
            isSelected={selectedRole === "teacher"}
            onClick={() => handleRoleSelect("teacher")}
            description="Manage classes, assignments, and student evaluation"
            icon={<GiTeacher className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500" />}
          />
        </div>
      </div>
    </div>
  );
}

interface RoleCardProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  description: string;
  icon: React.ReactNode;
}

function RoleCard({ title, isSelected, onClick, description, icon }: RoleCardProps) {
  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all duration-200 transform hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-600 shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="p-4 sm:p-6 flex flex-col items-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4 relative">
            <div className="w-full h-full relative">
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                {icon}
              </div>
            </div>
          </div>
          <h3 className="font-semibold text-blue-800 text-base sm:text-lg">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 text-center">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
