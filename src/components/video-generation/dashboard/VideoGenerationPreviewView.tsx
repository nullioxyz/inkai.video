'use client';

import type { VideoJobItem } from '@/types/dashboard';
import { lazy, Suspense } from 'react';

const VideoDetailsPanel = lazy(() => import('@/components/video-details/VideoDetailsPanel'));

interface VideoGenerationPreviewViewProps {
  video: VideoJobItem;
  onCreateNewVideo: () => void;
}

const VideoGenerationPreviewView = ({ video, onCreateNewVideo }: VideoGenerationPreviewViewProps) => {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center py-2">
        <div className="w-full max-w-[860px]">
          <Suspense fallback={<div className="h-[460px] w-full animate-pulse rounded-[18px] bg-background-3 dark:bg-background-7" />}>
            <VideoDetailsPanel
              hideActions={false}
              actionsVisible={video.status === 'completed'}
              onCreateNewVideo={onCreateNewVideo}
              video={video}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerationPreviewView;
