interface PlaybackSourceImageProps {
  src: string;
  title: string;
}

const PlaybackSourceImage = ({ src, title }: PlaybackSourceImageProps) => {
  return <img src={src} alt={title} className="h-full w-full object-contain opacity-65" />;
};

export default PlaybackSourceImage;
