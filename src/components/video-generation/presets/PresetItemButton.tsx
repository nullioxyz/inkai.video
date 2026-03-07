import { ReactNode } from 'react';

interface PresetItemButtonProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}

const PresetItemButton = ({ selected, onClick, children }: PresetItemButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-stroke-3 dark:border-stroke-7 group w-full cursor-pointer overflow-hidden rounded-[12px] border text-left transition ${
        selected
          ? 'border-background-7 bg-background-7 ring-1 ring-secondary/30 dark:border-background-1 dark:bg-background-1 dark:ring-accent/30'
          : 'bg-transparent hover:border-primary-300 dark:hover:border-primary-400'
      }`}>
      {children}
    </button>
  );
};

export default PresetItemButton;
