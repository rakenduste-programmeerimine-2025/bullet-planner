'use client';

interface NewGoalFormProps {
  title: string;
  description: string;
  dueDate: string;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onDueDateChange: (val: string) => void;
  onAddGoal: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function NewGoalForm({
  title,
  description,
  dueDate,
  onTitleChange,
  onDescriptionChange,
  onDueDateChange,
  onAddGoal,
  onCancel,
}: NewGoalFormProps) {
  return (
    <form
      onSubmit={onAddGoal}
      className="mb-8 p-6 border-2 border-black rounded-sm bg-gray-50"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Goal title"
        className="w-full mb-4 px-4 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black text-lg font-semibold"
        autoFocus
        required
      />
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
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
          onChange={(e) => onDueDateChange(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-black text-white py-2 rounded-sm font-semibold hover:bg-gray-900 transition-colors"
        >
          Add Goal
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-white border-2 border-black text-black py-2 rounded-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
