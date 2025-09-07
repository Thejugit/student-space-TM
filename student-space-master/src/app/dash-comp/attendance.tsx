import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Attendance = () => {
  const [activeTab, setActiveTab] = useState<'Y' | 'M'>('M');
  const [attendanceData, setAttendanceData] = useState({
    month: 'November 2024',
    percentage: 80,
    totalDays: 20,
    present: 16,
    absent: 4,
    lastUpdated: "24 Nov'24",
  });

  useEffect(() => {
    if (activeTab === 'Y') {
      setAttendanceData({
        month: 'Year 2024',
        percentage: 85,
        totalDays: 220,
        present: 187,
        absent: 33,
        lastUpdated: "24 Nov'24",
      });
    } else {
      setAttendanceData({
        month: 'November 2024',
        percentage: 80,
        totalDays: 20,
        present: 16,
        absent: 4,
        lastUpdated: "24 Nov'24",
      });
    }
  }, [activeTab]);

  return (
    <div>
      <Card className="overflow-hidden">
        {/* Header - Responsive layout */}
        <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 md:p-6">
          <CardTitle className="text-blue-900 font-bold text-lg">Attendance</CardTitle>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'Y' | 'M')}>
            <TabsList className="h-8 bg-blue-900 rounded-full p-1 flex">
              <TabsTrigger
                value="Y"
                className={`rounded-full h-6 text-sm px-3 ${
                  activeTab === 'Y' ? 'bg-white text-blue-900' : 'text-white'
                }`}
              >
                Y
              </TabsTrigger>
              <TabsTrigger
                value="M"
                className={`rounded-full h-6 text-sm px-3 ${
                  activeTab === 'M' ? 'bg-white text-blue-900' : 'text-white'
                }`}
              >
                M
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        {/* Content - Responsive layout */}
        <CardContent className="pt-0 p-4 md:p-6">
          {/* Mobile layout */}
          <div className="flex md:hidden items-center gap-4">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#1E3A8A"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset={`${(1 - attendanceData.percentage / 100) * 282.7}`}
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{attendanceData.percentage}%</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">{attendanceData.month}</h3>
              <div className="text-sm space-y-1 mt-2">
                <p>Total Working days : {attendanceData.totalDays}</p>
                <p>No. Present : {attendanceData.present}</p>
                <p>No. Absent : {attendanceData.absent}</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Last updated on {attendanceData.lastUpdated}</p>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:flex md:flex-col items-center">
            <h3 className="text-lg font-medium mb-4">{attendanceData.month}</h3>
            
            <div className="relative h-36 w-36 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#1E3A8A"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset={`${(1 - attendanceData.percentage / 100) * 282.7}`}
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">{attendanceData.percentage}%</span>
              </div>
            </div>

            <div className="w-full text-base">
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-700">Total Working Days</span>
                <span className="font-medium">: {attendanceData.totalDays}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-700">No. Present</span>
                <span className="font-medium">: {attendanceData.present}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-700">No. Absent</span>
                <span className="font-medium">: {attendanceData.absent}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 self-end">
              Last updated on {attendanceData.lastUpdated}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
