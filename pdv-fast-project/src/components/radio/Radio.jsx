export default function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  className = "",
}) {
  return (
    <label
      className={`flex items-center space-x-2 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-4 w-4 accent-orange-500"
      />
      <span>{label}</span>
    </label>
  );
}
