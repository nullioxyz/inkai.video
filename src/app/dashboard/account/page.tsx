'use client';

import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import AccountPageContent from '@/components/auth/AccountPageContent';
import { useDashboard } from '@/context/dashboard-context';

const AccountPage = () => {
  const { videos, userName, userEmail, mustResetPassword, resetPassword } = useDashboard();

  return (
    <DashboardContentShell videos={videos}>
      <AccountPageContent
        initialName={userName}
        initialEmail={userEmail}
        mustResetPassword={mustResetPassword}
        onResetPassword={resetPassword}
      />
    </DashboardContentShell>
  );
};

export default AccountPage;
