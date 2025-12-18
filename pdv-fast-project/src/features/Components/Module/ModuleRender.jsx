import { Suspense } from "react";
import ModuleContent from "../Card/ModuleContent";
import { moduleRegistry } from "./moduleRegistry";

export default function ModuleRender({
    modules,
    openModuleId,
    orderData,
    onFinishOrder,
}) {
    if (!openModuleId) return null;

    const module = modules.find(
        (m) => String(m.id) === String(openModuleId)
    );

    if (!module) {
        return (
            <div className="text-red-500">
                Módulo não encontrado
            </div>
        );
    }

    const LazyComponent = moduleRegistry[module.type];

    // 🔹 Se existir componente lazy registrado
    if (LazyComponent) {
        return (
            <Suspense
                fallback={
                    <ModuleContent>
                        Carregando módulo...
                    </ModuleContent>
                }
            >
                <LazyComponent
                    order={orderData}
                    onFinishOrder={onFinishOrder}
                />
            </Suspense>
        );
    }

    // 🔹 Fallback para módulos simples (texto / info)
    return (
        <ModuleContent>
            {module.content}
        </ModuleContent>
    );
}
