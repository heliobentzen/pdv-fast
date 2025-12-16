import { Plus, Minus } from "lucide-react";
import { useProducts } from "../../../hooks/useProducts";
import { useOrder } from "../../../contexts/OrderContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import Message from "@/components/ui/Message";
import Card from "@/components/ui/Card";

export default function ProductList() {
    const { products, loading, error } = useProducts();
    const {
        currentOrder,
        cart,
        startNewOrder,
        addItem,
        removeItem,
        updateClient,
    } = useOrder();

    if (loading) return <Loader text="Carregando produtos..." />;

    if (error) return <Message message={error} type="error" />;

    return (
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">

            {/* CABEÇALHO FIXO */}
            <div className="sticky top-0 bg-black py-3 space-y-3 z-10 border-b border-orange-600">

                {/* Título e Botão Novo Pedido */}
                <div className="flex justify-between items-center">
                    <h3 className="text-orange-400 font-bold text-lg">
                        {currentOrder
                            ? `Pedido Nº ${currentOrder.orderNumber}`
                            : "Selecione os produtos"}
                    </h3>

                    <Button
                        onClick={startNewOrder}
                        variant="primary"
                        className="text-sm"
                    >
                        Novo Pedido
                    </Button>
                </div>

                {/* Inputs Cliente - Só aparece com pedido ativo */}
                {currentOrder && (
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            placeholder="Nome do cliente"
                            value={currentOrder.clientName || ""}
                            onChange={(e) =>
                                updateClient({ clientName: e.target.value })
                            }
                        />

                        <Input
                            placeholder="Telefone"
                            type="tel"
                            value={currentOrder.clientPhone || ""}
                            onChange={(e) =>
                                updateClient({ clientPhone: e.target.value })
                            }
                        />
                    </div>
                )}
            </div>

            {/* GRADE DE PRODUTOS */}
            {products.length === 0 ? (
                <Message
                    message="Nenhum produto cadastrado"
                    type="info"
                />
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            cart={cart}
                            currentOrder={currentOrder}
                            onAdd={() => addItem(product.id)}
                            onRemove={() => removeItem(product.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ==========================================
// Componente interno: Card de Produto
// ==========================================
function ProductCard({ product, cart, currentOrder, onAdd, onRemove }) {
    const quantity = cart[product.id] || 0;
    const hasQuantity = quantity > 0;

    return (
        <Card className="space-y-3 hover:shadow-orange-500/20 transition">

            {/* Imagem (se existir) */}
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-md border border-orange-600"
                />
            )}

            {/* Nome e Preço */}
            <div>
                <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">
                    {product.name}
                </h4>

                <p className="text-orange-400 font-bold text-lg">
                    R$ {Number(product.price).toFixed(2)}
                </p>

                {/* Estoque (se houver) */}
                {product.stock !== undefined && (
                    <p className="text-gray-400 text-xs mt-1">
                        Estoque: {product.stock}
                    </p>
                )}
            </div>

            {/* Controles de Quantidade */}
            {currentOrder ? (
                <div className="flex items-center justify-between pt-2 border-t border-orange-600">

                    {/* Botão Adicionar */}
                    <Button
                        onClick={onAdd}
                        variant="primary"
                        className="p-2 rounded-full flex-shrink-0"
                        disabled={product.stock === 0}
                    >
                        <Plus size={16} />
                    </Button>

                    {/* Quantidade */}
                    {hasQuantity && (
                        <>
                            <span className="text-white font-bold text-xl px-3">
                                {quantity}
                            </span>

                            {/* Botão Remover */}
                            <Button
                                onClick={onRemove}
                                variant="danger"
                                className="p-2 rounded-full flex-shrink-0"
                            >
                                <Minus size={16} />
                            </Button>
                        </>
                    )}
                </div>
            ) : (
                <div className="pt-2 border-t border-orange-600">
                    <p className="text-gray-400 text-xs text-center">
                        Inicie um pedido para adicionar
                    </p>
                </div>
            )}
        </Card>
    );
}