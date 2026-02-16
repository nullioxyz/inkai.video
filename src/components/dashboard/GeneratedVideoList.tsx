import StatusBadge from '@/components/common/StatusBadge';
import { VideoJobItem } from '@/types/dashboard';
import Image from 'next/image';

interface GeneratedVideoListProps {
  jobs: VideoJobItem[];
}

const GeneratedVideoList = ({ jobs }: GeneratedVideoListProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-heading-6 text-secondary dark:text-accent font-medium">Renderizações</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <article
            key={job.id}
            className="border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 shadow-1 overflow-hidden rounded-[12px] border">
            <div className="relative aspect-video">
              <Image src={job.imageSrc} alt={job.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="space-y-3 p-4">
              <p className="text-tagline-1 text-secondary dark:text-accent font-medium">{job.title}</p>
              <StatusBadge status={job.status} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default GeneratedVideoList;
