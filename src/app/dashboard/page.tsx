import DashboardWorkspace from '@/components/dashboard/DashboardWorkspace';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Inkai',
};

const DashboardPage = () => {
  return <DashboardWorkspace />;
};

export default DashboardPage;
