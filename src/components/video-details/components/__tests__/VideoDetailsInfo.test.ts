import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import type { VideoJobItem } from '@/types/dashboard';
import VideoDetailsInfo from '../VideoDetailsInfo';

vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    t: (key: string) => key,
  }),
}));

const t = (key: string) => {
  const dictionary: Record<string, string> = {
    'dashboard.videoDetails': 'Video details',
    'dashboard.videoFormat': 'Format',
    'dashboard.videoStatus': 'Status',
    'dashboard.videoPreset': 'Preset',
    'dashboard.videoCreatedAt': 'Created at',
    'status.processing': 'Processing',
    'status.completed': 'Completed',
    'status.failed': 'Failed',
    'status.canceled': 'Canceled',
  };

  return dictionary[key] ?? key;
};

const baseVideo: VideoJobItem = {
  id: '1',
  title: 'Tattoo clip',
  imageSrc: 'https://inkai.video/image/token/image',
  videoUrl: 'https://inkai.video/video/token/output.mp4',
  presetName: null,
  status: 'completed',
  format: '9:16',
  prompt: '',
  createdAt: '2026-02-27T10:00:00.000Z',
};

describe('VideoDetailsInfo', () => {
  it('renders preset name when preset is present', () => {
    const html = renderToStaticMarkup(
      createElement(VideoDetailsInfo, {
        video: { ...baseVideo, presetName: 'Anime Preset' },
        formatLabel: '9:16',
        createdAt: '27/02/2026 10:00',
        t,
      }),
    );

    expect(html).toContain('Preset');
    expect(html).toContain('Anime Preset');
  });

  it('renders dash fallback when preset is null', () => {
    const html = renderToStaticMarkup(
      createElement(VideoDetailsInfo, {
        video: { ...baseVideo, presetName: null },
        formatLabel: '9:16',
        createdAt: '27/02/2026 10:00',
        t,
      }),
    );

    expect(html).toContain('Preset');
    expect(html).toContain('>-<');
  });
});
