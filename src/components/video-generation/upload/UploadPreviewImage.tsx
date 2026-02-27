import UploadPreviewRemoveButton from './UploadPreviewRemoveButton';

interface UploadPreviewImageProps {
  src: string;
  name: string;
  label: string;
  removeAriaLabel: string;
  disabled: boolean;
  onRemove: () => void;
}

const UploadPreviewImage = ({ src, name, label, removeAriaLabel, disabled, onRemove }: UploadPreviewImageProps) => {
  return (
    <div
      title={name}
      className="border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 relative h-20 w-28 overflow-hidden rounded-[10px] border">
      <img src={src} alt={label} className="h-full w-full object-cover" />
      <UploadPreviewRemoveButton disabled={disabled} ariaLabel={removeAriaLabel} onRemove={onRemove} />
    </div>
  );
};

export default UploadPreviewImage;
