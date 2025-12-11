"use client";

import React, { useState, useEffect } from "react";
import DayView, { CalendarEntryType } from "./DayView"; // DayView peab olemas olema

interface MonthViewProps {
  selectedDate: Date; // mingi kuu, näiteks 2025-12-01
}

interface StoredEntry {
  id: string;
  title: string;
  content?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
}

export default function MonthView({ selectedDate }: MonthViewProps) {
  const [entries, setEntries] = useState<StoredEntry[]>([]);
  const [activeDay, setActiveDay] = useState<Date | null>(null);

  // Load saved entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("entries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Arvuta kuu päevade arv ja kuu alguse nädalapäev
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const days: (Date | null)[] = [];

  // Täida tühjad päevad kuu alguses
  for (let i = 0; i < firstDayIndex; i++) days.push(null);

  // Lisa kõik päevad
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
  }

  // Kui on aktiivne päev, näita DayView komponenti
  if (activeDay) {
    return (
      <div>
        <button
          onClick={() => setActiveDay(null)}
          className="mb-4 px-3 py-1 border rounded"
        >
          Back to Month
        </button>
        <DayView selectedDate={activeDay.toISOString().slice(0, 10)} />
      </div>
    );
  }

  // Kuu vaade
  return (
    <div>
      {/* Nädalapäevad */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-semibold text-sm p-2 text-gray-600">
            {d}
          </div>
        ))}
      </div>

      {/* Kuu päevad */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) =>
          day ? (
            <button
              key={idx}
              onClick={() => setActiveDay(day)}
              className="border rounded min-h-[80px] p-2 text-left hover:bg-gray-100 transition-colors"
            >
              <p className="font-semibold text-sm mb-1">{day.getDate()}</p>
              <div className="space-y-1 text-xs">
                {entries
                  .filter((e) => e.date === day.toISOString().slice(0, 10))
                  .slice(0, 2)
                  .map((e) => (
                    <div
                      key={e.id}
                      className="bg-purple-100 text-purple-800 rounded p-1 truncate"
                    >
                      {e.title}
                    </div>
                  ))}
                {entries.filter((e) => e.date === day.toISOString().slice(0, 10)).length > 2 && (
                  <p className="text-gray-500 text-xs">+ more</p>
                )}
              </div>
            </button>
          ) : (
            <div key={idx} className="min-h-[80px]"></div>
          )
        )}
      </div>
    </div>
  );
}
