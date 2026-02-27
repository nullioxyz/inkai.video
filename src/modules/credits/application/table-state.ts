import { CreditVideoGenerationViewModel } from '../domain/view-models';

export const normalizeCreditStatus = (status: string): string => {
  if (status === 'done' || status === 'succeeded') {
    return 'completed';
  }
  if (status === 'cancelled' || status === 'canceled') {
    return 'canceled';
  }
  if (status === 'pending' || status === 'queued' || status === 'starting') {
    return 'processing';
  }

  return status;
};

export const shouldShowAuditSubline = (row: CreditVideoGenerationViewModel): boolean => {
  return (
    row.isRefunded ||
    row.isFailed ||
    row.isCanceled ||
    Boolean(row.failureReason || row.cancellationReason || row.predictionErrorMessage) ||
    row.creditEvents.some((event) => event.referenceType !== 'input_creation')
  );
};

export const previousPage = (currentPage: number): number => {
  return Math.max(1, currentPage - 1);
};

export const nextPage = (currentPage: number, lastPage: number): number => {
  return Math.min(lastPage, currentPage + 1);
};
