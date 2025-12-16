import { createContext, useEffect, useState } from "react";

export const MenuContext = createContext(null);

export function MenuProvider({ children }) {
    const [modules, setModules] = useState([]);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchModules() {
            try {
                const response = await fetch("http://localhost:3000/modules");
                if (!response.ok) throw new Error("Erro ao carregar módulos");

                const data = await response.json();
                setModules(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchModules();
    }, []);

    function openModule(moduleId) {
        setActiveModuleId(moduleId);
        setIsMenuCollapsed(true);
    }

    function closeModule() {
        setActiveModuleId(null);
        setIsMenuCollapsed(false);
    }

    return (
        <MenuContext.Provider
            value={{
                modules,
                activeModuleId,
                isMenuCollapsed,
                isLoading,
                error,
                openModule,
                closeModule,
                setIsMenuCollapsed,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
}
