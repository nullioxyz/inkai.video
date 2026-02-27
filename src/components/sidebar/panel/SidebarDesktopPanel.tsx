import { ReactNode } from 'react';

interface SidebarDesktopPanelProps {
  collapsed: boolean;
  children: ReactNode;
}

const SidebarDesktopPanel = ({ collapsed, children }: SidebarDesktopPanelProps) => {
  return (
    <aside
      className={`border-stroke-3 dark:border-stroke-7 bg-background-2 dark:bg-background-8 text-secondary dark:text-accent sticky top-0 hidden h-screen shrink-0 border-r transition-all duration-300 md:block ${collapsed ? 'w-[78px]' : 'w-[290px]'}`}>
      {children}
    </aside>
  );
};

export default SidebarDesktopPanel;
