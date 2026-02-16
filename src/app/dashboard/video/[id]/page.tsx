import DashboardContentShell from '@/components/dashboard/layout/DashboardContentShell';
import VideoDetailPageContent from '@/components/dashboard/pages/VideoDetailPageContent';
import VideoNotFoundPanel from '@/components/dashboard/pages/VideoNotFoundPanel';
import { DASHBOARD_VIDEO_LIBRARY, getVideoById } from '@/data/dashboard/videos';

interface DashboardVideoDetailsPageProps {
  params: Promise<{ id: string }>;
}

const DashboardVideoDetailsPage = async ({ params }: DashboardVideoDetailsPageProps) => {
  const { id } = await params;
  const video = getVideoById(id);

  return (
    <DashboardContentShell videos={DASHBOARD_VIDEO_LIBRARY} selectedVideoId={id}>
      {video ? (
        <VideoDetailPageContent video={video} />
      ) : (
        <VideoNotFoundPanel />
      )}
    </DashboardContentShell>
  );
};

export default DashboardVideoDetailsPage;
