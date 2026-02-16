import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import GalleryPageContent from '@/components/dashboard/pages/GalleryPageContent';
import { DASHBOARD_VIDEO_LIBRARY } from '@/data/dashboard/videos';

const GalleryPage = () => {
  return (
    <DashboardContentShell videos={DASHBOARD_VIDEO_LIBRARY}>
      <GalleryPageContent videos={DASHBOARD_VIDEO_LIBRARY} />
    </DashboardContentShell>
  );
};

export default GalleryPage;
