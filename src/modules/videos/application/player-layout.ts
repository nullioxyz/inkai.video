const KNOWN_RATIOS = [
  { value: 9 / 16, label: '9:16' },
  { value: 3 / 4, label: '3:4' },
  { value: 1, label: '1:1' },
  { value: 4 / 3, label: '4:3' },
  { value: 16 / 9, label: '16:9' },
];

const RATIO_TOLERANCE = 0.035;

export const parseAspectRatio = (input?: string | null): number | null => {
  if (!input) {
    return null;
  }

  const value = input.trim();
  if (!value) {
    return null;
  }

  const pair = value.match(/(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)/);
  if (pair) {
    const width = Number(pair[1]);
    const height = Number(pair[2]);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      return null;
    }
    return width / height;
  }

  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return null;
  }

  return numeric;
};

export const resolveVideoDisplayRatio = (args: {
  fallbackFormat?: string | null;
  measuredRatio?: number | null;
  videoWidth?: number;
  videoHeight?: number;
}): number => {
  const { fallbackFormat, measuredRatio, videoWidth, videoHeight } = args;
  if (measuredRatio && measuredRatio > 0) {
    return measuredRatio;
  }

  if (videoWidth && videoHeight && videoWidth > 0 && videoHeight > 0) {
    return videoWidth / videoHeight;
  }

  const parsed = parseAspectRatio(fallbackFormat);
  if (parsed) {
    return parsed;
  }

  return 16 / 9;
};

export const toAspectRatioLabel = (ratio: number): string => {
  const matched = KNOWN_RATIOS.find((entry) => Math.abs(entry.value - ratio) <= RATIO_TOLERANCE);
  if (matched) {
    return matched.label;
  }

  if (ratio >= 1) {
    return `${ratio.toFixed(2)}:1`;
  }

  return `1:${(1 / ratio).toFixed(2)}`;
};

export const resolveVideoFrameWidthClass = (ratio: number): string => {
  if (ratio <= 0.62) {
    return 'max-w-[190px] sm:max-w-[215px]';
  }

  if (ratio <= 0.82) {
    return 'max-w-[240px] sm:max-w-[280px]';
  }

  if (ratio <= 1.08) {
    return 'max-w-[310px] sm:max-w-[350px]';
  }

  return 'max-w-[430px]';
};
