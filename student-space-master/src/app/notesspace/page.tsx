"use client";

import React, { useState, useEffect } from "react";
import { Book, Bookmark, BookmarkCheck, Filter, Play, Bell, User } from "lucide-react";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
 
import Sidebar from "@/app/student-dash/components/Sidebar";
import Side1 from "@/app/student-dash/components/Side1";
import { Button } from "@/components/ui/button";

interface NoteItem {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
  teacher: string;
  isImportant: boolean;
  type: "note" | "video" | "assignment";
  subject: string;
  color?: string;
  status?: "pending" | "completed" | "overdue";
  dueDate?: string;
}

const getFilteredItems = (items: NoteItem[], filter: string, type: "note" | "video" | "assignment") => {
  let filteredItems = items.filter(item => item.type === type);
  
  if (filter === "Important") {
    filteredItems = filteredItems.filter(item => item.isImportant);
  }
  
  if (filter === "Subjects") {
    const subjects = [...new Set(filteredItems.map(item => item.subject))];
    return subjects.map(subject => ({
      subject,
      items: filteredItems.filter(item => item.subject === subject)
    }));
  }
  
  return [{ subject: "", items: filteredItems }];
};

const DigitalNotesSpace = () => {
  const [notesFilter, setNotesFilter] = useState<"Subjects" | "Recently Added" | "Important" | "Last Seen">("Subjects");
  const [videosFilter, setVideosFilter] = useState<"Subjects" | "Recently Added" | "Important" | "Last Seen">("Subjects");
  const [assignmentsFilter, setAssignmentsFilter] = useState<"Subjects" | "Recently Added" | "Important" | "Last Seen">("Subjects");
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isNotesDropdownOpen, setIsNotesDropdownOpen] = useState(false);
  const [isVideosDropdownOpen, setIsVideosDropdownOpen] = useState(false);
  const [isAssignmentsDropdownOpen, setIsAssignmentsDropdownOpen] = useState(false);

  // Add screen width detection
  useEffect(() => {
    // Set initial width
    setScreenWidth(window.innerWidth);

    // Add resize listener
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click target is not within any dropdown
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsNotesDropdownOpen(false);
        setIsVideosDropdownOpen(false);
        setIsAssignmentsDropdownOpen(false);
      }
    };

    // Add event listener to document
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const initialNotes: NoteItem[] = [
    {
      id: "1",
      title: "Integration Short Notes - Ch8",
      description: "Integration notes for Chapter 8",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      type: "note",
      subject: "Mathematics"
    },
    {
      id: "2",
      title: "Differentiation Important Questions",
      description: "Differentiation notes for all units",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: true,
      type: "note",
      subject: "Mathematics"
    },
    {
      id: "3",
      title: "Integration Short Notes - Ch8",
      description: "Integration notes for Chapter 8",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      type: "note",
      subject: "Accountancy"
    },
    {
      id: "4",
      title: "Differentiation Important Questions",
      description: "Differentiation notes for all units",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: true,
      type: "note",
      subject: "Accountancy"
    },
    {
      id: "5",
      title: "Integration Ch8 One Shot",
      description: "Integration Lecture for Chapter 8",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      type: "video",
      subject: "Mathematics"
    },
    {
      id: "6",
      title: "Computer Lab Record",
      description: "Submit Lab Exp-6 of Computer Lab",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      type: "assignment",
      subject: "Computer Science",
      dueDate: "22 Nov'24",
      status: "pending",
      color: "green"
    },
    {
      id: "7",
      title: "Computer Lab Record",
      description: "Submit Lab Exp-7 of Computer Lab",
      uploadDate: "01 Dec'24",
      teacher: "Teacher Name",
      isImportant: false,
      type: "assignment",
      subject: "Computer Science",
      dueDate: "01 Dec'24",
      status: "pending",
      color: "blue"
    },
    {
      id: "8",
      title: "Computer Lab Record",
      description: "Submit Lab Exp-5 of Computer Lab",
      uploadDate: "18 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      type: "assignment",
      subject: "Computer Science",
      dueDate: "18 Nov'24",
      status: "overdue",
      color: "red"
    }
  ];

  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);

  const toggleBookmark = (id: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, isImportant: !note.isImportant }
          : note
      )
    );
  };

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Show only on desktop */}
      {screenWidth > 769 && <Sidebar />}
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b px-3 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu */}
            {screenWidth <= 769 && (
              <div className="flex-none">
                <Side1 />
              </div>
            )}
            
            {/* Title */}
            <div className="flex-1">
              <h1 className={`font-bold text-[#1E3A8A] ${
                screenWidth <= 769 ? 'text-center text-xl' :
                screenWidth <= 1024 ? 'text-center p-8 text-2xl' : ''
              }`}>
                Digital Notes Space
              </h1>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="p-1">
                <Bell className="h-4 w-4 text-gray-600" />
              </Button>
              <div className="h-7 w-7 rounded-full bg-gray-300 overflow-hidden">
                <User className="h-full w-full p-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Notes Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-[#1E3A8A] mb-4">Notes</h2>
              
              {/* Notes Filter Section */}
              <div className="flex space-x-2 mb-4 overflow-visible">
                <div className="flex items-center mr-2">
                  <Filter className="h-5 w-5 text-[#1E3A8A]" />
                </div>
                
                {screenWidth >= 320 && screenWidth <= 520 ? (
                  <div className="relative dropdown-container">
                    <button
                      className="w-full flex justify-between items-center px-4 py-2 rounded-md text-sm border bg-white"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up
                        setIsNotesDropdownOpen(!isNotesDropdownOpen);
                        setIsVideosDropdownOpen(false);
                        setIsAssignmentsDropdownOpen(false);
                      }}
                    >
                      <span>{notesFilter}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isNotesDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div 
                      className={`absolute left-0 right-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg z-50 transition-all duration-200 origin-top ${
                        isNotesDropdownOpen 
                          ? 'opacity-100 scale-y-100' 
                          : 'opacity-0 scale-y-0 pointer-events-none'
                      }`}
                    >
                      {["Subjects", "Recently Added", "Important", "Last Seen"].map((filter) => (
                        <button
                          key={filter}
                          className={`w-full px-4 py-2 text-left text-sm ${
                            notesFilter === filter 
                              ? 'bg-[#1E3A8A] text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event from bubbling up
                            setNotesFilter(filter as "Subjects" | "Recently Added" | "Important" | "Last Seen");
                            setIsNotesDropdownOpen(false);
                          }}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Desktop view remains unchanged
                  <div className="flex gap-2">
                    {["Subjects", "Recently Added", "Important", "Last Seen"].map((filter) => (
                      <button
                        key={filter}
                        className={`px-4 py-1 rounded-md text-sm ${
                          notesFilter === filter 
                            ? 'bg-[#1E3A8A] text-white' 
                            : 'border hover:bg-gray-100'
                        }`}
                        onClick={() => setNotesFilter(filter as "Subjects" | "Recently Added" | "Important" | "Last Seen")}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {getFilteredItems(notes, notesFilter, "note").map((group, groupIndex) => (
                <div key={groupIndex} className="mb-6">
                  {group.subject && (
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">{group.subject}</h3>
                      <button className="text-[#1E3A8A] text-sm">See All</button>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.items.map((note) => (
                      <div key={note.id} className={`border rounded-md overflow-hidden ${note.isImportant ? "bg-[#1E3A8A] text-white" : "bg-white"}`}>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <Book className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">{note.title}</h4>
                                <p className="text-sm opacity-80">{note.description}</p>
                                <p className="text-sm opacity-70">Uploaded on {note.uploadDate}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                                  <span className="text-sm">{note.teacher}</span>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => toggleBookmark(note.id)}
                              className="transition-transform hover:scale-110"
                            >
                              {note.isImportant ? (
                                <BookmarkCheck className="h-5 w-5 text-white" />
                              ) : (
                                <Bookmark className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Lecture Videos Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-[#1E3A8A] mb-4">Lecture Videos</h2>
              
              {/* Videos Filter Section */}
              <div className="flex space-x-2 mb-4 overflow-visible">
                <div className="flex items-center mr-2">
                  <Filter className="h-5 w-5 text-[#1E3A8A]" />
                </div>
                
                {screenWidth >= 320 && screenWidth <= 520 ? (
                  <div className="relative dropdown-container">
                    <button
                      className="w-full flex justify-between items-center px-4 py-2 rounded-md text-sm border bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsVideosDropdownOpen(!isVideosDropdownOpen);
                        setIsNotesDropdownOpen(false);
                        setIsAssignmentsDropdownOpen(false);
                      }}
                    >
                      <span>{videosFilter}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isVideosDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div 
                      className={`absolute left-0 right-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg z-50 transition-all duration-200 origin-top ${
                        isVideosDropdownOpen 
                          ? 'opacity-100 scale-y-100' 
                          : 'opacity-0 scale-y-0 pointer-events-none'
                      }`}
                    >
                      {["Subjects", "Recently Added", "Important", "Last Seen"].map((filter) => (
                        <button
                          key={filter}
                          className={`w-full px-4 py-2 text-left text-sm ${
                            videosFilter === filter 
                              ? 'bg-[#1E3A8A] text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setVideosFilter(filter as "Subjects" | "Recently Added" | "Important" | "Last Seen");
                            setIsVideosDropdownOpen(false);
                          }}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Desktop view remains unchanged
                  <div className="flex gap-2">
                    {["Subjects", "Recently Added", "Important", "Last Seen"].map((filter) => (
                      <button
                        key={filter}
                        className={`px-4 py-1 rounded-md text-sm ${
                          videosFilter === filter 
                            ? 'bg-[#1E3A8A] text-white' 
                            : 'border hover:bg-gray-100'
                        }`}
                        onClick={() => setVideosFilter(filter as "Subjects" | "Recently Added" | "Important" | "Last Seen")}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {getFilteredItems(notes, videosFilter, "video").map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    {group.items.map((video) => (
                      <div key={video.id} className="border rounded-md overflow-hidden bg-white">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 bg-gray-100 p-4 rounded-md">
                                <Play className="h-5 w-5 text-[#1E3A8A]" />
                              </div>
                              <div>
                                <h4 className="font-medium">{video.title}</h4>
                                <p className="text-sm text-gray-600">{video.description}</p>
                                <p className="text-sm text-gray-500">Uploaded on {video.uploadDate}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                                  <span className="text-sm">{video.teacher}</span>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => toggleBookmark(video.id)}
                              className="transition-transform hover:scale-110"
                            >
                              {video.isImportant ? (
                                <BookmarkCheck className="h-5 w-5 text-[#1E3A8A]" />
                              ) : (
                                <Bookmark className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Assignments Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-[#1E3A8A] mb-4">Assignments</h2>
              
              {/* Assignments Filter Section */}
              <div className="flex space-x-2 mb-4 overflow-visible">
                <div className="flex items-center mr-2">
                  <Filter className="h-5 w-5 text-[#1E3A8A]" />
                </div>
                
                {screenWidth >= 320 && screenWidth <= 520 ? (
                  <div className="relative dropdown-container">
                    <button
                      className="w-full flex justify-between items-center px-4 py-2 rounded-md text-sm border bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAssignmentsDropdownOpen(!isAssignmentsDropdownOpen);
                        setIsNotesDropdownOpen(false);
                        setIsVideosDropdownOpen(false);
                      }}
                    >
                      <span>{assignmentsFilter}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isAssignmentsDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div 
                      className={`absolute left-0 right-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg z-50 transition-all duration-200 origin-top ${
                        isAssignmentsDropdownOpen 
                          ? 'opacity-100 scale-y-100' 
                          : 'opacity-0 scale-y-0 pointer-events-none'
                      }`}
                    >
                      {["Subjects", "Recently Added", "Important", "Last Seen"].map((filter) => (
                        <button
                          key={filter}
                          className={`w-full px-4 py-2 text-left text-sm ${
                            assignmentsFilter === filter 
                              ? 'bg-[#1E3A8A] text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setAssignmentsFilter(filter as "Subjects" | "Recently Added" | "Important" | "Last Seen");
                            setIsAssignmentsDropdownOpen(false);
                          }}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Desktop view remains unchanged
                  <div className="flex gap-2">
                    {["Subjects", "Recently Added", "Important", "Last Seen"].map((filter) => (
                      <button
                        key={filter}
                        className={`px-4 py-1 rounded-md text-sm ${
                          assignmentsFilter === filter 
                            ? 'bg-[#1E3A8A] text-white' 
                            : 'border hover:bg-gray-100'
                        }`}
                        onClick={() => setAssignmentsFilter(filter as "Subjects" | "Recently Added" | "Important" | "Last Seen")}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getFilteredItems(notes, assignmentsFilter, "assignment").map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    {group.items.map((assignment) => (
                      <div key={assignment.id} className="border rounded-md overflow-hidden bg-white">
                        <div className="p-4">
                          <div className="flex items-start gap-2">
                            <div className={`w-1 h-full rounded-full ${
                              assignment.color === 'green' ? 'bg-green-500' : 
                              assignment.color === 'blue' ? 'bg-blue-500' : 
                              'bg-red-500'
                            } self-stretch`}></div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{assignment.title}</h4>
                                <button 
                                  onClick={() => toggleBookmark(assignment.id)}
                                  className="transition-transform hover:scale-110"
                                >
                                  {assignment.isImportant ? (
                                    <BookmarkCheck className="h-5 w-5 text-[#1E3A8A]" />
                                  ) : (
                                    <Bookmark className="h-5 w-5 text-gray-400" />
                                  )}
                                </button>
                              </div>
                              <p className="text-sm text-gray-600">{assignment.description}</p>
                              <p className="text-sm text-gray-500">Due Date: {assignment.dueDate}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                                <span className="text-sm">{assignment.teacher}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default DigitalNotesSpace;
