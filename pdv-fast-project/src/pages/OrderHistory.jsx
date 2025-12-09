//Tela para buscar, visualizar e reimprimir pedidos fechados (funcionalidade de relatórios/histórico).
import { useState } from "react";

export default function OrderHistory() {
 
  const mockOrders = [
    { id: 1, client: "Maria Souza", total: 42.9, date: "2025-01-10" },
    { id: 2, client: "João Pedro", total: 33.5, date: "2025-01-11" },
    { id: 3, client: "Ana Clara", total: 19.9, date: "2025-01-12" },
  ];

  const [search, setSearch] = useState("");

  
  const filteredOrders = mockOrders.filter((order) => {
    return order.client.toLowerCase().includes(search.toLowerCase());
  });

 
  function handleView(id) {
    alert("Visualizar pedido: " + id);
  }

  function handleReprint(id) {
    alert("Reimprimir pedido: " + id);
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Histórico de Pedidos</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Lista */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-600">Nenhum pedido encontrado.</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border p-3 rounded bg-gray-50"
            >
              <h2 className="font-semibold">Pedido #{order.id}</h2>

              <p>
                <span className="font-medium">Cliente:</span> {order.client}
              </p>

              <p>
                <span className="font-medium">Total:</span> R$ {order.total.toFixed(2)}
              </p>

              <p>
                <span className="font-medium">Data:</span> {order.date}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleView(order.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Ver
                </button>

                <button
                  onClick={() => handleReprint(order.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Reimprimir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
