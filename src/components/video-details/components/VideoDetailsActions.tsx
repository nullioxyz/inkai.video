import type { MessageKey } from '@/i18n/messages';
interface VideoDetailsActionsProps {
  showActions: boolean;
  canDownload: boolean;
  downloading: boolean;
  onDownload: () => void;
  onCreateNewVideo: () => void;
  t: (key: MessageKey) => string;
}

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 4v10" />
    <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
    <path d="M4.5 18.5h15" />
  </svg>
);

const CreateIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const VideoDetailsActions = ({ showActions, canDownload, downloading, onDownload, onCreateNewVideo, t }: VideoDetailsActionsProps) => {
  return (
    <div
      className={`grid grid-cols-2 gap-2 border-t border-dashed border-secondary/25 pt-4 transition-all duration-400 ${
        showActions ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
      }`}>
      {!canDownload ? (
        <button
          type="button"
          disabled
          className="text-secondary/30 dark:text-accent/30 inline-flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-xl">
          <DownloadIcon />
        </button>
      ) : (
        <button
          type="button"
          onClick={onDownload}
          disabled={downloading}
          aria-label={t('dashboard.downloadVideo')}
          title={t('dashboard.downloadVideo')}
          className="text-secondary hover:bg-background-4 dark:text-accent dark:hover:bg-background-7 focus-visible:ring-secondary/35 dark:focus-visible:ring-accent/35 inline-flex h-11 w-11 items-center justify-center rounded-xl transition focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
          <DownloadIcon />
        </button>
      )}

      <button
        type="button"
        onClick={onCreateNewVideo}
        className="text-tagline-2 text-secondary/70 dark:text-accent/70 hover:bg-background-4 dark:hover:bg-background-7 hover:text-secondary dark:hover:text-accent focus-visible:ring-secondary/35 dark:focus-visible:ring-accent/35 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 font-semibold transition focus-visible:ring-2 focus-visible:outline-none">
        <span className="shrink-0">
          <CreateIcon />
        </span>
        {t('dashboard.newVideo')}
      </button>
    </div>
  );
};

export default VideoDetailsActions;
