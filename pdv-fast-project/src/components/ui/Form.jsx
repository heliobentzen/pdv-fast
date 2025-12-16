

import Message from "./Message";

export default function Form({
    title,
    onSubmit,
    children,
    error,
    loading = false,
    actions,
}) {
    return (
        <form
            onSubmit={onSubmit}
            className="w-full max-w-md bg-neutral-900 p-6 rounded-xl shadow-lg space-y-4"
        >
            {title && (
                <h2 className="text-xl font-bold text-orange-400 text-center">
                    {title}
                </h2>
            )}

            {children}

            {error && <Message message={error} type="error" />}

            <div className="flex gap-2 pt-2">
                {actions}
            </div>

            {loading && (
                <p className="text-sm text-gray-400 text-center">
                    Processando...
                </p>
            )}
        </form>
    );
}