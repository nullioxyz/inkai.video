'use client';

import { useLocale } from '@/context/LocaleContext';
import { DailyGenerationQuota } from '@/modules/videos/domain/contracts';
import Link from 'next/link';

interface GenerationQuotaBannerProps {
  quota?: DailyGenerationQuota | null;
  quotaError?: string | null;
}

const GenerationQuotaBanner = ({ quota, quotaError }: GenerationQuotaBannerProps) => {
  const { t } = useLocale();

  if (quota?.limit_reached) {
    return (
      <div className="border-ns-red/30 bg-ns-red/10 mt-4 rounded-md border px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-tagline-2 text-ns-red">{t('quota.limitReached')}</p>
          <Link href="/contact-us" className="text-tagline-2 text-secondary dark:text-accent underline underline-offset-4">
            {t('quota.contactSupport')}
          </Link>
        </div>
      </div>
    );
  }

  if (quota?.near_limit) {
    return (
      <div className="border-ns-yellow/30 bg-ns-yellow/10 mt-4 rounded-md border px-4 py-3">
        <p className="text-tagline-2 text-secondary dark:text-accent">
          {t('quota.nearLimit', { remaining: String(quota.remaining_today) })}
        </p>
      </div>
    );
  }

  if (quotaError) {
    return (
      <div className="border-stroke-4/40 bg-background-2/80 dark:bg-background-6/60 mt-4 rounded-md border px-4 py-3">
        <p className="text-tagline-3 text-secondary/75 dark:text-accent/75">{quotaError}</p>
      </div>
    );
  }

  return null;
};

export default GenerationQuotaBanner;
