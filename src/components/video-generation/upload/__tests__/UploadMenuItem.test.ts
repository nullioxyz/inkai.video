import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import UploadMenuItem from '../UploadMenuItem';

describe('UploadMenuItem', () => {
  it('renders label, badge and file input', () => {
    const html = renderToStaticMarkup(
      createElement(UploadMenuItem, {
        disabled: false,
        label: 'Input image',
        badge: 'required',
        onSelect: () => undefined,
      }),
    );

    expect(html).toContain('Input image');
    expect(html).toContain('required');
    expect(html).toContain('type="file"');
    expect(html).toContain('accept="image/*"');
  });
});
