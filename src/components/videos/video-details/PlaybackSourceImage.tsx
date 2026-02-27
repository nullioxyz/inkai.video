import { useState } from 'react';

interface PlaybackSourceImageProps {
  src: string;
  title: string;
}

const PlaybackSourceImage = ({ src, title }: PlaybackSourceImageProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <img
      src={imageFailed ? '/images/ns-img-323.png' : src}
      alt={title}
      className="h-full w-full object-contain opacity-65"
      onError={() => setImageFailed(true)}
    />
  );
};

export default PlaybackSourceImage;
