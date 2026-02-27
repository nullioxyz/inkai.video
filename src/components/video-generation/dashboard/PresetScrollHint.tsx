'use client';

import { useLocale } from '@/context/LocaleContext';

const PresetScrollHint = () => {
  const { t } = useLocale();

  return (
    <div className="pointer-events-none mb-2 flex items-center justify-end gap-1 text-[11px] font-medium tracking-wide text-secondary/45 dark:text-accent/45 uppercase">
      <span>{t('dashboard.presetsScrollHint')}</span>
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 5v14" />
        <path d="m8.5 15.5 3.5 3.5 3.5-3.5" />
      </svg>
    </div>
  );
};

export default PresetScrollHint;
