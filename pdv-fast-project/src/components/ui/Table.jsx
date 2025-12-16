export default function Table({
  data = [],
  columns = [],
  isLoading = false,
  emptyMessage = "Nenhum dado encontrado.",
  rowKey = "id",
}) {
  if (isLoading) {
    return (
      <div className="text-center py-6 text-gray-400">
        Carregando dados...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-6 text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-orange-600 rounded-lg">
      <table className="min-w-full bg-neutral-900 text-white">
        <thead className="bg-neutral-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="px-4 py-3 text-left text-sm font-semibold text-orange-400 border-b border-orange-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={row[rowKey] ?? index}
              className="hover:bg-neutral-800 transition"
            >
              {columns.map((column) => (
                <td
                  key={column.header}
                  className="px-4 py-3 border-b border-neutral-700 text-sm"
                >
                  {column.render
                    ? column.render(row)
                    : row[column.field]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
