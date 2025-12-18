export default function ConfirmDialog({
  open,
  title = "Confirmação",
  message = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-neutral-900 border border-orange-600 rounded-xl p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-xl font-bold text-orange-500 mb-2">{title}</h3>

        <p className="text-neutral-300 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-orange-600 text-orange-400 hover:bg-neutral-800 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
