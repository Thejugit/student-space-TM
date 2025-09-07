import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const announcements = [
  {
    title: "42nd ANNUAL DAY INVITATION",
    date: "14 Nov' 2024",
    content:
      "Dear Parents, We cordially invite you to join us for our 42nd Annual Day Celebrations on Friday, 15th November 2024 in Kamarajar Arangam, Teynampet, Chennai at 3:00 PM.",
    footer: "Regards Principal",
  },
 /* {
    title: "Parent-Teacher Meeting",
    date: "10 Dec' 2024",
    content:
      "Dear Parents, You are invited to attend the Parent-Teacher Meeting on Saturday, 12th December 2024 in the school auditorium from 10:00 AM to 1:00 PM.",
    footer: "Regards Principal",
  }, */
  {
    title: "Sports Day Announcement",
    date: "20 Jan' 2025",
    content:
      "Dear Parents, We are pleased to announce that our Annual Sports Day will be held on Friday, 22nd January 2025 at the school ground. Join us for an exciting day of events.",
    footer: "Regards Principal",
  },
];

const Announcement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
  // };

  // const handlePrev = () => {
  //   setCurrentIndex(
  //     (prevIndex) => (prevIndex - 1 + announcements.length) % announcements.length
  //   );
  // };

  return (
    <Card className="bg-[#1E3A8A] text-white rounded-lg overflow-hidden mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{announcements[currentIndex].title}</h3>
          <span className="text-lg">{announcements[currentIndex].date}</span>
        </div>
        <p className="mb-4">{announcements[currentIndex].content}</p>
        <p className="mb-6">{announcements[currentIndex].footer}</p>
        <div className="flex justify-center">
          <div className="flex gap-1">
            {announcements.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Announcement;
