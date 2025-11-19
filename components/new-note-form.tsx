'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createNote } from '@/app/notes/action';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase/supabaseClient';
import DashboardHeader from './ui/DashboardHeader';
import DashboardSidebar from './ui/DashboardSidebar';

export default function NewNoteForm() {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/');
      } else {
        setUserEmail(data.session.user.email);
      }
    };

    fetchSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote(title, note);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <DashboardHeader userEmail={userEmail} />

      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="border-b border-black/10 p-4 sm:p-6">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 text-black hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              <span className="text-sm font-medium">Back</span>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full max-w-md">
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <div className="border-2 border-black rounded-sm p-4 inline-block">
                  <FileText className="w-8 h-8 text-black" strokeWidth={1.5} />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-center mb-2">New Note</h1>
              <p className="text-center text-gray-600 mb-8">
                Create a new note
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-black/20 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                />
                <textarea
                  placeholder="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-black/20 rounded-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-sm font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
