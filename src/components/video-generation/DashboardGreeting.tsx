'use client';

import { useLocale } from '@/context/LocaleContext';
import { useEffect, useState } from 'react';

const DashboardGreeting = () => {
  const { t } = useLocale();
  const [userName, setUserName] = useState('Rafael');

  useEffect(() => {
    try {
      const storedName = localStorage.getItem('inkai-user-name');
      if (storedName && storedName.trim()) {
        setUserName(storedName.trim());
      }
    } catch {
      // Keep fallback name when storage is unavailable.
    }
  }, []);

  return (
    <header className="text-center">
      <h1 className="text-heading-5 text-secondary dark:text-accent md:text-heading-4 font-normal">
        {t('dashboard.greeting', { name: userName })}
      </h1>
    </header>
  );
};

export default DashboardGreeting;
