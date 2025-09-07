"use client";

import React from 'react';
import Image from 'next/image';

const FocusMode = () => {
  return (
    <div className="bg-[#1A2234] rounded-lg overflow-hidden text-white relative h-40 md:h-full">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/focus-bg.gif" 
          alt="Focus Background" 
          fill 
          style={{ objectFit: "cover", opacity: 0.7 }}
          priority
        />
      </div>
      
      {/* Mobile version */}
      <div className="md:hidden p-2 flex flex-col items-center justify-center h-full relative z-10">
        <h3 className="text-sm font-bold">Focus Mode</h3>
        <p className="text-xs">Pomodoro Timer</p>
      </div>
      
      {/* Desktop version */}
      <div className="hidden md:flex p-6 flex-col items-center justify-center h-full relative z-10">
        <h3 className="text-2xl font-bold mb-2">Focus Mode</h3>
        <p className="mb-6">Pomodoro Timer</p>
      </div>
    </div>
  );
};

export default FocusMode;
