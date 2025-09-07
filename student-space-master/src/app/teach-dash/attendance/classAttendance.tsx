"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";

const studentIds = Array(30).fill("RA2211003011606");

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: any;
}> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="font-medium">{payload[0].payload.name}</p>
        <p className="text-[#1E3A8A]">Present: {payload[0].value}%</p>
        <p className="text-[#8da2fb]">Absent: {payload[1].value}%</p>
      </div>
    );
  }
  return null;
};

export default function ClassAttendance() {
  const [period, setPeriod] = useState<"year" | "month" | "week">("month");
  const [attendanceDate, setAttendanceDate] = useState<Date>(new Date());
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [historySelectedDate, setHistorySelectedDate] = useState<Date | null>(null);

  const toggleCheckbox = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearAll = () => setCheckedIds([]);

  const getChartData = () => {
    if (period === "year") {
      return [
        { name: "Jan", Present: 85, Absent: 15 },
        { name: "Feb", Present: 82, Absent: 18 },
        { name: "Mar", Present: 88, Absent: 12 },
        { name: "Apr", Present: 80, Absent: 20 },
        { name: "May", Present: 75, Absent: 25 },
        { name: "Jun", Present: 87, Absent: 13 },
        { name: "Jul", Present: 73, Absent: 27 },
        { name: "Aug", Present: 77, Absent: 23 },
        { name: "Sep", Present: 83, Absent: 17 },
        { name: "Oct", Present: 90, Absent: 10 },
        { name: "Nov", Present: 86, Absent: 14 },
        { name: "Dec", Present: 79, Absent: 21 },
      ];
    } else if (period === "week") {
      return [
        { name: "Mon", Present: 1, Absent: 0 },
        { name: "Tue", Present: 1, Absent: 0 },
        { name: "Wed", Present: 1, Absent: 0 },
        { name: "Thu", Present: 0, Absent: 1 },
        { name: "Fri", Present: 1, Absent: 0 },
      ];
    } else {
      return [
        { name: "Week 1", Present: 20, Absent: 5 },
        { name: "Week 2", Present: 22, Absent: 3 },
        { name: "Week 3", Present: 18, Absent: 7 },
        { name: "Week 4", Present: 25, Absent: 0 },
      ];
    }
  };

  // Summary Data Calculation (working, holidays, half-days)
  const getSummaryData = () => {
    if (period === "year") {
      return {
        working: "240",
        holidays: "50",
        halfDay: "10",
      };
    } else if (period === "week") {
      return {
        working: "5",
        holidays: "0",
        halfDay: "0",
      };
    } else {
      return {
        working: "20",
        holidays: "8",
        halfDay: "0",
      };
    }
  };

  const summary = getSummaryData();

  // Helpers for monthly calendar view
  const monthLabel = useMemo(() => {
    return calendarMonth.toLocaleString("default", { month: "long", year: "numeric" });
  }, [calendarMonth]);

  const startOfMonth = useMemo(() => new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1), [calendarMonth]);
  const endOfMonth = useMemo(() => new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0), [calendarMonth]);
  const daysInMonth = endOfMonth.getDate();
  const leadingEmpty = (startOfMonth.getDay() + 6) % 7; // make Monday=0
  const today = new Date();

  const isEditable = (d: Date) => {
    const diffMs = today.setHours(0,0,0,0) - new Date(d.getFullYear(), d.getMonth(), d.getDate()).setHours(0,0,0,0);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0; // current day and previous 2 days
  };

  // Format date as dd/mm/yy
  const formatDDMMYY = (d: Date) =>
    new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(d);

  // Fake attendance data generator for the month (deterministic per date)
  const getAttendanceForDate = (d: Date) => {
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    const statuses = studentIds.map((id, idx) => {
      // deterministic pseudo-random present/absent
      const hash = (seed + idx * 17) % 100;
      const present = hash % 9 !== 0; // ~89% present
      return { id: id + idx, present };
    });
    const presentCount = statuses.filter(s => s.present).length;
    return { statuses, presentCount, absentCount: statuses.length - presentCount };
  };

  const monthDays = useMemo(() => {
    const days: Date[] = [];
    const isCurrentMonth = calendarMonth.getFullYear() === new Date().getFullYear() && calendarMonth.getMonth() === new Date().getMonth();
    const lastDay = isCurrentMonth ? new Date().getDate() : daysInMonth;
    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), i));
    }
    return days.reverse(); // latest first
  }, [calendarMonth, daysInMonth]);

  return (
    <>
      {/* Year/Month buttons with consistent styling */}
      <div className="flex gap-2 mb-4">
        {["year", "month"].map((p) => (
          <Button
            key={p}
            variant={period === p ? "default" : "outline"}
            size="sm"
            className={`text-xs sm:text-sm px-3 ${
              period === p
                ? "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90"
                : "text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A]/10"
            }`}
            onClick={() => setPeriod(p as any)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </Button>
        ))}
      </div>

      {/* Summary Cards with consistent styling */}
      <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
        {[
          { label: "No. of days working", value: summary.working },
          { label: "No. of days holidays", value: summary.holidays },
          { label: "No. of days half-day", value: summary.halfDay },
        ].map(({ label, value }) => (
          <Card
            key={label}
            className="flex-1 min-w-[140px] sm:min-w-[160px] p-3 sm:p-4 text-center bg-[#F8FAFC] border-[#E2E8F0]"
          >
            <div className="text-xs text-gray-600">{label}</div>
            <div className="text-xl sm:text-2xl font-bold text-[#1E3A8A]">
              {value}
            </div>
          </Card>
        ))}
      </div>

      {/* Period selector buttons with consistent styling */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {["year", "month", "week"].map((p) => (
          <Button
            key={p}
            variant={period === p ? "default" : "outline"}
            size="sm"
            className={`text-xs sm:text-sm px-3 ${
              period === p
                ? "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90"
                : "text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A]/10"
            }`}
            onClick={() => setPeriod(p as any)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </Button>
        ))}
      </div>

      {/* Chart with consistent styling */}
      <div className="h-[300px] w-full bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getChartData()}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: 10 }} />
            <Bar dataKey="Present" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Absent" fill="#8DA2FB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6" />

      {/* Update Attendance Section - new layout */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-base text-[#1E3A8A]">Update Attendance</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10 h-8 w-8"
              onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium min-w-[140px] text-center">{monthLabel}</div>
            <Button
              variant="outline"
              size="icon"
              className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10 h-8 w-8"
              onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="mt-3 border border-[#E2E8F0] rounded-lg p-3 bg-[#F8FAFC]">
          <div className="grid grid-cols-7 text-[11px] text-gray-500 mb-2">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <div key={d} className="text-center">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: leadingEmpty }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), i + 1);
              const editable = isEditable(d);
              const selected = attendanceDate && d.toDateString() === new Date(attendanceDate).toDateString();
              return (
                <button
                  key={`d-${i}`}
                  onClick={() => editable && setAttendanceDate(d)}
                  className={`h-9 rounded-md text-sm border transition-colors ${
                    selected ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : 'bg-white border-[#E2E8F0]'
                  } ${editable ? 'hover:bg-[#1E3A8A]/10' : 'opacity-60 cursor-not-allowed'}`}
                  title={editable ? 'Editable' : 'Locked (older than 2 days)'}
                >
                  <span className="inline-flex items-center gap-1">
                    {i + 1}
                    {!editable && <Lock className="h-3 w-3" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Student List - edit lock note */}
      <div className="border border-[#E2E8F0] rounded-lg p-3 sm:p-4 max-h-[250px] sm:max-h-[300px] overflow-auto mb-4 sm:mb-6 bg-[#F8FAFC]">
        <div className="text-xs text-gray-500 mb-2">
          You can edit attendance for today and the previous 2 days. Older dates are locked.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
          {studentIds.map((id, idx) => {
            const key = id + idx;
            return (
              <label
                key={key}
                className="flex items-center gap-2 text-[#1E3A8A] text-xs hover:bg-[#F1F5F9] p-2 rounded-md transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checkedIds.includes(key)}
                  onChange={() => toggleCheckbox(key)}
                  className="accent-[#1E3A8A] h-4 w-4"
                />
                {id}
              </label>
            );
          })}
        </div>
      </div>

      {/* Action Buttons (disabled when selected date is locked) */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={clearAll}
          className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#1E3A8A]/10"
        >
          Clear All
        </Button>
        <Button
          className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
          disabled={!isEditable(new Date(attendanceDate))}
          title={isEditable(new Date(attendanceDate)) ? 'Update attendance' : 'Only current day + previous 2 days are editable'}
        >
          Update Attendance
        </Button>
      </div>

      {/* Previous Days Attendance */}
      <div className="mt-6">
        <h3 className="font-semibold text-base text-[#1E3A8A] mb-3">Previous Days Attendance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Days list */}
          <div className="border border-[#E2E8F0] rounded-lg p-3 bg-[#F8FAFC] max-h-[260px] overflow-auto">
            {monthDays.length === 0 && (
              <div className="text-xs text-gray-500">No days to show.</div>
            )}
            <div className="space-y-2">
              {monthDays.map((d) => {
                const { presentCount, absentCount } = getAttendanceForDate(d);
                const selected = historySelectedDate && d.toDateString() === historySelectedDate.toDateString();
                return (
                  <button
                    key={d.toDateString()}
                    className={`w-full flex items-center justify-between rounded-md border px-3 py-2 text-left transition-colors ${
                      selected ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : 'bg-white border-[#E2E8F0] hover:bg-[#F1F5F9]'
                    }`}
                    onClick={() => setHistorySelectedDate(d)}
                  >
                    <span className="text-sm">{formatDDMMYY(d)}</span>
                    <span className="text-xs">
                      <span className="mr-3">Present: <b>{presentCount}</b></span>
                      <span>Absent: <b>{absentCount}</b></span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected day student statuses */}
          <div className="border border-[#E2E8F0] rounded-lg p-3 bg-[#F8FAFC] max-h-[260px] overflow-auto">
            {!historySelectedDate ? (
              <div className="text-xs text-gray-500">Select a day to view per-student attendance.</div>
            ) : (
              <>
                {(() => {
                  const { statuses } = getAttendanceForDate(historySelectedDate);
                  return (
                    <div className="space-y-1">
                      {statuses.map((s) => (
                        <div key={s.id} className="flex items-center justify-between bg-white rounded-md border border-[#E2E8F0] px-3 py-1">
                          <span className="text-xs text-[#1E3A8A]">{s.id}</span>
                          <span className={`text-[11px] px-2 py-0.5 rounded-full ${s.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {s.present ? 'Present' : 'Absent'}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
