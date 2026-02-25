import { parseAspectRatio } from './player-layout';

const DEFAULT_CARD_RATIO = 16 / 9;

export const resolveCardRatio = (format?: string | null): number => {
  const parsed = parseAspectRatio(format);
  if (!parsed) {
    return DEFAULT_CARD_RATIO;
  }
  return parsed;
};

export const resolveCardWidthClass = (ratio: number): string => {
  if (ratio <= 0.62) {
    return 'max-w-[170px] sm:max-w-[210px]';
  }

  if (ratio <= 0.82) {
    return 'max-w-[220px] sm:max-w-[260px]';
  }

  if (ratio <= 1.08) {
    return 'max-w-[280px] sm:max-w-[320px]';
  }

  return 'max-w-[360px] sm:max-w-[440px]';
};
