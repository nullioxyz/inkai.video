interface UploadMenuItemProps {
  disabled: boolean;
  label: string;
  badge: string;
  onSelect: (file: File | null) => void;
}

const UploadMenuItem = ({ disabled, label, badge, onSelect }: UploadMenuItemProps) => {
  return (
    <label className="hover:bg-background-2 dark:hover:bg-background-7 flex cursor-pointer items-center justify-between rounded-[8px] px-2 py-2 transition">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={(event) => onSelect(event.target.files?.[0] ?? null)}
      />
      <span className="text-tagline-2 text-secondary dark:text-accent">{label}</span>
      <span className="text-tagline-3 text-secondary/60 dark:text-accent/60">{badge}</span>
    </label>
  );
};

export default UploadMenuItem;
