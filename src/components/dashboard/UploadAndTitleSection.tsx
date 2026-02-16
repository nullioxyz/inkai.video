'use client';

import { useLocale } from '@/context/LocaleContext';
import { useEffect, useRef, useState } from 'react';

interface UploadAndTitleSectionProps {
  title: string;
  inputImageName: string;
  outputImageName: string;
  inputImageSrc: string | null;
  outputImageSrc: string | null;
  onTitleChange: (value: string) => void;
  onInputImageChange: (file: File | null) => void;
  onOutputImageChange: (file: File | null) => void;
  onGenerate: () => void;
  canGenerate: boolean;
  disabled?: boolean;
}

const UploadAndTitleSection = ({
  title,
  inputImageName,
  outputImageName,
  inputImageSrc,
  outputImageSrc,
  onTitleChange,
  onInputImageChange,
  onOutputImageChange,
  onGenerate,
  canGenerate,
  disabled = false,
}: UploadAndTitleSectionProps) => {
  const { t } = useLocale();
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const uploadMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!uploadMenuRef.current) {
        return;
      }

      if (!uploadMenuRef.current.contains(event.target as Node)) {
        setShowUploadOptions(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  useEffect(() => {
    if (disabled && showUploadOptions) {
      setShowUploadOptions(false);
    }
  }, [disabled, showUploadOptions]);

  const handleInputUpload = (file: File | null) => {
    onInputImageChange(file);
    setShowUploadOptions(false);
  };

  const handleOutputUpload = (file: File | null) => {
    onOutputImageChange(file);
    setShowUploadOptions(false);
  };

  return (
    <div className="mx-auto w-full max-w-[860px] space-y-3 pt-1">
      <div className="border-stroke-3 dark:border-stroke-7 bg-background-1/80 dark:bg-background-6 rounded-[12px] border p-2">
        {(inputImageSrc || outputImageSrc) && (
          <div className="mb-2 flex flex-wrap gap-2">
            {inputImageSrc && (
              <div className="space-y-1">
                <p className="text-tagline-3 text-secondary/70 dark:text-accent/70 px-1">{t('upload.inputImage')}</p>
                <div
                  title={inputImageName}
                  className="border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 relative h-20 w-28 overflow-hidden rounded-[10px] border">
                  <img src={inputImageSrc} alt={t('upload.inputImage')} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onInputImageChange(null)}
                    aria-label={`${t('upload.remove')} ${t('upload.inputImage')}`}
                    className="bg-background-1/90 dark:bg-background-8/90 text-secondary dark:text-accent hover:bg-background-1 dark:hover:bg-background-8 absolute right-1.5 top-1.5 inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-[6px] text-xs leading-none transition disabled:cursor-not-allowed disabled:opacity-50">
                    x
                  </button>
                </div>
              </div>
            )}
            {outputImageSrc && (
              <div className="space-y-1">
                <p className="text-tagline-3 text-secondary/70 dark:text-accent/70 px-1">{t('upload.outputImage')}</p>
                <div
                  title={outputImageName}
                  className="border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 relative h-20 w-28 overflow-hidden rounded-[10px] border">
                  <img src={outputImageSrc} alt={t('upload.outputImage')} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onOutputImageChange(null)}
                    aria-label={`${t('upload.remove')} ${t('upload.outputImage')}`}
                    className="bg-background-1/90 dark:bg-background-8/90 text-secondary dark:text-accent hover:bg-background-1 dark:hover:bg-background-8 absolute right-1.5 top-1.5 inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-[6px] text-xs leading-none transition disabled:cursor-not-allowed disabled:opacity-50">
                    x
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative flex h-10 items-center gap-2">
          <div ref={uploadMenuRef} className="relative shrink-0">
            <button
              type="button"
              disabled={disabled}
              onClick={() => !disabled && setShowUploadOptions((prev) => !prev)}
              aria-label={t('upload.label')}
              className="border-stroke-3 dark:border-stroke-7 bg-background-1/70 dark:bg-background-6/70 text-secondary dark:text-accent hover:bg-background-1 dark:hover:bg-background-6 inline-flex h-9 w-9 items-center justify-center rounded-[10px] border transition disabled:cursor-not-allowed disabled:opacity-50">
              <svg viewBox="0 0 20 20" fill="none" className="stroke-current size-4">
                <rect x="3.5" y="4.5" width="13" height="11" rx="1.8" strokeWidth="1.5" />
                <path d="M3.5 12.2L7.2 9L10.4 11.5L12.7 9.6L16.5 12.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.2" cy="7.8" r="1.1" strokeWidth="1.5" />
              </svg>
            </button>

            {showUploadOptions && (
              <div className="border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 shadow-1 absolute bottom-[46px] left-0 z-20 w-[210px] space-y-1 rounded-[10px] border p-2">
                <label className="hover:bg-background-2 dark:hover:bg-background-7 flex cursor-pointer items-center justify-between rounded-[8px] px-2 py-2 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={disabled}
                    onChange={(event) => handleInputUpload(event.target.files?.[0] ?? null)}
                  />
                  <span className="text-tagline-2 text-secondary dark:text-accent">{t('upload.inputImage')}</span>
                  <span className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('upload.required')}</span>
                </label>

                <label className="hover:bg-background-2 dark:hover:bg-background-7 flex cursor-pointer items-center justify-between rounded-[8px] px-2 py-2 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={disabled}
                    onChange={(event) => handleOutputUpload(event.target.files?.[0] ?? null)}
                  />
                  <span className="text-tagline-2 text-secondary dark:text-accent">{t('upload.outputImage')}</span>
                  <span className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('upload.optional')}</span>
                </label>
              </div>
            )}
          </div>

          <input
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder={t('upload.placeholder')}
            disabled={disabled}
            className="text-tagline-1 text-secondary dark:text-accent placeholder:text-secondary/50 dark:placeholder:text-accent/60 h-10 w-full min-w-0 border-0 bg-transparent pr-[56px] pl-1 outline-none"
          />

          <button
            type="button"
            aria-label={t('dashboard.generateVideo')}
            title={t('dashboard.generateVideo')}
            onClick={onGenerate}
            disabled={!canGenerate || disabled}
            className="bg-secondary dark:bg-accent hover:bg-secondary/90 dark:hover:bg-accent/90 absolute right-0 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-transparent transition disabled:cursor-not-allowed disabled:opacity-40">
            <svg viewBox="0 0 20 20" fill="none" className="size-3.5 shrink-0">
              <path d="M7.08301 5.12496V14.875C7.08301 15.3158 7.56995 15.5815 7.94058 15.3404L14.8982 10.7154C15.2299 10.4946 15.2299 10.0054 14.8982 9.78457L7.94058 5.15957C7.56995 4.91846 7.08301 5.18416 7.08301 5.62496V5.12496Z" className="fill-accent dark:fill-secondary" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('upload.helper')}</p>
    </div>
  );
};

export default UploadAndTitleSection;
