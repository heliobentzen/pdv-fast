//Componente para exibir estado de carregamento (loader).
import React from 'react';

const Loader = ({ isLoading = true }) => {
  if (!isLoading) { 
    return null;
  }

  return (
    <div className="loader-container" aria-live="polite" aria-busy="true">
      <div className="spinner"></div>
      <p className="loading-text">Carregando dados...</p>
    </div>
  );
};

export default Loader;//Componente para exibir estado de carregamento (loader).
