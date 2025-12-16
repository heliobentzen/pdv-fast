import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
    fetchOrders,
    updateOrderStatus,
} from "../services/ordersService";

export default function useOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        try {
            setIsLoading(true);
            const data = await fetchOrders();
            setOrders(
                data.sort(
                    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
                )
            );
        } catch {
            toast.error("Erro ao carregar pedidos");
        } finally {
            setIsLoading(false);
        }
    }

    async function changeOrderStatus(orderId, status) {
        try {
            const updated = await updateOrderStatus(orderId, status);
            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? updated : order
                )
            );
            toast.success("Status do pedido atualizado");
        } catch {
            toast.error("Erro ao atualizar pedido");
        }
    }

    return { orders, isLoading, changeOrderStatus };
}
