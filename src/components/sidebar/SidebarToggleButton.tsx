import type { MessageKey } from '@/i18n/messages';
interface SidebarToggleButtonProps {
  mobile: boolean;
  collapsed: boolean;
  onDesktopToggle: () => void;
  onMobileClose: () => void;
  t: (key: MessageKey) => string;
}

const SidebarToggleButton = ({ mobile, collapsed, onDesktopToggle, onMobileClose, t }: SidebarToggleButtonProps) => {
  if (mobile) {
    return (
      <button
        type="button"
        onClick={onMobileClose}
        aria-label={t('sidebar.hideSidebar')}
        className="text-secondary/70 dark:text-accent/70 hover:bg-background-4 dark:hover:bg-background-7 hover:text-secondary dark:hover:text-accent rounded-sm p-1.5 transition">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onDesktopToggle}
      aria-label={collapsed ? t('sidebar.showSidebar') : t('sidebar.hideSidebar')}
      className="text-secondary/70 dark:text-accent/70 hover:bg-background-4 dark:hover:bg-background-7 hover:text-secondary dark:hover:text-accent rounded-sm p-1.5 transition">
      {collapsed ? (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m9 5 7 7-7 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m15 5-7 7 7 7" />
        </svg>
      )}
    </button>
  );
};

export default SidebarToggleButton;
