import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  label,
  items = [],
  align = "right",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-orange-500 text-orange-400 hover:bg-neutral-800 transition"
      >
        {label}
      </button>

      {open && (
        <ul
          className={`absolute mt-2 min-w-[160px] bg-neutral-800 border border-orange-500 rounded-md shadow-lg z-50
            ${align === "left" ? "left-0" : "right-0"}`}
        >
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-orange-400 hover:bg-neutral-700 cursor-pointer transition"
            >
              {item.icon && <item.icon size={16} />}
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
