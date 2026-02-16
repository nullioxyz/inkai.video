import { PresetCategory, PresetItem, VideoJobItem } from '@/types/dashboard';

export const PRESET_CATEGORIES: PresetCategory[] = ['braço', 'costas', 'pescoço', 'pernas', 'antebraço', 'peitoral'];

export const DEFAULT_PRESETS: PresetItem[] = [
  { id: 'arm-01', category: 'braço', name: 'Traço Fino no Braço', description: 'Animação suave para destacar linework e fluxo da tattoo no braço.', imageSrc: '/images/ns-img-320.png' },
  { id: 'arm-02', category: 'braço', name: 'Braço Neo Trad', description: 'Contraste mais forte para valorizar cores e volume no estilo neo tradicional.', imageSrc: '/images/ns-img-321.png' },
  { id: 'back-01', category: 'costas', name: 'Costas Fechamento', description: 'Composição ampla para visualizar tattoo grande de costas com leitura completa.', imageSrc: '/images/ns-img-322.png' },
  { id: 'back-02', category: 'costas', name: 'Costas Blackwork', description: 'Preset focado em preto sólido, textura e impacto visual do blackwork.', imageSrc: '/images/ns-img-323.png' },
  { id: 'neck-01', category: 'pescoço', name: 'Pescoço Delicado', description: 'Movimento leve para tattoos finas no pescoço com destaque de contorno.', imageSrc: '/images/ns-img-324.png' },
  { id: 'neck-02', category: 'pescoço', name: 'Pescoço Bold', description: 'Sombras mais dramáticas para tattoos marcantes na região cervical.', imageSrc: '/images/ns-img-325.png' },
  { id: 'leg-01', category: 'pernas', name: 'Perna Ornamental', description: 'Preset para composições ornamentais com boa leitura em toda a perna.', imageSrc: '/images/ns-img-326.png' },
  { id: 'leg-02', category: 'pernas', name: 'Perna Realismo', description: 'Profundidade e contraste para estudos realistas em projetos de perna.', imageSrc: '/images/ns-img-327.png' },
  { id: 'forearm-01', category: 'antebraço', name: 'Antebraço Fine Line', description: 'Visual limpo para tattoos de linha fina e alto detalhamento no antebraço.', imageSrc: '/images/ns-img-367.png' },
  { id: 'forearm-02', category: 'antebraço', name: 'Antebraço Sombreado', description: 'Preset com foco em sombra e volume para tattoos mais densas.', imageSrc: '/images/ns-img-368.png' },
  { id: 'chest-01', category: 'peitoral', name: 'Peitoral Simétrico', description: 'Composição frontal para tattoos simétricas e centrais no peitoral.', imageSrc: '/images/ns-img-369.png' },
  { id: 'chest-02', category: 'peitoral', name: 'Peitoral High Contrast', description: 'Mais contraste para destacar preenchimento e textura em tattoos de peito.', imageSrc: '/images/ns-img-370.png' },
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
