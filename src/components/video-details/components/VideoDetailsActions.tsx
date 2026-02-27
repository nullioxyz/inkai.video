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
          className="border-stroke-7 bg-background-7/70 text-secondary/35 dark:text-accent/35 inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl border px-3">
          <DownloadIcon />
          {t('dashboard.downloadVideo')}
        </button>
      ) : (
        <button
          type="button"
          onClick={onDownload}
          disabled={downloading}
          aria-label={t('dashboard.downloadVideo')}
          title={t('dashboard.downloadVideo')}
          className="border-stroke-7 bg-background-7 text-secondary hover:bg-background-5 focus-visible:ring-secondary/35 dark:bg-background-8 dark:text-accent dark:hover:bg-background-7 dark:focus-visible:ring-accent/35 inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-3 shadow-sm transition focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
          <DownloadIcon />
          {t('dashboard.downloadVideo')}
        </button>
      )}

      <button
        type="button"
        onClick={onCreateNewVideo}
        className="from-secondary to-secondary/90 text-background-8 focus-visible:ring-secondary/40 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r px-4 text-tagline-2 font-semibold shadow-[0_8px_20px_rgba(15,23,42,0.22)] transition hover:brightness-105 focus-visible:ring-2 focus-visible:outline-none dark:from-accent dark:to-accent/90 dark:text-background-8 dark:focus-visible:ring-accent/40">
        <span className="shrink-0">
          <CreateIcon />
        </span>
        {t('dashboard.createNewVideo')}
      </button>
    </div>
  );
};

export default VideoDetailsActions;
