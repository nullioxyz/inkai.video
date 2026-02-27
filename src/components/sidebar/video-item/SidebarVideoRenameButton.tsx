interface SidebarVideoRenameButtonProps {
  label: string;
  onClick: () => void;
}

const SidebarVideoRenameButton = ({ label, onClick }: SidebarVideoRenameButtonProps) => {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className="text-secondary/50 hover:text-secondary dark:text-accent/50 dark:hover:text-accent shrink-0 transition"
      aria-label={label}
      title={label}>
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m4 20 4.2-.7L19 8.5a1.7 1.7 0 0 0 0-2.4l-1.1-1.1a1.7 1.7 0 0 0-2.4 0L4.8 15.8 4 20Z" />
        <path d="m13.5 6.5 4 4" />
      </svg>
    </button>
  );
};

export default SidebarVideoRenameButton;
