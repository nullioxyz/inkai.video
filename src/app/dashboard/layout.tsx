import { DashboardProvider } from '@/context/dashboard-context';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardProvider>{children}</DashboardProvider>;
};

export default DashboardLayout;
