import { useState } from "react";
import { sales } from "./data/mockData";
import DateFilter from "./components/DateFilter";
import TableReport from "./components/TableReport";
import ExportButtons from "./components/ExportButtons";

export default function ReportsPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filtered, setFiltered] = useState([]);

  const filterReports = () => {
    let result = [...sales];

    if (startDate) {
      result = result.filter((s) => s.date >= startDate);
    }

    if (endDate) {
      result = result.filter((s) => s.date <= endDate);
    }

    setFiltered(result);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>

      <div className="flex gap-4 items-center mb-4">
        <button
          onClick={filterReports}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Gerar relatório
        </button>
      </div>

      <DateFilter
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <TableReport data={filtered} />
      <ExportButtons data={filtered} />
    </div>
  );
}
