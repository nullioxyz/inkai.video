import { CreditStatementEntryResponse, CreditVideoGenerationResponse } from '@/lib/api/dashboard';
import { resolveMediaUrl } from '@/utils/resolveMediaUrl';
import { CreditStatementEntryViewModel, CreditVideoGenerationViewModel } from '../domain/view-models';

export const mapCreditStatementToViewModel = (entry: CreditStatementEntryResponse): CreditStatementEntryViewModel => {
  return {
    id: entry.id,
    delta: entry.delta,
    balanceAfter: entry.balance_after,
    reason: entry.reason,
    referenceType: entry.reference_type,
    referenceId: entry.reference_id,
    createdAt: entry.created_at,
  };
};

export const mapCreditVideoGenerationToViewModel = (entry: CreditVideoGenerationResponse): CreditVideoGenerationViewModel => {
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
    outputVideoUrl: resolveMediaUrl(entry.prediction?.output_video_url),
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
