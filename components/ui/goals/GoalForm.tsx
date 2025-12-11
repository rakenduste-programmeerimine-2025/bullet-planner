'use client';

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface Goal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  due_date?: string;
}

interface GoalFormProps {
  userId: string | null;
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  onClose: () => void;
}

export default function GoalForm({ userId, goals, setGoals, onClose }: GoalFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !userId) return;

    const { data, error } = await supabase
      .from("goals")
      .insert({
        title,
        description,
        user_id: userId,
        completed: false,
        due_date: dueDate || null,
      })
      .select()
      .single();

    if (error) return console.error(error);

    setGoals([data, ...goals]);
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  return (
    <form
      onSubmit={handleAddGoal}
      className="mb-8 p-6 border-2 border-black rounded-sm bg-gray-50"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Goal title"
        className="w-full mb-4 px-4 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black text-lg font-semibold"
        autoFocus
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={3}
        className="w-full mb-4 px-4 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black resize-none"
      />
      <div>
        <label htmlFor="due-date" className="block text-sm font-medium mb-2">
          Due Date (optional)
        </label>
        <input
          type="date"
          id="due-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-black text-white py-2 rounded-sm font-semibold hover:bg-gray-900 transition-colors">
          Add Goal
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-white border-2 border-black text-black py-2 rounded-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
