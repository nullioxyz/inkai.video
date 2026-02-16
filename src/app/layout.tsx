import AppShell from '@/components/shared/AppShell';
import ThemeProvider from '@/components/shared/ThemeProvider';
import { AppContextProvider } from '@/context/AppContext';
import { LocaleProvider } from '@/context/LocaleContext';
import { LOCALE_COOKIE_NAME } from '@/i18n/config';
import { resolveLocale } from '@/i18n/resolve-locale';
import { interTight } from '@/utils/font';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import './globals.css';

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${interTight.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="inkai-theme"
          disableTransitionOnChange>
          <LocaleProvider initialLocale={locale}>
            <AppContextProvider>
              <AppShell>{children}</AppShell>
            </AppContextProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
