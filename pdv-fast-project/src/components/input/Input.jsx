//Componente genérico de campo de entrada.
const Input = ({ label, value, onChange, type = "text", placeholder }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-orange-500"
      />
    </div>
  );
};

export default Input;//Componente genérico de campo de entrada.
