'use client';

import { useState } from "react";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface EmailChangeProps {
  userEmail: string | null;
  setUserEmail: (email: string) => void;
  setMessage: (msg: string) => void;
  setError: (err: string) => void;
}

export default function EmailChange({ userEmail, setUserEmail, setMessage, setError }: EmailChangeProps) {
  const supabase = createClient();
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(userEmail || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newEmail.trim()) return setError("Email cannot be empty");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) return setError("Please enter a valid email");
    if (newEmail === userEmail) return setError("New email must be different");

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      setUserEmail(newEmail);
      setMessage("Email updated successfully!");
      setIsChangingEmail(false);
    } catch (err: any) {
      setError(err.message || "Error updating email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-black/10 rounded-sm p-6">
      <div className="flex items-center gap-3 mb-4"><Mail className="w-5 h-5" /><h2 className="text-xl font-semibold">Email Address</h2></div>
      {!isChangingEmail ? (
        <div>
          <p className="text-gray-600 mb-4">{userEmail}</p>
          <button onClick={() => setIsChangingEmail(true)} className="bg-black text-white px-4 py-2 rounded-sm font-semibold hover:bg-gray-900 transition-colors text-sm">Change Email</button>
        </div>
      ) : (
        <form onSubmit={handleChangeEmail} className="space-y-4">
          <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="newemail@example.com" className="w-full px-4 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black" required />
          <div className="flex gap-3">
            <button type="submit" disabled={isLoading} className="flex-1 bg-black text-white py-2 rounded-sm font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? "Updating..." : "Update Email"}</button>
            <button type="button" onClick={() => { setIsChangingEmail(false); setNewEmail(userEmail || ""); setError(""); }} className="flex-1 bg-white border-2 border-black text-black py-2 rounded-sm font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
