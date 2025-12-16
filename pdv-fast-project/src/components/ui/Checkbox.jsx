export default function Checkbox({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}) {
  return (
    <label
      htmlFor={id}
      className={`
        flex items-center gap-2 cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="
          h-4 w-4
          accent-orange-500
          bg-neutral-800
          border border-orange-600
          rounded
          focus:ring-2 focus:ring-orange-600
        "
      />

      <span className="text-gray-200 text-sm">
        {label}
      </span>
    </label>
  );
}
