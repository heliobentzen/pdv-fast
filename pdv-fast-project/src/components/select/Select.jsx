//Componente para seleção de opções.
import "./components.css";

export default function Select({ label, options, value, onChange }) {
  return (
    <div className="select-container">
      {label && <label>{label}</label>}

      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Selecione...</option>

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
