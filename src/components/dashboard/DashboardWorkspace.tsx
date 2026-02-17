'use client';

import { DASHBOARD_VIDEO_LIBRARY } from '@/data/dashboard/videos';
import { VideoJobItem } from '@/types/dashboard';
import { useEffect, useMemo, useRef, useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import VideoDetailsPanel from './VideoDetailsPanel';
import VideoGenerationDashboard from './VideoGenerationDashboard';

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'inkai-dashboard-sidebar-collapsed';

const DashboardWorkspace = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const saved = localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });
  const [videos, setVideos] = useState<VideoJobItem[]>(DASHBOARD_VIDEO_LIBRARY);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const generationTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const [isReturningToCreate, setIsReturningToCreate] = useState(false);
  const [createViewAnimationKey, setCreateViewAnimationKey] = useState(0);

  const selectedVideo = useMemo(() => {
    if (!selectedVideoId) {
      return null;
    }
    return videos.find((video) => video.id === selectedVideoId) ?? null;
  }, [selectedVideoId, videos]);

  useEffect(() => {
    return () => {
      generationTimersRef.current.forEach((timer) => clearTimeout(timer));
      generationTimersRef.current.clear();
    };
  }, []);

  const handleGenerateVideo = (payload: { title: string; imageSrc: string; format: string; prompt: string }) => {
    const id = `video-${Date.now()}`;

    const processingVideo: VideoJobItem = {
      id,
      title: payload.title,
      imageSrc: payload.imageSrc,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      status: 'processing',
      format: payload.format,
      prompt: payload.prompt,
      createdAt: new Date().toISOString(),
    };

    setVideos((prev) => [processingVideo, ...prev]);

    const timer = setTimeout(() => {
      setVideos((prev) => prev.map((video) => (video.id === id ? { ...video, status: 'completed' } : video)));
      generationTimersRef.current.delete(id);
    }, 3200);

    generationTimersRef.current.set(id, timer);
  };

  const handleCreateNewVideo = () => {
    if (!selectedVideoId) {
      return;
    }

    setIsReturningToCreate(true);
    window.setTimeout(() => {
      setSelectedVideoId(null);
      setCreateViewAnimationKey((prev) => prev + 1);
      setIsReturningToCreate(false);
    }, 280);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(next));
      } catch {
        // Ignore storage access issues.
      }
      return next;
    });
  };

  return (
    <main className="bg-background-3 dark:bg-background-7 min-h-screen">
      <div className="flex min-h-screen w-full">
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
          videos={videos}
          selectedVideoId={selectedVideoId}
          onSelectVideo={setSelectedVideoId}
          onCreateNewVideo={handleCreateNewVideo}
        />

        <div className="flex-1 min-w-0 p-4 md:p-8 lg:p-10">
          {selectedVideo ? (
            <div className={`transition-all duration-300 ${isReturningToCreate ? '-translate-x-8 opacity-0' : 'translate-x-0 opacity-100'}`}>
              <VideoDetailsPanel video={selectedVideo} onCreateNewVideo={handleCreateNewVideo} />
            </div>
          ) : (
            <VideoGenerationDashboard onGenerateVideo={handleGenerateVideo} animateInTrigger={createViewAnimationKey} />
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardWorkspace;
