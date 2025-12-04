// Botão simples reutilizável
export default function Button({ texto, onClick, tipo = "button" }) {
  return (
    <button type={tipo} onClick={onClick} className="btn">
      {texto}
    </button>
  );
}
