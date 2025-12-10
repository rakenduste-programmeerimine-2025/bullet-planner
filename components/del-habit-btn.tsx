'use client';

import { deletehabit } from '@/app/habits/action';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteHabitBtn({ habitId }: { habitId: string }) {
  const router = useRouter();

  const handleDelete = async (habitId: string) => {
    await deletehabit(habitId);
    router.refresh();
  };

  return (
    <button
      onClick={() => handleDelete(habitId)}
      className="flex-shrink-0 p-2 hover:bg-red-100 rounded-sm transition-colors text-red-600"
    >
      <Trash2 className="w-5 h-5" strokeWidth={2} />
    </button>
  );
}
