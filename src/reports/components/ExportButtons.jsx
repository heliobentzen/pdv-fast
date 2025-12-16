export default function ExportButtons({ data }) {
  const exportConsole = () => {
    console.log("Exportando relatório:", data);
    alert("Exportação simulada! (ver console)");
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={exportConsole}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Exportar Excel
      </button>

      <button
        onClick={exportConsole}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Exportar PDF
      </button>
    </div>
  );
}
