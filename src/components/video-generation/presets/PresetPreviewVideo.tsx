import { RefObject } from 'react';

interface PresetPreviewVideoProps {
  previewVideoRef: RefObject<HTMLVideoElement | null>;
  src: string;
  isHovering: boolean;
  onError: () => void;
  onCanPlay: () => void;
}

const PresetPreviewVideo = ({ previewVideoRef, src, isHovering, onError, onCanPlay }: PresetPreviewVideoProps) => {
  return (
    <video
      ref={previewVideoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
      onError={onError}
      onCanPlay={onCanPlay}
      aria-hidden
    />
  );
};

export default PresetPreviewVideo;
