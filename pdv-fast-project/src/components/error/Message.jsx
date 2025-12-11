const Message = ({ msg, type }) => {
    const base = "mt-4 p-3 rounded-lg text-center font-semibold";

    return (
        <div
            className={
                type === "error"
                    ? `${base} bg-red-100 text-red-700 border border-red-300`
                    : `${base} bg-green-100 text-green-700 border border-green-300`
            }
        >
            {msg}
        </div>
    );
};

export default Message;