import { useState, useRef, useEffect } from "react";
import ModuleCard from "../../features/Components/Card/ModuleCard";
import ModuleContent from "../../features/Components/Card//ModuleContent";
import ProductList from "../../features/Components/Card/productList";
import Order from "../../features/Components/Card/Order";

export default function Module() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModule, setOpenModule] = useState(null);
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const contentRef = useRef(null);

    //  Fetch dos módulos
    useEffect(() => {
        async function fetchModules() {
            try {
                const res = await fetch("http://localhost:3000/modules");
                if (!res.ok) throw new Error("Erro ao carregar módulos");
                const data = await res.json();
                setModules(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchModules();
    }, []);

    //  Rolagem + recolher menu ao abrir módulo
    useEffect(() => {
        if (openModule !== null && contentRef.current) {
            contentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
            setMenuCollapsed(true);
        }
    }, [openModule]);

    const renderContent = () => {
        if (!openModule) return null;

        const module = modules.find((m) => String(m.id) === String(openModule));

        console.log("➡️ MÓDULO ATUAL:", module);

        if (!module) {
            return <div className="text-red-500">Módulo não encontrado</div>;
        }

        //  LISTA DE PRODUTOS
        if (module.type === "productlist") {
            return (
                <ProductList
                    onFinishOrder={(data) => {
                        console.log("✅ PEDIDO RECEBIDO NO MODULE:", data);
                        setOrderData(data);
                        setOpenModule("4"); // ✅ AGORA É STRING
                    }}
                />
            );
        }

        //  FECHAMENTO
        if (module.type === "order") {
            return <Order order={orderData} />;
        }

        //  QUALQUER OUTRO MÓDULO
        return <ModuleContent>{module.content}</ModuleContent>;
    };


    return (
        <div className="w-96 h-screen bg-neutral-900 text-orange-400 flex flex-col max-w-[380px]">

            {/* MENU SUPERIOR */}
            <div className="overflow-y-visible px-4 py-6">

                {/* BOTÃO PARA REABRIR O MENU */}
                {menuCollapsed && (
                    <button
                        onClick={() => setMenuCollapsed(false)}
                        className="w-full mb-4 px-4 py-2 border border-orange-500 rounded-lg bg-black text-orange-400 hover:bg-neutral-800 transition"
                    >
                        ☰ Expandir opções
                    </button>
                )}

                {loading && <p className="text-gray-300">Carregando módulos...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && !menuCollapsed && (
                    <div className="space-y-4">
                        {modules.map((mod) => (
                            <ModuleCard
                                key={mod.id}
                                mod={mod}
                                isOpen={openModule === mod.id}
                                onToggle={() =>
                                    setOpenModule(openModule === mod.id ? null : mod.id)
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ÁREA DE CONTEÚDO */}
            <div
                ref={contentRef}
                className="h-auto w-full bg-black border-t-2 border-orange-600 p-4 overflow-hidden flex flex-col"
            >
                {renderContent()}
            </div>
        </div>
    );
}
