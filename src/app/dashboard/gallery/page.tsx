'use client';

import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import GalleryPageContent from '@/components/gallery/GalleryPageContent';
import { useDashboard } from '@/context/dashboard-context';

const GalleryPage = () => {
  const { videos, loadingJobs } = useDashboard();

  return (
    <DashboardContentShell videos={videos}>
      <GalleryPageContent videos={videos} loading={loadingJobs} />
    </DashboardContentShell>
  );
};

export default GalleryPage;
