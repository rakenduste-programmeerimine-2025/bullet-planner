"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import CalendarEntry from "./CalendarEntry";

interface CalendarEntryType {
  id: string;
  title: string;
  content?: string;
  date: string;      // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
}

interface WeekViewProps {
  selectedDate: Date;
}

export default function WeekView({ selectedDate }: WeekViewProps) {
  const startOfWeek = new Date(selectedDate);
  const dayOfWeek = startOfWeek.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; 
  startOfWeek.setDate(startOfWeek.getDate() + diff);

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
  });

  const [entries, setEntries] = useState<CalendarEntryType[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<CalendarEntryType>>({});

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const parseTime = (time: string) => {
    const [hStr, mStr] = time.split(":");
    return { h: parseInt(hStr), m: parseInt(mStr) };
  };

  const getTop = (time: string) => {
    const { h, m } = parseTime(time);
    return (h + m / 60) * 40; 
  };

  // --- Lae nädala sündmused ---
  const fetchEntries = async () => {
    const { data } = await supabase
      .from("calendar_entries")
      .select("*")
      .gte("date", days[0])
      .lte("date", days[6])
      .order("start_time", { ascending: true });
    if (data) {
      setEntries(data.map(d => ({
        id: d.id.toString(),
        title: d.title,
        content: d.content,
        date: d.date,
        startTime: d.start_time,
        endTime: d.end_time
      })));
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [selectedDate]);

  const handleAdd = async () => {
    if (!newEntry.title || !newEntry.startTime || !newEntry.endTime || !newEntry.date) return;

    const { data } = await supabase
      .from("calendar_entries")
      .insert([{
        title: newEntry.title,
        content: newEntry.content || "",
        date: newEntry.date,
        start_time: newEntry.startTime,
        end_time: newEntry.endTime
      }])
      .select("*");

    if (data?.[0]) {
      // uuendame state’i, et näha kohe WeekView
      setEntries([...entries, {
        id: data[0].id.toString(),
        title: data[0].title,
        content: data[0].content,
        date: data[0].date,
        startTime: data[0].start_time,
        endTime: data[0].end_time
      }]);
      setFormVisible(false);
      setNewEntry({});
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("calendar_entries").delete().eq("id", id);
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">
        {new Date(days[0]).toLocaleDateString('en-GB',{day:'2-digit',month:'2-digit'})} - {new Date(days[6]).toLocaleDateString('en-GB',{day:'2-digit',month:'2-digit'})}
      </h2>

      <div className="flex border-t border-gray-300 min-w-[900px] relative">
        <div className="w-12 flex flex-col">
          {hours.map(h => <div key={h} className="h-10 flex items-center justify-end pr-1 text-xs font-semibold text-gray-600 border-b border-gray-200">{h.toString().padStart(2,'0')}:00</div>)}
        </div>

        {days.map(day => (
          <div key={day} className="flex-1 border-l border-gray-200 relative">
            <div className="h-10 flex items-center justify-center border-b border-gray-300 font-bold text-sm bg-gray-50 sticky top-0 z-10">
              {new Date(day).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})}
            </div>

            <div className="relative h-[960px]">
              {hours.map(h => <div key={h} className="h-10 border-b border-gray-200"></div>)}

              {entries.filter(e => e.date === day).map(e => {
                const top = getTop(e.startTime);
                const height = Math.max(getTop(e.endTime) - top, 28);
                return (
                  <div key={e.id} className="absolute left-0 right-0" style={{top,height}}>
                    <CalendarEntry {...e} onDelete={()=>handleDelete(e.id)} />
                  </div>
                )
              })}

              {/* Add entry form */}
              {formVisible && newEntry.date === day && (
                <div className="absolute left-4 w-[300px] p-4 bg-gray-50 border-2 border-black rounded-sm shadow-md"
                     style={{ top: getTop(newEntry.startTime || '08:00') }}>
                  <input
                    placeholder="Title"
                    value={newEntry.title || ""}
                    onChange={e => setNewEntry({ ...newEntry, title: e.target.value })}
                    className="w-full mb-2 px-3 py-2 border border-gray-400 rounded-sm"
                  />
                  <textarea
                    placeholder="Content"
                    value={newEntry.content || ""}
                    onChange={e => setNewEntry({ ...newEntry, content: e.target.value })}
                    className="w-full mb-2 px-3 py-2 border border-gray-400 rounded-sm resize-none"
                  />
                  <div className="flex gap-2 mb-2">
                    <input
                      type="time"
                      value={newEntry.startTime || "08:00"}
                      onChange={e => setNewEntry({ ...newEntry, startTime: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-sm"
                    />
                    <input
                      type="time"
                      value={newEntry.endTime || "09:00"}
                      onChange={e => setNewEntry({ ...newEntry, endTime: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleAdd} className="flex-1 bg-black text-white py-2 rounded-sm font-semibold">Add</button>
                    <button onClick={()=>setFormVisible(false)} className="flex-1 border border-black py-2 rounded-sm">Cancel</button>
                  </div>
                </div>
              )}

              {/* Click to open add-entry */}
              {!formVisible && (
                <div className="absolute left-0 right-0 top-0 h-full w-full cursor-pointer"
                     onClick={()=>{setFormVisible(true); setNewEntry({date: day,startTime:'08:00',endTime:'09:00'});}} />
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
