import { RefObject } from 'react';

interface PresetPreviewVideoProps {
  previewVideoRef: RefObject<HTMLVideoElement | null>;
  src: string;
  isHovering: boolean;
}

const PresetPreviewVideo = ({ previewVideoRef, src, isHovering }: PresetPreviewVideoProps) => {
  return (
    <video
      ref={previewVideoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden
    />
  );
};

export default PresetPreviewVideo;
