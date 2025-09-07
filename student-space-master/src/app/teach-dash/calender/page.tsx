"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, User, ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "@/app/teach-dash/components/Sidebar";

const CalendarPage = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const [currentMonth, setCurrentMonth] = React.useState(0); // January
  const [currentYear, setCurrentYear] = React.useState(2025);

  // Generate calendar data for all months with all days
  const generateCalendarData = () => {
    const allData: Record<string, Array<{date: string, label?: string, type: string}>> = {};
    
    for (let month = 0; month < 12; month++) {
      const monthName = months[month].substring(0, 3);
      const year = currentYear;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthData = [];
      
      // Add all days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = `${day} ${monthName}`;
        
        // Add special events (you can customize these)
        if (day === 1) {
          monthData.push({ date, label: "New Month", type: "Event" });
        } else if (day === 15) {
          monthData.push({ date, label: "Mid-Month", type: "Event" });
        } else if (day === daysInMonth) {
          monthData.push({ date, label: "Month End", type: "Event" });
        } else if (day % 7 === 0) {
          monthData.push({ date, type: "Working Day" });
        } else {
          monthData.push({ date, type: "Regular Day" });
        }
      }
      
      // Add holidays and special dates for each month
      if (month === 0) { // January
        monthData[0] = { date: "1 Jan", label: "New Year", type: "Holiday" };
        monthData[25] = { date: "26 Jan", label: "Republic Day", type: "Holiday" };
      }
      if (month === 2) { // March
        monthData[7] = { date: "8 Mar", label: "Women's Day", type: "Holiday" };
      }
      if (month === 7) { // August
        monthData[14] = { date: "15 Aug", label: "Independence Day", type: "Holiday" };
      }
      if (month === 9) { // October
        monthData[1] = { date: "2 Oct", label: "Gandhi Jayanti", type: "Holiday" };
      }
      
      allData[`${monthName} ${year}`] = monthData;
    }
    
    return allData;
  };

  const calendarData = generateCalendarData();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Holiday":
        return "bg-red-100 text-red-800";
      case "Event":
        return "bg-blue-100 text-blue-800";
      case "Examination":
        return "bg-purple-100 text-purple-800";
      case "Working Day":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const monthName = months[currentMonth].substring(0, 3);
      const dateStr = `${day} ${monthName}`;
      const monthYearKey = `${monthName} ${currentYear}`;
      const dayEvents = calendarData[monthYearKey]?.filter(event => 
        event.date === dateStr
      ) || [];

      days.push(
        <div key={`day-${day}`} className="h-24 border border-gray-200 p-1 overflow-hidden">
          <div className="text-right font-medium text-sm">{day}</div>
          <div className="overflow-y-auto h-16">
            {dayEvents.map((event, index) => (
              <div 
                key={`event-${day}-${index}`}
                className={`text-xs p-1 mb-1 rounded ${getTypeColor(event.type)}`}
              >
                {event.label || event.type}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-64 bg-gray-100 border-r hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1E3A8A]">Academic Calendar</h1>
            <div className="flex items-center gap-2 sm:gap-4">
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
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="flex items-center justify-between p-4 border-b">
              <Button variant="ghost" onClick={handlePrevMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-[#1E3A8A]">
                  {months[currentMonth].substring(0, 3)}
                </h2>
                <p className="text-sm text-[#1E3A8A]">{currentYear}</p>
              </div>
              <Button variant="ghost" onClick={handleNextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="bg-gray-100 py-2 text-center text-sm font-medium text-gray-800">
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#1E3A8A] mb-3">Key Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(calendarData).map(([monthYear, events]) => {
                const importantEvents = events.filter(event => 
                  event.type === "Holiday" || event.label
                ).slice(0, 3);
                
                return (
                  <div key={monthYear} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-[#1E3A8A] mb-2">{monthYear}</h4>
                    <div className="space-y-2">
                      {importantEvents.map((event, index) => (
                        <div 
                          key={`keydate-${monthYear}-${index}`}
                          className={`text-sm p-2 rounded ${getTypeColor(event.type)}`}
                        >
                          <div className="font-medium">{event.date}</div>
                          <div>{event.label || event.type}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;