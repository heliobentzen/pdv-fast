import { useEffect, useRef, useState } from "react";
import { fetchModules } from "../services/modulesService";

export default function useModules() {
    const [modules, setModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModuleId, setOpenModuleId] = useState(null);
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const contentRef = useRef(null);

    useEffect(() => {
        async function loadModules() {
            try {
                setIsLoading(true);
                const data = await fetchModules();

                if (!Array.isArray(data)) {
                    throw new Error("Resposta de módulos inválida");
                }

                setModules(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadModules();
    }, []);

    useEffect(() => {
        if (openModuleId && contentRef.current) {
            contentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
            setMenuCollapsed(true);
        }
    }, [openModuleId]);

    function openModule(moduleId) {
        setOpenModuleId((prev) => (prev === moduleId ? null : moduleId));
    }

    function handleFinishOrder(data) {
        setOrderData(data);
        setOpenModuleId("4");
    }

    return {
        modules,
        isLoading,
        error,
        openModuleId,
        menuCollapsed,
        orderData,
        contentRef,
        openModule,
        setMenuCollapsed,
        handleFinishOrder,
    };
}
