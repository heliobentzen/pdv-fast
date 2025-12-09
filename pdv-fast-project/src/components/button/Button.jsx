// Botão simples reutilizável
const baseStyle =
  "px-4 py-2 rounded font-semibold transition focus:outline-none border border-orange";

// Botão Salvar
export const SalvarButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`${baseStyle} bg-orange-500 text-white hover:bg-orange-600`}
  >
    Salvar
  </button>
);

// Botão Adicionar
export const AdicionarButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`${baseStyle} bgorange-500 text-white hover:bg-orange-600`}
  >
    Adicionar
  </button>
);

// Botão Cancelar
export const CancelarButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`${baseStyle} bg-orange-500 text-white hover:bg-orange-600`}
  >
    Cancelar
  </button>
);

// Botão Finalizar
export const FinalizarButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`${baseStyle} bg-orange-500 text-white hover:bg-orange-600`}
  >
    Finalizar
  </button>
);

// Botão Voltar
export const VoltarButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`${baseStyle} bg-orange-500 text-white hover:bg-orange-600`}
  >
    Voltar
  </button>
);

