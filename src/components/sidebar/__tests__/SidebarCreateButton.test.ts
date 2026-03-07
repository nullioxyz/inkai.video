import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import SidebarCreateButton from '../SidebarCreateButton';

describe('SidebarCreateButton', () => {
  const t = (key: string) => {
    const messages: Record<string, string> = {
      'sidebar.createNewVideo': 'Create new video',
      'sidebar.availableCredits': 'Available credits',
    };

    return messages[key] ?? key;
  };

  it('renders available credits when expanded', () => {
    const html = renderToStaticMarkup(
      createElement(SidebarCreateButton, {
        collapsed: false,
        creditBalance: 12,
        onCreate: () => undefined,
        t,
      }),
    );

    expect(html).toContain('Create new video');
    expect(html).toContain('Available credits');
    expect(html).toContain('12');
  });
});
