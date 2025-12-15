export default function TableReport({ data }) {
  if (!data.length) {
    return <p className="text-gray-500">Nenhum dado para exibir</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Data</th>
            <th className="border px-3 py-2">Produto</th>
            <th className="border px-3 py-2">Qtd</th>
            <th className="border px-3 py-2">Total</th>
            <th className="border px-3 py-2">Pagamento</th>
            <th className="border px-3 py-2">Caixa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-3 py-2">{item.date}</td>
              <td className="border px-3 py-2">{item.product}</td>
              <td className="border px-3 py-2">{item.quantity}</td>
              <td className="border px-3 py-2">R$ {item.total}</td>
              <td className="border px-3 py-2">{item.payment}</td>
              <td className="border px-3 py-2">{item.cashier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
