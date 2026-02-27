interface UploadGenerateButtonProps {
  disabled: boolean;
  ariaLabel: string;
  title: string;
  onClick: () => void;
}

const UploadGenerateButton = ({ disabled, ariaLabel, title, onClick }: UploadGenerateButtonProps) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="bg-secondary dark:bg-accent hover:bg-secondary/90 dark:hover:bg-accent/90 absolute right-0 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-transparent transition disabled:cursor-not-allowed disabled:opacity-40">
      <svg viewBox="0 0 20 20" fill="none" className="size-3.5 shrink-0">
        <path
          d="M7.08301 5.12496V14.875C7.08301 15.3158 7.56995 15.5815 7.94058 15.3404L14.8982 10.7154C15.2299 10.4946 15.2299 10.0054 14.8982 9.78457L7.94058 5.15957C7.56995 4.91846 7.08301 5.18416 7.08301 5.62496V5.12496Z"
          className="fill-accent dark:fill-secondary"
        />
      </svg>
    </button>
  );
};

export default UploadGenerateButton;
