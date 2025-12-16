import useModules from "../hooks/useModules";
import ModuleMenu from "../features/Components/Module/ModuleMenu";
import ModuleContainer from "../features/Components/Module/ModuleContainer";
import ModuleRender from "../features/Components/Module/ModuleRender";

export default function Module() {
    const {
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
    } = useModules();

    return (
        <div className="w-96 h-screen bg-neutral-900 text-orange-400 flex flex-col max-w-[380px]">
            {/* MENU */}
            <div className="px-4 py-6">
                <ModuleMenu
                    modules={modules}
                    isLoading={isLoading}
                    error={error}
                    openModuleId={openModuleId}
                    menuCollapsed={menuCollapsed}
                    onToggleModule={openModule}
                    onExpandMenu={() => setMenuCollapsed(false)}
                />
            </div>

            {/* CONTEÚDO */}
            <ModuleContainer contentRef={contentRef}>
                <ModuleRender
                    modules={modules}
                    openModuleId={openModuleId}
                    orderData={orderData}
                    onFinishOrder={handleFinishOrder}
                />
            </ModuleContainer>
        </div>
    );
}
