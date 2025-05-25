interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationControlsProps) {
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-6 text-base sm:text-lg">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded bg-[var(--color-border)] hover:bg-[var(--color-muted)]/20 transition disabled:opacity-40"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded bg-[var(--color-border)] hover:bg-[var(--color-muted)]/20 transition disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
