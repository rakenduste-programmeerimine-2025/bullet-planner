"use client";

import React from "react";

interface WeekViewProps {
  selectedDate: Date;
}

export default function WeekView({ selectedDate }: WeekViewProps) {
  // ---- Nädala algus (esmaspäev) ----
  const startOfWeek = new Date(selectedDate);
  const dayOfWeek = startOfWeek.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // esmaspäev alguseks
  startOfWeek.setDate(startOfWeek.getDate() + diff);

  // ---- Päevade array YYYY-MM-DD ----
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const formatDateEU = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${day}.${month}`;
  };

  // ---- Week title (DD.MM - DD.MM) ----
  const weekTitle = `${formatDateEU(days[0])} - ${formatDateEU(days[6])}`;

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">{weekTitle}</h2>

      <div className="flex border-t border-gray-300 min-w-[900px]">
        {/* Vasak pool tunnid */}
        <div className="w-12 flex flex-col">
          {hours.map((h) => (
            <div
              key={h}
              className="h-10 flex items-center justify-end pr-1 text-xs font-semibold text-gray-600 border-b border-gray-200"
            >
              {h.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* Päevade veerud */}
        {days.map((day) => {
          const dayLabel = new Date(day).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
          });

          return (
            <div key={day} className="flex-1 border-l border-gray-200 relative">
              {/* Päeva nimi */}
              <div className="h-10 flex items-center justify-center border-b border-gray-300 font-bold text-sm bg-gray-50 sticky top-0 z-10">
                {dayLabel}
              </div>

              {/* Tunnid */}
              <div className="relative h-[960px]">
                {hours.map((h) => (
                  <div key={h} className="h-10 border-b border-gray-200"></div>
                ))}

                {/* Siia saab hiljem lisada DayView eventid */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
