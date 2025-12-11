export default function ModuleContent({ children }) {
    return (
        <div className="text-gray-200 space-y-3">
            <p className="bg-neutral-900 p-3 rounded-md border border-orange-500">
                {children}
            </p>
        </div>
    );
}
