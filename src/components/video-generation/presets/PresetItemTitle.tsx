interface PresetItemTitleProps {
  title: string;
  selected: boolean;
}

const PresetItemTitle = ({ title, selected }: PresetItemTitleProps) => {
  return (
    <div className="p-1.5">
      <p className={`truncate text-[11px] font-medium ${selected ? 'text-accent dark:text-secondary' : 'text-secondary dark:text-accent'}`}>{title}</p>
    </div>
  );
};

export default PresetItemTitle;
