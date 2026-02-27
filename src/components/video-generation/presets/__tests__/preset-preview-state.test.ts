import { describe, expect, it } from 'vitest';
import {
  initialPresetPreviewState,
  onPresetPreviewVideoCanPlay,
  onPresetPreviewVideoError,
  resolveHasPreviewVideo,
} from '../preset-preview-state';

describe('preset preview state', () => {
  it('marks preview available only when url exists and no failure', () => {
    expect(resolveHasPreviewVideo('https://cdn.example.com/preview.mp4', false)).toBe(true);
    expect(resolveHasPreviewVideo('https://cdn.example.com/preview.mp4', true)).toBe(false);
    expect(resolveHasPreviewVideo(null, false)).toBe(false);
  });

  it('moves to failed state on preview video error', () => {
    const state = onPresetPreviewVideoError({ ...initialPresetPreviewState, isHovering: true });
    expect(state.previewVideoFailed).toBe(true);
    expect(state.isHovering).toBe(false);
  });

  it('clears failed state when preview becomes playable', () => {
    const state = onPresetPreviewVideoCanPlay({ isHovering: false, previewVideoFailed: true });
    expect(state.previewVideoFailed).toBe(false);
    expect(state.isHovering).toBe(false);
  });
});
