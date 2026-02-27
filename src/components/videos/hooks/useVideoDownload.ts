'use client';

import { useState } from 'react';

export const useVideoDownload = ({ inputId, token, title }: { inputId?: number; token?: string | null; title: string }) => {
  const [downloading, setDownloading] = useState(false);

  const canDownloadFromBackend = Boolean(inputId && token);

  const download = async () => {
    if (!inputId || !token || downloading) {
      return;
    }

    setDownloading(true);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_IAVIDEO_API_URL ?? 'http://127.0.0.1:8000';
      const endpoint = `${apiBaseUrl}/api/jobs/${inputId}/download`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao baixar vídeo');
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title || 'video'}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } finally {
      setDownloading(false);
    }
  };

  return { downloading, canDownloadFromBackend, download };
};
