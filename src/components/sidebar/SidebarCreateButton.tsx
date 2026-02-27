import type { MessageKey } from '@/i18n/messages';
interface SidebarCreateButtonProps {
  collapsed: boolean;
  onCreate: () => void;
  t: (key: MessageKey) => string;
}

const SidebarCreateButton = ({ collapsed, onCreate, t }: SidebarCreateButtonProps) => {
  return (
    <button
      type="button"
      onClick={onCreate}
      className="text-tagline-2 text-secondary/70 dark:text-accent/70 hover:bg-background-4 dark:hover:bg-background-7 hover:text-secondary dark:hover:text-accent flex w-full cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-left transition">
      <span className="shrink-0">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      </span>
      {!collapsed && <span>{t('sidebar.createNewVideo')}</span>}
    </button>
  );
};

export default SidebarCreateButton;
