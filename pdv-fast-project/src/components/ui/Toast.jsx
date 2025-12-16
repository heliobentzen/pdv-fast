export default function Toast({ message, variant = "info" }) {
    const variants = {
        info: "bg-blue-600",
        success: "bg-green-600",
        warning: "bg-yellow-600 text-black",
        error: "bg-red-600",
    };

    return (
        <div
            className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium ${variants[variant]}`}
        >
            {message}
        </div>
    );
}
