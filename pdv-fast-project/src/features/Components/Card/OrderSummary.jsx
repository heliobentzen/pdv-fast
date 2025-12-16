import { ShoppingCart } from "lucide-react";
import { useOrder } from "../../hooks/useOrder";

export default function OrderSummary({ products }) {
    const { cart, currentOrder, clearOrder } = useOrder();

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

    const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = products.find(p => String(p.id) === id);
        return sum + (product?.price || 0) * qty;
    }, 0);

    if (!totalItems) return null;

    return (
        <div className="border-t-2 border-orange-600 pt-4">
            <div className="flex items-center gap-2">
                <ShoppingCart size={18} />
                <span>{totalItems} itens</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-orange-400">
                    R$ {totalPrice.toFixed(2)}
                </span>
            </div>

            <button
                onClick={clearOrder}
                className="w-full bg-orange-600 text-white py-3 rounded-lg mt-3"
            >
                Finalizar Pedido
            </button>
        </div>
    );
}
