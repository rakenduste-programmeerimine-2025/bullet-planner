"use client";

interface GalleryCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function GalleryCategories({
  categories,
  selectedCategory,
  onSelectCategory
}: GalleryCategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-3 py-1 rounded-sm font-medium border ${
            selectedCategory === cat
              ? "bg-black text-white"
              : "border-black/20"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
