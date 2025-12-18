import { useState, useMemo } from "react";
import Input from "@/components/ui/Input";
import Table from "@/components/ui/Table";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import useOrders from "@/hooks/useOrders";
import { orderStatusConfig } from "@/constants/orderStatusConfig";

export default function OrderStatusModule() {
    const { orders, isLoading, changeOrderStatus } = useOrders();

    const [search, setSearch] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    function openConfirm(order, status) {
        setSelectedOrder(order);
        setSelectedStatus(status);
        setConfirmOpen(true);
    }

    function closeConfirm() {
        setConfirmOpen(false);
        setSelectedOrder(null);
        setSelectedStatus(null);
    }

    function handleConfirmAction() {
        if (!selectedOrder || !selectedStatus) return;
        changeOrderStatus(selectedOrder.id, selectedStatus);
        closeConfirm();
    }

    const filteredOrders = useMemo(() => {
        const value = search.toLowerCase();
        return orders.filter(
            (order) =>
                String(order.orderNumber).includes(value) ||
                order.clientName?.toLowerCase().includes(value) ||
                order.clientPhone?.includes(value)
        );
    }, [orders, search]);

    const columns = [
        {
            header: "Pedido",
            render: (row) => <strong>#{row.orderNumber}</strong>,
        },
        {
            header: "Cliente",
            render: (row) => (
                <div>
                    <p>{row.clientName}</p>
                    <p className="text-xs text-gray-400">{row.clientPhone}</p>
                </div>
            ),
        },
        {
            header: "Status",
            render: (row) => {
                const status = orderStatusConfig[row.status];
                if (!status) return null;
                return (
                    <span
                        className={`px-3 py-1 rounded-lg border text-sm font-semibold ${status.badgeClass}`}
                    >
                        {status.label}
                    </span>
                );
            },
        },
        {
            header: "Ações",
            render: (row) => (
                <div className="flex flex-wrap gap-2">
                    {Object.entries(orderStatusConfig).map(([statusKey, config]) => {
                        if (statusKey === row.status) return null;
                        return (
                            <Button
                                key={statusKey}
                                size="sm"
                                variant="secondary"
                                onClick={() => openConfirm(row, statusKey)}
                            >
                                {config.label}
                            </Button>
                        );
                    })}
                </div>
            ),
        },
    ];

    if (isLoading) return <Loader text="Carregando pedidos..." />;

    return (
        <>
            <Card>
                <Input
                    placeholder="Buscar por pedido, cliente ou telefone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Card>

            <Table
                data={filteredOrders}
                columns={columns}
                rowKey="id"
                emptyMessage="Nenhum pedido encontrado"
            />

            <ConfirmDialog
                open={confirmOpen}
                title="Alterar status do pedido"
                message={`Deseja alterar o pedido #${selectedOrder?.orderNumber} para "${orderStatusConfig[selectedStatus]?.label}"?`}
                confirmText="Confirmar"
                cancelText="Cancelar"
                onCancel={closeConfirm}
                onConfirm={handleConfirmAction}
            />
        </>
    );
}
