const styles = {
    error: "bg-red-100 text-red-700 border-red-300",
    success: "bg-green-100 text-green-700 border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
};

export default function Message({ message, type = "info" }) {
    if (!message) return null;

    return (
        <div
            className={`mt-4 p-3 rounded-lg text-center font-semibold border ${styles[type]}`}
        >
            {message}
        </div>
    );
}
