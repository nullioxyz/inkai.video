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
  const isLandingRoute = pathname === '/';
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/first-login') || pathname.startsWith('/auth/');

  return (
    <Suspense>
      <SmoothScrollProvider>
        <div className={isLandingRoute ? 'dark' : undefined}>
          {!isDashboardRoute && !isAuthRoute && <HeaderWrapper />}
          {children}
          {!isDashboardRoute && <Footer />}
        </div>
      </SmoothScrollProvider>
    </Suspense>
  );
};

export default AppShell;
