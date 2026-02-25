'use client';

import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import SettingsPageContent from '@/components/dashboard/pages/SettingsPageContent';
import { useDashboard } from '@/context/dashboard-context';

const SettingsPage = () => {
  const { videos } = useDashboard();

  return (
    <DashboardContentShell videos={videos}>
      <SettingsPageContent />
    </DashboardContentShell>
  );
};

export default SettingsPage;
