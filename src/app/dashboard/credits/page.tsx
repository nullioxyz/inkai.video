'use client';

import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import CreditsPageContent from '@/components/dashboard/pages/CreditsPageContent';
import { CreditVideoGenerationViewModel, useDashboard } from '@/context/dashboard-context';
import { resolveApiErrorMessage } from '@/lib/api/client';
import { CreditVideoGenerationResponse, getCreditsVideoGenerations } from '@/lib/api/dashboard';
import { useEffect, useState } from 'react';

const mapCreditVideoGenerationToViewModel = (entry: CreditVideoGenerationResponse): CreditVideoGenerationViewModel => {
  return {
    inputId: entry.input_id,
    title: entry.title,
    status: entry.status,
    presetId: entry.preset?.id ?? null,
    presetName: entry.preset?.name ?? null,
    predictionId: entry.prediction?.id ?? null,
    predictionStatus: entry.prediction?.status ?? null,
    predictionErrorCode: entry.prediction?.error_code ?? null,
    predictionErrorMessage: entry.prediction?.error_message ?? null,
    outputVideoUrl: entry.prediction?.output_video_url ?? null,
    creditsDebited: entry.credits_debited,
    creditsRefunded: entry.credits_refunded,
    creditsUsed: entry.credits_used,
    isFailed: Boolean(entry.is_failed),
    isCanceled: Boolean(entry.is_canceled),
    isRefunded: Boolean(entry.is_refunded),
    failureCode: entry.failure?.code ?? null,
    failureMessage: entry.failure?.message ?? null,
    failureReason: entry.failure?.reason ?? null,
    cancellationReason: entry.cancellation?.reason ?? null,
    creditEvents: (entry.credit_events ?? []).map((event) => ({
      ledgerId: event?.ledger_id ?? null,
      type: event?.type ?? '',
      operation: event?.operation ?? '',
      delta: Number(event?.delta ?? 0),
      balanceAfter: event?.balance_after ?? null,
      reason: event?.reason ?? '',
      referenceType: event?.reference_type ?? '',
      referenceId: event?.reference_id ?? null,
      createdAt: event?.created_at ?? null,
    })),
    createdAt: entry.created_at,
    updatedAt: entry.updated_at,
  };
};

const CreditsPage = () => {
  const { videos, creditBalance, token } = useDashboard();
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
