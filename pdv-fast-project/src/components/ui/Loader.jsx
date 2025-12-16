export default function Loader({
  show = true,
  text = "Carregando...",
  fullScreen = false,
}) {
  if (!show) return null;

  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-3
        ${fullScreen ? "fixed inset-0 bg-black/80 z-50" : "py-6"}
      `}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />

      <p className="text-gray-300 text-sm">
        {text}
      </p>
    </div>
  );
}
