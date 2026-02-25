'use client';

import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import VideoDetailPageContent from '@/components/dashboard/pages/VideoDetailPageContent';
import VideoNotFoundPanel from '@/components/dashboard/pages/VideoNotFoundPanel';
import { useDashboard } from '@/context/dashboard-context';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const DashboardVideoDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { videos, loadingJobs } = useDashboard();
  const video = useMemo(() => videos.find((item) => item.id === id) ?? null, [id, videos]);

  return (
    <DashboardContentShell videos={videos} selectedVideoId={id}>
      {video ? (
        <VideoDetailPageContent video={video} />
      ) : loadingJobs ? (
        <section className="flex min-h-[60vh] items-center justify-center">
          <div className="space-y-3 text-center">
            <span className="border-secondary/40 border-t-secondary inline-flex h-8 w-8 animate-spin rounded-full border-2" />
            <p className="text-tagline-2 text-secondary/65 dark:text-accent/65">Carregando detalhes do vídeo...</p>
          </div>
        </section>
      ) : (
        <VideoNotFoundPanel />
      )}
    </DashboardContentShell>
  );
};

export default DashboardVideoDetailsPage;
