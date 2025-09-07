"use client";
import { MessageSquare, Clock, CheckCircle2, Upload, AlertCircle, ChevronDown, Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Sidebar from "../student-dash/components/Sidebar";
import { useEffect, useState } from "react";
import Side1 from "../student-dash/components/Side1";

const enquiryCategories = [
  "Academic",
  "Financial",
  "Technical",
  "Administrative",
  "Other"
];

interface Enquiry {
  id: string;
  subject: string;
  category: string;
  date: string;
  status?: string;
  priority?: string;
  lastUpdate?: string;
  satisfaction?: string;
  resolutionDate?: string;
}

export default function EnquiryPage() {
  // Add screen width state
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeEnquiries] = useState<Enquiry[]>([
    {
      id: "ENQ-001",
      subject: "Course Registration Issue",
      category: "Academic",
      date: "2024-01-15",
      status: "In Progress",
      priority: "High",
      lastUpdate: "2024-01-16"
    }
  ]);

  const [resolvedEnquiries] = useState<Enquiry[]>([
    {
      id: "ENQ-002",
      subject: "Library Access Issue",
      category: "Administrative",
      date: "2024-01-10",
      satisfaction: "Satisfied",
      resolutionDate: "2024-01-12"
    }
  ]);

  // Add useEffect for screen width
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen h-screen overflow-hidden bg-gray-50">
      {/* Show sidebar only on larger screens (>1024px) */}
      {screenWidth > 769&& <Sidebar />}
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b px-3 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Hamburger menu only for mobile (<= 769px) */}
            {screenWidth <= 769 && (
              <div className="flex-none">
                <Side1 />
              </div>
            )}

            {/* Title */}
            <div className="flex-1">
              <h1 className={` font-bold text-[#1E3A8A] ${
               screenWidth <= 769 ? 'text-center text-xl' :
                screenWidth <= 1024 ? 'text-center p-8 text-2xl':''} ` }>

                Enquiries
              </h1>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2">
              {/* Search - Show on screens >= 768px with responsive width */}
              <div className={`relative ${screenWidth < 768 ? 'hidden' : 'block'}`}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-[160px] md:w-[180px] lg:w-[200px] bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Update the content container */}
            <div className="space-y-6">
              {/* Update Card layouts for better responsiveness */}
              <Card className="border-gray-200 mx-auto max-w-[95%] sm:max-w-full">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg">Submit New Enquiry</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Fill out the form below to submit your query
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Subject</label>
                        <Input placeholder="Enter enquiry subject" className="bg-gray-50 border-gray-200 w-full" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
                        <Select>
                          <SelectTrigger className="bg-gray-50 border-gray-200 w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {enquiryCategories.map(category => (
                              <SelectItem key={category} value={category.toLowerCase()}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                      <Textarea 
                        placeholder="Provide details about your enquiry..." 
                        className="bg-gray-50 border-gray-200 min-h-[120px]" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">Attachments (Optional)</label>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer">
                          <Button variant="outline" type="button" className="border-gray-200 text-gray-700">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload File
                            <Input type="file" className="hidden" />
                          </Button>
                        </label>
                        <span className="text-sm text-gray-500">Max. 5MB</span>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-gray-200 p-4">
                  <Button variant="ghost" className="text-gray-600">
                  Save as Draft
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Submit Enquiry
                  </Button>
                </CardFooter>
              </Card>

              {/* Update Table containers for mobile scroll */}
              <div className="overflow-x-auto">
                <Tabs defaultValue="active">
                  <TabsList className="bg-gray-100 w-full flex-wrap gap-2 h-auto p-2">
                    <TabsTrigger 
                      value="active" 
                      className="flex-1 min-w-[120px] data-[state=active]:bg-white data-[state=active]:text-blue-600"
                    >
                      Active
                    </TabsTrigger>
                    <TabsTrigger 
                      value="resolved" 
                      className="flex-1 min-w-[120px] data-[state=active]:bg-white data-[state=active]:text-blue-600"
                    >
                      Resolved
                    </TabsTrigger>
                    <TabsTrigger 
                      value="support" 
                      className="flex-1 min-w-[120px] data-[state=active]:bg-white data-[state=active]:text-blue-600"
                    >
                      Support
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active">
                    <Card className="border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Active Enquiries</CardTitle>
                        <CardDescription className="text-gray-600">
                          Your pending and in-progress enquiries
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Mobile View Cards */}
                        <div className="block lg:hidden space-y-4">
                          {activeEnquiries.map(enquiry => (
                            <Card key={enquiry.id} className="p-4 border border-gray-200">
                              <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-sm">{enquiry.id}</p>
                                    <h4 className="font-semibold mt-1">{enquiry.subject}</h4>
                                  </div>
                                  <Badge 
                                    variant={enquiry.priority === "High" ? "destructive" : "secondary"}
                                    className={enquiry.priority === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}
                                  >
                                    {enquiry.priority}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                    {enquiry.category}
                                  </Badge>
                                  <Badge 
                                    variant={enquiry.status === "In Progress" ? "default" : "secondary"}
                                    className={enquiry.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                                  >
                                    {enquiry.status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                  <span>Created: {enquiry.date}</span>
                                  <span>Updated: {enquiry.lastUpdate}</span>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full mt-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  View Details
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>

                        {/* Desktop View Table */}
                        <div className="hidden lg:block overflow-x-auto -mx-4 sm:mx-0">
                          <div className="min-w-[800px] p-4">
                            <Table>
                              <TableHeader className="bg-gray-50">
                                <TableRow>
                                  <TableHead className="text-gray-600">Enquiry ID</TableHead>
                                  <TableHead className="text-gray-600">Subject</TableHead>
                                  <TableHead className="text-gray-600">Category</TableHead>
                                  <TableHead className="text-gray-600">Date</TableHead>
                                  <TableHead className="text-gray-600">Status</TableHead>
                                  <TableHead className="text-gray-600">Priority</TableHead>
                                  <TableHead className="text-gray-600">Last Update</TableHead>
                                  <TableHead className="text-gray-600">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {activeEnquiries.map(enquiry => (
                                  <TableRow key={enquiry.id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium">{enquiry.id}</TableCell>
                                    <TableCell>{enquiry.subject}</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                        {enquiry.category}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{enquiry.date}</TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant={enquiry.status === "In Progress" ? "default" : "secondary"}
                                        className={enquiry.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                                      >
                                        {enquiry.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant={enquiry.priority === "High" ? "destructive" : "secondary"}
                                        className={enquiry.priority === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}
                                      >
                                        {enquiry.priority}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{enquiry.lastUpdate}</TableCell>
                                    <TableCell className="text-sm whitespace-nowrap">
                                      <Button variant="outline" size="sm" className="text-xs px-2 py-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                                        View Details
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="resolved">
                    <Card className="border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Resolved Enquiries</CardTitle>
                        <CardDescription className="text-gray-600">
                          Your previously resolved enquiries
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Mobile View Cards */}
                        <div className="block lg:hidden space-y-4">
                          {resolvedEnquiries.map(enquiry => (
                            <Card key={enquiry.id} className="p-4 border border-gray-200">
                              <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-sm">{enquiry.id}</p>
                                    <h4 className="font-semibold mt-1">{enquiry.subject}</h4>
                                  </div>
                                  <Badge 
                                    variant={enquiry.satisfaction === "Satisfied" ? "default" : "secondary"}
                                    className={enquiry.satisfaction === "Satisfied" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                                  >
                                    {enquiry.satisfaction}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                    {enquiry.category}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    Resolved
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                  <span>Created: {enquiry.date}</span>
                                  <span>Resolved: {enquiry.resolutionDate}</span>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full mt-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  View Details
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>

                        {/* Desktop View Table */}
                        <div className="hidden lg:block overflow-x-auto -mx-4 sm:mx-0">
                          <div className="min-w-[800px] p-4">
                            <Table>
                              <TableHeader className="bg-gray-50">
                                <TableRow>
                                  <TableHead className="text-gray-600">Enquiry ID</TableHead>
                                  <TableHead className="text-gray-600">Subject</TableHead>
                                  <TableHead className="text-gray-600">Category</TableHead>
                                  <TableHead className="text-gray-600">Date</TableHead>
                                  <TableHead className="text-gray-600">Resolution Date</TableHead>
                                  <TableHead className="text-gray-600">Satisfaction</TableHead>
                                  <TableHead className="text-gray-600">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {resolvedEnquiries.map(enquiry => (
                                  <TableRow key={enquiry.id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium">{enquiry.id}</TableCell>
                                    <TableCell>{enquiry.subject}</TableCell>
                                    <TableCell>
                                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                        {enquiry.category}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{enquiry.date}</TableCell>
                                    <TableCell>{enquiry.resolutionDate}</TableCell>
                                    <TableCell>
                                      <Badge 
                                        variant={enquiry.satisfaction === "Satisfied" ? "default" : "secondary"}
                                        className={enquiry.satisfaction === "Satisfied" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                                      >
                                        {enquiry.satisfaction}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm whitespace-nowrap">
                                      <Button variant="outline" size="sm" className="text-xs px-2 py-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                                        View Details
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="support">
                    <Card className="border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Support Contacts</CardTitle>
                        <CardDescription className="text-gray-600">
                          Contact information for urgent queries
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-2">Academic Support</h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>Email: academics@school.edu</p>
                                <p>Phone: +91 9876543210</p>
                                <p>Hours: Mon-Fri, 9AM-4PM</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 mb-2">Administrative Office</h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>Email: admin@school.edu</p>
                                <p>Phone: +91 9876543211</p>
                                <p>Hours: Mon-Sat, 8AM-5PM</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-2">Fee Department</h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>Email: fees@school.edu</p>
                                <p>Phone: +91 9876543212</p>
                                <p>Hours: Mon-Fri, 10AM-3PM</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 mb-2">Emergency Contact</h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>Phone: +91 9876543219</p>
                                <p>Available 24/7</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}