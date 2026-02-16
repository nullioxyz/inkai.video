'use client';

import { useLocale } from '@/context/LocaleContext';

const DashboardGreeting = () => {
  const { t } = useLocale();

  return (
    <header className="text-center">
      <h1 className="text-heading-5 text-secondary dark:text-accent md:text-heading-4 font-normal">{t('dashboard.greeting')}</h1>
    </header>
  );
};

export default DashboardGreeting;
