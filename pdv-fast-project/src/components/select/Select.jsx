import { useState } from "react";
import "./components.css";

export default function Select({ label = "Selecione", options = [] }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}

      <select className="select-input" value={value} onChange={handleChange}>
        <option value="">Escolha...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
