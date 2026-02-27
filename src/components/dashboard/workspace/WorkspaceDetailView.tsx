import VideoDetailsPanel from '@/components/video-details/VideoDetailsPanel';
import type { VideoJobItem } from '@/types/dashboard';

interface WorkspaceDetailViewProps {
  video: VideoJobItem;
  isReturningToCreate: boolean;
  onCreateNewVideo: () => void;
}

const WorkspaceDetailView = ({ video, isReturningToCreate, onCreateNewVideo }: WorkspaceDetailViewProps) => {
  return (
    <div className={`flex min-h-0 flex-1 flex-col transition-all duration-300 ${isReturningToCreate ? '-translate-x-8 opacity-0' : 'translate-x-0 opacity-100'}`}>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <VideoDetailsPanel video={video} onCreateNewVideo={onCreateNewVideo} />
      </div>
    </div>
  );
};

export default WorkspaceDetailView;
