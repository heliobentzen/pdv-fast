import ModuleContent from "../Card/ModuleContent";
import ProductList from "../Card/productList";
import Order from "../Card/Order";

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
        return <div className="text-red-500">Módulo não encontrado</div>;
    }

    if (module.type === "productlist") {
        return <ProductList onFinishOrder={onFinishOrder} />;
    }

    if (module.type === "order") {
        return <Order order={orderData} />;
    }

    return <ModuleContent>{module.content}</ModuleContent>;
}
