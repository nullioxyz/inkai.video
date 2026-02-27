import { useLocale } from '@/context/LocaleContext';
import UploadMenuItem from './UploadMenuItem';

interface UploadMenuProps {
  disabled: boolean;
  open: boolean;
  onInputUpload: (file: File | null) => void;
  onOutputUpload: (file: File | null) => void;
}

const UploadMenu = ({ disabled, open, onInputUpload, onOutputUpload }: UploadMenuProps) => {
  const { t } = useLocale();

  if (!open) {
    return null;
  }

  return (
    <div className="border-stroke-3 dark:border-stroke-7 bg-background-1 dark:bg-background-6 shadow-1 absolute bottom-[46px] left-0 z-20 w-[210px] space-y-1 rounded-[10px] border p-2">
      <UploadMenuItem
        disabled={disabled}
        label={t('upload.inputImage')}
        badge={t('upload.required')}
        onSelect={onInputUpload}
      />
      <UploadMenuItem
        disabled={disabled}
        label={t('upload.outputImage')}
        badge={t('upload.optional')}
        onSelect={onOutputUpload}
      />
    </div>
  );
};

export default UploadMenu;
