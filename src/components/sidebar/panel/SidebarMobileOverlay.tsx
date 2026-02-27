import { ReactNode } from 'react';

interface SidebarMobileOverlayProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  children: ReactNode;
}

const SidebarMobileOverlay = ({ mobileOpen, onMobileClose, children }: SidebarMobileOverlayProps) => {
  return (
    <div className={`md:hidden fixed inset-0 z-[60] transition ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!mobileOpen}>
      <button
        type="button"
        aria-label="Close menu"
        onClick={onMobileClose}
        className={`absolute inset-0 bg-secondary/25 transition-opacity dark:bg-black/45 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        className={`border-stroke-3 dark:border-stroke-7 bg-background-2 dark:bg-background-8 text-secondary dark:text-accent relative h-full w-[85%] max-w-[320px] border-r shadow-1 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {children}
      </aside>
    </div>
  );
};

export default SidebarMobileOverlay;
