import { KeyboardEvent } from 'react';

interface SidebarRenameInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const SidebarRenameInput = ({ value, onChange, onKeyDown }: SidebarRenameInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
      autoFocus
      maxLength={255}
      className="bg-background-1 dark:bg-background-9 border-stroke-3 dark:border-stroke-7 w-full rounded-sm border px-2 py-1 text-sm text-secondary dark:text-accent outline-none"
    />
  );
};

export default SidebarRenameInput;
