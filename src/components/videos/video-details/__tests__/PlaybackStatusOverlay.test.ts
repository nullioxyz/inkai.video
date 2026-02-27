import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import PlaybackStatusOverlay from '../PlaybackStatusOverlay';

describe('PlaybackStatusOverlay', () => {
  it('shows spinner by default', () => {
    const html = renderToStaticMarkup(
      createElement(PlaybackStatusOverlay, {
        message: 'Loading',
        spinnerTone: 'dark',
        className: 'wrapper',
      }),
    );

    expect(html).toContain('Loading');
    expect(html).toContain('animate-spin');
  });

  it('hides spinner when showSpinner is false', () => {
    const html = renderToStaticMarkup(
      createElement(PlaybackStatusOverlay, {
        message: 'No video',
        spinnerTone: 'light',
        showSpinner: false,
      }),
    );

    expect(html).toContain('No video');
    expect(html).not.toContain('animate-spin');
  });
});
