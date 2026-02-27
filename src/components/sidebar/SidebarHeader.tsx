import type { MessageKey } from '@/i18n/messages';
import SidebarLogo from './SidebarLogo';
import SidebarToggleButton from './SidebarToggleButton';

interface SidebarHeaderProps {
  mobile: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
  t: (key: MessageKey) => string;
}

const SidebarHeader = ({ mobile, collapsed, onToggle, onMobileClose, t }: SidebarHeaderProps) => {
  return (
    <div className="border-stroke-3 dark:border-stroke-7 flex items-center justify-between border-b px-4 py-4">
      <SidebarLogo collapsed={collapsed} />
      <SidebarToggleButton mobile={mobile} collapsed={collapsed} onDesktopToggle={onToggle} onMobileClose={onMobileClose} t={t} />
    </div>
  );
};

export default SidebarHeader;
