interface DayViewProps {
  selectedDate: Date;
}

export default function DayView({ selectedDate }: DayViewProps) {
  const todayStr = new Date().toISOString().split("T")[0];
  const selectedStr = selectedDate.toISOString().split("T")[0];
  const isToday = todayStr === selectedStr;

  return (
    <div
      className={`p-4 border rounded min-h-[120px] bg-gray-50 ${
        isToday ? "border-black border-2" : "border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2">{selectedDate.toDateString()}</h2>
    </div>
  );
}
