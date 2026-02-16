import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import AccountPageContent from '@/components/dashboard/pages/AccountPageContent';
import { DASHBOARD_VIDEO_LIBRARY } from '@/data/dashboard/videos';

const AccountPage = () => {
  return (
    <DashboardContentShell videos={DASHBOARD_VIDEO_LIBRARY}>
      <AccountPageContent />
    </DashboardContentShell>
  );
};

export default AccountPage;
