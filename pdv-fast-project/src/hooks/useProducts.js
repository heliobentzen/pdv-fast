import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                setError(null);
                const data = await api.get("/products");
                setProducts(data);
            } catch (err) {
                setError(err.message || "Erro ao carregar produtos");
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return { products, loading, error };
}
