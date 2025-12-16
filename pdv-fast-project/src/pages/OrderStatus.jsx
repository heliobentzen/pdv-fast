import { useOrder } from "../contexts/OrderContext";

export default function OrderStatus() {
    const { orderHistory } = useOrder();

    if (orderHistory.length === 0) {
        return <p>Nenhum pedido encontrado</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                📋 Histórico de Pedidos
            </h1>

            {orderHistory.map((order) => (
                <div
                    key={order.orderNumber}
                    className="border p-4 rounded mb-3"
                >
                    <p><strong>Pedido:</strong> #{order.orderNumber}</p>
                    <p><strong>Cliente:</strong> {order.clientName}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> R$ {order.total}</p>
                </div>
            ))}
        </div>
    );
}
