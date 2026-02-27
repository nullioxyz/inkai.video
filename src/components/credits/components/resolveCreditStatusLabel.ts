import type { MessageKey } from '@/i18n/messages';
import { normalizeCreditStatus } from '@/modules/credits/application/table-state';

interface ResolveCreditStatusLabelArgs {
  status: string;
  t: (key: MessageKey, vars?: Record<string, string>) => string;
}

const STATUS_KEY: Record<string, MessageKey> = {
  processing: 'status.processing',
  completed: 'status.completed',
  failed: 'status.failed',
  canceled: 'status.canceled',
};

export const resolveCreditStatusLabel = ({ status, t }: ResolveCreditStatusLabelArgs) => {
  const normalized = normalizeCreditStatus(status);
  const key = STATUS_KEY[normalized];

  if (!key) {
    return status;
  }

  return t(key);
};
