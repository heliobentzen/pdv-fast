//Componente de checkbox.
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 accent-orange-500"
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
