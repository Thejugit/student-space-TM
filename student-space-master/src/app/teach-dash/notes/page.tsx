"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bookmark,
  BookmarkCheck,
  UploadCloud,
  PlayCircle,
  CalendarDays,
  Bell,
  User,
  FilePlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import Sidebar from "@/app/teach-dash/components/Sidebar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Side1 from "@/app/teach-dash/components/Side1";
import { useMediaQuery } from "@/hooks/use-media-query";

type NoteItem = {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
  teacher: string;
  isImportant: boolean;
  section: string;
  subject: string;
  type: "note" | "video" | "assignment";
  dueDate?: string;
  status?: "pending" | "completed" | "overdue";
};

export default function NotesPage() {
  const [activeSectionNotes, setActiveSectionNotes] = useState<string>("All Sections");
  const [activeSectionVideos, setActiveSectionVideos] = useState<string>("All Sections");
  const [activeSectionAssignments, setActiveSectionAssignments] = useState<string>("All Sections");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"note" | "video" | "assignment">("note");
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    section: "",
    subject: "",
    dueDate: "",
  });

  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: "note1",
      title: "Integration Short Notes - Ch8",
      description: "Integration notes for Chapter 8",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      section: "11A2",
      subject: "Mathematics",
      type: "note",
    },
    {
      id: "note2",
      title: "Differentiation Important Questions",
      description: "Differentiation notes for all units",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: true,
      section: "11A2",
      subject: "Mathematics",
      type: "note",
    },
    {
      id: "note3",
      title: "Partnership Adjustments - Ch3",
      description: "Chapter 3 short notes on partnership",
      uploadDate: "21 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      section: "11A5",
      subject: "Accountancy",
      type: "note",
    },
    {
      id: "note4",
      title: "Final Accounts Revision",
      description: "All-in-one revision for final accounts",
      uploadDate: "20 Nov'24",
      teacher: "Teacher Name",
      isImportant: true,
      section: "11A5",
      subject: "Accountancy",
      type: "note",
    },
    {
      id: "video1",
      title: "Integration Ch8 One Shot",
      description: "Integration Lecture for Chapter 8",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      section: "11A2",
      subject: "Mathematics",
      type: "video",
    },
    {
      id: "assignment1",
      title: "Computer Lab Record",
      description: "Submit Lab Exp-6 of Computer Lab",
      uploadDate: "22 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      section: "12A4",
      subject: "Computer Science",
      type: "assignment",
      dueDate: "22 Nov'24",
      status: "pending",
    },
    {
      id: "assignment2",
      title: "Computer Lab Record",
      description: "Submit Lab Exp-7 of Computer Lab",
      uploadDate: "01 Dec'24",
      teacher: "Teacher Name",
      isImportant: true,
      section: "12A4",
      subject: "Computer Science",
      type: "assignment",
      dueDate: "01 Dec'24",
      status: "pending",
    },
    {
      id: "assignment3",
      title: "Computer Lab Record",
      description: "Submit Lab Exp-5 of Computer Lab",
      uploadDate: "18 Nov'24",
      teacher: "Teacher Name",
      isImportant: false,
      section: "11A2",
      subject: "Computer Science",
      type: "assignment",
      dueDate: "18 Nov'24",
      status: "overdue",
    },
  ]);

  const toggleBookmark = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isImportant: !note.isImportant } : note
      )
    );
  };

  const getSections = () => ["All Sections", ...Array.from(new Set(notes.map((note) => note.section)))];

  const filterNotes = (section: string, type: "note" | "video" | "assignment") =>
    notes.filter((note) => note.type === type && (section === "All Sections" || note.section === section));

  const groupBySubject = (items: NoteItem[]) =>
    items.reduce((acc: Record<string, NoteItem[]>, item) => {
      if (!acc[item.subject]) acc[item.subject] = [];
      acc[item.subject].push(item);
      return acc;
    }, {});

  const handleUpload = () => {
    const today = new Date();
    const formattedDate = `${today.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][today.getMonth()]}'${today.getFullYear().toString().slice(-2)}`;
    
    const newNote: NoteItem = {
      id: `new-${Date.now()}`,
      title: newItem.title,
      description: newItem.description,
      uploadDate: formattedDate,
      teacher: "You",
      isImportant: false,
      section: newItem.section,
      subject: newItem.subject,
      type: uploadType,
      ...(uploadType === "assignment" && { 
        dueDate: newItem.dueDate,
        status: "pending"
      })
    };

    setNotes([...notes, newNote]);
    setIsUploadDialogOpen(false);
    setNewItem({
      title: "",
      description: "",
      section: "",
      subject: "",
      dueDate: "",
    });
  };

  const subjectsBySection = (section: string) => {
    return Array.from(new Set(
      notes
        .filter(note => note.section === section)
        .map(note => note.subject)
    ));
  };

  const [screenWidth, setScreenWidth] = useState<number>(0);
  const isSmallScreen = useMediaQuery("(min-width: 320px) and (max-width: 480px)");

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (isTypeDropdownOpen) setIsTypeDropdownOpen(false);
      if (isSectionDropdownOpen) setIsSectionDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isTypeDropdownOpen, isSectionDropdownOpen]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Fixed width on large screens */}
      <div className="hidden lg:block w-64 flex-shrink-0 fixed h-screen bg-[#1E3A8A] text-white">
        <Sidebar />
      </div>

      {/* Main Content - Add left margin to match sidebar width on large screens */}
      <div className="flex-1 lg:ml-64 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex justify-between items-center px-4 py-3"> {/* Reduced padding */}
            <div className="lg:hidden">
              <Side1 />
            </div>

            <h1 className={`text-base lg:text-2xl font-bold text-[#1E3A8A] ${
              screenWidth <= 480 ? 'text-sm' : screenWidth <= 768 ? 'text-base' : ''
            }`}>
              Digital Notes Space
            </h1>

            {screenWidth > 768 && (
              <div className="flex items-center gap-4">
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

        {/* Main Content Area */}
        <div className={`p-4 ${screenWidth <= 480 ? 'p-2' : ''}`}>
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Upload Dialog */}
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New {uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}</DialogTitle>
                  <DialogDescription>
                    Fill in the details for your new {uploadType}.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select 
                      value={uploadType}
                      onValueChange={(value: "note" | "video" | "assignment") => setUploadType(value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="note">Note</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="section" className="text-right">
                      Section
                    </Label>
                    <Select
                      value={newItem.section}
                      onValueChange={(value) => setNewItem({...newItem, section: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {getSections()
                          .filter(section => section !== "All Sections")
                          .map((section) => (
                            <SelectItem key={section} value={section}>{section}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Select
                      value={newItem.subject}
                      onValueChange={(value) => setNewItem({...newItem, subject: value})}
                      disabled={!newItem.section}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {newItem.section && subjectsBySection(newItem.section).map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {uploadType === "assignment" && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dueDate" className="text-right">
                        Due Date
                      </Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newItem.dueDate}
                        onChange={(e) => setNewItem({...newItem, dueDate: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      File
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpload}>
                    <UploadCloud className="w-4 h-4 mr-1" /> Upload
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Mobile View Controls (320px - 520px) */}
            {screenWidth <= 520 ? (
              <div className="space-y-3"> {/* Reduced spacing */}
                {/* Type Selector Dropdown */}
                <div className="relative">
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center text-sm py-2 px-3" // Smaller text and padding
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTypeDropdownOpen(!isTypeDropdownOpen);
                      setIsSectionDropdownOpen(false);
                    }}
                  >
                    <span>{uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}s</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isTypeDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  
                  <div 
                    className={`
                      absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg text-sm
                      transition-all duration-200 origin-top max-h-[200px] overflow-y-auto
                      ${isTypeDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
                    `}
                  >
                    {['note', 'video', 'assignment'].map((type) => (
                      <button
                        key={type}
                        className={`w-full px-4 py-2 text-left transition-colors ${
                          uploadType === type 
                            ? 'bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadType(type as "note" | "video" | "assignment");
                          setIsTypeDropdownOpen(false);
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section Selector Dropdown */}
                <div className="relative">
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center text-sm py-2 px-3" // Smaller text and padding
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSectionDropdownOpen(!isSectionDropdownOpen);
                      setIsTypeDropdownOpen(false);
                    }}
                  >
                    <span>{
                      uploadType === 'note' ? activeSectionNotes :
                      uploadType === 'video' ? activeSectionVideos :
                      activeSectionAssignments
                    }</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isSectionDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  
                  <div 
                    className={`
                      absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg text-sm
                      transition-all duration-200 origin-top max-h-[200px] overflow-y-auto
                      ${isSectionDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}
                    `}
                  >
                    {getSections().map((section) => (
                      <button
                        key={section}
                        className={`w-full px-4 py-2 text-left transition-colors ${
                          (uploadType === 'note' && activeSectionNotes === section) ||
                          (uploadType === 'video' && activeSectionVideos === section) ||
                          (uploadType === 'assignment' && activeSectionAssignments === section)
                            ? 'bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (uploadType === 'note') setActiveSectionNotes(section);
                          if (uploadType === 'video') setActiveSectionVideos(section);
                          if (uploadType === 'assignment') setActiveSectionAssignments(section);
                          setIsSectionDropdownOpen(false);
                        }}
                      >
                        {section}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Button */}
                <Button 
                  variant="outline" 
                  className="w-full text-sm py-2" // Smaller text and padding
                  onClick={() => setIsUploadDialogOpen(true)}
                >
                  <FilePlus className="w-3 h-3 mr-1" /> New {uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}
                </Button>
              </div>
            ) : (
              // Desktop View (Tabs)
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="grid grid-cols-3 gap-2 mb-4">
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="videos">Lecture Videos</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>

                {/* Notes Tab */}
                <TabsContent value="notes">
                  <div className={`flex gap-2 ${screenWidth <= 768 ? 'overflow-x-auto pb-4' : 'flex-wrap'}`}>
                    {getSections().map((section) => (
                      <Button
                        key={section}
                        variant={activeSectionNotes === section ? "default" : "outline"}
                        className={activeSectionNotes === section ? "bg-[#1E3A8A] text-white" : ""}
                        onClick={() => setActiveSectionNotes(section)}
                      >
                        {section}
                      </Button>
                    ))}
                    <Button 
                      variant="outline" 
                      className="ml-auto"
                      onClick={() => {
                        setUploadType("note");
                        setIsUploadDialogOpen(true);
                      }}
                    >
                      <FilePlus className="w-4 h-4 mr-1" /> New Note
                    </Button>
                  </div>

                  {Object.entries(groupBySubject(filterNotes(activeSectionNotes, "note"))).map(
                    ([subject, subjectNotes]: any) => (
                      <div key={subject}>
                        <div className="flex justify-between items-center mt-4">
                          <h3 className="font-semibold text-xl">{subject}</h3>
                          <div className="flex gap-2">
                            <Button variant="ghost" className="text-[#1E3A8A]">See All</Button>
                            <Button 
                              size="sm" 
                              className="bg-[#1E3A8A] text-white"
                              onClick={() => {
                                setUploadType("note");
                                setIsUploadDialogOpen(true);
                            }}
                            >
                              <UploadCloud className="w-4 h-4 mr-1" />Upload
                            </Button>
                          </div>
                        </div>
                        {subjectNotes.map((note: any) => (
                          <Card
                            key={note.id}
                            className={`mt-2 ${note.isImportant ? "bg-[#1E3A8A] text-white" : ""}`}
                          >
                            <CardContent className={`${screenWidth <= 480 ? 'p-2' : 'p-3'}`}>
                              <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0"> {/* Added min-width to prevent text overflow */}
                                  <p className="text-sm font-semibold truncate">{note.title}</p>
                                  <p className={`text-xs line-clamp-2 ${note.isImportant ? "" : "text-muted-foreground"}`}>
                                    {note.description}
                                  </p>
                                  <p className={`text-xs mt-1 ${note.isImportant ? "" : "text-muted-foreground"}`}>
                                    Uploaded on {note.uploadDate}
                                  </p>
                                  <p className={`text-xs mt-1 ${note.isImportant ? "" : "text-muted-foreground"}`}>
                                    👨‍🏫 {note.teacher}
                                  </p>
                                </div>
                                <button 
                                  onClick={() => toggleBookmark(note.id)}
                                  className="ml-2 flex-shrink-0"
                                >
                                  {note.isImportant ? (
                                    <BookmarkCheck className="w-3 h-3 text-white" />
                                  ) : (
                                    <Bookmark className="w-3 h-3 text-muted-foreground" />
                                  )}
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )
                  )}
                </TabsContent>

                {/* Videos Tab */}
                <TabsContent value="videos">
                  <div className={`flex gap-2 ${screenWidth <= 768 ? 'overflow-x-auto pb-4' : 'flex-wrap'}`}>
                    {getSections().map((section) => (
                      <Button
                        key={section}
                        variant={activeSectionVideos === section ? "default" : "outline"}
                        className={activeSectionVideos === section ? "bg-[#1E3A8A] text-white" : ""}
                        onClick={() => setActiveSectionVideos(section)}
                      >
                        {section}
                      </Button>
                    ))}
                    <Button 
                      variant="outline" 
                      className="ml-auto"
                      onClick={() => {
                        setUploadType("video");
                        setIsUploadDialogOpen(true);
                      }}
                    >
                      <FilePlus className="w-4 h-4 mr-1" /> New Video
                    </Button>
                  </div>

                  {Object.entries(groupBySubject(filterNotes(activeSectionVideos, "video"))).map(
                    ([subject, videos]: any) => (
                      <div key={subject}>
                        <div className="flex justify-between items-center mt-4">
                          <h3 className="font-semibold text-xl">{subject}</h3>
                          <div className="flex gap-2">
                            <Button variant="ghost" className="text-[#1E3A8A]">See All</Button>
                            <Button 
                              size="sm" 
                              className="bg-[#1E3A8A] text-white"
                              onClick={() => {
                                setUploadType("video");
                                setIsUploadDialogOpen(true);
                            }}
                            >
                              <UploadCloud className="w-4 h-4 mr-1" />Upload
                            </Button>
                          </div>
                        </div>
                        {videos.map((video: any) => (
                          <Card
                            key={video.id}
                            className={`mt-2 ${video.isImportant ? "bg-[#1E3A8A] text-white" : ""}`}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">{video.title}</p>
                                  <p className={`text-sm ${video.isImportant ? "" : "text-muted-foreground"}`}>
                                    {video.description}
                                  </p>
                                  <p className={`text-xs mt-1 ${video.isImportant ? "" : "text-muted-foreground"}`}>
                                    Uploaded on {video.uploadDate}
                                  </p>
                                  <p className={`text-xs mt-1 ${video.isImportant ? "" : "text-muted-foreground"}`}>
                                    👨‍🏫 {video.teacher}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <PlayCircle className={`w-6 h-6 ${video.isImportant ? "text-white" : "text-[#1E3A8A]"}`} />
                                  <button onClick={() => toggleBookmark(video.id)}>
                                    {video.isImportant ? (
                                      <BookmarkCheck className="w-5 h-5 text-white" />
                                    ) : (
                                      <Bookmark className="w-5 h-5 text-muted-foreground" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )
                  )}
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value="assignments">
                  <div className={`flex gap-2 ${screenWidth <= 768 ? 'overflow-x-auto pb-4' : 'flex-wrap'}`}>
                    {getSections().map((section) => (
                      <Button
                        key={section}
                        variant={activeSectionAssignments === section ? "default" : "outline"}
                        className={activeSectionAssignments === section ? "bg-[#1E3A8A] text-white" : ""}
                        onClick={() => setActiveSectionAssignments(section)}
                      >
                        {section}
                      </Button>
                    ))}
                    <Button 
                      variant="outline" 
                      className="ml-auto"
                      onClick={() => {
                        setUploadType("assignment");
                        setIsUploadDialogOpen(true);
                      }}
                    >
                      <FilePlus className="w-4 h-4 mr-1" /> New Assignment
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {filterNotes(activeSectionAssignments, "assignment").map((assignment) => {
                      const statusColor =
                        assignment.status === "overdue"
                          ? "bg-red-500"
                          : assignment.status === "completed"
                          ? "bg-green-500"
                          : "bg-blue-500";

                      return (
                        <Card
                          key={assignment.id}
                          className={`mt-2 ${assignment.isImportant ? "bg-[#1E3A8A] text-white" : ""}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <p className="font-semibold">{assignment.title}</p>
                                  <button onClick={() => toggleBookmark(assignment.id)}>
                                    {assignment.isImportant ? (
                                      <BookmarkCheck className="w-5 h-5 text-white" />
                                    ) : (
                                      <Bookmark className="w-5 h-5 text-muted-foreground" />
                                    )}
                                  </button>
                                </div>
                                <p className={`text-sm ${assignment.isImportant ? "" : "text-muted-foreground"}`}>
                                  {assignment.description}
                                </p>
                                <div className={`flex items-center text-xs gap-1 mt-2 ${assignment.isImportant ? "" : "text-muted-foreground"}`}>
                                  <div className={`w-2 h-2 rounded-full ${assignment.isImportant ? "bg-white" : statusColor}`}></div>
                                  <CalendarDays className="w-4 h-4" />
                                  Due Date: {assignment.dueDate}
                                </div>
                                <p className={`text-xs mt-1 ${assignment.isImportant ? "" : "text-muted-foreground"}`}>
                                  👨‍🏫 {assignment.teacher}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {/* Content Display Based on Selected Type */}
            {screenWidth <= 520 && (
              <div className="mt-4">
                {Object.entries(groupBySubject(filterNotes(
                  uploadType === 'note' ? activeSectionNotes :
                  uploadType === 'video' ? activeSectionVideos :
                  activeSectionAssignments,
                  uploadType
                ))).map(([subject, items]: any) => (
                  <div key={subject}>
                    <div className="flex justify-between items-center mt-4">
                      <h3 className="font-semibold text-xl">{subject}</h3>
                      <div className="flex gap-2">
                        <Button variant="ghost" className="text-[#1E3A8A]">See All</Button>
                        <Button 
                          size="sm" 
                          className="bg-[#1E3A8A] text-white"
                          onClick={() => setIsUploadDialogOpen(true)}
                        >
                          <UploadCloud className="w-4 h-4 mr-1" />Upload
                        </Button>
                      </div>
                    </div>

                    {items.map((item: NoteItem) => (
                      <Card
                        key={item.id}
                        className={`mt-2 ${item.isImportant ? "bg-[#1E3A8A] text-white" : ""}`}
                      >
                        <CardContent className={`${screenWidth <= 480 ? 'p-2' : 'p-3'}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0"> {/* Added min-width to prevent text overflow */}
                              <p className="text-sm font-semibold truncate">{item.title}</p>
                              <p className={`text-xs line-clamp-2 ${item.isImportant ? "" : "text-muted-foreground"}`}>
                                {item.description}
                              </p>
                              <p className={`text-xs mt-1 ${item.isImportant ? "" : "text-muted-foreground"}`}>
                                Uploaded on {item.uploadDate}
                              </p>
                              {item.type === 'assignment' && (
                                <div className={`flex items-center text-xs gap-1 mt-1 flex-wrap ${
                                  item.isImportant ? "" : "text-muted-foreground"
                                }`}>
                                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                    item.status === "overdue" ? "bg-red-500" :
                                    item.status === "completed" ? "bg-green-500" :
                                    "bg-blue-500"
                                  }`}></div>
                                  <CalendarDays className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">Due: {item.dueDate}</span>
                                </div>
                              )}
                              <p className={`text-xs mt-1 truncate ${item.isImportant ? "" : "text-muted-foreground"}`}>
                                👨‍🏫 {item.teacher}
                              </p>
                            </div>
                            <button 
                              onClick={() => toggleBookmark(item.id)}
                              className="ml-2 flex-shrink-0"
                            >
                              {item.isImportant ? (
                                <BookmarkCheck className="w-3 h-3 text-white" />
                              ) : (
                                <Bookmark className="w-3 h-3 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}