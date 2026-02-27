import { nextPage, previousPage } from '@/modules/credits/application/table-state';

interface CreditsPaginationProps {
  currentPage: number;
  lastPage: number;
  loading: boolean;
  prevLabel: string;
  nextLabel: string;
  summaryLabel: string;
  onPageChange: (page: number) => void;
}

const CreditsPagination = ({ currentPage, lastPage, loading, prevLabel, nextLabel, summaryLabel, onPageChange }: CreditsPaginationProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[100px] items-center justify-between">
        <button
          type="button"
          onClick={() => onPageChange(previousPage(currentPage))}
          disabled={currentPage <= 1 || loading}
          aria-label={prevLabel}
          title={prevLabel}
          className="text-secondary dark:text-accent inline-flex h-7 w-7 items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-35">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>

        <span className="text-tagline-3 text-secondary/70 dark:text-accent/70 min-w-[40px] text-center font-medium" title={summaryLabel}>
          {currentPage}/{lastPage}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(nextPage(currentPage, lastPage))}
          disabled={currentPage >= lastPage || loading}
          aria-label={nextLabel}
          title={nextLabel}
          className="text-secondary dark:text-accent inline-flex h-7 w-7 items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-35">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CreditsPagination;
