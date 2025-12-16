import { useState } from "react";
import { useOrder } from "../../../contexts/OrderContext";
import { useProducts } from "../../../hooks/useProducts";
import Radio from "../../../components/radio/Radio";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Loader from "@/components/ui/Loader";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const PAYMENT_METHODS = [
    { value: "money", label: "💵 Dinheiro" },
    { value: "pix", label: "📱 PIX" },
    { value: "credit", label: "💳 Cartão de Crédito" },
    { value: "debit", label: "💳 Cartão de Débito" },
];

export default function Order() {
    const { products } = useProducts();
    const {
        currentOrder,
        cart,
        finishOrder,
        cancelOrder,
        calculateTotal,
        totalItems
    } = useOrder();

    const [payment, setPayment] = useState("");
    const [loading, setLoading] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    // Se não há pedido, mostra mensagem
    if (!currentOrder) {
        return (
            <div className="h-full flex items-center justify-center">
                <Card className="text-center">
                    <p className="text-gray-400 mb-2">
                        Nenhum pedido em andamento
                    </p>
                    <p className="text-sm text-gray-500">
                        Inicie um novo pedido para começar
                    </p>
                </Card>
            </div>
        );
    }

    const total = calculateTotal(products);
    const hasItems = Object.keys(cart).length > 0;

    async function handleConfirmPayment() {
        try {
            setLoading(true);
            await finishOrder(products, payment);
            setPayment("");
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleCancel() {
        cancelOrder();
        setShowCancelDialog(false);
        setPayment("");
    }

    return (
        <div className="h-full flex flex-col justify-between space-y-4">

            {/* INFORMAÇÕES DO PEDIDO */}
            <Card className="space-y-4">
                <div className="border-b border-orange-600 pb-3">
                    <h2 className="text-orange-400 font-bold text-xl">
                        Fechamento do Pedido
                    </h2>
                </div>

                {/* Dados do Cliente */}
                <div className="space-y-2 text-sm">
                    <InfoRow
                        label="Pedido Nº"
                        value={currentOrder.orderNumber}
                        highlight
                    />
                    <InfoRow
                        label="Cliente"
                        value={currentOrder.clientName || "—"}
                        alert={!currentOrder.clientName}
                    />
                    <InfoRow
                        label="Telefone"
                        value={currentOrder.clientPhone || "—"}
                        alert={!currentOrder.clientPhone}
                    />
                    <InfoRow
                        label="Itens"
                        value={totalItems}
                    />
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-orange-600">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-300">
                            Total:
                        </span>
                        <span className="text-3xl font-bold text-orange-400">
                            R$ {total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </Card>

            {/* FORMA DE PAGAMENTO */}
            {hasItems && (
                <Card className="space-y-3">
                    <h3 className="font-semibold text-orange-400 border-b border-orange-600 pb-2">
                        Forma de pagamento:
                    </h3>

                    <div className="space-y-2">
                        {PAYMENT_METHODS.map((method) => (
                            <div
                                key={method.value}
                                className={`
                  p-3 rounded-lg border transition cursor-pointer
                  ${payment === method.value
                                        ? "bg-orange-600/20 border-orange-500"
                                        : "bg-neutral-900 border-orange-600/50 hover:border-orange-600"
                                    }
                `}
                                onClick={() => setPayment(method.value)}
                            >
                                <Radio
                                    name="payment"
                                    label={method.label}
                                    value={method.value}
                                    checked={payment === method.value}
                                    onChange={setPayment}
                                    className="text-white pointer-events-none"
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* ALERTAS */}
            {!hasItems && (
                <Card className="bg-yellow-900/20 border-yellow-600">
                    <p className="text-yellow-400 text-sm text-center">
                        ⚠️ Adicione produtos ao pedido antes de finalizar
                    </p>
                </Card>
            )}

            {/* AÇÕES */}
            <div className="space-y-2">
                {loading ? (
                    <Loader text="Processando pagamento..." />
                ) : (
                    <>
                        <Button
                            onClick={handleConfirmPayment}
                            disabled={!payment || !hasItems || !currentOrder.clientName || !currentOrder.clientPhone}
                            variant="primary"
                            className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            ✅ Confirmar Pagamento
                        </Button>

                        <Button
                            onClick={() => setShowCancelDialog(true)}
                            variant="danger"
                            className="w-full py-3"
                        >
                            ❌ Cancelar Pedido
                        </Button>
                    </>
                )}
            </div>

            {/* DIÁLOGO DE CONFIRMAÇÃO DE CANCELAMENTO */}
            <ConfirmDialog
                open={showCancelDialog}
                title="Cancelar Pedido?"
                message="Tem certeza que deseja cancelar este pedido? Todos os itens serão removidos e esta ação não pode ser desfeita."
                confirmText="Sim, cancelar"
                cancelText="Não"
                onConfirm={handleCancel}
                onCancel={() => setShowCancelDialog(false)}
            />
        </div>
    );
}

// ==========================================
// Componente auxiliar: Linha de Informação
// ==========================================
function InfoRow({ label, value, highlight = false, alert = false }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-gray-400">{label}:</span>
            <span className={`
        font-medium
        ${highlight ? "text-orange-400 font-bold" : ""}
        ${alert ? "text-red-400" : "text-white"}
      `}>
                {value}
            </span>
        </div>
    );
}