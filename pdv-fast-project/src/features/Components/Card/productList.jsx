import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";

export default function ProductList({ onFinishOrder }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState({});

    const [orderNumber, setOrderNumber] = useState(null);
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");

    // ✅ Buscar produtos
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("http://localhost:3000/products");
                if (!res.ok) throw new Error("Erro ao carregar produtos");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // ✅ Novo pedido
    const handleNewOrder = () => {
        const newOrder = Math.floor(100000 + Math.random() * 900000);
        setOrderNumber(newOrder);
        setClientName("");
        setClientPhone("");
        setCart({});
    };

    // ✅ Carrinho
    const addToCart = (productId) => {
        setCart(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1
        }));
    };

    const removeFromCart = (productId) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[productId] > 1) {
                newCart[productId] -= 1;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    };

    // ✅ Total
    const calculateTotal = () => {
        let total = 0;
        for (const [productId, quantity] of Object.entries(cart)) {
            const product = products.find(p => String(p.id) === String(productId));
            if (product) {
                total += (parseFloat(product.price) || 0) * quantity;
            }
        }
        return total;
    };

    const getTotalItems = () =>
        Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    // Máscara telefone
    const formatPhone = (value) => {
        const numbers = value.replace(/\D/g, "");

        if (numbers.length <= 2) return numbers;
        if (numbers.length <= 7)
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        if (numbers.length <= 11)
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;

        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    };

    return (
        <div className="flex flex-col h-full">

            {loading && <div className="text-center text-gray-300">Carregando...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}

            {!loading && !error && (
                <>
                    <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-3 pr-2">

                        {/* ✅ TOPO */}
                        <div className="col-span-2 sticky top-0 bg-black py-3 z-10 space-y-3">

                            <div className="flex justify-between items-center">
                                <h3 className="text-orange-400 font-bold text-lg">
                                    {orderNumber ? `Pedido Nº ${orderNumber}` : "Selecione os produtos"}
                                </h3>

                                <button
                                    onClick={handleNewOrder}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-bold"
                                >
                                    Novo Pedido
                                </button>
                            </div>

                            {/*  CLIENTE */}
                            {orderNumber && (
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        placeholder="Nome do cliente"
                                        value={clientName}
                                        onChange={(e) => {
                                            const onlyLetters = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                                            setClientName(onlyLetters);
                                        }}
                                        className="bg-neutral-800 border border-orange-600 rounded-md px-3 py-2 text-white text-sm"
                                    />

                                    <input
                                        type="tel"
                                        placeholder="Telefone"
                                        value={clientPhone}
                                        onChange={(e) => setClientPhone(formatPhone(e.target.value))}
                                        maxLength={15}
                                        className="bg-neutral-800 border border-orange-600 rounded-md px-3 py-2 text-white text-sm"
                                    />
                                </div>
                            )}
                        </div>

                        {/*  PRODUTOS */}
                        {products.map(product => (
                            <div key={product.id} className="bg-neutral-800 border border-orange-600 p-3 rounded-lg">
                                <div className="flex flex-col gap-2">
                                    <span className="text-gray-200 font-semibold">{product.name}</span>
                                    <span className="text-orange-400 text-sm">
                                        R$ {parseFloat(product.price || 0).toFixed(2)}
                                    </span>

                                    {/*  BOTÕES APENAS APÓS NOVO PEDIDO */}
                                    {orderNumber && (
                                        <div className="flex items-center gap-1 mt-1">
                                            <button
                                                onClick={() => addToCart(product.id)}
                                                className="bg-green-600 hover:bg-green-700 text-white rounded-full p-1.5"
                                            >
                                                <Plus size={10} />
                                            </button>

                                            {cart[product.id] > 0 && (
                                                <>
                                                    <span className="text-white font-bold min-w-[28px] text-center">
                                                        {cart[product.id]}
                                                    </span>

                                                    <button
                                                        onClick={() => removeFromCart(product.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5"
                                                    >
                                                        <Minus size={10} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*  RESUMO */}
                    {getTotalItems() > 0 && (
                        <div className="mt-4 pt-4 border-t-2 border-orange-600 bg-black">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <ShoppingCart size={18} className="text-orange-400" />
                                    <span>{getTotalItems()} itens</span>
                                </div>

                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total:</span>
                                    <span className="text-orange-400">
                                        R$ {calculateTotal().toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    onClick={async () => {
                                        if (!clientName || !clientPhone) {
                                            alert("Preencha os dados do cliente");
                                            return;
                                        }

                                        const orderData = {
                                            orderNumber,
                                            clientName,
                                            clientPhone,
                                            items: cart,
                                            total: calculateTotal(),
                                            status: "open"
                                        };

                                        //  ENVIA PARA O JSON SERVER
                                        try {
                                            const res = await fetch("http://localhost:3000/orders", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify(orderData),
                                            });

                                            if (!res.ok) {
                                                throw new Error("Erro ao salvar pedido");
                                            }

                                            console.log("✅ Pedido salvo no servidor:", orderData);
                                            onFinishOrder(orderData);

                                        } catch (err) {
                                            console.error("❌ Erro ao salvar pedido:", err);
                                            alert("Erro ao salvar o pedido");
                                        }


                                        onFinishOrder(orderData);
                                    }}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg"
                                >
                                    Finalizar Pedido
                                </button>

                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
