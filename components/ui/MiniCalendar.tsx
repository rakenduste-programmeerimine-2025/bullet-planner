'use client';

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MiniCalendarProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function MiniCalendar({ currentDate, onSelectDate }: MiniCalendarProps) {
  const [monthDate, setMonthDate] = useState(new Date(currentDate));

  useEffect(() => {
    setMonthDate(new Date(currentDate));
  }, [currentDate]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const firstDayOfMonth = (date: Date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), 1);
    return (d.getDay() + 6) % 7; // esmaspäev = 0
  };

  const handlePrevMonth = () => {
    const newDate = new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1);
    setMonthDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);
    setMonthDate(newDate);
  };

  const renderDays = () => {
    const totalDays = daysInMonth(monthDate);
    const firstDay = firstDayOfMonth(monthDate);
    const daysArray: (Date | null)[] = Array(firstDay).fill(null);

    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), i));
    }

    return daysArray.map((day, idx) => {
      if (!day) return <div key={idx} className="p-1"></div>;

      const isToday =
        day.getFullYear() === today.getFullYear() &&
        day.getMonth() === today.getMonth() &&
        day.getDate() === today.getDate();

      return (
        <button
          key={idx}
          onClick={() => onSelectDate(day)}
          className={`text-center text-xs p-1 rounded-sm min-h-[24px] flex items-center justify-center ${
            isToday ? "bg-black text-white font-bold" : "bg-white text-gray-800"
          } hover:bg-gray-200`}
        >
          {day.getDate()}
        </button>
      );
    });
  };

  return (
    <div className="border p-3 rounded-sm w-full max-w-[220px] bg-white">
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth} className="p-1">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold">
          {monthDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button onClick={handleNextMonth} className="p-1">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-gray-600 mb-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">{renderDays()}</div>
    </div>
  );
}
