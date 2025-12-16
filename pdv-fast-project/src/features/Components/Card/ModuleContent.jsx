export default function ModuleContent({ children, moduleId }) {
    if (!children) return null;

    return (
        <div
            id={`module-content-${moduleId}`}
            role="region"
            className="text-gray-200 space-y-3"
        >
            <div className="bg-neutral-900 p-3 rounded-md border border-orange-500">
                {children}
            </div>
        </div>
    );
}
