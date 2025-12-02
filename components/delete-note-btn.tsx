'use client';

import { deleteNote } from '@/app/notes/action';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteNoteBtn({ noteId }: { noteId: string }) {
  const router = useRouter();

  const handleDelete = async (noteId: string) => {
    if (!confirm('Are you sure?')) {
      return;
    }
    await deleteNote(noteId);
    router.refresh();
  };

  return (
    <button
      onClick={() => handleDelete(noteId)}
      className="flex-shrink-0 p-2 hover:bg-red-100 rounded-sm transition-colors text-red-600"
    >
      <Trash2 className="w-5 h-5" strokeWidth={2} />
    </button>
  );
}