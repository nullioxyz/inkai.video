import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import CreditsPageContent from '@/components/dashboard/pages/CreditsPageContent';
import { DASHBOARD_VIDEO_LIBRARY } from '@/data/dashboard/videos';

const CreditsPage = () => {
  return (
    <DashboardContentShell videos={DASHBOARD_VIDEO_LIBRARY}>
      <CreditsPageContent videos={DASHBOARD_VIDEO_LIBRARY} />
    </DashboardContentShell>
  );
};

export default CreditsPage;
