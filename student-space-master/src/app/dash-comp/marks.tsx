"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define test data
const testNames = ['FT1', 'FT2', 'FT3'];
const subjects = ['Maths', 'Science', 'English', 'BST', 'Accounts'];

// Sample marks data for each subject
const studentMarks = {
  'Maths': [28, 30, 28],
  'Science': [25, 29, 31],
  'English': [30, 32, 29],
  'BST': [27, 29, 31],
  'Accounts': [26, 28, 30]
};

const Marks = () => {
  const [selectedSubject, setSelectedSubject] = useState<keyof typeof studentMarks>('Maths');

  // Create data for the line chart
  const lineChartData = testNames.map((test, index) => ({
    name: test,
    score: studentMarks[selectedSubject][index],
    total: 35
  }));

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 md:p-6">
        <CardTitle className="text-blue-900 font-bold text-base md:text-lg">Marks</CardTitle>
        <Select value={selectedSubject} onValueChange={(value) => setSelectedSubject(value as keyof typeof studentMarks)}>
          <SelectTrigger className="w-[100px] bg-blue-900 text-white text-xs md:text-sm">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-0 p-4 md:p-6">
        {/* Line Chart - Responsive for both mobile and desktop */}
        <div className="h-32 md:h-40 w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 35]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#1e3a8a" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Test scores display */}
        <div className="flex justify-between text-sm">
          {lineChartData.map((test, index) => (
            <div key={index} className="text-center">
              <p className="font-medium">{test.name}</p>
              <p>{test.score}/{test.total}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Marks;
