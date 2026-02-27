import { ReactNode } from 'react';
import SidebarDesktopPanel from './panel/SidebarDesktopPanel';
import SidebarMobileOverlay from './panel/SidebarMobileOverlay';

interface SidebarPanelProps {
  mobile: boolean;
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
  children: ReactNode;
}

const SidebarPanel = ({ mobile, collapsed, mobileOpen, onMobileClose, children }: SidebarPanelProps) => {
  if (!mobile) {
    return <SidebarDesktopPanel collapsed={collapsed}>{children}</SidebarDesktopPanel>;
  }

  return <SidebarMobileOverlay mobileOpen={mobileOpen} onMobileClose={onMobileClose}>{children}</SidebarMobileOverlay>;
};

export default SidebarPanel;
