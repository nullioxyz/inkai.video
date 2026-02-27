'use client';

import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import { usePageTabTitle } from '@/components/dashboard/hooks/usePageTabTitle';
import GalleryPageContent from '@/components/gallery/GalleryPageContent';
import { useDashboard } from '@/context/dashboard-context';
import { useLocale } from '@/context/LocaleContext';

const GalleryPage = () => {
  const { t } = useLocale();
  const { videos, loadingJobs } = useDashboard();
  usePageTabTitle(t('gallery.title'));

  return (
    <DashboardContentShell videos={videos}>
      <GalleryPageContent videos={videos} loading={loadingJobs} />
    </DashboardContentShell>
  );
};

export default GalleryPage;
