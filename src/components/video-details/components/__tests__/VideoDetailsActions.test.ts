import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import VideoDetailsActions from '../VideoDetailsActions';

const t = (key: string) => {
  const dictionary: Record<string, string> = {
    'dashboard.cancelGeneration': 'Cancel',
    'dashboard.cancelingGeneration': 'Canceling...',
    'dashboard.downloadVideo': 'Download',
    'dashboard.newVideo': 'New video',
  };

  return dictionary[key] ?? key;
};

describe('VideoDetailsActions', () => {
  it('renders cancel action and primary actions when enabled', () => {
    const html = renderToStaticMarkup(
      createElement(VideoDetailsActions, {
        showPrimaryActions: true,
        showCancelAction: true,
        canDownload: true,
        downloading: false,
        canceling: false,
        onDownload: () => {},
        onCancel: () => {},
        onCreateNewVideo: () => {},
        t,
      }),
    );

    expect(html).toContain('Cancel');
    expect(html).toContain('New video');
    expect(html).toContain('grid-cols-3');
  });

  it('renders cancel loading state as disabled', () => {
    const html = renderToStaticMarkup(
      createElement(VideoDetailsActions, {
        showPrimaryActions: false,
        showCancelAction: true,
        canDownload: false,
        downloading: false,
        canceling: true,
        onDownload: () => {},
        onCancel: () => {},
        onCreateNewVideo: () => {},
        t,
      }),
    );

    expect(html).toContain('Canceling...');
    expect(html).toContain('disabled');
    expect(html).toContain('grid-cols-1');
  });
});
