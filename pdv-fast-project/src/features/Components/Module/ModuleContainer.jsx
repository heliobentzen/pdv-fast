export default function ModuleContainer({ contentRef, children }) {
    return (
        <div
            ref={contentRef}
            className="w-full bg-black border-t-2 border-orange-600 p-4 flex flex-col"
        >
            {children}
        </div>
    );
}
