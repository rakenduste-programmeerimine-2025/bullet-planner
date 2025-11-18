"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/ui/DashboardHeader";
import DashboardSidebar from "@/components/ui/DashboardSidebar";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/"); 
      } else {
        setUserEmail(data.session.user.email);
      }
      setLoading(false);
    };

    fetchSession();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <DashboardHeader userEmail={userEmail} />

      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold">
            Welcome, {userEmail ? userEmail : "User"}!
          </h1>
          <p className="mt-2 text-gray-600">Your dashboard content goes here.</p>
        </main>
      </div>
    </div>
  );
}
