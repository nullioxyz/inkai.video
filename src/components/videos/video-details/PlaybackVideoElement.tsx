interface PlaybackVideoElementProps {
  src: string;
  onWaiting: () => void;
  onCanPlay: () => void;
  onLoadedMetadata: (ratio: number | null) => void;
}

const PlaybackVideoElement = ({ src, onWaiting, onCanPlay, onLoadedMetadata }: PlaybackVideoElementProps) => {
  return (
    <video
      src={src}
      controls
      preload="metadata"
      onWaiting={onWaiting}
      onCanPlay={onCanPlay}
      onLoadedMetadata={(event) => {
        const element = event.currentTarget;
        if (!element.videoWidth || !element.videoHeight) {
          onLoadedMetadata(null);
          return;
        }
        onLoadedMetadata(element.videoWidth / element.videoHeight);
      }}
      className="h-full w-full bg-black object-contain"
    />
  );
};

export default PlaybackVideoElement;
