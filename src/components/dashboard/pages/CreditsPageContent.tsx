'use client';

import PageSectionHeader from '@/components/dashboard/common/PageSectionHeader';
import { CreditVideoGenerationViewModel } from '@/context/dashboard-context';
import { useLocale } from '@/context/LocaleContext';
import { nextPage, normalizeCreditStatus, previousPage, shouldShowAuditSubline } from '@/modules/credits/application/table-state';
import { Fragment } from 'react';

interface CreditsPageContentProps {
  creditBalance: number;
  videoGenerations: CreditVideoGenerationViewModel[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  lastPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

const CreditsPageContent = ({ creditBalance, videoGenerations, loading, error, currentPage, lastPage, total, onPageChange }: CreditsPageContentProps) => {
  const { t, intlLocale } = useLocale();
  const usedCredits = videoGenerations.reduce((sum, row) => sum + row.creditsUsed, 0);
  const createdLabel = (isoDate: string | null) => (isoDate ? new Date(isoDate).toLocaleString(intlLocale) : '-');
  const boolLabel = (value: boolean) => (value ? t('credits.yes') : t('credits.no'));
  const statusLabel = (status: string) => {
    const normalizedStatus = normalizeCreditStatus(status);
    const mapped = t(`status.${normalizedStatus}`);

    if (mapped && mapped.trim() !== '') {
      return mapped;
    }

    return status;
  };

  return (
    <section className="space-y-6">
      <PageSectionHeader title={t('credits.title')} description={t('credits.description')} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="border-stroke-3 dark:border-stroke-7 rounded-[12px] border p-4">
          <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('credits.used')}</p>
          <p className="text-heading-5 text-secondary dark:text-accent font-normal">{usedCredits}</p>
        </article>
        <article className="border-stroke-3 dark:border-stroke-7 rounded-[12px] border p-4">
          <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('credits.remaining')}</p>
          <p className="text-heading-5 text-secondary dark:text-accent font-normal">{creditBalance}</p>
        </article>
      </div>

      <div className="border-stroke-3 dark:border-stroke-7 overflow-x-auto rounded-[12px] border">
        <table className="min-w-full">
          <thead>
            <tr className="border-stroke-3 dark:border-stroke-7 border-b">
              <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">
                {t('credits.table.video')}
              </th>
              <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">
                {t('credits.table.used')}
              </th>
              <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">
                {t('credits.table.status')}
              </th>
              <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">
                {t('credits.table.output')}
              </th>
              <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">
                {t('credits.table.createdAt')}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-tagline-2 text-secondary/60 dark:text-accent/60 px-4 py-6 text-center">
                  {t('credits.loading')}
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="text-tagline-2 text-ns-red px-4 py-6 text-center">
                  {error}
                </td>
              </tr>
            ) : videoGenerations.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-tagline-2 text-secondary/60 dark:text-accent/60 px-4 py-6 text-center">
                  -
                </td>
              </tr>
            ) : (
              videoGenerations.map((row) => (
                <Fragment key={row.inputId}>
                  <tr className="border-stroke-3 dark:border-stroke-7 border-b">
                    <td className="text-tagline-2 text-secondary dark:text-accent px-4 py-3">{row.title || row.presetName || '-'}</td>
                    <td className="text-tagline-2 text-secondary dark:text-accent px-4 py-3">{row.creditsUsed}</td>
                    <td className="text-tagline-2 text-secondary/70 dark:text-accent/70 px-4 py-3">{statusLabel(row.status)}</td>
                    <td className="text-tagline-2 text-secondary/70 dark:text-accent/70 px-4 py-3">
                      {row.outputVideoUrl ? (
                        <a
                          href={row.outputVideoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
                          {t('credits.openVideo')}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="text-tagline-2 text-secondary/70 dark:text-accent/70 px-4 py-3">{createdLabel(row.createdAt)}</td>
                  </tr>
                  {shouldShowAuditSubline(row) && (
                    <tr className="border-stroke-3/50 dark:border-stroke-7/50 border-b">
                      <td colSpan={5} className="bg-background-2/60 dark:bg-background-8/40 px-4 py-3">
                        <div className="space-y-2">
                          <p className="text-tagline-3 text-secondary/70 dark:text-accent/70">
                            <span className="font-medium">{t('credits.table.debited')}:</span> {row.creditsDebited} |{' '}
                            <span className="font-medium">{t('credits.table.refunded')}:</span> {row.creditsRefunded} |{' '}
                            <span className="font-medium">{t('credits.table.refundFlag')}:</span> {boolLabel(row.isRefunded)}
                          </p>
                          <p className="text-tagline-3 text-secondary/70 dark:text-accent/70">
                            <span className="font-medium">{t('credits.table.predictionStatus')}:</span>{' '}
                            {row.predictionStatus ? statusLabel(row.predictionStatus) : '-'} |{' '}
                            <span className="font-medium">{t('credits.table.details')}:</span>{' '}
                            {row.failureReason || row.cancellationReason || row.predictionErrorMessage || '-'}
                          </p>

                          <div className="space-y-1.5 pt-1">
                            <p className="text-tagline-3 text-secondary/80 dark:text-accent/80 font-medium">{t('credits.audit.title')}</p>
                            {row.creditEvents.length === 0 ? (
                              <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">-</p>
                            ) : (
                              row.creditEvents.map((event) => (
                                <p
                                  key={`${row.inputId}-${event.ledgerId ?? event.referenceType}-${event.delta}-${event.createdAt ?? 'no-date'}`}
                                  className="text-tagline-3 text-secondary/70 dark:text-accent/70">
                                  [{createdLabel(event.createdAt)}] {event.type || event.operation || '-'} | delta {event.delta} | balance{' '}
                                  {event.balanceAfter ?? '-'} | ref {event.referenceType || '-'}#{event.referenceId ?? '-'} | {event.reason || '-'}
                                </p>
                              ))
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <div className="flex w-full max-w-[100px] items-center justify-between">
          <button
            type="button"
            onClick={() => onPageChange(previousPage(currentPage))}
            disabled={currentPage <= 1 || loading}
            aria-label={t('credits.prev')}
            title={t('credits.prev')}
            className="text-secondary dark:text-accent inline-flex h-7 w-7 items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-35">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>

          <span
            className="text-tagline-3 text-secondary/70 dark:text-accent/70 min-w-[40px] text-center font-medium"
            title={t('credits.paginationSummary', { total: String(total), page: String(currentPage), pages: String(lastPage) })}>
            {currentPage}/{lastPage}
          </span>

          <button
            type="button"
            onClick={() => onPageChange(nextPage(currentPage, lastPage))}
            disabled={currentPage >= lastPage || loading}
            aria-label={t('credits.next')}
            title={t('credits.next')}
            className="text-secondary dark:text-accent inline-flex h-7 w-7 items-center justify-center transition disabled:cursor-not-allowed disabled:opacity-35">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreditsPageContent;
