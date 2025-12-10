'use client';

import React from "react";
import { Trash2 } from "lucide-react";

interface Photo {
  id: string;
  url: string;
  title: string;
  category?: string;
  uploaded_at: string;
}

interface PhotoCardProps {
  photo: Photo;
  onDelete: (id: string) => void;
  onClick: (photo: Photo) => void; 
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onDelete, onClick }) => {
  return (
    <div className="border border-black/10 rounded-sm overflow-hidden hover:border-black transition-colors group cursor-pointer">
      <div
        className="relative overflow-hidden bg-gray-100 h-64"
        onClick={() => onClick(photo)}
      >
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) =>
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3C/svg%3E"
          }
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{photo.title}</h3>
        {photo.category && (
          <p className="text-xs text-gray-500 mb-2">Category: {photo.category}</p>
        )}
        <p className="text-xs text-gray-500 mb-4">
          {new Date(photo.uploaded_at).toLocaleDateString()}
        </p>
        <button
          onClick={() => onDelete(photo.id)}
          className="w-full p-2 hover:bg-red-100 rounded-sm transition-colors text-red-600 font-medium text-sm flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" strokeWidth={2} /> Delete
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
