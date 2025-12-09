'use client';

import React from "react";
import { X } from "lucide-react";

interface EnlargedPhotoModalProps {
  photoUrl: string;
  photoTitle?: string;
  onClose: () => void;
}

export default function EnlargedPhotoModal({
  photoUrl,
  photoTitle,
  onClose,
}: EnlargedPhotoModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Sulgemisnupp */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors z-50"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>
        <img
          src={photoUrl}
          alt={photoTitle}
          className="max-h-[80vh] max-w-[80vw] object-contain"
        />
      </div>
    </div>
  );
}
