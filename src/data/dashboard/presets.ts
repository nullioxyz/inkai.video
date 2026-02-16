import { PresetCategory, PresetItem, VideoJobItem } from '@/types/dashboard';

export const PRESET_CATEGORIES: PresetCategory[] = ['braço', 'costas', 'pescoço', 'pernas', 'antebraço', 'peitoral'];

export const DEFAULT_PRESETS: PresetItem[] = [
  { id: 'arm-01', category: 'braço', name: 'Braço Definido', description: 'Composição com foco em definição e contraste leve.', imageSrc: '/images/ns-img-320.png' },
  { id: 'arm-02', category: 'braço', name: 'Braço Intenso', description: 'Iluminação dramática para destacar volume muscular.', imageSrc: '/images/ns-img-321.png' },
  { id: 'back-01', category: 'costas', name: 'Costas V-Shape', description: 'Enquadramento para evidenciar largura dorsal.', imageSrc: '/images/ns-img-322.png' },
  { id: 'back-02', category: 'costas', name: 'Costas Clean', description: 'Visual mais limpo, ideal para conteúdo técnico.', imageSrc: '/images/ns-img-323.png' },
  { id: 'neck-01', category: 'pescoço', name: 'Pescoço Forte', description: 'Preset com sombras sutis para definição cervical.', imageSrc: '/images/ns-img-324.png' },
  { id: 'neck-02', category: 'pescoço', name: 'Pescoço Studio', description: 'Tom neutro com foco em clareza e textura.', imageSrc: '/images/ns-img-325.png' },
  { id: 'leg-01', category: 'pernas', name: 'Pernas Potência', description: 'Recorte com ênfase em quadríceps e volume.', imageSrc: '/images/ns-img-326.png' },
  { id: 'leg-02', category: 'pernas', name: 'Pernas Dinâmicas', description: 'Composição preparada para vídeo em movimento.', imageSrc: '/images/ns-img-327.png' },
  { id: 'forearm-01', category: 'antebraço', name: 'Antebraço Grip', description: 'Contraste médio para evidenciar vascularização.', imageSrc: '/images/ns-img-367.png' },
  { id: 'forearm-02', category: 'antebraço', name: 'Antebraço Clean', description: 'Preset leve para gravações explicativas.', imageSrc: '/images/ns-img-368.png' },
  { id: 'chest-01', category: 'peitoral', name: 'Peitoral Volume', description: 'Iluminação frontal para realçar profundidade.', imageSrc: '/images/ns-img-369.png' },
  { id: 'chest-02', category: 'peitoral', name: 'Peitoral Pro', description: 'Composição premium para anúncios e destaque.', imageSrc: '/images/ns-img-370.png' },
];

const SAMPLE_VIDEO_URLS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
];

const isoNow = () => new Date().toISOString();

export const buildMockJobs = (title: string, imageSrc: string): VideoJobItem[] => [
  {
    id: 'job-processing',
    title: title || 'Vídeo principal',
    imageSrc,
    videoUrl: SAMPLE_VIDEO_URLS[0],
    status: 'processing',
    format: 'MP4 - 16:9',
    prompt: 'Vídeo com foco em definição muscular e iluminação natural.',
    createdAt: isoNow(),
  },
  {
    id: 'job-completed',
    title: 'Versão curta para Reels',
    imageSrc: '/images/ns-img-371.png',
    videoUrl: SAMPLE_VIDEO_URLS[1],
    status: 'completed',
    format: 'MP4 - 16:9',
    prompt: 'Take dinâmico para redes sociais com cortes rápidos.',
    createdAt: isoNow(),
  },
  {
    id: 'job-failed',
    title: 'Teste alternativo',
    imageSrc: '/images/ns-img-379.png',
    videoUrl: SAMPLE_VIDEO_URLS[2],
    status: 'failed',
    format: 'MP4 - 16:9',
    prompt: 'Experimento com transição forte e contraste alto.',
    createdAt: isoNow(),
  },
  {
    id: 'job-canceled',
    title: 'Renderização cancelada',
    imageSrc: '/images/ns-img-380.png',
    videoUrl: SAMPLE_VIDEO_URLS[3],
    status: 'canceled',
    format: 'MP4 - 16:9',
    prompt: 'Versão com narrativa curta e enquadramento fechado.',
    createdAt: isoNow(),
  },
];

export const INITIAL_SIDEBAR_VIDEOS: VideoJobItem[] = [
  {
    id: 'job-example-01',
    title: 'Exemplo - Vídeo gerado',
    imageSrc: '/images/ns-img-417.jpg',
    videoUrl: SAMPLE_VIDEO_URLS[0],
    status: 'completed',
    format: 'MP4 - 16:9',
    prompt: 'Exemplo inicial para validação visual da sidebar e player.',
    createdAt: '2026-02-16T10:00:00.000Z',
  },
];
