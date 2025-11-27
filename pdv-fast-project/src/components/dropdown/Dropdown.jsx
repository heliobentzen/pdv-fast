//Componente para menus dropdown.
import { useState } from "react";
import "./components.css";


export default function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <button onClick={() => setOpen(!open)}>
        {label}
      </button>

      {open && (
        <ul className="dropdown-list">
          {items.map((item, index) => (
            <li key={index} onClick={item.onClick}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
