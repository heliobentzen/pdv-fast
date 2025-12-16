export default function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Selecione...",
  disabled = false,
  id,
  className = "",
}) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="font-medium text-gray-300">
          {label}
        </label>
      )}

      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="bg-neutral-800 border border-orange-600 rounded-md px-3 py-2 text-white
                   focus:outline-none focus:ring-2 focus:ring-orange-600 disabled:opacity-50"
      >
        <option value="">{placeholder}</option>

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
