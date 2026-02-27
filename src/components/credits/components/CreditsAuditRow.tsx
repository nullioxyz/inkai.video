import type { CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';

interface CreditsAuditRowProps {
  row: CreditVideoGenerationViewModel;
  debitedLabel: string;
  refundedLabel: string;
  refundFlagLabel: string;
  predictionStatusLabel: string;
  detailsLabel: string;
  auditTitle: string;
  emptyLabel: string;
  yesNoLabel: (value: boolean) => string;
  createdLabel: (isoDate: string | null) => string;
  statusLabel: (status: string) => string;
}

const CreditsAuditRow = ({
  row,
  debitedLabel,
  refundedLabel,
  refundFlagLabel,
  predictionStatusLabel,
  detailsLabel,
  auditTitle,
  emptyLabel,
  yesNoLabel,
  createdLabel,
  statusLabel,
}: CreditsAuditRowProps) => {
  return (
    <tr className="border-stroke-3/50 dark:border-stroke-7/50 border-b">
      <td colSpan={5} className="bg-background-2/60 dark:bg-background-8/40 px-4 py-3">
        <div className="space-y-2">
          <p className="text-tagline-3 text-secondary/70 dark:text-accent/70">
            <span className="font-medium">{debitedLabel}:</span> {row.creditsDebited} | <span className="font-medium">{refundedLabel}:</span>{' '}
            {row.creditsRefunded} | <span className="font-medium">{refundFlagLabel}:</span> {yesNoLabel(row.isRefunded)}
          </p>
          <p className="text-tagline-3 text-secondary/70 dark:text-accent/70">
            <span className="font-medium">{predictionStatusLabel}:</span> {row.predictionStatus ? statusLabel(row.predictionStatus) : '-'} |{' '}
            <span className="font-medium">{detailsLabel}:</span> {row.failureReason || row.cancellationReason || row.predictionErrorMessage || '-'}
          </p>

          <div className="space-y-1.5 pt-1">
            <p className="text-tagline-3 text-secondary/80 dark:text-accent/80 font-medium">{auditTitle}</p>
            {row.creditEvents.length === 0 ? (
              <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{emptyLabel}</p>
            ) : (
              row.creditEvents.map((event) => (
                <p
                  key={`${row.inputId}-${event.ledgerId ?? event.referenceType}-${event.delta}-${event.createdAt ?? 'no-date'}`}
                  className="text-tagline-3 text-secondary/70 dark:text-accent/70">
                  [{createdLabel(event.createdAt)}] {event.type || event.operation || '-'} | delta {event.delta} | balance {event.balanceAfter ?? '-'} |
                  ref {event.referenceType || '-'}#{event.referenceId ?? '-'} | {event.reason || '-'}
                </p>
              ))
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CreditsAuditRow;
