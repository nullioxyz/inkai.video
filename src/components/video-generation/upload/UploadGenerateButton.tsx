interface UploadGenerateButtonProps {
  disabled: boolean;
  loading: boolean;
  ariaLabel: string;
  title: string;
  label: string;
  onClick: () => void;
}

const UploadGenerateButton = ({ disabled, loading, ariaLabel, title, label, onClick }: UploadGenerateButtonProps) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="bg-secondary dark:bg-accent hover:bg-secondary/90 dark:hover:bg-accent/90 inline-flex h-9 min-w-[144px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-transparent px-4 transition disabled:cursor-not-allowed disabled:opacity-40">
      {loading ? (
        <span className="border-accent dark:border-secondary size-3.5 animate-spin rounded-full border-2 border-t-transparent" aria-hidden="true" />
      ) : (
        <svg viewBox="0 0 20 20" fill="none" className="size-3.5 shrink-0" aria-hidden="true">
          <path
            d="M7.08301 5.12496V14.875C7.08301 15.3158 7.56995 15.5815 7.94058 15.3404L14.8982 10.7154C15.2299 10.4946 15.2299 10.0054 14.8982 9.78457L7.94058 5.15957C7.56995 4.91846 7.08301 5.18416 7.08301 5.62496V5.12496Z"
            className="fill-accent dark:fill-secondary"
          />
        </svg>
      )}
      <span className="text-tagline-3 text-accent dark:text-secondary font-medium">{label}</span>
    </button>
  );
};

export default UploadGenerateButton;
