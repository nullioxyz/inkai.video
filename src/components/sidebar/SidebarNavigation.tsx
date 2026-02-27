import type { MessageKey } from '@/i18n/messages';
import Link from 'next/link';
import { menuItems } from './menu-items';
import SidebarCreateButton from './SidebarCreateButton';

interface SidebarNavigationProps {
  collapsed: boolean;
  pathname: string;
  t: (key: MessageKey) => string;
  onCreate: () => void;
  onLogout: () => void;
}

const isMenuItemActive = (pathname: string, menuKey: string, href: string) => {
  if (menuKey === 'gallery') {
    return pathname.startsWith('/dashboard/gallery') || pathname.startsWith('/dashboard/video/');
  }

  return pathname.startsWith(href);
};

const SidebarNavigation = ({ collapsed, pathname, t, onCreate, onLogout }: SidebarNavigationProps) => {
  return (
    <nav aria-label="Dashboard navigation" className="border-stroke-3 dark:border-stroke-7 space-y-1 border-b px-3 py-4">
      <SidebarCreateButton collapsed={collapsed} onCreate={onCreate} t={t} />

      {menuItems.map((item) => {
        const isActive = isMenuItemActive(pathname, item.key, item.href);

        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={() => {
              if (item.key === 'logout') {
                onLogout();
              }
            }}
            className={`text-tagline-2 flex items-center gap-3 rounded-sm px-3 py-2 transition ${
              isActive
                ? 'bg-background-4 dark:bg-background-7 text-secondary dark:text-accent'
                : 'text-secondary/70 dark:text-accent/70 hover:bg-background-4 dark:hover:bg-background-7 hover:text-secondary dark:hover:text-accent'
            }`}>
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && <span>{t(item.labelKey)}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;
