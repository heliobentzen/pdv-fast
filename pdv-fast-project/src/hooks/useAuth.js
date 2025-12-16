import { useState, useEffect } from "react";

export const useAuth = () => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/status", {
                    method: "GET",
                    credentials: "include", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Falha ao verificar autenticação");
                }

                const data = await response.json();

                
                setAuth(!!data.user);
            } catch (error) {
                console.error("Erro ao checar autenticação:", error);
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { auth, loading };
};