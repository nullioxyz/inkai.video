import HeaderWrapper from '@/components/shared/HeaderWrapper';
import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import DemoShowcase from '@/components/shared/demo-showcase';
import Footer from '@/components/shared/footer/Footer';
import { AppContextProvider } from '@/context/AppContext';
import { interTight } from '@/utils/font';
import { ReactNode, Suspense } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interTight.variable} antialiased`}>
        <AppContextProvider>
          <Suspense>
            <SmoothScrollProvider>
              <HeaderWrapper />
              <DemoShowcase activeDemoId={1} />
              {children}
              <Footer />
            </SmoothScrollProvider>
          </Suspense>
        </AppContextProvider>
      </body>
    </html>
  );
}
