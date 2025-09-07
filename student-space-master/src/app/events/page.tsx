"use client";

import Sidebar from "../student-dash/components/Sidebar";
import Side1 from "../student-dash/components/Side1";
import { Calendar, Clock, MapPin, Bell, CheckCircle2, XCircle, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function EventsPage() {
  // Add screen width state
  const [screenWidth, setScreenWidth] = useState<number>(0);

  // Add useEffect for screen width
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "42nd Annual Day Celebrations",
      date: "15 Nov 2024",
      time: "3:00 PM",
      location: "Kamarajar Arangam, Teynampet, Chennai",
      type: "Cultural",
      description: "Dear Parents, We cordially invite you to join us for our 42nd Annual Day Celebrations.",
      status: "upcoming",
      rsvp: true
    },
    {
      id: 2,
      title: "Mathematics Cluster Examinations",
      date: "27 Nov 2024",
      time: "9:00 AM - 11:30 AM",
      location: "School Campus",
      type: "Academic",
      description: "Cluster examinations for all classes. Bring your own calculators.",
      status: "upcoming",
      rsvp: false
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      date: "14 Jan 2025",
      time: "10:00 AM - 1:00 PM",
      location: "School Auditorium",
      type: "Academic",
      description: "Quarterly parent-teacher meeting to discuss student progress.",
      status: "upcoming",
      rsvp: true
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Summer Camp Registration",
      date: "11 Jan 2025",
      time: "9:00 AM - 12:00 PM",
      location: "School Office",
      type: "Event",
      description: "Registration for summer camp activities.",
      status: "past",
      attended: true
    },
    {
      id: 5,
      title: "Field Trip to Museum",
      date: "20 Jan 2025",
      time: "8:00 AM - 3:00 PM",
      location: "National Museum",
      type: "Educational",
      description: "Educational field trip for history classes.",
      status: "past",
      attended: false
    }
  ];

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-gray-100">
      {/* Show full sidebar only on larger screens */}
      {screenWidth > 769  && <Sidebar />}
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger menu */}
            {screenWidth <= 769 && (
              <div className="flex-none">
                <Side1 />
              </div>
            )}
            
            {/* Title */}
            <div className="flex-1 text-center">
              <h1 className={`font-bold text-[#1E3A8A] ${
                screenWidth <= 769 ? 'text-xl' : 'text-2xl'
              }`}>
                School Events
              </h1>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="p-1 text-gray-600 hover:bg-gray-100">
                <Search className="h-4 w-4" />
              </Button>
              <User className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-6">
          <div className="space-y-6">
            <Tabs defaultValue="upcoming">
              <TabsList className="bg-gray-100 border border-gray-200 w-full grid grid-cols-3 gap-0">
                <TabsTrigger 
                  value="upcoming" 
                  className="text-sm px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger 
                  value="past"
                  className="text-sm px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]"
                >
                  Past
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar"
                  className="text-sm px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#1E3A8A]"
                >
                  Calendar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <Card key={event.id} className="rounded-xl border-gray-200">
                      <CardHeader className="p-4">
                        <div className="flex flex-col gap-2">
                          <CardTitle className="text-lg text-[#1E3A8A] font-bold">{event.title}</CardTitle>
                          <Badge 
                            variant="outline" 
                            className="w-fit text-xs border-[#1E3A8A] text-[#1E3A8A]"
                          >
                            {event.type}
                          </Badge>
                          <CardDescription className="mt-1">
                            <div className="flex flex-col gap-1 text-sm">
                              <span className="flex items-center text-gray-600">
                                <Calendar className="mr-2 h-4 w-4 text-[#1E3A8A]" />
                                {event.date}
                              </span>
                              <span className="flex items-center text-gray-600">
                                <Clock className="mr-2 h-4 w-4 text-[#1E3A8A]" />
                                {event.time}
                              </span>
                              <span className="flex items-center text-gray-600">
                                <MapPin className="mr-2 h-4 w-4 text-[#1E3A8A]" />
                                {event.location}
                              </span>
                            </div>
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 py-2 text-sm">
                        <p className="text-gray-700 line-clamp-2">{event.description}</p>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-2 p-4">
                        {event.rsvp && (
                          <Badge className="w-full justify-center bg-yellow-100 text-yellow-800 text-xs">
                            RSVP Required
                          </Badge>
                        )}
                        <div className="flex gap-2 w-full">
                          <Button variant="outline" size="sm" className="flex-1 text-xs border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white">
                            <Bell className="mr-1.5 h-3.5 w-3.5" />
                            Remind
                          </Button>
                          {event.rsvp && (
                            <Button size="sm" className="flex-1 text-xs bg-[#1E3A8A] hover:bg-[#1E3A8A]/90">
                              Register
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="space-y-4">
                  {pastEvents.map(event => (
                    <Card key={event.id} className="rounded-xl border-gray-200">
                      <CardHeader className="p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                          <div>
                            <CardTitle className="text-lg text-[#1E3A8A] font-bold">{event.title}</CardTitle>
                            <CardDescription className="mt-2">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-y-2 gap-x-6 text-sm">
                                <span className="flex items-center text-gray-600">
                                  <Calendar className="mr-2 h-4 w-4 text-[#1E3A8A]" />
                                  {event.date}
                                </span>
                                <span className="flex items-center text-gray-600">
                                  <Clock className="mr-2 h-4 w-4 text-[#1E3A8A]" />
                                  {event.time}
                                </span>
                                <span className="flex items-center text-gray-600">
                                  <MapPin className="mr-2 h-4 w-4 text-[#1E3A8A]" />
                                  {event.location}
                                </span>
                              </div>
                            </CardDescription>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-sm border-[#1E3A8A] text-[#1E3A8A] ${
                              event.type === "Academic" ? "bg-blue-50" :
                              event.type === "Cultural" ? "bg-purple-50" :
                              "bg-green-50"
                            }`}
                          >
                            {event.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 py-2">
                        <p className="text-gray-700">{event.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0 px-4 pb-4">
                        {event.attended ? (
                          <Badge className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle2 className="h-4 w-4" />
                            Attended
                          </Badge>
                        ) : (
                          <Badge className="flex items-center gap-1 bg-red-100 text-red-800 hover:bg-red-100">
                            <XCircle className="h-4 w-4" />
                            Not Attended
                          </Badge>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calendar">
                <Card className="rounded-xl border-gray-200">
                  <CardHeader className="border-b border-gray-200 p-4">
                    <CardTitle className="text-lg text-[#1E3A8A] font-bold">Event Calendar</CardTitle>
                    <CardDescription className="text-gray-600">View all school events in calendar format</CardDescription>
                  </CardHeader>
                  <CardContent className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="text-center text-gray-500">
                      <Calendar className="mx-auto h-12 w-12 mb-4 text-[#1E3A8A]" />
                      <h3 className="text-lg font-medium text-gray-700">Calendar View</h3>
                      <p className="mt-1 text-gray-500">Coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}