'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Mail, Lock, Trash2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import NewHeader from "@/components/new-header";
import DashboardSidebar from "@/components/ui/DashboardSidebar";
import ProfileCard from "@/components/ui/profile/ProfileCard";

interface UserProfile {
  name: string;
  bio: string;
  avatar?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>({ name: "", bio: "", avatar: "" });
  const [editingProfile, setEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Email state
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  // Password state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Delete account state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }

      setUserEmail(data.user.email);
      setNewEmail(data.user.email);

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileData) {
        setProfile({
          name: profileData.name || "",
          bio: profileData.bio || "",
          avatar: profileData.avatar || ""
        });
        setEditName(profileData.name || "");
        setEditBio(profileData.bio || "");
        setEditAvatar(profileData.avatar || "");
      }
    };
    fetchUser();
  }, [router, supabase]);

  // Save profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!editName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: (await supabase.auth.getUser()).data.user?.id,
          name: editName,
          bio: editBio,
          avatar: editAvatar
        });
      if (error) throw error;

      setProfile({ name: editName, bio: editBio, avatar: editAvatar });
      setMessage("Profile updated successfully!");
      setEditingProfile(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setError(err.message || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Email change
  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newEmail.trim()) {
      setError("Email cannot be empty");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError("Please enter a valid email");
      return;
    }

    if (newEmail === userEmail) {
      setError("New email must be different from current email");
      return;
    }

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

  // Password change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!currentPassword.trim()) {
      setError("Please enter your current password");
      return;
    }

    if (!newPassword.trim()) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      setMessage("Password updated successfully!");
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Error updating password");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (deleteConfirmText !== "DELETE") {
      setError('Please type "DELETE" to confirm account deletion');
      return;
    }

    setIsLoading(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        await supabase.auth.admin.deleteUser(user.id);
      }

      setTimeout(() => router.push("/"), 500);
    } catch (err: any) {
      setError(err.message || "Error deleting account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <NewHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          {message && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm text-green-700">{message}</div>}
          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 flex gap-3"><AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />{error}</div>}

          <div className="max-w-2xl mx-auto space-y-8">
            {/* Profile card using ProfileCard component */}
            {!editingProfile ? (
              <ProfileCard
                name={profile.name}
                bio={profile.bio}
                avatar={profile.avatar}
                onEdit={() => setEditingProfile(true)}
              />
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4 border-2 border-black rounded-sm p-8">
                <input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" className="w-full border p-2 rounded-sm" />
                <textarea value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder="Bio" className="w-full border p-2 rounded-sm" />
                <input value={editAvatar} onChange={(e) => setEditAvatar(e.target.value)} placeholder="Avatar URL" className="w-full border p-2 rounded-sm" />
                <div className="flex gap-2">
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded-sm">Save</button>
                  <button type="button" onClick={() => setEditingProfile(false)} className="bg-white border-2 border-black px-4 py-2 rounded-sm">Cancel</button>
                </div>
              </form>
            )}

            {/* Email, Password, Delete sections jäävad samaks */}
            {/* ... (kood on sama nagu enne, email, password, danger zone) */}
          </div>
        </main>
      </div>
    </div>
  );
}
