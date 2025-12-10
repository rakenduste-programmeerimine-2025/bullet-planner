'use client';

import GoalItem from './GoalItem';

interface Goal {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  due_date?: string;
}

interface GoalsListProps {
  goals: Goal[];
  title: string;
  onToggle: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  formatDate: (dateStr: string) => string;
}

export default function GoalsList({ goals, title, onToggle, onDelete, formatDate }: GoalsListProps) {
  if (goals.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {goals.map(goal => (
          <GoalItem
            key={goal.id}
            goal={goal}
            onToggle={onToggle}
            onDelete={onDelete}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
}
