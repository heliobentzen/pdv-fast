//Componente para paginação de listas.
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = [];
  const halfVisible = Math.floor(maxVisiblePages / 2);
  
  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (endPage - startPage < maxVisiblePages - 1) {
    endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {startPage > 1 && (
        <>
          <button className="pagination-button" onClick={() => onPageChange(1)}>1</button>
          {startPage > 2 && <span className="ellipsis">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
          <button className="pagination-button" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;//Componente para paginação de listas.
