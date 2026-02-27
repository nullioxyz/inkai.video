import MosaicGrid from '@/components/common/mosaic/MosaicGrid';
import StatusBadge from '@/components/common/StatusBadge';
import VideoCard from '@/components/videos/VideoCard';
import type { VideoJobItem } from '@/types/dashboard';
import Image from 'next/image';

interface GeneratedVideoListProps {
  jobs: VideoJobItem[];
}

const GeneratedVideoList = ({ jobs }: GeneratedVideoListProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-heading-6 text-secondary dark:text-accent font-medium">Renderizações</h2>
      <MosaicGrid
        items={jobs}
        getKey={(job) => job.id}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        itemClassName=""
        renderItem={(job) => (
          <VideoCard.Root className="shadow-1">
            <VideoCard.Media className="aspect-video">
              <Image src={job.imageSrc} alt={job.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </VideoCard.Media>
            <VideoCard.Content className="space-y-3">
              <VideoCard.Title className="font-medium">{job.title}</VideoCard.Title>
              <StatusBadge status={job.status} />
            </VideoCard.Content>
          </VideoCard.Root>
        )}
      />
    </section>
  );
};

export default GeneratedVideoList;
