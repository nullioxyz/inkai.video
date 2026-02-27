import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import PageSectionHeader from '../PageSectionHeader';

describe('PageSectionHeader', () => {
  it('renders title and description via composed subcomponents', () => {
    const html = renderToStaticMarkup(createElement(PageSectionHeader, { title: 'Gallery', description: 'My description' }));

    expect(html).toContain('Gallery');
    expect(html).toContain('My description');
  });
});
