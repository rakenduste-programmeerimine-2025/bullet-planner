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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 text-sm text-gray-600">
        <div className="flex flex-col items-center gap-2">
          <BookOpen className="w-5 h-5 text-black" strokeWidth={1.5} />
          <span>Notes</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ArrowRight className="w-5 h-5 text-black" strokeWidth={1.5} />
          <span>Tasks</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BookOpen className="w-5 h-5 text-black" strokeWidth={1.5} />
          <span>Planner</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ArrowRight className="w-5 h-5 text-black" strokeWidth={1.5} />
          <span>Goals</span>
        </div>
      </div>     
      </div>
      {/* Features Section */}
<div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 w-full">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Everything You Need</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="bg-white p-8 border border-black/20 rounded-sm hover:border-black transition-colors">
        <div className="mb-4 inline-block p-3 bg-black rounded-sm">
          <BookOpen className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold mb-3">Daily Plans</h3>
        <p className="text-gray-600">Create and track your daily tasks and goals with ease.</p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white p-8 border border-black/20 rounded-sm hover:border-black transition-colors">
        <div className="mb-4 inline-block p-3 bg-black rounded-sm">
          <ArrowRight className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold mb-3">Calendar Views</h3>
        <p className="text-gray-600">See your schedule by day, week, or month. Stay on top of everything.</p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white p-8 border border-black/20 rounded-sm hover:border-black transition-colors">
        <div className="mb-4 inline-block p-3 bg-black rounded-sm">
          <BookOpen className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold mb-3">Notes & Entries</h3>
        <p className="text-gray-600">Capture your thoughts, ideas, and personal reflections.</p>
      </div>

      {/* Feature 4 */}
      <div className="bg-white p-8 border border-black/20 rounded-sm hover:border-black transition-colors">
        <div className="mb-4 inline-block p-3 bg-black rounded-sm">
          <ArrowRight className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold mb-3">Visual Organization</h3>
        <p className="text-gray-600">Add images and customize your planner to match your style.</p>
      </div>

      {/* Feature 5 */}
      <div className="bg-white p-8 border border-black/20 rounded-sm hover:border-black transition-colors">
        <div className="mb-4 inline-block p-3 bg-black rounded-sm">
          <BookOpen className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold mb-3">Personal Collections</h3>
        <p className="text-gray-600">Organize your life into custom collections and sections.</p>
      </div>

      {/* Feature 6 */}
      <div className="bg-white p-8 border border-black/20 rounded-sm hover:border-black transition-colors">
        <div className="mb-4 inline-block p-3 bg-black rounded-sm">
          <ArrowRight className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold mb-3">Stay Organized</h3>
        <p className="text-gray-600">Keep your entire life in one place with beautiful simplicity.</p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
