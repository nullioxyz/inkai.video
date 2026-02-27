interface UploadPreviewRemoveButtonProps {
  disabled: boolean;
  ariaLabel: string;
  onRemove: () => void;
}

const UploadPreviewRemoveButton = ({ disabled, ariaLabel, onRemove }: UploadPreviewRemoveButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onRemove}
      aria-label={ariaLabel}
      className="bg-background-1/90 dark:bg-background-8/90 text-secondary dark:text-accent hover:bg-background-1 dark:hover:bg-background-8 absolute right-1.5 top-1.5 inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-[6px] text-xs leading-none transition disabled:cursor-not-allowed disabled:opacity-50">
      x
    </button>
  );
};

export default UploadPreviewRemoveButton;
