import ModuleCard from "../Card/ModuleCard";

export default function ModuleMenu({
    modules,
    isLoading,
    error,
    openModuleId,
    menuCollapsed,
    onToggleModule,
    onExpandMenu,
}) {
    if (menuCollapsed) {
        return (
            <button
                onClick={onExpandMenu}
                className="w-full mb-4 px-4 py-2 border border-orange-500 rounded-lg bg-black text-orange-400 hover:bg-neutral-800 transition"
            >
                ☰ Expandir opções
            </button>
        );
    }

    if (isLoading) {
        return <p className="text-gray-300">Carregando módulos...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="space-y-4">
            {modules.map((module) => (
                <ModuleCard
                    key={module.id}
                    module={module}
                    isOpen={openModuleId === module.id}
                    onToggle={() => onToggleModule(module.id)}
                />
            ))}
        </div>
    );
}
