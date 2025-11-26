"use client";

import { Trash2, Clock } from "lucide-react";

export interface CalendarEntryProps {
  id: string;
  title: string;
  content?: string;
  startTime: string;
  endTime: string;
  onDelete: (id: string) => void;
}

export default function CalendarEntry({ id, title, content, startTime, endTime, onDelete }: CalendarEntryProps) {
  return (
    <div className="absolute left-12 right-0 rounded-sm bg-purple-100 p-2 border-t-2 border-black"
         style={{ top: 0, height: 50 }}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-1 text-sm font-medium text-purple-700">
            <Clock className="w-4 h-4" strokeWidth={2} />
            {startTime} - {endTime}
          </div>
          <h3 className="font-semibold">{title}</h3>
          {content && <p className="text-gray-700 text-sm">{content}</p>}
        </div>
        <button
          onClick={() => onDelete(id)}
          className="p-1 hover:bg-red-100 rounded-sm text-red-600"
        >
          <Trash2 className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
