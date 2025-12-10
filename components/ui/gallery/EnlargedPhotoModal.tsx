'use client';

import React from "react";
import { X } from "lucide-react";

interface EnlargedPhotoModalProps {
  photoUrl: string;
  photoTitle: string;
  onClose: () => void;
}

const EnlargedPhotoModal: React.FC<EnlargedPhotoModalProps> = ({ photoUrl, photoTitle, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-full max-w-full"
        onClick={(e) => e.stopPropagation()} // ei lase modalil sulguda, kui klikid pildi sees
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <img
          src={photoUrl}
          alt={photoTitle}
          className="max-h-[80vh] max-w-[90vw] object-contain rounded-sm shadow-lg"
        />
      </div>
    </div>
  );
};

export default EnlargedPhotoModal;
