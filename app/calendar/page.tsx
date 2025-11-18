"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/ui/DashboardHeader";
import DashboardSidebar from "@/components/ui/DashboardSidebar";
import { supabase } from "@/lib/supabase/supabaseClient";

import DayView from "@/components/ui/DayView";
import WeekView from "@/components/ui/WeekView";
import MonthView from "@/components/ui/MonthView";

type ViewMode = "day" | "week" | "month";

export default function CalendarPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return router.push("/");
      setUserEmail(data.session.user.email);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handlePrev = () => {
    const d = new Date(selectedDate);
    if (viewMode === "month") d.setMonth(d.getMonth() - 1);
    if (viewMode === "week") d.setDate(d.getDate() - 7);
    if (viewMode === "day") d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  };

  const handleNext = () => {
    const d = new Date(selectedDate);
    if (viewMode === "month") d.setMonth(d.getMonth() + 1);
    if (viewMode === "week") d.setDate(d.getDate() + 7);
    if (viewMode === "day") d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <DashboardHeader title="Calendar" userEmail={userEmail!} />

      <div className="flex flex-1">
        <DashboardSidebar active="calendar" />

        <main className="flex-1 p-6">
          <div className="flex gap-2 mb-4">
            <button onClick={() => setViewMode("day")}>Day</button>
            <button onClick={() => setViewMode("week")}>Week</button>
            <button onClick={() => setViewMode("month")}>Month</button>

            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>
          </div>

          {viewMode === "day" && <DayView selectedDate={selectedDate} />}
          {viewMode === "week" && <WeekView selectedDate={selectedDate} />}
          {viewMode === "month" && <MonthView selectedDate={selectedDate} />}
        </main>
      </div>
    </div>
  );
}
