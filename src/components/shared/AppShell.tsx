'use client';

import { ReactNode, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import HeaderWrapper from '@/components/shared/HeaderWrapper';
import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import Footer from '@/components/shared/footer/Footer';

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <Suspense>
      <SmoothScrollProvider>
        {!isDashboardRoute && <HeaderWrapper />}
        {children}
        {!isDashboardRoute && <Footer />}
      </SmoothScrollProvider>
    </Suspense>
  );
};

export default AppShell;
