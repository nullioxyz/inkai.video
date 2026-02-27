import UploadPreviewCard from './UploadPreviewCard';

interface UploadPreviewGalleryProps {
  inputImageSrc: string | null;
  outputImageSrc: string | null;
  inputImageName: string;
  outputImageName: string;
  disabled: boolean;
  onRemoveInput: () => void;
  onRemoveOutput: () => void;
}

const UploadPreviewGallery = ({
  inputImageSrc,
  outputImageSrc,
  inputImageName,
  outputImageName,
  disabled,
  onRemoveInput,
  onRemoveOutput,
}: UploadPreviewGalleryProps) => {
  if (!inputImageSrc && !outputImageSrc) {
    return null;
  }

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {inputImageSrc && (
        <UploadPreviewCard
          type="input"
          src={inputImageSrc}
          name={inputImageName}
          disabled={disabled}
          onRemove={onRemoveInput}
        />
      )}
      {outputImageSrc && (
        <UploadPreviewCard
          type="output"
          src={outputImageSrc}
          name={outputImageName}
          disabled={disabled}
          onRemove={onRemoveOutput}
        />
      )}
    </div>
  );
};

export default UploadPreviewGallery;
