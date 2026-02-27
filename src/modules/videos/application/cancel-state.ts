export const isCancelableVideoStatus = (status: string): boolean => {
  const normalized = status.trim().toLowerCase();
  return normalized === 'created' || normalized === 'processing';
};
