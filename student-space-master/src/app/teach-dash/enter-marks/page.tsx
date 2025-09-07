"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "@/app/teach-dash/components/Sidebar";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Replace the import with hardcoded data
const studentData = [
  {
    id: "ST001",
    name: "Rahul Sharma",
    class: "11 A",
    avatar: "/avatars/01.png",
    attendance: 92,
    subjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "English",
      "Computer Science",
    ],
  },
  {
    id: "ST002",
    name: "Priya Patel",
    class: "11 A",
    avatar: "/avatars/02.png",
    attendance: 88,
    subjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "English",
      "Computer Science",
    ],
  },
  {
    id: "ST003",
    name: "Amit Kumar",
    class: "11 B",
    avatar: "/avatars/03.png",
    attendance: 95,
    subjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "English",
      "Computer Science",
    ],
  },
  {
    id: "ST004",
    name: "Sneha Verma",
    class: "11 B",
    avatar: "/avatars/04.png",
    attendance: 90,
    subjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "English",
      "Computer Science",
    ],
  },
  {
    id: "ST005",
    name: "Arjun Singh",
    class: "11 C",
    avatar: "/avatars/05.png",
    attendance: 85,
    subjects: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "English",
      "Computer Science",
    ],
  },
];

interface MarksFormData {
  studentId: string;
  subject: string;
  examType: string;
  marksObtained: string;
  class?: string; // Add this if you want to track class
}

const initialFormData: MarksFormData = {
  studentId: "",
  subject: "",
  examType: "",
  marksObtained: "",
};

export default function EnterMarks() {
  const [formData, setFormData] = useState<MarksFormData>(initialFormData);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<string>("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) {
      toast.error("Please select a student first");
      return;
    }
    console.log("Submitted marks:", {
      ...formData,
      student: selectedStudent.name,
    });
    toast.success(
      `Marks for ${selectedStudent.name} have been recorded successfully.`
    );
    setFormData(initialFormData);
  };

  const classes = Array.from(
    new Set(studentData.map((student) => student.class))
  ).sort();

  const filteredStudents =
    selectedClass === "all"
      ? studentData
      : studentData.filter((student) => student.class === selectedClass);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64 bg-gray-100 border-r hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-[#1E3A8A] mb-8">
              Enter Student Marks
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Student Selection Card */}
              <Card className="lg:col-span-4">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#1E3A8A] text-lg">
                    Select Student
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Class Filter Dropdown */}
                  <div className="mb-6">
                    <Label
                      htmlFor="classFilter"
                      className="text-sm font-medium mb-2"
                    >
                      Filter by Class
                    </Label>
                    <Select
                      value={selectedClass}
                      onValueChange={setSelectedClass}
                    >
                      <SelectTrigger id="classFilter" className="w-full">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        {classes.map((className) => (
                          <SelectItem key={className} value={className}>
                            {className}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Student List */}
                  <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto rounded-md border">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className={`p-4 flex items-center gap-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                          selectedStudent?.id === student.id
                            ? "bg-blue-50 border-l-4 border-l-blue-600"
                            : "border-l-4 border-l-transparent"
                        }`}
                        onClick={() => {
                          setSelectedStudent(student);
                          setFormData({ ...formData, studentId: student.id });
                        }}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{student.name}</div>
                          <div className="text-xs text-gray-500">
                            {student.class}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mark Entry Form */}
              <Card className="lg:col-span-8">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#1E3A8A] text-lg">
                    {selectedStudent
                      ? `Enter Marks for ${selectedStudent.name}`
                      : "Select a student to enter marks"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Subject Selection */}
                      <div className="space-y-3">
                        <Label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) =>
                            setFormData({ ...formData, subject: value })
                          }
                          disabled={!selectedStudent}
                        >
                          <SelectTrigger id="subject" className="w-full">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedStudent?.subjects.map((subject: string) => (
                              <SelectItem key={subject} value={subject.toLowerCase()}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Exam Type Selection */}
                      <div className="space-y-3">
                        <Label htmlFor="examType" className="text-sm font-medium">
                          Exam Type
                        </Label>
                        <Select
                          value={formData.examType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, examType: value })
                          }
                          disabled={!selectedStudent}
                        >
                          <SelectTrigger id="examType" className="w-full">
                            <SelectValue placeholder="Select exam type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mid_term">Mid Term</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="half_yearly">Half Yearly</SelectItem>
                            <SelectItem value="final">Final</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Marks Input */}
                      <div className="space-y-3">
                        <Label htmlFor="marksObtained" className="text-sm font-medium">
                          Marks (out of 100)
                        </Label>
                        <Input
                          id="marksObtained"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Enter marks"
                          value={formData.marksObtained}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              marksObtained: e.target.value,
                            })
                          }
                          disabled={!selectedStudent}
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6">
                      <Button
                        type="submit"
                        className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 px-8"
                        disabled={!selectedStudent}
                      >
                        Submit Marks
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}