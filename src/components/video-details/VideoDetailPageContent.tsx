'use client';

import VideoDetailsPanel from '@/components/video-details/VideoDetailsPanel';
import type { VideoJobItem } from '@/types/dashboard';
import { useRouter } from 'next/navigation';

interface VideoDetailPageContentProps {
  video: VideoJobItem;
}

const VideoDetailPageContent = ({ video }: VideoDetailPageContentProps) => {
  const router = useRouter();

  return <VideoDetailsPanel video={video} onCreateNewVideo={() => router.push('/dashboard')} />;
};

export default VideoDetailPageContent;
