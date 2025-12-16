const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = "ApiError";
    }
}

async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new ApiError(
                    errorData.message || `HTTP ${response.status}`,
                    response.status,
                    errorData
                );
            }

            return response;
        } catch (error) {
            // Se for o último retry, lança o erro
            if (i === retries - 1) throw error;

            // Aguarda antes do próximo retry (exponential backoff)
            await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

export const api = {
    async get(endpoint) {
        const response = await fetchWithRetry(`${BASE_URL}${endpoint}`);
        return response.json();
    },

    async post(endpoint, data) {
        const response = await fetchWithRetry(`${BASE_URL}${endpoint}`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async patch(endpoint, data) {
        const response = await fetchWithRetry(`${BASE_URL}${endpoint}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async put(endpoint, data) {
        const response = await fetchWithRetry(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async delete(endpoint) {
        const response = await fetchWithRetry(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
        });
        return response.json();
    },
};

// Hook React para fazer requests
import { useState, useEffect } from "react";

export function useApi(endpoint, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const result = await api.get(endpoint);
                if (!cancelled) setData(result);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [endpoint]);

    return { data, loading, error };
}