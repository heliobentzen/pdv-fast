import { ChevronDown, ChevronUp } from "lucide-react";

export default function ModuleCard({ module, isOpen, onToggle }) {
    if (!module) return null;

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`module-content-${module.id}`}
            className="w-full bg-black border border-orange-600 p-4 rounded-xl
                       flex justify-between items-center hover:bg-neutral-800 transition"
        >
            <div className="flex items-center gap-3">
                <div
                    className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center
                               text-purple-700 font-semibold"
                >
                    {module.initial}
                </div>

                <div className="text-left">
                    <p className="text-orange-400 font-semibold">
                        {module.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {module.subtitle}
                    </p>
                </div>
            </div>

            {isOpen ? (
                <ChevronUp size={22} className="text-gray-400" />
            ) : (
                <ChevronDown size={22} className="text-gray-400" />
            )}
        </button>
    );
}
