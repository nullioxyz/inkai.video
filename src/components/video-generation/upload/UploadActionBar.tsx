import { useLocale } from '@/context/LocaleContext';
import UploadGenerateButton from './UploadGenerateButton';
import UploadMenu from './UploadMenu';
import UploadMenuToggleButton from './UploadMenuToggleButton';
import UploadTitleInput from './UploadTitleInput';

interface UploadActionBarProps {
  disabled: boolean;
  canGenerate: boolean;
  title: string;
  onTitleChange: (value: string) => void;
  onGenerate: () => void;
  uploadMenuRef: React.RefObject<HTMLDivElement | null>;
  showUploadOptions: boolean;
  onToggleUploadOptions: () => void;
  onInputUpload: (file: File | null) => void;
  onOutputUpload: (file: File | null) => void;
}

const UploadActionBar = ({
  disabled,
  canGenerate,
  title,
  onTitleChange,
  onGenerate,
  uploadMenuRef,
  showUploadOptions,
  onToggleUploadOptions,
  onInputUpload,
  onOutputUpload,
}: UploadActionBarProps) => {
  const { t } = useLocale();

  return (
    <div className="relative flex h-10 items-center gap-2">
      <div ref={uploadMenuRef} className="relative shrink-0">
        <UploadMenuToggleButton
          disabled={disabled}
          onClick={() => !disabled && onToggleUploadOptions()}
          ariaLabel={t('upload.label')}
        />

        <UploadMenu
          disabled={disabled}
          open={showUploadOptions}
          onInputUpload={onInputUpload}
          onOutputUpload={onOutputUpload}
        />
      </div>

      <UploadTitleInput
        value={title}
        placeholder={t('upload.placeholder')}
        disabled={disabled}
        onChange={onTitleChange}
      />

      <UploadGenerateButton
        ariaLabel={t('dashboard.generateVideo')}
        title={t('dashboard.generateVideo')}
        onClick={onGenerate}
        disabled={!canGenerate || disabled}
      />
    </div>
  );
};

export default UploadActionBar;
