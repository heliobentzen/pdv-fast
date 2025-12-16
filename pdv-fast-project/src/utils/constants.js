//Arquivo para armazenar variáveis estáticas globais (ex: limites de timeout ou códigos de erro)
export const PAYMENT_METHODS = [
    { value: "money", label: "💵 Dinheiro", icon: "💵" },
    { value: "pix", label: "📱 PIX", icon: "📱" },
    { value: "credit", label: "💳 Cartão de Crédito", icon: "💳" },
    { value: "debit", label: "💳 Cartão de Débito", icon: "💳" },
];

export const PAYMENT_ICONS = {
    money: "💵",
    pix: "📱",
    credit: "💳",
    debit: "💳",
};

// ==========================================
// STATUS DE PEDIDOS
// ==========================================
export const ORDER_STATUS = {
    PENDING: "pending",
    PREPARING: "preparing",
    READY: "ready",
    DELIVERED: "delivered",
    PAID: "paid",
    CANCELED: "canceled",
};

export const ORDER_STATUS_CONFIG = {
    pending: {
        label: "⏳ Pendente",
        badgeClass: "bg-orange-500/20 border-orange-500 text-orange-400",
        color: "orange",
    },
    preparing: {
        label: "🔥 Preparando",
        badgeClass: "bg-yellow-500/20 border-yellow-500 text-yellow-400",
        color: "yellow",
    },
    ready: {
        label: "✅ Pronto",
        badgeClass: "bg-emerald-500/20 border-emerald-500 text-emerald-400",
        color: "emerald",
    },
    paid: {
        label: "💰 Pago",
        badgeClass: "bg-green-500/20 border-green-500 text-green-400",
        color: "green",
    },
    delivered: {
        label: "✨ Entregue",
        badgeClass: "bg-blue-500/20 border-blue-500 text-blue-400",
        color: "blue",
    },
    canceled: {
        label: "❌ Cancelado",
        badgeClass: "bg-red-500/20 border-red-500 text-red-400",
        color: "red",
    },
};

// ==========================================
// VALIDAÇÕES
// ==========================================
export const VALIDATION = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[\d\s()-]+$/,
    MIN_PASSWORD_LENGTH: 6,
    MAX_PRODUCT_NAME_LENGTH: 100,
};

// ==========================================
// MENSAGENS
// ==========================================
export const MESSAGES = {
    SUCCESS: {
        ORDER_CREATED: "Pedido criado com sucesso!",
        ORDER_UPDATED: "Pedido atualizado com sucesso!",
        ORDER_CANCELED: "Pedido cancelado",
        LOGIN_SUCCESS: "Login realizado com sucesso!",
        REGISTER_SUCCESS: "Cadastro realizado com sucesso!",
    },
    ERROR: {
        ORDER_CREATE: "Erro ao criar pedido",
        ORDER_UPDATE: "Erro ao atualizar pedido",
        LOGIN_FAILED: "Erro ao fazer login",
        REGISTER_FAILED: "Erro ao cadastrar usuário",
        LOAD_PRODUCTS: "Erro ao carregar produtos",
        LOAD_ORDERS: "Erro ao carregar pedidos",
    },
    WARNING: {
        NO_ITEMS: "Adicione produtos ao pedido",
        NO_CLIENT: "Preencha os dados do cliente",
        NO_PAYMENT: "Selecione a forma de pagamento",
    },
};

// ==========================================
// CONFIGURAÇÕES
// ==========================================
export const CONFIG = {
    ITEMS_PER_PAGE: 10,
    TOAST_DURATION: 3000,
    API_RETRY_ATTEMPTS: 3,
    API_RETRY_DELAY: 1000,
};