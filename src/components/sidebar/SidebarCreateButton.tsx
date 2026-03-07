import type { MessageKey } from '@/i18n/messages';
interface SidebarCreateButtonProps {
  collapsed: boolean;
  creditBalance: number;
  onCreate: () => void;
  t: (key: MessageKey) => string;
}

const SidebarCreateButton = ({ collapsed, creditBalance, onCreate, t }: SidebarCreateButtonProps) => {
  return (
    <div className="space-y-2 pb-2">
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

      <div
        aria-label={`${t('sidebar.availableCredits')}: ${creditBalance}`}
        className={`border-stroke-3 dark:border-stroke-7 bg-background-2/80 dark:bg-background-6/80 flex rounded-sm border ${
          collapsed ? 'justify-center px-2 py-2' : 'items-center justify-between px-3 py-2'
        }`}>
        {!collapsed ? <span className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('sidebar.availableCredits')}</span> : null}
        <span className="text-tagline-2 text-secondary dark:text-accent font-medium">{creditBalance}</span>
      </div>
    </div>
  );
};

export default SidebarCreateButton;
