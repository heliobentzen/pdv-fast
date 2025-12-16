export default function DateFilter({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border rounded px-3 py-2"
      />
    </div>
  );
}
