const API_URL = "http://localhost:3000/orders";

export async function fetchOrders() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar pedidos");
    return response.json();
}

export async function createOrder(orderPayload) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
    });

    if (!response.ok) throw new Error("Erro ao criar pedido");
    return response.json();
}

export async function updateOrderStatus(orderId, status) {
    const response = await fetch(`${API_URL}/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error("Erro ao atualizar status");
    return response.json();
}
