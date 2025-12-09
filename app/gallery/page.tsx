'use client';

import { useState, useEffect } from "react";
import { Plus, Image as ImageIcon, X } from "lucide-react";
import NewHeader from "@/components/new-header";
import DashboardSidebar from "@/components/ui/DashboardSidebar";
import { createClient } from "@/lib/supabase/client";
import PhotoCard from "@/components/ui/gallery/PhotoCard";
import GalleryCategories from "@/components/ui/gallery/GalleryCategories";

const supabase = createClient();

interface Photo {
  id: string;
  user_id: string;
  url: string;
  title: string;
  category?: string;
  uploaded_at: string;
}

export default function PhotoGalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageTitle, setImageTitle] = useState<string>("");
  const [imageCategory, setImageCategory] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enlargedPhoto, setEnlargedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        if (error) return console.error(error);

        const uid = sessionData?.session?.user?.id ?? null;
        if (!mounted) return;

        setUserId(uid);
        if (uid) await fetchPhotos(uid);
      } finally {
        setLoading(false);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (uid) fetchPhotos(uid);
      else setPhotos([]);
    });

    return () => {
      mounted = false;
      listener.subscription?.unsubscribe?.();
    };
  }, []);

  const fetchPhotos = async (uid: string) => {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("user_id", uid)
      .order("uploaded_at", { ascending: false });

    if (error) console.error(error);
    else {
      setPhotos(data || []);
      const dynamicCategories = Array.from(new Set(["All", ...(data || []).map(p => p.category).filter(Boolean)]));
      setCategories(dynamicCategories);
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    let photoUrl = imageUrl;

    if (uploadMethod === "file" && selectedFile) {
      const fileExt = selectedFile.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${imageCategory || "Uncategorized"}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("photos").upload(filePath, selectedFile);
      if (uploadError) return console.error(uploadError);

      const { data } = supabase.storage.from("photos").getPublicUrl(filePath);
      photoUrl = data?.publicUrl || "";
    }

    const { data, error } = await supabase.from("photos").insert({
      user_id: userId,
      url: photoUrl,
      title: imageTitle || "Untitled",
      category: imageCategory || null
    }).select().single();

    if (error) console.error(error);
    else {
      setPhotos([data as Photo, ...photos]);
      if (data?.category && !categories.includes(data.category)) {
        setCategories([...categories, data.category]);
      }
      resetForm();
    }
  };

  const handleDeletePhoto = async (id: string) => {
    const { error } = await supabase.from("photos").delete().eq("id", id);
    if (!error) setPhotos(photos.filter(p => p.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    if (!file) return setPreviewUrl("");
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setShowAddPhoto(false);
    setImageUrl("");
    setImageTitle("");
    setImageCategory("");
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadMethod("url");
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!userId) return <div className="flex flex-col items-center justify-center min-h-screen">Login required</div>;

  const filteredPhotos = selectedCategory === "All" ? photos : photos.filter(p => p.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <NewHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 sm:p-8 py-12">
            <GalleryCategories
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {!showAddPhoto && (
              <button onClick={() => setShowAddPhoto(true)} className="mb-8 w-full sm:w-auto flex items-center gap-2 bg-black text-white px-6 py-3 rounded-sm font-semibold hover:bg-gray-900 transition-colors">
                <Plus className="w-5 h-5" strokeWidth={2} /> Add Photo
              </button>
            )}

            {showAddPhoto && (
              <div className="mb-8 p-6 border-2 border-black rounded-sm bg-gray-50">
                {/* PhotoUploadForm component could be used here, but inline for now */}
                <form onSubmit={handleAddPhoto}>
                  {/* URL/File selection, title, category */}
                  {/* ... (sama kood nagu eelnevalt) */}
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map(photo => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onDelete={handleDeletePhoto}
                  onEnlarge={(p) => setEnlargedPhoto(p)}
                />
              ))}
            </div>

            {enlargedPhoto && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="relative">
                  <img src={enlargedPhoto.url} alt={enlargedPhoto.title} className="max-h-full max-w-full object-contain" />
                  <button
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                    onClick={() => setEnlargedPhoto(null)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
