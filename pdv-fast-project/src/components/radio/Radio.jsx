//Componente de radio button.
const Radio = ({ label, name, value, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-4 w-4 accent-orange-500"
      />
      <span>{label}</span>
    </label>
  );
};

export default Radio;