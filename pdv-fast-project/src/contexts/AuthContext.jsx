import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // 
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch {
                localStorage.removeItem("user");
            }
        }

        setIsAuthLoading(false);
    }, []);

    // 🔹 Login (chamado após sucesso no useLogin)
    function login(userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    }

    // 🔹 Logout
    function logout() {
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isAuthLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
