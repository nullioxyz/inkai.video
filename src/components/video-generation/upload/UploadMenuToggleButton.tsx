interface UploadMenuToggleButtonProps {
  disabled: boolean;
  ariaLabel: string;
  onClick: () => void;
}

const UploadMenuToggleButton = ({ disabled, ariaLabel, onClick }: UploadMenuToggleButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className="border-stroke-3 dark:border-stroke-7 bg-background-1/70 dark:bg-background-6/70 text-secondary dark:text-accent hover:bg-background-1 dark:hover:bg-background-6 inline-flex h-9 w-9 items-center justify-center rounded-[10px] border transition disabled:cursor-not-allowed disabled:opacity-50">
      <svg viewBox="0 0 20 20" fill="none" className="stroke-current size-4">
        <rect x="3.5" y="4.5" width="13" height="11" rx="1.8" strokeWidth="1.5" />
        <path d="M3.5 12.2L7.2 9L10.4 11.5L12.7 9.6L16.5 12.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8.2" cy="7.8" r="1.1" strokeWidth="1.5" />
      </svg>
    </button>
  );
};

export default UploadMenuToggleButton;
