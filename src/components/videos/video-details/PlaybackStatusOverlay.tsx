interface PlaybackStatusOverlayProps {
  message: string;
  spinnerTone: 'light' | 'dark';
  showSpinner?: boolean;
  className?: string;
}

const PlaybackStatusOverlay = ({ message, spinnerTone, showSpinner = true, className = '' }: PlaybackStatusOverlayProps) => {
  const spinnerClass =
    spinnerTone === 'light'
      ? 'border-secondary/50 border-t-secondary'
      : 'border-accent/50 border-t-accent';

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-3 text-center">
        {showSpinner ? <span className={`${spinnerClass} inline-flex h-8 w-8 animate-spin rounded-full border-2`} /> : null}
        <p className="text-tagline-2 text-accent/90 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default PlaybackStatusOverlay;
