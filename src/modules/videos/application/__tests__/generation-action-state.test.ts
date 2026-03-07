import { describe, expect, it } from 'vitest';
import { resolveGenerateActionState } from '../generation-action-state';

const baseArgs = {
  hasInputImage: true,
  hasSelectedModel: true,
  hasSelectedPreset: true,
  hasValidDuration: true,
  modelAvailable: true,
  quotaReached: false,
  isEstimating: false,
  isGenerating: false,
  creditBalance: 10,
  estimate: {
    modelId: 1,
    presetId: 2,
    durationSeconds: 5,
    creditsRequired: 3,
    modelCostPerSecondUsd: '0.1500',
    estimatedGenerationCostUsd: '0.7500',
    creditUnitValueUsd: '0.3500',
  },
};

describe('generation action state', () => {
  it('enables generation when all requirements are satisfied', () => {
    const state = resolveGenerateActionState(baseArgs);

    expect(state.canGenerate).toBe(true);
    expect(state.disabledReason).toBeNull();
    expect(state.projectedBalance).toBe(7);
  });

  it('disables generation while estimate is loading', () => {
    const state = resolveGenerateActionState({
      ...baseArgs,
      isEstimating: true,
    });

    expect(state.canGenerate).toBe(false);
    expect(state.disabledReason).toBe('estimating');
  });

  it('disables generation when balance is insufficient', () => {
    const state = resolveGenerateActionState({
      ...baseArgs,
      creditBalance: 2,
    });

    expect(state.canGenerate).toBe(false);
    expect(state.disabledReason).toBe('insufficient_balance');
    expect(state.hasInsufficientBalance).toBe(true);
    expect(state.projectedBalance).toBe(-1);
  });

  it('disables generation when estimate is unavailable', () => {
    const state = resolveGenerateActionState({
      ...baseArgs,
      estimate: null,
    });

    expect(state.canGenerate).toBe(false);
    expect(state.disabledReason).toBe('estimate_unavailable');
  });
});
