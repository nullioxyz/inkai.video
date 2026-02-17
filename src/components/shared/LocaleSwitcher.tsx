'use client';

import { AppLocale, SUPPORTED_LOCALES } from '@/i18n/config';
import { useLocale } from '@/context/LocaleContext';

interface LocaleSwitcherProps {
  compact?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const LocaleSwitcher = ({ compact = false, className = '', fullWidth = false }: LocaleSwitcherProps) => {
  const { locale, setLocale, t } = useLocale();

  return (
    <label
      className={`text-tagline-3 text-secondary/70 dark:text-accent/70 items-center gap-2 ${
        fullWidth ? 'flex w-full' : 'inline-flex'
      } ${className}`}>
      {!compact && <span>{t('locale.label')}</span>}
      <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
        <select
          value={locale}
          aria-label={t('locale.label')}
          onChange={(event) => setLocale(event.target.value as AppLocale)}
          className={`border-stroke-3 dark:border-stroke-7 text-secondary dark:text-accent appearance-none outline-none transition focus:border-primary-400 ${
            fullWidth
              ? 'bg-background-1/40 dark:bg-background-7/40 h-11 w-full rounded-[10px] border pl-4 pr-10'
              : 'bg-background-1 dark:bg-background-6 h-9 rounded-[8px] border pl-2 pr-8'
          }`}>
          {SUPPORTED_LOCALES.map((item) => (
            <option key={item} value={item}>
              {t(`locale.${item}` as const)}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
    </label>
  );
};

export default LocaleSwitcher;
