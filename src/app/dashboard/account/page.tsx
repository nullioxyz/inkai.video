'use client';

import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import { usePageTabTitle } from '@/components/dashboard/hooks/usePageTabTitle';
import AccountPageContent from '@/components/auth/AccountPageContent';
import { useDashboard } from '@/context/dashboard-context';
import { useLocale } from '@/context/LocaleContext';

const AccountPage = () => {
  const { t } = useLocale();
  const { videos, userName, userEmail, mustResetPassword, resetPassword } = useDashboard();
  usePageTabTitle(t('account.title'));

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
