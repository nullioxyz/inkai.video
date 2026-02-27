interface MobileTopBarMenuButtonProps {
  onOpenMenu: () => void;
}

const MobileTopBarMenuButton = ({ onOpenMenu }: MobileTopBarMenuButtonProps) => {
  return (
    <button
      type="button"
      onClick={onOpenMenu}
      aria-label="Open menu"
      className="text-secondary dark:text-accent hover:bg-background-4 dark:hover:bg-background-8 rounded-sm p-2 transition">
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    </button>
  );
};

export default MobileTopBarMenuButton;
