'use client';

import type { MessageKey } from '@/i18n/messages';
import type { VideoJobItem } from '@/types/dashboard';
import { KeyboardEvent, useState } from 'react';

interface UseSidebarRenameArgs {
  onRenameVideo: (videoId: string, title: string) => Promise<void>;
  t: (key: MessageKey) => string;
}

export const useSidebarRename = ({ onRenameVideo, t }: UseSidebarRenameArgs) => {
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [renameError, setRenameError] = useState<string | null>(null);
  const [savingRenameVideoId, setSavingRenameVideoId] = useState<string | null>(null);

  const beginRename = (video: VideoJobItem) => {
    setRenameError(null);
    setEditingVideoId(video.id);
    setEditingTitle(video.title);
  };

  const cancelRename = () => {
    setEditingVideoId(null);
    setEditingTitle('');
    setRenameError(null);
  };

  const submitRename = async (video: VideoJobItem) => {
    const normalized = editingTitle.trim();
    if (!normalized) {
      setRenameError(t('sidebar.renameErrorEmpty'));
      return;
    }

    if (normalized === video.title) {
      cancelRename();
      return;
    }

    setSavingRenameVideoId(video.id);
    setRenameError(null);
    try {
      await onRenameVideo(video.id, normalized);
      cancelRename();
    } catch {
      setRenameError(t('sidebar.renameErrorGeneric'));
    } finally {
      setSavingRenameVideoId(null);
    }
  };

  const onRenameInputKeyDown = (event: KeyboardEvent<HTMLInputElement>, video: VideoJobItem) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      void submitRename(video);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      cancelRename();
    }
  };

  return {
    editingVideoId,
    editingTitle,
    renameError,
    savingRenameVideoId,
    beginRename,
    cancelRename,
    submitRename,
    setEditingTitle,
    onRenameInputKeyDown,
  };
};
