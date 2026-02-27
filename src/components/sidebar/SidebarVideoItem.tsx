import type { MessageKey } from '@/i18n/messages';
import type { VideoJobItem } from '@/types/dashboard';
import { KeyboardEvent } from 'react';
import SidebarRenameForm from './SidebarRenameForm';
import SidebarVideoMeta from './SidebarVideoMeta';
import SidebarVideoBullet from './video-item/SidebarVideoBullet';
import SidebarVideoIcon from './video-item/SidebarVideoIcon';
import SidebarVideoTitleRow from './video-item/SidebarVideoTitleRow';

interface SidebarVideoItemProps {
  video: VideoJobItem;
  collapsed: boolean;
  selected: boolean;
  isEditing: boolean;
  isSavingRename: boolean;
  editingTitle: string;
  renameError: string | null;
  dateLabel: string;
  onSelect: () => void;
  onStartRename: () => void;
  onRenameChange: (value: string) => void;
  onRenameKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmitRename: () => void;
  onCancelRename: () => void;
  t: (key: MessageKey) => string;
}

const SidebarVideoItem = ({
  video,
  collapsed,
  selected,
  isEditing,
  isSavingRename,
  editingTitle,
  renameError,
  dateLabel,
  onSelect,
  onStartRename,
  onRenameChange,
  onRenameKeyDown,
  onSubmitRename,
  onCancelRename,
  t,
}: SidebarVideoItemProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return;
        }
        event.preventDefault();
        onSelect();
      }}
      className={`w-full cursor-pointer rounded-sm px-3 py-2 text-left transition ${
        selected
          ? 'bg-background-4 dark:bg-background-7 text-secondary dark:text-accent'
          : 'text-secondary/70 dark:text-accent/70 hover:bg-background-4/70 dark:hover:bg-background-7/70 hover:text-secondary dark:hover:text-accent'
      }`}>
      <div className="flex items-start gap-2">
        {!collapsed && (
          <SidebarVideoIcon />
        )}

        {!collapsed && (
          <div className="min-w-0 flex-1 space-y-1">
            {isEditing ? (
              <div onClick={(event) => event.stopPropagation()}>
                <SidebarRenameForm
                  value={editingTitle}
                  onChange={onRenameChange}
                  onKeyDown={onRenameKeyDown}
                  onSave={onSubmitRename}
                  onCancel={onCancelRename}
                  saving={isSavingRename}
                  error={renameError}
                  t={t}
                />
              </div>
            ) : (
              <SidebarVideoTitleRow
                title={video.title}
                renameLabel={t('sidebar.renameVideo')}
                onStartRename={() => {
                  onStartRename();
                }}
              />
            )}
            <SidebarVideoMeta video={video} dateLabel={dateLabel} t={t} />
          </div>
        )}

        {collapsed && <SidebarVideoBullet status={video.status} />}
      </div>
    </div>
  );
};

export default SidebarVideoItem;
