export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-neutral-800
        border border-orange-600
        rounded-lg
        p-3
        shadow
        ${className}
      `}
    >
      {children}
    </div>
  );
}
