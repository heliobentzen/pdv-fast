//Funções para formatação de dados, como moeda (R$), datas, ou números
// ==========================================
// FORMATAÇÃO DE MOEDA
// ==========================================
export function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value || 0);
}

// Versão sem símbolo R$
export function formatPrice(value) {
    return Number(value || 0).toFixed(2);
}

// ==========================================
// FORMATAÇÃO DE DATA E HORA
// ==========================================
export function formatDate(dateString) {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Data inválida";

    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export function formatTime(dateString) {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Hora inválida";

    return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatDateTime(dateString) {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Data inválida";

    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Formato relativo (ex: "há 5 minutos")
export function formatRelativeTime(dateString) {
    if (!dateString) return "—";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "agora";
    if (diffMins < 60) return `há ${diffMins} min`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `há ${diffHours}h`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "ontem";
    if (diffDays < 7) return `há ${diffDays} dias`;

    return formatDate(dateString);
}

// ==========================================
// FORMATAÇÃO DE TELEFONE
// ==========================================
export function formatPhone(phone) {
    if (!phone) return "—";

    // Remove tudo que não for número
    const cleaned = phone.replace(/\D/g, "");

    // (99) 99999-9999
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    // (99) 9999-9999
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    return phone;
}

// ==========================================
// FORMATAÇÃO DE TEXTO
// ==========================================
export function capitalizeFirst(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalizeWords(text) {
    if (!text) return "";

    return text
        .split(" ")
        .map(word => capitalizeFirst(word))
        .join(" ");
}

export function truncate(text, maxLength = 50) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
}

// ==========================================
// FORMATAÇÃO DE NÚMEROS
// ==========================================
export function formatNumber(value) {
    return new Intl.NumberFormat("pt-BR").format(value || 0);
}

// Porcentagem
export function formatPercent(value) {
    return `${Number(value || 0).toFixed(1)}%`;
}

// ==========================================
// VALIDAÇÕES
// ==========================================
export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 11;
}

// ==========================================
// GERAÇÃO DE IDs
// ==========================================
export function generateOrderNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
