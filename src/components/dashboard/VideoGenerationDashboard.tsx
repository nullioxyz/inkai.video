'use client';

import { useLocale } from '@/context/LocaleContext';
import { PresetItem, VideoJobItem } from '@/types/dashboard';
import { useEffect, useMemo, useState } from 'react';
import DashboardGreeting from './DashboardGreeting';
import PresetCategoryFilter from './PresetCategoryFilter';
import PresetGrid from './PresetGrid';
import VideoDetailsPanel from './VideoDetailsPanel';
import UploadAndTitleSection from './UploadAndTitleSection';

interface GenerateVideoPayload {
  title: string;
  imageFile: File;
  imageSrc: string;
  format: string;
  prompt: string;
  preset: PresetItem;
}

interface VideoGenerationDashboardProps {
  presets: PresetItem[];
  presetCategories: string[];
  loadingPresets?: boolean;
  presetsError?: string | null;
  onGenerateVideo: (payload: GenerateVideoPayload) => Promise<VideoJobItem>;
  animateInTrigger?: number;
}

const VideoGenerationDashboard = ({
  presets,
  presetCategories,
  loadingPresets = false,
  presetsError = null,
  onGenerateVideo,
  animateInTrigger = 0,
}: VideoGenerationDashboardProps) => {
  const { t } = useLocale();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<VideoJobItem | null>(null);
  const [isEnteringFromDetail, setIsEnteringFromDetail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [inputImageName, setInputImageName] = useState('');
  const [outputImageName, setOutputImageName] = useState('');
  const [inputImageSrc, setInputImageSrc] = useState<string | null>(null);
  const [outputImageSrc, setOutputImageSrc] = useState<string | null>(null);
  const [inputImageFile, setInputImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (presetCategories.length === 0) {
      setSelectedCategory(null);
      return;
    }

    if (!selectedCategory || !presetCategories.includes(selectedCategory)) {
      setSelectedCategory(presetCategories[0]);
    }
  }, [presetCategories, selectedCategory]);

  const filteredPresets = useMemo(() => {
    if (!selectedCategory) {
      return presets;
    }
    return presets.filter((preset) => {
      const tags = preset.tags ?? [];
      if (tags.length) {
        return tags.some((tag) => tag.slug === selectedCategory);
      }
      return preset.category === selectedCategory;
    });
  }, [presets, selectedCategory]);

  const selectedPreset = useMemo(() => {
    return presets.find((preset) => preset.id === selectedPresetId) ?? filteredPresets[0] ?? null;
  }, [filteredPresets, presets, selectedPresetId]);

  useEffect(() => {
    if (filteredPresets.length === 0) {
      setSelectedPresetId(null);
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
      if (inputImageSrc && inputImageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(inputImageSrc);
      }
      if (outputImageSrc && outputImageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(outputImageSrc);
      }
    };
  }, [inputImageSrc, outputImageSrc]);

  const handleInputImageChange = (file: File | null) => {
    setErrorMessage(null);

    if (inputImageSrc && inputImageSrc.startsWith('blob:')) {
      URL.revokeObjectURL(inputImageSrc);
    }

    if (!file) {
      setInputImageFile(null);
      setInputImageSrc(null);
      setInputImageName('');
      return;
    }

    setInputImageFile(file);
    setInputImageName(file.name);
    setInputImageSrc(URL.createObjectURL(file));
  };

  const handleOutputImageChange = (file: File | null) => {
    setErrorMessage(null);

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

  const handleGenerate = async () => {
    if (!inputImageSrc || !inputImageFile || !selectedPreset || isTransitioning || previewVideo) {
      return;
    }

    setErrorMessage(null);
    setIsTransitioning(true);
    try {
      const createdVideo = await onGenerateVideo({
        title: title.trim() || selectedPreset.name,
        imageFile: inputImageFile,
        imageSrc: inputImageSrc,
        format: selectedPreset.aspectRatio ?? '9:16',
        prompt: selectedPreset.description,
        preset: selectedPreset,
      });
      setPreviewVideo(createdVideo);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao gerar vídeo.';
      setErrorMessage(message);
    } finally {
      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 280);
    }
  };

  const handleResetCreation = () => {
    setPreviewVideo(null);
    setIsTransitioning(false);
    setErrorMessage(null);
    handleInputImageChange(null);
    handleOutputImageChange(null);
    setTitle('');
  };

  return (
    <section className="flex h-full min-h-0 w-full flex-col">
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

        <div className="mt-8 flex min-h-0 flex-1 flex-col overflow-hidden">
          {!previewVideo ? (
            <div
              className={`flex min-h-0 flex-1 flex-col overflow-hidden transition-all duration-350 ${isTransitioning ? 'translate-x-12 opacity-0' : 'translate-x-0 opacity-100'}`}>
              <div className="min-h-0 flex-1 overflow-hidden pb-6">
                <section className="flex h-full min-h-0 flex-col gap-6 overflow-hidden">
                  <div className="space-y-2 text-center">
                    <h2 className="text-heading-6 text-secondary dark:text-accent font-medium">{t('dashboard.choosePresetTitle')}</h2>
                    <p className="text-tagline-2 text-secondary/60 dark:text-accent/60">{t('dashboard.choosePresetDescription')}</p>
                  </div>

                  <PresetCategoryFilter
                    categories={presetCategories}
                    activeCategory={selectedCategory ?? ''}
                    onChange={(nextCategory) => setSelectedCategory(nextCategory)}
                  />

                  <div className="relative">
                    <div className="pointer-events-none mb-2 flex items-center justify-end gap-1 text-[11px] font-medium tracking-wide text-secondary/45 dark:text-accent/45 uppercase">
                      <span>{t('dashboard.presetsScrollHint')}</span>
                      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 5v14" />
                        <path d="m8.5 15.5 3.5 3.5 3.5-3.5" />
                      </svg>
                    </div>

                  <div
                      data-lenis-prevent="true"
                      className="h-[46vh] overflow-y-auto overscroll-contain pr-1 md:h-[50vh]"
                      onWheel={(event) => {
                        const element = event.currentTarget;
                        if (element.scrollHeight <= element.clientHeight) {
                          return;
                        }
                        event.preventDefault();
                        event.stopPropagation();
                        element.scrollTop += event.deltaY;
                      }}>
                      {loadingPresets ? (
                        <div className="mx-auto grid w-full max-w-[980px] grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
                          {Array.from({ length: 6 }).map((_, index) => (
                            <div
                              key={`preset-skeleton-${index}`}
                              className="border-stroke-3 dark:border-stroke-7 animate-pulse overflow-hidden rounded-[10px] border">
                              <div className="aspect-[4/3] bg-background-3 dark:bg-background-7" />
                              <div className="space-y-2 p-2.5">
                                <div className="h-3.5 w-2/3 rounded bg-background-3 dark:bg-background-7" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : presetsError ? (
                        <p className="text-tagline-2 text-ns-red text-center">{presetsError}</p>
                      ) : (
                        <PresetGrid presets={filteredPresets} selectedPresetId={selectedPresetId} onSelectPreset={setSelectedPresetId} />
                      )}
                    </div>

                  </div>

                  {errorMessage && <p className="text-tagline-2 text-ns-red text-center">{errorMessage}</p>}
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
                  canGenerate={Boolean(inputImageSrc && inputImageFile && selectedPreset)}
                  disabled={isTransitioning}
                />
              </div>
            </div>
          ) : (
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center py-2">
                <div className="w-full max-w-[860px]">
                  <VideoDetailsPanel
                    hideActions={false}
                    actionsVisible={previewVideo.status === 'completed'}
                    onCreateNewVideo={handleResetCreation}
                    video={previewVideo}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoGenerationDashboard;
