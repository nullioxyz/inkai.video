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
      <select
        value={locale}
        aria-label={t('locale.label')}
        onChange={(event) => setLocale(event.target.value as AppLocale)}
        className={`border-stroke-3 dark:border-stroke-7 text-secondary dark:text-accent outline-none transition focus:border-primary-400 ${
          fullWidth
            ? 'bg-background-1/40 dark:bg-background-7/40 h-11 w-full rounded-[10px] border px-4'
            : 'bg-background-1 dark:bg-background-6 h-9 rounded-[8px] border px-2'
        }`}>
        {SUPPORTED_LOCALES.map((item) => (
          <option key={item} value={item}>
            {t(`locale.${item}` as const)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LocaleSwitcher;
