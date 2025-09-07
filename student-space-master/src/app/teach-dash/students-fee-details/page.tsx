"use client";

import React, { useState } from "react";
import { Bell, Download, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/app/teach-dash/components/Sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";

interface PaymentItem {
  id: string;
  name: string;
  type: string;
  amount: string;
  dueDate: string;
  isPaid: boolean;
}

const StudentsFeeDetailsPage = () => {
  const [activeTab, setActiveTab] = useState<"All" | "Paid" | "Pending">("All");
  const isMobile = useMediaQuery("(max-width: 768px)");

  // All payments are Examination Fee for this example
  const [recentPayments] = useState<PaymentItem[]>([
    {
      id: "1",
      name: "Examination Fee",
      type: "Term 2",
      amount: "Rs. 3,800.00",
      dueDate: "Due 18 Dec' 24",
      isPaid: true,
    },
    {
      id: "2",
      name: "Examination Fee",
      type: "Term 2",
      amount: "Rs. 3,800.00",
      dueDate: "Due 18 Dec' 24",
      isPaid: false,
    },
    {
      id: "3",
      name: "Examination Fee",
      type: "Term 2",
      amount: "Rs. 3,800.00",
      dueDate: "Due 18 Dec' 24",
      isPaid: true,
    },
  ]);

  const [upcomingPayments] = useState<PaymentItem[]>([
    {
      id: "4",
      name: "Examination Fee",
      type: "Term 2",
      amount: "Rs. 3,800.00",
      dueDate: "Due 18 Dec' 24",
      isPaid: false,
    },
    {
      id: "5",
      name: "Examination Fee",
      type: "Term 2",
      amount: "Rs. 3,800.00",
      dueDate: "Due 18 Dec' 24",
      isPaid: false,
    },
    {
      id: "6",
      name: "Examination Fee",
      type: "Term 2",
      amount: "Rs. 3,800.00",
      dueDate: "Due 18 Dec' 24",
      isPaid: false,
    },
  ]);

  const filteredRecentPayments = recentPayments.filter(payment => {
    if (activeTab === "All") return true;
    if (activeTab === "Paid") return payment.isPaid;
    if (activeTab === "Pending") return !payment.isPaid;
    return true;
  });

  const filteredUpcomingPayments = upcomingPayments.filter(payment => {
    if (activeTab === "All") return true;
    if (activeTab === "Paid") return payment.isPaid;
    if (activeTab === "Pending") return !payment.isPaid;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar with proper container */}
      <div className="w-64 bg-gray-100 border-r hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        {isMobile ? (
          <header className="bg-white p-4 flex items-center justify-between border-b">
            <Sidebar />
            <h1 className="text-xl font-bold text-[#1E3A8A] pl-12">Fee Payment Details</h1>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-500" />
              <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </header>
        ) : (
          <header className="bg-white px-6 py-6 flex items-center justify-between border-b">
            <h1 className="text-2xl font-bold text-[#1E3A8A]">Fee Payment Details</h1>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-[#1E3A8A] text-white rounded-md"
              >
                <Download className="h-4 w-4 mr-2" /> Download Report
              </Button>
              <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </header>
        )}

        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Download Button */}
            {isMobile && (
              <div className="flex justify-end mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-[#1E3A8A] text-white rounded-md"
                >
                  <Download className="h-4 w-4 mr-2" /> Download Report
                </Button>
              </div>
            )}

            {/* Recent Payments Section */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1E3A8A] mb-2 md:mb-0">
                  Recent Payments
                </h2>
                <div className="flex space-x-2">
                  <Button
                    variant={activeTab === "All" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("All")}
                    className={activeTab === "All" ? "bg-[#1E3A8A] text-white" : ""}
                  >
                    All
                  </Button>
                  <Button
                    variant={activeTab === "Paid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("Paid")}
                    className={activeTab === "Paid" ? "bg-[#1E3A8A] text-white" : ""}
                  >
                    Paid
                  </Button>
                  <Button
                    variant={activeTab === "Pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("Pending")}
                    className={activeTab === "Pending" ? "bg-[#1E3A8A] text-white" : ""}
                  >
                    Pending
                  </Button>
                </div>
              </div>

              {/* Recent Payments List */}
              <Card className="mb-6">
                <CardContent className="p-0">
                  {filteredRecentPayments.map((payment) => (
                    <div key={payment.id} className="border-b last:border-b-0">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4">
                        <div className="md:col-span-3">
                          <div className={`border-l-4 ${payment.isPaid ? 'border-green-500' : 'border-red-500'} pl-2`}>
                            <p className="font-medium text-[#1E3A8A]">{payment.name}</p>
                            <p className="text-sm text-gray-500">{payment.type}</p>
                          </div>
                        </div>
                        <div className="md:col-span-3 text-left md:text-right">
                          <p className="font-medium">{payment.amount}</p>
                          <p className="text-sm text-gray-500">{payment.dueDate}</p>
                        </div>
                        <div className="md:col-span-6 flex flex-col md:flex-row md:justify-end gap-2">
                          <Button
                            size="sm"
                            className="bg-[#1E3A8A] text-white hover:bg-blue-800"
                          >
                            Check Student Status
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Payments Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-[#1E3A8A]">Upcoming Payments</h2>
              <Card>
                <CardContent className="p-0">
                  {filteredUpcomingPayments.map((payment) => (
                    <div key={payment.id} className="border-b last:border-b-0">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4">
                        <div className="md:col-span-3">
                          <div className={`border-l-4 ${payment.isPaid ? 'border-green-500' : 'border-blue-500'} pl-2`}>
                            <p className="font-medium text-[#1E3A8A]">{payment.name}</p>
                            <p className="text-sm text-gray-500">{payment.type}</p>
                          </div>
                        </div>
                        <div className="md:col-span-3 text-left md:text-right">
                          <p className="font-medium">{payment.amount}</p>
                          <p className="text-sm text-gray-500">{payment.dueDate}</p>
                        </div>
                        <div className="md:col-span-6 flex flex-col md:flex-row md:justify-end gap-2">
                          <Button
                            size="sm"
                            className="bg-[#1E3A8A] text-white hover:bg-blue-800"
                          >
                            Check Student Status
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentsFeeDetailsPage;
