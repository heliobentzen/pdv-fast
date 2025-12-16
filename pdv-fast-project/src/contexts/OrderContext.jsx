// Context unificado para gerenciar pedidos e carrinho

import { createContext, useContext, useMemo, useState } from "react";
import { useToast } from "./ToastContext";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
    const { showToast } = useToast();

    // Estado do carrinho (por ID de produto)
    const [cart, setCart] = useState({});

    // Estado do pedido atual
    const [currentOrder, setCurrentOrder] = useState(null);

    // Histórico de pedidos
    const [orderHistory, setOrderHistory] = useState([]);

    // ==========================================
    // CARRINHO - Gerenciamento por ID e quantidade
    // ==========================================

    function addItem(productId) {
        setCart((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    }

    function removeItem(productId) {
        setCart((prev) => {
            const newCart = { ...prev };
            if (newCart[productId] > 1) {
                newCart[productId]--;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            const newCart = { ...cart };
            delete newCart[productId];
            setCart(newCart);
            return;
        }

        setCart((prev) => ({
            ...prev,
            [productId]: quantity,
        }));
    }

    function clearCart() {
        setCart({});
    }

    // ==========================================
    // PEDIDO - Ciclo de vida completo
    // ==========================================

    function startNewOrder() {
        const orderNumber = Math.floor(100000 + Math.random() * 900000);

        setCurrentOrder({
            orderNumber,
            clientName: "",
            clientPhone: "",
            status: "pending",
            createdAt: new Date().toISOString(),
        });

        clearCart();
    }

    function updateClient(data) {
        setCurrentOrder((prev) => ({
            ...prev,
            ...data,
        }));
    }

    async function finishOrder(products, paymentMethod) {
        if (!currentOrder || Object.keys(cart).length === 0) {
            showToast("Adicione produtos ao pedido", "warning");
            return null;
        }

        if (!currentOrder.clientName || !currentOrder.clientPhone) {
            showToast("Preencha os dados do cliente", "warning");
            return null;
        }

        if (!paymentMethod) {
            showToast("Selecione a forma de pagamento", "warning");
            return null;
        }

        try {
            // Calcular itens e total
            const items = Object.entries(cart).map(([id, qty]) => {
                const product = products.find((p) => String(p.id) === id);
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: qty,
                    subtotal: product.price * qty,
                };
            });

            const total = items.reduce((sum, item) => sum + item.subtotal, 0);

            const orderPayload = {
                ...currentOrder,
                items,
                total,
                payment: paymentMethod,
                status: "paid",
                timestamp: new Date().toISOString(),
            };

            // Salvar no backend usando API client
            const { createOrder } = await import("../services/orderService");
            const savedOrder = await createOrder(orderPayload);

            // Adicionar ao histórico
            setOrderHistory((prev) => [savedOrder, ...prev]);

            // Limpar estado
            setCurrentOrder(null);
            clearCart();

            showToast("Pedido finalizado com sucesso!", "success");
            return savedOrder;

        } catch (error) {
            showToast("Erro ao finalizar pedido", "error");
            throw error;
        }
    }

    function cancelOrder() {
        setCurrentOrder(null);
        clearCart();
        showToast("Pedido cancelado", "info");
    }

    // ==========================================
    // TOTAIS E MÉTRICAS
    // ==========================================

    const totalItems = useMemo(
        () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
        [cart]
    );

    const calculateTotal = (products) => {
        return Object.entries(cart).reduce((sum, [id, qty]) => {
            const product = products.find((p) => String(p.id) === id);
            return sum + (product?.price || 0) * qty;
        }, 0);
    };

    return (
        <OrderContext.Provider
            value={{
                // Carrinho
                cart,
                totalItems,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,

                // Pedido
                currentOrder,
                startNewOrder,
                updateClient,
                finishOrder,
                cancelOrder,
                calculateTotal,

                // Histórico
                orderHistory,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrderContext);

    if (!context) {
        throw new Error("useOrder deve ser usado dentro de OrderProvider");
    }

    return context;
}