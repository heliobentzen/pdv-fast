import { api } from "./api";

export async function fetchOrders() {
    return api.get("/orders");
}

export async function createOrder(orderData) {
    return api.post("/orders", orderData);
}

export async function updateOrderStatus(orderId, status) {
    return api.patch(`/orders/${orderId}`, { status });
}

export async function updateOrderPayment(orderId, payment, status) {
    return api.patch(`/orders/${orderId}`, { payment, status });
}

export async function deleteOrder(orderId) {
    return api.delete(`/orders/${orderId}`);
}