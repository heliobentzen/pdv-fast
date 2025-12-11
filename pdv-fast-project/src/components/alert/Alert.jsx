//Componente para exibir alertas.

import { useNavigate } from 'react-router-dom';

export default function Alert() {
const navigate = useNavigate();

 const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <h3>O produto atingiu o estoque mínimo.</h3>
      <button 
      className="block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      onClick={handleGoBack}
      >Voltar para a Página Anterior
      </button>
    </div>
  );
}