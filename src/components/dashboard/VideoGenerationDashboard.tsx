'use client';

import { DEFAULT_PRESETS, PRESET_CATEGORIES } from '@/data/dashboard/presets';
import { useLocale } from '@/context/LocaleContext';
import { PresetCategory, VideoJobItem } from '@/types/dashboard';
import { useEffect, useMemo, useRef, useState } from 'react';
import DashboardGreeting from './DashboardGreeting';
import PresetCategoryFilter from './PresetCategoryFilter';
import PresetGrid from './PresetGrid';
import VideoDetailsPanel from './VideoDetailsPanel';
import UploadAndTitleSection from './UploadAndTitleSection';

interface GenerateVideoPayload {
  title: string;
  imageSrc: string;
  format: string;
  prompt: string;
}

interface VideoGenerationDashboardProps {
  onGenerateVideo: (payload: GenerateVideoPayload) => void;
  animateInTrigger?: number;
}

const VideoGenerationDashboard = ({ onGenerateVideo, animateInTrigger = 0 }: VideoGenerationDashboardProps) => {
  const { t } = useLocale();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<VideoJobItem | null>(null);
  const [isEnteringFromDetail, setIsEnteringFromDetail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PresetCategory>('braço');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(DEFAULT_PRESETS[0]?.id ?? null);
  const [title, setTitle] = useState('');
  const [inputImageName, setInputImageName] = useState('');
  const [outputImageName, setOutputImageName] = useState('');
  const [inputImageSrc, setInputImageSrc] = useState<string | null>(null);
  const [outputImageSrc, setOutputImageSrc] = useState<string | null>(null);
  const completionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredPresets = useMemo(() => {
    return DEFAULT_PRESETS.filter((preset) => preset.category === selectedCategory);
  }, [selectedCategory]);

  const selectedPreset = useMemo(() => {
    return DEFAULT_PRESETS.find((preset) => preset.id === selectedPresetId) ?? filteredPresets[0] ?? DEFAULT_PRESETS[0];
  }, [filteredPresets, selectedPresetId]);

  useEffect(() => {
    if (filteredPresets.length === 0) {
      return;
    }

    const isCurrentCategoryPreset = filteredPresets.some((preset) => preset.id === selectedPresetId);
    if (!isCurrentCategoryPreset) {
      setSelectedPresetId(filteredPresets[0].id);
    }
  }, [filteredPresets, selectedPresetId]);

  useEffect(() => {
    if (animateInTrigger === 0) {
      return;
    }

    setIsEnteringFromDetail(true);
    const raf = window.requestAnimationFrame(() => {
      setIsEnteringFromDetail(false);
    });

    return () => window.cancelAnimationFrame(raf);
  }, [animateInTrigger]);

  useEffect(() => {
    return () => {
      if (completionTimerRef.current) {
        clearTimeout(completionTimerRef.current);
      }
      if (inputImageSrc && inputImageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(inputImageSrc);
      }
      if (outputImageSrc && outputImageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(outputImageSrc);
      }
    };
  }, [inputImageSrc, outputImageSrc]);

  const handleInputImageChange = (file: File | null) => {
    if (inputImageSrc && inputImageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(inputImageSrc);
    }

    if (!file) {
      setInputImageSrc(null);
      setInputImageName('');
      return;
    }

    setInputImageName(file.name);
    setInputImageSrc(URL.createObjectURL(file));
  };

  const handleOutputImageChange = (file: File | null) => {
    if (outputImageSrc && outputImageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(outputImageSrc);
    }

    if (!file) {
      setOutputImageSrc(null);
      setOutputImageName('');
      return;
    }

    setOutputImageName(file.name);
    setOutputImageSrc(URL.createObjectURL(file));
  };

  const handleGenerate = () => {
    if (!inputImageSrc || isTransitioning || previewVideo) {
      return;
    }

    const nextVideo: VideoJobItem = {
      id: `processing-preview-${Date.now()}`,
      title: title.trim() || selectedPreset.name,
      imageSrc: inputImageSrc,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      status: 'processing',
      format: 'MP4 - 16:9',
      prompt: selectedPreset.description,
      createdAt: new Date().toISOString(),
    };

    setIsTransitioning(true);
    setPreviewVideo(nextVideo);
    onGenerateVideo({
      title: nextVideo.title,
      imageSrc: inputImageSrc,
      format: nextVideo.format,
      prompt: selectedPreset.description,
    });

    if (completionTimerRef.current) {
      clearTimeout(completionTimerRef.current);
    }
    completionTimerRef.current = setTimeout(() => {
      setPreviewVideo((prev) => (prev ? { ...prev, status: 'completed' } : prev));
      completionTimerRef.current = null;
    }, 3200);

    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 380);
  };

  const handleResetCreation = () => {
    if (completionTimerRef.current) {
      clearTimeout(completionTimerRef.current);
      completionTimerRef.current = null;
    }

    setPreviewVideo(null);
    setIsTransitioning(false);
    handleInputImageChange(null);
    handleOutputImageChange(null);
    setTitle('');
  };

  return (
    <section className="h-full w-full">
      <div
        className={`mx-auto relative flex h-full w-full max-w-[1120px] min-h-0 flex-col transition-all duration-350 ${
          isEnteringFromDetail ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
        }`}>
        {previewVideo ? (
          <header className="text-center">
            <h1 className="text-heading-5 text-secondary dark:text-accent md:text-heading-4 font-normal">{t('dashboard.processingTitle')}</h1>
          </header>
        ) : (
          <DashboardGreeting />
        )}

        <div className="mt-8 relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div
            className={`absolute inset-0 flex min-h-0 flex-1 flex-col transition-all duration-350 ${
              isTransitioning || previewVideo ? 'pointer-events-none translate-x-12 opacity-0' : 'translate-x-0 opacity-100'
            }`}>
            <div className="min-h-0 flex-1 overflow-y-auto pb-8">
              <section className="space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-heading-6 text-secondary dark:text-accent font-medium">{t('dashboard.choosePresetTitle')}</h2>
                  <p className="text-tagline-2 text-secondary/60 dark:text-accent/60">{t('dashboard.choosePresetDescription')}</p>
                </div>

                <PresetCategoryFilter
                  categories={PRESET_CATEGORIES}
                  activeCategory={selectedCategory}
                  onChange={setSelectedCategory}
                />

                <PresetGrid presets={filteredPresets} selectedPresetId={selectedPresetId} onSelectPreset={setSelectedPresetId} />
              </section>
            </div>

            <div className="shrink-0 bg-background-3/90 dark:bg-background-7/90 backdrop-blur-sm">
              <UploadAndTitleSection
                title={title}
                inputImageName={inputImageName}
                outputImageName={outputImageName}
                inputImageSrc={inputImageSrc}
                outputImageSrc={outputImageSrc}
                onTitleChange={setTitle}
                onInputImageChange={handleInputImageChange}
                onOutputImageChange={handleOutputImageChange}
                onGenerate={handleGenerate}
                canGenerate={Boolean(inputImageSrc)}
                disabled={isTransitioning || Boolean(previewVideo)}
              />
            </div>
          </div>

          <div
            className={`absolute inset-0 overflow-y-auto transition-all duration-350 ${
              previewVideo ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
            }`}>
            <div className="flex min-h-full items-center justify-center py-2">
              <div className="w-full max-w-[860px]">
                {previewVideo ? (
                  <div>
                    <VideoDetailsPanel
                      hideActions={false}
                      actionsVisible={previewVideo.status === 'completed'}
                      onCreateNewVideo={handleResetCreation}
                      video={previewVideo}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGenerationDashboard;
