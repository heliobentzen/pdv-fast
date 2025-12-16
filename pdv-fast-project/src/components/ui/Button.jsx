export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {
  const baseStyle =
    "px-4 py-2 rounded font-semibold transition focus:outline-none border";

  const variants = {
    primary:
      "bg-orange-500 border-orange-500 text-white hover:bg-orange-600",
    secondary:
      "bg-neutral-800 border-orange-500 text-orange-400 hover:bg-neutral-700",
    danger:
      "bg-red-600 border-red-600 text-white hover:bg-red-700",
    ghost:
      "bg-transparent border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
