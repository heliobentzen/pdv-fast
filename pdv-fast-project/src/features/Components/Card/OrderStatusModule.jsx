import { useState, useMemo } from "react";
import Input from "@/components/ui/Input";
import Table from "@/components/ui/Table";
import Card from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import useOrders from "../../../hooks/useOrders";


export default function OrderStatusModule() {
    const { orders, isLoading, error, reload, changeOrderStatus } = useOrders();

    const [search, setSearch] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    function openConfirm(order) {
        setSelectedOrder(order);
        setConfirmOpen(true);
    }

    function closeConfirm() {
        setSelectedOrder(null);
        setConfirmOpen(false);
    }

    function handleConfirmAction() {
        if (!selectedOrder) return;

        const nextStatus =
            selectedOrder.status === "closed" ? "open" : "closed";

        changeOrderStatus(selectedOrder.id, nextStatus);
        closeConfirm();
    }

    const filteredOrders = useMemo(() => {
        const value = search.toLowerCase();

        return orders.filter(order =>
            String(order.orderNumber).includes(value) ||
            order.clientName?.toLowerCase().includes(value) ||
            order.clientPhone?.includes(value)
        );
    }, [orders, search]);

    const columns = [
        {
            header: "Pedido",
            field: "orderNumber",
            render: row => <strong>#{row.orderNumber}</strong>,
        },
        {
            header: "Cliente",
            field: "clientName",
            render: row => (
                <div>
                    <p>{row.clientName}</p>
                    <p className="text-xs text-gray-400">
                        {row.clientPhone}
                    </p>
                </div>
            ),
        },
        {
            header: "Total",
            field: "total",
            render: row => `R$ ${row.total.toFixed(2)}`,
        },
        {
            header: "Status",
            field: "status",
            render: row => (
                <span
                    className={`capitalize font-medium px-2 py-1 rounded text-sm ${row.status === "closed"
                        ? "bg-green-900/40 text-green-400"
                        : "bg-orange-900/40 text-orange-400"
                        }`}
                >
                    {row.status === "closed" ? "Fechado" : "Aberto"}
                </span>
            ),
        },
        {
            header: "Ações",
            render: row => {
                const isClosed = row.status === "closed";

                return (
                    <Button
                        size="sm"
                        variant={isClosed ? "secondary" : "primary"}
                        onClick={() => openConfirm(row)}
                    >
                        {isClosed ? "Reabrir" : "Finalizar"}
                    </Button>
                );
            },
        },
    ];

    if (isLoading) return <Loader text="Carregando pedidos..." />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="space-y-4">
            <Card>
                <Input
                    placeholder="Buscar por pedido, cliente ou telefone..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </Card>

            <Table
                data={filteredOrders}
                columns={columns}
                rowKey="id"
                emptyMessage="Nenhum pedido encontrado"
            />

            <Button variant="secondary" onClick={reload}>
                Atualizar pedidos
            </Button>

            {/* 🔽 Dialog de confirmação */}
            <ConfirmDialog
                open={confirmOpen}
                title={
                    selectedOrder?.status === "closed"
                        ? "Reabrir pedido"
                        : "Finalizar pedido"
                }
                message={
                    selectedOrder?.status === "closed"
                        ? "Tem certeza que deseja reabrir este pedido?"
                        : "Tem certeza que deseja finalizar este pedido?"
                }
                confirmText={
                    selectedOrder?.status === "closed"
                        ? "Reabrir"
                        : "Finalizar"
                }
                onCancel={closeConfirm}
                onConfirm={handleConfirmAction}
            />
        </div>
    );
}
