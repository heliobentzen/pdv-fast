export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) {
  if (totalPages <= 1) return null;

  const half = Math.floor(maxVisiblePages / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (end - start < maxVisiblePages - 1) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  if (end - start < maxVisiblePages - 1) {
    end = Math.min(totalPages, start + maxVisiblePages - 1);
  }

  const pages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const baseButton =
    "px-3 py-1 rounded border border-orange-500 text-sm transition";

  const normal =
    "text-orange-400 hover:bg-orange-500 hover:text-white";

  const active =
    "bg-orange-500 text-white font-bold";

  const disabled =
    "opacity-40 cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-1 mt-4">

      {/* Anterior */}
      <button
        className={`${baseButton} ${normal} ${currentPage === 1 && disabled}`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {/* Primeira */}
      {start > 1 && (
        <>
          <button
            className={`${baseButton} ${normal}`}
            onClick={() => goToPage(1)}
          >
            1
          </button>
          {start > 2 && <span className="px-1 text-gray-400">…</span>}
        </>
      )}

      {/* Páginas */}
      {pages.map((page) => (
        <button
          key={page}
          aria-current={page === currentPage ? "page" : undefined}
          className={`${baseButton} ${page === currentPage ? active : normal
            }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      {/* Última */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-1 text-gray-400">…</span>
          )}
          <button
            className={`${baseButton} ${normal}`}
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Próximo */}
      <button
        className={`${baseButton} ${normal} ${currentPage === totalPages && disabled
          }`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
}
