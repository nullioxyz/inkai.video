'use client';

import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import { usePageTabTitle } from '@/components/dashboard/hooks/usePageTabTitle';
import SettingsPageContent from '@/components/settings/SettingsPageContent';
import { useDashboard } from '@/context/dashboard-context';
import { useLocale } from '@/context/LocaleContext';

const SettingsPage = () => {
  const { t } = useLocale();
  const { videos } = useDashboard();
  usePageTabTitle(t('settings.title'));

  return (
    <DashboardContentShell videos={videos}>
      <SettingsPageContent />
    </DashboardContentShell>
  );
};

export default SettingsPage;
