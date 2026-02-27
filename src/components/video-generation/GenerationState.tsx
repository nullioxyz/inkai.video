'use client';

import { useLocale } from '@/context/LocaleContext';

const GenerationState = () => {
  const { t } = useLocale();

  return (
    <section className="border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 shadow-1 flex min-h-[220px] items-center justify-center rounded-[14px] border p-8 text-center">
      <p className="text-heading-6 text-secondary dark:text-accent font-normal md:text-heading-5">{t('dashboard.generating')}</p>
    </section>
  );
};

export default GenerationState;
