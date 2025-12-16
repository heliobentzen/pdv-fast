import { forwardRef } from "react";

const Input = forwardRef(({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  disabled = false,
  required = false,
  className = "",
  ...rest // Captura props do react-hook-form
}, ref) => {
  const id = name || label;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="font-medium text-gray-300">
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          border rounded px-3 py-2 bg-neutral-900 text-white
          focus:outline-none focus:ring-2 focus:ring-orange-500
          ${error ? "border-red-500" : "border-neutral-700"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        {...rest}
      />

      {error && (
        <span className="text-sm text-red-400">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;