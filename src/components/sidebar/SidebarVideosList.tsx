import type { MessageKey } from '@/i18n/messages';
import type { VideoJobItem } from '@/types/dashboard';
import { KeyboardEvent } from 'react';
import SidebarVideoItem from './SidebarVideoItem';

interface SidebarVideosListProps {
  videos: VideoJobItem[];
  collapsed: boolean;
  selectedVideoId: string | null;
  t: (key: MessageKey) => string;
  formatDate: (iso: string) => string;
  onSelectVideo: (videoId: string) => void;
  rename: {
    editingVideoId: string | null;
    editingTitle: string;
    renameError: string | null;
    savingRenameVideoId: string | null;
    beginRename: (video: VideoJobItem) => void;
    cancelRename: () => void;
    submitRename: (video: VideoJobItem) => Promise<void>;
    setEditingTitle: (value: string) => void;
    onRenameInputKeyDown: (event: KeyboardEvent<HTMLInputElement>, video: VideoJobItem) => void;
  };
}

const SidebarVideosList = ({ videos, collapsed, selectedVideoId, t, formatDate, onSelectVideo, rename }: SidebarVideosListProps) => {
  return (
    <section className="flex-1 overflow-y-auto px-2 py-4">
      {!collapsed && <p className="text-tagline-3 mb-3 font-medium tracking-wide text-secondary/50 dark:text-accent/50">{t('sidebar.videos')}</p>}

      <div className="space-y-1">
        {videos.length === 0 ? (
          !collapsed && <p className="text-tagline-3 text-secondary/50 dark:text-accent/50">{t('sidebar.noVideos')}</p>
        ) : (
          videos.map((video) => (
            <SidebarVideoItem
              key={video.id}
              video={video}
              collapsed={collapsed}
              selected={video.id === selectedVideoId}
              isEditing={rename.editingVideoId === video.id}
              isSavingRename={rename.savingRenameVideoId === video.id}
              editingTitle={rename.editingTitle}
              renameError={rename.renameError}
              dateLabel={formatDate(video.createdAt)}
              onSelect={() => onSelectVideo(video.id)}
              onStartRename={() => rename.beginRename(video)}
              onRenameChange={rename.setEditingTitle}
              onRenameKeyDown={(event) => rename.onRenameInputKeyDown(event, video)}
              onSubmitRename={() => {
                void rename.submitRename(video);
              }}
              onCancelRename={rename.cancelRename}
              t={t}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default SidebarVideosList;
