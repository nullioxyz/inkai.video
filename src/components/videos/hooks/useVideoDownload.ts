'use client';

import { useState } from 'react';

export const resolveDownloadFilename = (title: string) => `${title || 'video'}.mp4`;

export const buildMediaDownloadEndpoint = (mediaUrl: string, title: string) => {
  const filename = resolveDownloadFilename(title);
  return `/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}`;
};

interface TriggerMediaDownloadArgs {
  mediaUrl: string;
  title: string;
  fetchImpl?: typeof fetch;
  createObjectURL?: (blob: Blob) => string;
  revokeObjectURL?: (url: string) => void;
  createAnchor?: () => { href: string; download: string; click: () => void; remove: () => void };
  appendAnchor?: (anchor: { href: string; download: string; click: () => void; remove: () => void }) => void;
}

export const triggerMediaDownload = async ({
  mediaUrl,
  title,
  fetchImpl = fetch,
  createObjectURL = URL.createObjectURL,
  revokeObjectURL = URL.revokeObjectURL,
  createAnchor = () => document.createElement('a'),
  appendAnchor = (anchor) => document.body.appendChild(anchor as HTMLAnchorElement),
}: TriggerMediaDownloadArgs) => {
  const endpoint = buildMediaDownloadEndpoint(mediaUrl, title);
  const response = await fetchImpl(endpoint, {
    method: 'GET',
    headers: { Accept: 'application/octet-stream' },
  });

  if (!response.ok) {
    throw new Error('Falha ao baixar vídeo');
  }

  const blob = await response.blob();
  const blobUrl = createObjectURL(blob);
  const link = createAnchor();
  link.href = blobUrl;
  link.download = resolveDownloadFilename(title);
  appendAnchor(link);
  link.click();
  link.remove();
  revokeObjectURL(blobUrl);
};

export const useVideoDownload = ({ mediaUrl, title }: { mediaUrl?: string | null; title: string }) => {
  const [downloading, setDownloading] = useState(false);

  const canDownload = Boolean(mediaUrl);

  const download = async () => {
    if (!mediaUrl || downloading) {
      return;
    }

    setDownloading(true);
    try {
      await triggerMediaDownload({ mediaUrl, title });
    } finally {
      setDownloading(false);
    }
  };

  return { downloading, canDownload, download };
};
