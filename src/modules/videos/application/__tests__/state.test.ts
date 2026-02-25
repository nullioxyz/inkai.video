import { describe, expect, it } from 'vitest';
import { replaceVideosSorted, upsertVideoById } from '../state';

describe('video state', () => {
  it('upserts new item', () => {
    const result = upsertVideoById(
      [
        {
          id: '1',
          title: 'one',
          imageSrc: '',
          videoUrl: '',
          status: 'processing',
          format: '9:16',
          prompt: '',
          createdAt: '2026-02-24T10:00:00.000Z',
        },
      ],
      {
        id: '2',
        title: 'two',
        imageSrc: '',
        videoUrl: '',
        status: 'processing',
        format: '9:16',
        prompt: '',
        createdAt: '2026-02-25T10:00:00.000Z',
      },
    );
    expect(result[0].id).toBe('2');
  });

  it('sorts by createdAt desc', () => {
    const sorted = replaceVideosSorted([
      {
        id: '1',
        title: 'one',
        imageSrc: '',
        videoUrl: '',
        status: 'processing',
        format: '9:16',
        prompt: '',
        createdAt: '2026-02-24T10:00:00.000Z',
      },
      {
        id: '2',
        title: 'two',
        imageSrc: '',
        videoUrl: '',
        status: 'processing',
        format: '9:16',
        prompt: '',
        createdAt: '2026-02-25T10:00:00.000Z',
      },
    ]);

    expect(sorted[0].id).toBe('2');
  });
});
