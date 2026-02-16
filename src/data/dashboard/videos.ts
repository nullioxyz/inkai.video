import { GeneratedVideoRecord } from '@/types/dashboard';

const SAMPLE_VIDEO_URLS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
];

export const DASHBOARD_VIDEO_LIBRARY: GeneratedVideoRecord[] = [
  {
    id: 'video-001',
    title: 'Peitoral Studio - V1',
    imageSrc: '/images/ns-img-417.jpg',
    videoUrl: SAMPLE_VIDEO_URLS[0],
    status: 'completed',
    format: 'MP4 - 16:9',
    prompt: 'Enquadramento frontal com foco em peitoral e contraste suave.',
    createdAt: '2026-02-16T10:00:00.000Z',
    creditsUsed: 24,
  },
  {
    id: 'video-002',
    title: 'Costas V-Shape - Reel',
    imageSrc: '/images/ns-img-323.png',
    videoUrl: SAMPLE_VIDEO_URLS[1],
    status: 'processing',
    format: 'MP4 - 16:9',
    prompt: 'Movimento lateral destacando largura dorsal em ritmo dinâmico.',
    createdAt: '2026-02-15T15:20:00.000Z',
    creditsUsed: 18,
  },
  {
    id: 'video-003',
    title: 'Braço Definido - Teste',
    imageSrc: '/images/ns-img-321.png',
    videoUrl: SAMPLE_VIDEO_URLS[2],
    status: 'failed',
    format: 'MP4 - 16:9',
    prompt: 'Teste com transição rápida e iluminação dramática.',
    createdAt: '2026-02-14T09:40:00.000Z',
    creditsUsed: 12,
  },
  {
    id: 'video-004',
    title: 'Pernas Dinâmicas - Promo',
    imageSrc: '/images/ns-img-327.png',
    videoUrl: SAMPLE_VIDEO_URLS[3],
    status: 'canceled',
    format: 'MP4 - 16:9',
    prompt: 'Vídeo promocional com cortes curtos para redes sociais.',
    createdAt: '2026-02-13T21:10:00.000Z',
    creditsUsed: 10,
  },
  {
    id: 'video-005',
    title: 'Antebraço Grip - Tutorial',
    imageSrc: '/images/ns-img-367.png',
    videoUrl: SAMPLE_VIDEO_URLS[4],
    status: 'completed',
    format: 'MP4 - 16:9',
    prompt: 'Explicação técnica com foco em contração e pegada.',
    createdAt: '2026-02-12T11:05:00.000Z',
    creditsUsed: 16,
  },
];

export const DASHBOARD_TOTAL_CREDITS = 200;

export const getUsedCredits = (videos: GeneratedVideoRecord[]) => {
  return videos.reduce((total, video) => total + video.creditsUsed, 0);
};

export const getRemainingCredits = (videos: GeneratedVideoRecord[]) => {
  return Math.max(DASHBOARD_TOTAL_CREDITS - getUsedCredits(videos), 0);
};

export const getVideoById = (videoId: string) => {
  return DASHBOARD_VIDEO_LIBRARY.find((video) => video.id === videoId) ?? null;
};
