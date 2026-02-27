import type { MessageKey } from '@/i18n/messages';
import { KeyboardEvent } from 'react';
import SidebarRenameActions from './rename/SidebarRenameActions';
import SidebarRenameError from './rename/SidebarRenameError';
import SidebarRenameInput from './rename/SidebarRenameInput';

interface SidebarRenameFormProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  error: string | null;
  t: (key: MessageKey) => string;
}

const SidebarRenameForm = ({ value, onChange, onKeyDown, onSave, onCancel, saving, error, t }: SidebarRenameFormProps) => {
  return (
    <div className="space-y-1.5">
      <SidebarRenameInput value={value} onChange={onChange} onKeyDown={onKeyDown} />
      <SidebarRenameActions
        saving={saving}
        saveLabel={t('sidebar.renameSave')}
        cancelLabel={t('sidebar.renameCancel')}
        onSave={onSave}
        onCancel={onCancel}
      />
      <SidebarRenameError error={error} />
    </div>
  );
};

export default SidebarRenameForm;
