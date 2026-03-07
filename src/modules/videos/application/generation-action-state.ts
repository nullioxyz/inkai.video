import { GenerationEstimate } from '@/types/dashboard';

export type GenerateDisabledReason =
  | 'missing_requirements'
  | 'model_unavailable'
  | 'quota_reached'
  | 'estimating'
  | 'estimate_unavailable'
  | 'insufficient_balance'
  | 'generating'
  | null;

export interface ResolveGenerateActionStateArgs {
  hasInputImage: boolean;
  hasSelectedModel: boolean;
  hasSelectedPreset: boolean;
  hasValidDuration: boolean;
  modelAvailable: boolean;
  quotaReached: boolean;
  isEstimating: boolean;
  isGenerating: boolean;
  estimate: GenerationEstimate | null;
  creditBalance: number;
}

export interface GenerateActionState {
  disabledReason: GenerateDisabledReason;
  canGenerate: boolean;
  hasInsufficientBalance: boolean;
  projectedBalance: number | null;
}

export const resolveGenerateActionState = ({
  hasInputImage,
  hasSelectedModel,
  hasSelectedPreset,
  hasValidDuration,
  modelAvailable,
  quotaReached,
  isEstimating,
  isGenerating,
  estimate,
  creditBalance,
}: ResolveGenerateActionStateArgs): GenerateActionState => {
  let disabledReason: GenerateDisabledReason = null;

  if (!hasInputImage || !hasSelectedModel || !hasSelectedPreset || !hasValidDuration) {
    disabledReason = 'missing_requirements';
  } else if (!modelAvailable) {
    disabledReason = 'model_unavailable';
  } else if (quotaReached) {
    disabledReason = 'quota_reached';
  } else if (isGenerating) {
    disabledReason = 'generating';
  } else if (isEstimating) {
    disabledReason = 'estimating';
  } else if (!estimate) {
    disabledReason = 'estimate_unavailable';
  } else if (creditBalance < estimate.creditsRequired) {
    disabledReason = 'insufficient_balance';
  }

  const projectedBalance = estimate ? creditBalance - estimate.creditsRequired : null;

  return {
    disabledReason,
    canGenerate: disabledReason === null,
    hasInsufficientBalance: disabledReason === 'insufficient_balance',
    projectedBalance,
  };
};
