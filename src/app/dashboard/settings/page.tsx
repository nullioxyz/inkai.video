import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import SettingsPageContent from '@/components/dashboard/pages/SettingsPageContent';
import { DASHBOARD_VIDEO_LIBRARY } from '@/data/dashboard/videos';

const SettingsPage = () => {
  return (
    <DashboardContentShell videos={DASHBOARD_VIDEO_LIBRARY}>
      <SettingsPageContent />
    </DashboardContentShell>
  );
};

export default SettingsPage;
