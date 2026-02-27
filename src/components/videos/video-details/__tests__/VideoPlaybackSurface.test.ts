import type { VideoJobItem } from '@/types/dashboard';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import VideoPlaybackSurface from '../VideoPlaybackSurface';

const baseVideo: VideoJobItem = {
  id: '1',
  title: 'Video title',
  imageSrc: 'https://inkai.video/image/tkn-start/image',
  videoUrl: '',
  status: 'completed',
  format: '9:16',
  prompt: '',
  createdAt: '2026-02-26T10:00:00.000Z',
};

const renderSurface = (video: VideoJobItem) =>
  renderToStaticMarkup(
    createElement(VideoPlaybackSurface, {
      video,
      loading: false,
      playbackError: false,
      onWaiting: () => {},
      onCanPlay: () => {},
      onLoadedMetadata: () => {},
      onPlaybackError: () => {},
      generatingLabel: 'Generating',
    }),
  );

const renderSurfaceWithPlaybackError = (video: VideoJobItem) =>
  renderToStaticMarkup(
    createElement(VideoPlaybackSurface, {
      video,
      loading: false,
      playbackError: true,
      onWaiting: () => {},
      onCanPlay: () => {},
      onLoadedMetadata: () => {},
      onPlaybackError: () => {},
      generatingLabel: 'Generating',
    }),
  );

describe('VideoPlaybackSurface', () => {
  it('renders playback using frontend absolute url', () => {
    const html = renderSurface({
      ...baseVideo,
      videoUrl: 'https://inkai.video/video/tkn-output/output.mp4',
    });

    expect(html).toContain('https://inkai.video/video/tkn-output/output.mp4');
    expect(html).toContain('<video');
  });

  it('renders playback using cdn url', () => {
    const html = renderSurface({
      ...baseVideo,
      videoUrl: 'https://cdn.example.com/videos/output.mp4',
    });

    expect(html).toContain('https://cdn.example.com/videos/output.mp4');
    expect(html).toContain('<video');
  });

  it('renders unavailable state when url is empty', () => {
    const html = renderSurface(baseVideo);

    expect(html).toContain('Video is not available for playback yet.');
    expect(html).toContain('https://inkai.video/image/tkn-start/image');
  });

  it('renders playback error state when video fails to load', () => {
    const html = renderSurfaceWithPlaybackError({
      ...baseVideo,
      videoUrl: 'https://cdn.example.com/videos/output.mp4',
    });

    expect(html).toContain('Video is unavailable right now.');
    expect(html).toContain('https://inkai.video/image/tkn-start/image');
  });
});
