'use client';

import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import { usePageTabTitle } from '@/components/dashboard/hooks/usePageTabTitle';
import CreditsPageContent from '@/components/credits/CreditsPageContent';
import { useDashboard } from '@/context/dashboard-context';
import { useLocale } from '@/context/LocaleContext';
import { resolveApiErrorMessage } from '@/lib/api/client';
import { getCreditsVideoGenerations } from '@/lib/api/dashboard';
import { mapCreditVideoGenerationToViewModel } from '@/modules/credits/application/mappers';
import { CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';
import { useEffect, useState } from 'react';

const CreditsPage = () => {
  const { t } = useLocale();
  const { videos, creditBalance, token } = useDashboard();
  usePageTabTitle(t('credits.title'));
  const [videoGenerations, setVideoGenerations] = useState<CreditVideoGenerationViewModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getCreditsVideoGenerations(token, currentPage, perPage);
        setVideoGenerations(response.data.map(mapCreditVideoGenerationToViewModel));
        setLastPage(response.meta.last_page);
        setTotal(response.meta.total);
      } catch (fetchError) {
        setError(resolveApiErrorMessage(fetchError, 'Falha ao carregar créditos.'));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [token, currentPage, perPage]);

  return (
    <DashboardContentShell videos={videos}>
      <CreditsPageContent
        creditBalance={creditBalance}
        videoGenerations={videoGenerations}
        loading={loading}
        error={error}
        currentPage={currentPage}
        lastPage={lastPage}
        total={total}
        onPageChange={setCurrentPage}
      />
    </DashboardContentShell>
  );
};

export default CreditsPage;
