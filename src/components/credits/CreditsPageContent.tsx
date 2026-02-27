'use client';

import PageSectionHeader from '@/components/page-header/PageSectionHeader';
import { useLocale } from '@/context/LocaleContext';
import { CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';
import CreditsPagination from './components/CreditsPagination';
import CreditsSummaryCards from './components/CreditsSummaryCards';
import CreditsTable from './components/CreditsTable';
import { resolveCreditStatusLabel } from './components/resolveCreditStatusLabel';

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
  const statusLabel = (status: string) => resolveCreditStatusLabel({ status, t });

  return (
    <section className="space-y-6">
      <PageSectionHeader title={t('credits.title')} description={t('credits.description')} />

      <CreditsSummaryCards
        usedCredits={usedCredits}
        creditBalance={creditBalance}
        usedLabel={t('credits.used')}
        remainingLabel={t('credits.remaining')}
      />

      <CreditsTable
        rows={videoGenerations}
        loading={loading}
        error={error}
        labels={{
          video: t('credits.table.video'),
          used: t('credits.table.used'),
          status: t('credits.table.status'),
          output: t('credits.table.output'),
          createdAt: t('credits.table.createdAt'),
          loading: t('credits.loading'),
          openVideo: t('credits.openVideo'),
          debited: t('credits.table.debited'),
          refunded: t('credits.table.refunded'),
          refundFlag: t('credits.table.refundFlag'),
          predictionStatus: t('credits.table.predictionStatus'),
          details: t('credits.table.details'),
          auditTitle: t('credits.audit.title'),
        }}
        statusLabel={statusLabel}
        createdLabel={createdLabel}
        boolLabel={boolLabel}
      />

      <CreditsPagination
        currentPage={currentPage}
        lastPage={lastPage}
        loading={loading}
        prevLabel={t('credits.prev')}
        nextLabel={t('credits.next')}
        summaryLabel={t('credits.paginationSummary', { total: String(total), page: String(currentPage), pages: String(lastPage) })}
        onPageChange={onPageChange}
      />
    </section>
  );
};

export default CreditsPageContent;
