"use client";

import React, { useState, useEffect } from "react";
import { Bell, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/app/student-dash/components/Sidebar";
import Side1 from "@/app/student-dash/components/Side1";

interface PaymentItem {
  id: string;
  name: string;
  type: string;
  amount: string;
  dueDate: string;
  isPaid: boolean;
}

const FeePaymentPage = () => {
  const [activeTab, setActiveTab] = useState<"All" | "Paid" | "Pending">("All");
  const [, setAllPayments] = useState<PaymentItem[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  
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
  
  const [recentPayments, setRecentPayments] = useState<PaymentItem[]>([
    {
      id: "1",
      name: "School Fee",
      type: "Term 2",
      amount: "Rs. 36,800.00",
      dueDate: "Due 18 Nov' 24",
      isPaid: true,
    },
    {
      id: "2",
      name: "Commerce APC...",
      type: "One Time",
      amount: "Rs. 250.00",
      dueDate: "Due 18 Nov' 24",
      isPaid: false,
    },
    {
      id: "3",
      name: "Book Fee",
      type: "One Time",
      amount: "Rs. 250.00",
      dueDate: "Due 18 Nov' 24",
      isPaid: true,
    },
  ]);

  const [upcomingPayments, setUpcomingPayments] = useState<PaymentItem[]>([
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

  // Combine all payments for filtering
  useEffect(() => {
    setAllPayments([...recentPayments, ...upcomingPayments]);
  }, [recentPayments, upcomingPayments]);

  const handlePaymentStatusChange = (id: string, isRecent: boolean = true, e?: React.MouseEvent) => {
    // Prevent default behavior to avoid page scrolling
    if (e) e.preventDefault();
    
    if (isRecent) {
      setRecentPayments(
        recentPayments.map((payment) =>
          payment.id === id ? { ...payment, isPaid: !payment.isPaid } : payment
        )
      );
    } else {
      setUpcomingPayments(
        upcomingPayments.map((payment) =>
          payment.id === id ? { ...payment, isPaid: !payment.isPaid } : payment
        )
      );
    }
  };

  // Filter payments based on active tab
  // const getFilteredPayments = () => {
  //   const payments = [...recentPayments, ...upcomingPayments];
    
  //   if (activeTab === "All") return payments;
  //   if (activeTab === "Paid") return payments.filter(payment => payment.isPaid);
  //   if (activeTab === "Pending") return payments.filter(payment => !payment.isPaid);
    
  //   return payments;
  // };

  // const filteredPayments = getFilteredPayments();
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

  const handlePayFee = (id: string, isRecent: boolean = true) => {
    if (isRecent) {
      setRecentPayments(
        recentPayments.map((payment) =>
          payment.id === id ? { ...payment, isPaid: true } : payment
        )
      );
    } else {
      setUpcomingPayments(
        upcomingPayments.map((payment) =>
          payment.id === id ? { ...payment, isPaid: true } : payment
        )
      );
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - only show on desktop */}
      {screenWidth > 768 ? <Sidebar /> : null}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-2">
        <div className="min-h-screen bg-gray-50">
          {/* Header for Desktop */}
          {screenWidth > 768 ? (
            <header className="flex items-center justify-between bg-white p-6 border-b">
              <h1 className="text-2xl font-bold text-[#1E3A8A]">Fee Payment Details</h1>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-[#1E3A8A] text-white rounded-md"
                >
                  <Download className="h-4 w-4 mr-1" /> Download Report
                </Button>
                <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
                <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                  <img src="/mock-profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </header>
          ) : (
            /* Header for Mobile */
            <header className="flex items-center justify-between bg-white p-4 border-b">
              {/* Left side with hamburger menu */}
              <Side1 />
              
              {/* Centered title */}
              <h1 className="text-xl font-bold text-[#1E3A8A] mx-auto">Fee Payment Details</h1>
              
              {/* Right side icons */}
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-500 cursor-pointer" />
                <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
                  <img src="/mock-profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </header>
          )}

          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Payments</h2>
              {screenWidth <= 768 && (
                <div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-[#1E3A8A] text-white rounded-md"
                  >
                    <Download className="h-4 w-4 mr-1" /> {screenWidth > 480 ? 'Download Report' : 'Download'}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex space-x-2 mb-4">
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

            {filteredRecentPayments.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-0">
                  {filteredRecentPayments.map((payment) => (
                    <div key={payment.id} className="border-b last:border-b-0">
                      <div className="grid grid-cols-12 items-center py-4 px-4">
                        <div className="col-span-12 md:col-span-3 flex items-start">
                          <div className={`border-l-4 ${payment.isPaid ? 'border-green-500' : 'border-red-500'} pl-2`}>
                            <p className="font-medium">{payment.name}</p>
                            <p className="text-sm text-gray-500">{payment.type}</p>
                          </div>
                        </div>
                        <div className="col-span-6 md:col-span-2 mt-2 md:mt-0 md:text-right">
                          <p className="font-medium">{payment.amount}</p>
                          <p className="text-sm text-gray-500">{payment.dueDate}</p>
                        </div>
                        <div className="col-span-6 md:col-span-3 mt-2 md:mt-0 flex items-center justify-end md:justify-center">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={payment.isPaid}
                              onChange={() => handlePaymentStatusChange(payment.id, true)}
                              className="h-4 w-4"
                            />
                            <span>{payment.isPaid ? "Payment Received" : "Payment Pending"}</span>
                          </div>
                        </div>
                        <div className="col-span-12 md:col-span-4 mt-3 md:mt-0 flex justify-start md:justify-end gap-2">
                        <Button size="sm" variant="outline" className={`${payment.isPaid ? 'bg-[#1E3A8A] text-white hover:bg-white hover:text-[#1E3A8A]' : 'bg-gray-700 text-white hover:bg-gray-700 hover:text-white '}`}>
                                Download Invoice
                                </Button>
                          {!payment.isPaid && (
                            <Button 
                              size="sm" 
                              className="bg-[#1E3A8A] text-white hover:bg-blue-800"
                              onClick={() => handlePayFee(payment.id, true)}
                            >
                              Pay Fee
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {filteredUpcomingPayments.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mb-4">Upcoming Payments</h2>
                <Card>
                  <CardContent className="p-0">
                    {filteredUpcomingPayments.map((payment) => (
                      <div key={payment.id} className="border-b last:border-b-0">
                        <div className="grid grid-cols-12 items-center py-4 px-4">
                          <div className="col-span-12 md:col-span-3 flex items-start">
                            <div className={`border-l-4 ${payment.isPaid ? 'border-green-500' : 'border-blue-500'} pl-2`}>
                              <p className="font-medium">{payment.name}</p>
                              <p className="text-sm text-gray-500">{payment.type}</p>
                            </div>
                          </div>
                          <div className="col-span-6 md:col-span-2 mt-2 md:mt-0 md:text-right">
                            <p className="font-medium">{payment.amount}</p>
                            <p className="text-sm text-gray-500">{payment.dueDate}</p>
                          </div>
                          <div className="col-span-6 md:col-span-3 mt-2 md:mt-0 flex items-center justify-end md:justify-center">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={payment.isPaid}
                                onChange={() => handlePaymentStatusChange(payment.id, false)}
                                className="h-4 w-4"
                              />
                              <span>{payment.isPaid ? "Payment Received" : "Payment Pending"}</span>
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-4 mt-3 md:mt-0 flex justify-start md:justify-end gap-2">
                          <Button size="sm" variant="outline" className={`${payment.isPaid ? 'bg-[#1E3A8A] text-white hover:bg-white hover:text-[#1E3A8A]' : 'bg-gray-700 text-white hover:bg-gray-700 hover:text-white'}`}>
                                Download Invoice
                                </Button>


                            {!payment.isPaid && (
                              <Button 
                                size="sm" 
                                className="bg-[#1E3A8A] text-white hover:bg-blue-800"
                                onClick={() => handlePayFee(payment.id, false)}
                              >
                                Pay Fee
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}

            {filteredRecentPayments.length === 0 && filteredUpcomingPayments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No payments found for the selected filter.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeePaymentPage;
