import { useLocale } from '@/context/LocaleContext';
import UploadPreviewImage from './UploadPreviewImage';
import UploadPreviewLabel from './UploadPreviewLabel';

interface UploadPreviewCardProps {
  type: 'input' | 'output';
  src: string;
  name: string;
  disabled: boolean;
  onRemove: () => void;
}

const UploadPreviewCard = ({ type, src, name, disabled, onRemove }: UploadPreviewCardProps) => {
  const { t } = useLocale();
  const label = type === 'input' ? t('upload.inputImage') : t('upload.outputImage');
  const removeAriaLabel = `${t('upload.remove')} ${label}`;

  return (
    <div className="space-y-1">
      <UploadPreviewLabel label={label} />
      <UploadPreviewImage
        src={src}
        name={name}
        label={label}
        removeAriaLabel={removeAriaLabel}
        disabled={disabled}
        onRemove={onRemove}
      />
    </div>
  );
};

export default UploadPreviewCard;
