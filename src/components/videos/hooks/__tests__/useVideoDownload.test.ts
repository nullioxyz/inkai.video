import { describe, expect, it, vi } from 'vitest';
import { buildMediaDownloadEndpoint, resolveDownloadFilename, triggerMediaDownload } from '../useVideoDownload';

describe('useVideoDownload helpers', () => {
  it('builds download endpoint with encoded url and filename', () => {
    const endpoint = buildMediaDownloadEndpoint('https://cdn.example.com/video file.mp4', 'Tattoo Clip');
    expect(endpoint).toBe('/api/download?url=https%3A%2F%2Fcdn.example.com%2Fvideo%20file.mp4&filename=Tattoo%20Clip.mp4');
  });

  it('resolves fallback filename when title is empty', () => {
    expect(resolveDownloadFilename('')).toBe('video.mp4');
  });

  it('downloads blob and triggers anchor click', async () => {
    const click = vi.fn();
    const remove = vi.fn();
    const appendAnchor = vi.fn();
    const createObjectURL = vi.fn().mockReturnValue('blob:video');
    const revokeObjectURL = vi.fn();
    const blob = new Blob(['video'], { type: 'video/mp4' });
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      blob: vi.fn().mockResolvedValue(blob),
    });

    const anchor = { href: '', download: '', click, remove };

    await triggerMediaDownload({
      mediaUrl: 'https://cdn.example.com/output.mp4',
      title: 'My Video',
      fetchImpl,
      createObjectURL,
      revokeObjectURL,
      createAnchor: () => anchor,
      appendAnchor,
    });

    expect(fetchImpl).toHaveBeenCalledWith('/api/download?url=https%3A%2F%2Fcdn.example.com%2Foutput.mp4&filename=My%20Video.mp4', {
      method: 'GET',
      headers: { Accept: 'application/octet-stream' },
    });
    expect(appendAnchor).toHaveBeenCalledWith(anchor);
    expect(anchor.download).toBe('My Video.mp4');
    expect(click).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:video');
  });

  it('throws when upstream returns non-ok response', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      blob: vi.fn(),
    });

    await expect(
      triggerMediaDownload({
        mediaUrl: 'https://cdn.example.com/output.mp4',
        title: 'My Video',
        fetchImpl,
      }),
    ).rejects.toThrow('Falha ao baixar vídeo');
  });
});
