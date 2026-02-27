interface SidebarRenameActionsProps {
  saving: boolean;
  saveLabel: string;
  cancelLabel: string;
  onSave: () => void;
  onCancel: () => void;
}

const SidebarRenameActions = ({ saving, saveLabel, cancelLabel, onSave, onCancel }: SidebarRenameActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="text-tagline-3 bg-secondary text-accent dark:bg-accent dark:text-secondary rounded-sm px-2 py-1 disabled:cursor-not-allowed disabled:opacity-60">
        {saveLabel}
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={saving}
        className="text-tagline-3 border-stroke-3 dark:border-stroke-7 rounded-sm border px-2 py-1 text-secondary/70 dark:text-accent/70 disabled:cursor-not-allowed disabled:opacity-60">
        {cancelLabel}
      </button>
    </div>
  );
};

export default SidebarRenameActions;
