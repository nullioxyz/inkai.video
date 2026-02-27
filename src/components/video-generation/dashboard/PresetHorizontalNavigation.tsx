'use client';

import { useLocale } from '@/context/LocaleContext';

interface PresetHorizontalNavigationProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

const navButtonClassName =
  'border-stroke-3 dark:border-stroke-7 bg-background-1/70 dark:bg-background-6/80 text-secondary dark:text-accent hover:bg-background-2 dark:hover:bg-background-5 inline-flex h-8 w-8 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-45';

const PresetHorizontalNavigation = ({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
}: PresetHorizontalNavigationProps) => {
  const { t } = useLocale();

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        aria-label={t('dashboard.presetsScrollLeft')}
        title={t('dashboard.presetsScrollLeft')}
        disabled={!canScrollLeft}
        onClick={onScrollLeft}
        className={navButtonClassName}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m15 5-7 7 7 7" />
        </svg>
      </button>

      <button
        type="button"
        aria-label={t('dashboard.presetsScrollRight')}
        title={t('dashboard.presetsScrollRight')}
        disabled={!canScrollRight}
        onClick={onScrollRight}
        className={navButtonClassName}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default PresetHorizontalNavigation;
