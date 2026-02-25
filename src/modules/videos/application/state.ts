import { VideoJobItem } from '@/types/dashboard';

export const upsertVideoById = (videos: VideoJobItem[], next: VideoJobItem): VideoJobItem[] => {
  const index = videos.findIndex((video) => video.id === next.id);

  if (index === -1) {
    return [next, ...videos];
  }

  const updated = [...videos];
  updated[index] = {
    ...updated[index],
    ...next,
  };

  return updated;
};

export const replaceVideosSorted = (videos: VideoJobItem[]): VideoJobItem[] => {
  return [...videos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
