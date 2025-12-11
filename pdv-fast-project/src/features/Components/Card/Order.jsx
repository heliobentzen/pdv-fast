import { useState } from "react";

export default function Order({ order }) {
    const [payment, setPayment] = useState("");

    if (!order) {
        return (
            <div className="text-gray-400">
                Nenhum pedido selecionado.
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col justify-between text-white">

            <div className="space-y-3">
                <h2 className="text-orange-400 font-bold text-xl">
                    Fechamento do Pedido
                </h2>

                <p>Pedido Nº: <strong>{order.orderNumber}</strong></p>
                <p>Cliente: <strong>{order.clientName}</strong></p>
                <p>Telefone: <strong>{order.clientPhone}</strong></p>

                <p className="text-lg font-bold text-orange-400">
                    Total: R$ {order.total.toFixed(2)}
                </p>

                <div className="space-y-2">
                    <p className="font-semibold">Forma de pagamento:</p>

                    {["Dinheiro", "Pix", "Crédito", "Débito"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setPayment(type)}
                            className={`w-full p-2 rounded border ${payment === type
                                ? "bg-orange-600 border-orange-600"
                                : "bg-black border-orange-600"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <button
                disabled={!payment}
                onClick={async () => {
                    await fetch(`http://localhost:3000/orders/${order.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            payment,
                            status: "paid"
                        }),
                    });

                    alert("Pagamento confirmado!");
                }}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
                Confirmar Pagamento
            </button>
        </div>
    );
}