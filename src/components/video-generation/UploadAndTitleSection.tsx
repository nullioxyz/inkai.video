'use client';

import { useLocale } from '@/context/LocaleContext';
import { useVideoGenerationForm } from './context/VideoGenerationFormContext';
import UploadActionBar from './upload/UploadActionBar';
import UploadPreviewGallery from './upload/UploadPreviewGallery';
import { useUploadMenu } from './upload/useUploadMenu';

interface UploadAndTitleSectionProps {
  onGenerate: () => void;
  canGenerate: boolean;
  disabled?: boolean;
}

const UploadAndTitleSection = ({ onGenerate, canGenerate, disabled = false }: UploadAndTitleSectionProps) => {
  const { t } = useLocale();
  const {
    title,
    inputImageName,
    outputImageName,
    inputImageSrc,
    outputImageSrc,
    setTitle,
    setInputImage,
    setOutputImage,
  } = useVideoGenerationForm();

  const { showUploadOptions, uploadMenuRef, closeMenu, toggleMenu } = useUploadMenu(disabled);

  const handleInputUpload = (file: File | null) => {
    setInputImage(file);
    closeMenu();
  };

  const handleOutputUpload = (file: File | null) => {
    setOutputImage(file);
    closeMenu();
  };

  return (
    <div className="mx-auto w-full max-w-[860px] space-y-3 pt-1">
      <div className="border-stroke-3 dark:border-stroke-7 bg-background-1/80 dark:bg-background-6 rounded-[12px] border p-2">
        <UploadPreviewGallery
          inputImageSrc={inputImageSrc}
          outputImageSrc={outputImageSrc}
          inputImageName={inputImageName}
          outputImageName={outputImageName}
          disabled={disabled}
          onRemoveInput={() => setInputImage(null)}
          onRemoveOutput={() => setOutputImage(null)}
        />

        <UploadActionBar
          disabled={disabled}
          canGenerate={canGenerate}
          title={title}
          onTitleChange={setTitle}
          onGenerate={onGenerate}
          uploadMenuRef={uploadMenuRef}
          showUploadOptions={showUploadOptions}
          onToggleUploadOptions={toggleMenu}
          onInputUpload={handleInputUpload}
          onOutputUpload={handleOutputUpload}
        />
      </div>
      <p className="text-tagline-3 text-secondary/60 dark:text-accent/60">{t('upload.helper')}</p>
    </div>
  );
};

export default UploadAndTitleSection;
