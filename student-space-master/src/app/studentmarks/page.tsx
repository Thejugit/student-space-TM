"use client";
import React, { useState, useEffect } from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Sidebar from "@/app/student-dash/components/Sidebar";
import Side1 from "@/app/student-dash/components/Side1";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SubjectMarks = {
  [key: string]: number[];
};

const subjects: string[] = ['Math', 'English', 'BST', 'Accounts', 'Economic'];
const testNames: string[] = ['FT1', 'FT2', 'FT3', 'FT4'];

const studentMarks: SubjectMarks = {
  Math: [55, 63, 33, 79],
  English: [70, 75, 80, 85],
  BST: [65, 70, 75, 80],
  Accounts: [60, 65, 70, 75],
  Economic: [75, 80, 85, 90]
};

const StudentMarksPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('Math');
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const barChartData = testNames.map((test, index) => ({
    name: test,
    ...subjects.reduce((acc, subject) => ({
      ...acc,
      [subject]: studentMarks[subject][index]
    }), {})
  }));

  const lineChartData = testNames.map((test, index) => ({
    name: test,
    [selectedSubject]: studentMarks[selectedSubject][index]
  }));

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-white">
      {/* Responsive Sidebar */}
      {screenWidth > 768 && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative">
          {/* Left side with hamburger for mobile/tablet */}
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
              <h1 className="text-2xl font-bold text-[#1E3A8A]">Student Marks</h1>
            )}
            {screenWidth > 768 && (
              <h1 className="text-2xl p-4 font-bold text-[#1E3A8A]">Student Marks</h1>
            )}
          </div>

          {/* Notifications and Profile */}
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

        {/* Rest of the content remains the same */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Overall Performance</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  {subjects.map((subject, index) => {
                    const colors = [
                      "#1E3A8A",
                      "#294EBA",
                      "#375FD3",
                      "#5779DA",
                      "#8DA2FB"
                    ];
                    return (
                      <Bar
                        key={subject}
                        dataKey={subject}
                        fill={colors[index % colors.length]}
                      >
                        {barChartData.map((entry, entryIndex) => (
                          <Cell 
                            key={`cell-${entryIndex}`} 
                            fill={colors[index % colors.length]} 
                          />
                        ))}
                      </Bar>
                    );
                  })}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2 xs:p-4">
            {/* Header section */}
            <div className="flex flex-col gap-3 mb-4">
              <h2 className="text-base xs:text-lg font-semibold text-[#1E3A8A]">
                Subject-wise Analysis
              </h2>
              
              {/* Tabs/Dropdown section with responsive styling */}
              <div className="w-full">
                {/* Mobile Dropdown (320px - 520px) */}
                <div className="block sm:hidden">
                  <Select
                    defaultValue="Math"
                    onValueChange={(value) => setSelectedSubject(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Subject" />
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

                {/* Tablet and Desktop Tabs (>520px) */}
                <div className="hidden sm:block">
                  <Tabs 
                    defaultValue="Math" 
                    className="w-full"
                    onValueChange={(value) => setSelectedSubject(value)}
                  >
                    <TabsList className="flex flex-wrap xs:flex-nowrap items-center justify-start w-full bg-muted p-0.5 text-muted-foreground gap-0.5 min-h-[40px] overflow-x-auto">
                      {subjects.map((subject) => (
                        <TabsTrigger
                          key={subject}
                          value={subject}
                          className="flex-1 min-w-[70px] h-8 text-xs xs:text-sm px-1.5 xs:px-2 py-1 
                            whitespace-nowrap font-medium ring-offset-background transition-all
                            data-[state=active]:bg-background data-[state=active]:text-[#1E3A8A] 
                            data-[state=active]:shadow-sm"
                        >
                          {subject}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Chart section */}
            <div className="h-48 xs:h-64 mb-4 xs:mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={lineChartData}
                  margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={selectedSubject}
                    stroke="#1E3A8A"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Test cards grid */}
            <div className="grid grid-cols-2 gap-2 xs:gap-4">
              {testNames.map((test, index) => (
                <Card key={test}>
                  <CardContent className="p-2 xs:p-4 text-center">
                    <h3 className="text-sm xs:text-base font-semibold text-gray-600">{test}</h3>
                    <p className="text-lg xs:text-2xl font-bold text-[#1E3A8A]">
                      {studentMarks[selectedSubject][index]}/100
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentMarksPage;
