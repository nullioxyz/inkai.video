import { Fragment } from 'react';
import { shouldShowAuditSubline } from '@/modules/credits/application/table-state';
import type { CreditVideoGenerationViewModel } from '@/modules/credits/domain/view-models';
import CreditsAuditRow from './CreditsAuditRow';
import CreditsOutputLink from './CreditsOutputLink';

interface CreditsTableProps {
  rows: CreditVideoGenerationViewModel[];
  loading: boolean;
  error: string | null;
  labels: {
    video: string;
    used: string;
    status: string;
    output: string;
    createdAt: string;
    loading: string;
    openVideo: string;
    debited: string;
    refunded: string;
    refundFlag: string;
    predictionStatus: string;
    details: string;
    auditTitle: string;
  };
  statusLabel: (status: string) => string;
  createdLabel: (isoDate: string | null) => string;
  boolLabel: (value: boolean) => string;
}

const CreditsTable = ({ rows, loading, error, labels, statusLabel, createdLabel, boolLabel }: CreditsTableProps) => {
  return (
    <div className="border-stroke-3 dark:border-stroke-7 overflow-x-auto rounded-[12px] border">
      <table className="min-w-full">
        <thead>
          <tr className="border-stroke-3 dark:border-stroke-7 border-b">
            <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">{labels.video}</th>
            <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">{labels.used}</th>
            <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">{labels.status}</th>
            <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">{labels.output}</th>
            <th className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-4 py-3 text-left font-medium">{labels.createdAt}</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-tagline-2 text-secondary/60 dark:text-accent/60 px-4 py-6 text-center">
                {labels.loading}
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={5} className="text-tagline-2 text-ns-red px-4 py-6 text-center">
                {error}
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-tagline-2 text-secondary/60 dark:text-accent/60 px-4 py-6 text-center">
                -
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <Fragment key={row.inputId}>
                <tr className="border-stroke-3 dark:border-stroke-7 border-b">
                  <td className="text-tagline-2 text-secondary dark:text-accent px-4 py-3">{row.title || row.presetName || '-'}</td>
                  <td className="text-tagline-2 text-secondary dark:text-accent px-4 py-3">{row.creditsUsed}</td>
                  <td className="text-tagline-2 text-secondary/70 dark:text-accent/70 px-4 py-3">{statusLabel(row.status)}</td>
                  <td className="text-tagline-2 text-secondary/70 dark:text-accent/70 px-4 py-3">
                    <CreditsOutputLink outputVideoUrl={row.outputVideoUrl} label={labels.openVideo} />
                  </td>
                  <td className="text-tagline-2 text-secondary/70 dark:text-accent/70 px-4 py-3">{createdLabel(row.createdAt)}</td>
                </tr>
                {shouldShowAuditSubline(row) ? (
                  <CreditsAuditRow
                    row={row}
                    debitedLabel={labels.debited}
                    refundedLabel={labels.refunded}
                    refundFlagLabel={labels.refundFlag}
                    predictionStatusLabel={labels.predictionStatus}
                    detailsLabel={labels.details}
                    auditTitle={labels.auditTitle}
                    emptyLabel="-"
                    yesNoLabel={boolLabel}
                    createdLabel={createdLabel}
                    statusLabel={statusLabel}
                  />
                ) : null}
              </Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreditsTable;
