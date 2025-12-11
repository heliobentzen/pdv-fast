//Componente para exibir mensagens de erro.

import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();

 const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div class="line-b fixed inset-x-0 top-0 z-20 mr-[calc(100%-100vw)] flex h-14 items-center justify-between p-4 bg-gray-300 text-white font-bold py-2 px-4 rounded">
      <h3>Algo deu errado</h3>
      <button 
      className="block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      onClick={handleGoBack}
      >Voltar para a Página Anterior
      </button>
    </div>
  );
}