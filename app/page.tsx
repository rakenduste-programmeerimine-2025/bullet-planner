"use client";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center">
     <div className="mb-8 flex justify-center">
        <div className="border-2 border-black rounded-sm p-6 inline-block">
          <BookOpen className="w-12 h-12 text-black" strokeWidth={1.5} />
        </div>
      </div>
     
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Organize Your Life</h1>
        <p className="text-xl text-gray-700">Your digital bullet planner. Keep all your thoughts, plans, and dreams in one elegant place.</p>
      <Link
        href="/login"
        className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-sm font-semibold text-lg hover:bg-gray-900 transition-colors"
      >
        Get Started
        <ArrowRight className="w-5 h-5" strokeWidth={2} />
      </Link>
      
      </div>
    </div>
  );
}
