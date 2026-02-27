'use client';

import type { VideoJobItem } from '@/types/dashboard';
import PlaybackSourceImage from './PlaybackSourceImage';
import PlaybackStatusOverlay from './PlaybackStatusOverlay';
import PlaybackVideoElement from './PlaybackVideoElement';

interface VideoPlaybackSurfaceProps {
  video: VideoJobItem;
  loading: boolean;
  playbackError: boolean;
  onWaiting: () => void;
  onCanPlay: () => void;
  onLoadedMetadata: (ratio: number | null) => void;
  onPlaybackError: () => void;
  generatingLabel: string;
}

const VideoPlaybackSurface = ({
  video,
  loading,
  playbackError,
  onWaiting,
  onCanPlay,
  onLoadedMetadata,
  onPlaybackError,
  generatingLabel,
}: VideoPlaybackSurfaceProps) => {
  const isProcessing = video.status === 'processing';
  const hasVideoOutput = Boolean(video.videoUrl);

  if (isProcessing) {
    return (
      <>
        <PlaybackSourceImage src={video.imageSrc} title={video.title} />
        <PlaybackStatusOverlay
          message={generatingLabel}
          spinnerTone="light"
          className="bg-background-7/30 dark:bg-background-8/30 absolute inset-0 flex items-center justify-center backdrop-blur-[1px]"
        />
      </>
    );
  }

  if (!hasVideoOutput) {
    return (
      <>
        <PlaybackSourceImage src={video.imageSrc} title={video.title} />
        <PlaybackStatusOverlay
          message="Video is not available for playback yet."
          spinnerTone="light"
          showSpinner={false}
          className="bg-background-7/30 dark:bg-background-8/30 absolute inset-0 flex items-center justify-center backdrop-blur-[1px]"
        />
      </>
    );
  }

  if (playbackError) {
    return (
      <>
        <PlaybackSourceImage src={video.imageSrc} title={video.title} />
        <PlaybackStatusOverlay
          message="Video is unavailable right now."
          spinnerTone="light"
          showSpinner={false}
          className="bg-background-7/30 dark:bg-background-8/30 absolute inset-0 flex items-center justify-center backdrop-blur-[1px]"
        />
      </>
    );
  }

  return (
    <>
      {loading && (
        <PlaybackStatusOverlay
          message="Loading playback..."
          spinnerTone="dark"
          className="bg-background-8/55 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1.5px]"
        />
      )}

      <PlaybackVideoElement
        src={video.videoUrl}
        onWaiting={onWaiting}
        onCanPlay={onCanPlay}
        onLoadedMetadata={onLoadedMetadata}
        onError={onPlaybackError}
      />
    </>
  );
};

export default VideoPlaybackSurface;
