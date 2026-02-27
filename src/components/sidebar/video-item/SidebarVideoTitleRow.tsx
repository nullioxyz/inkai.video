import SidebarVideoRenameButton from './SidebarVideoRenameButton';

interface SidebarVideoTitleRowProps {
  title: string;
  renameLabel: string;
  onStartRename: () => void;
}

const SidebarVideoTitleRow = ({ title, renameLabel, onStartRename }: SidebarVideoTitleRowProps) => {
  return (
    <div className="flex items-start gap-2">
      <p className="truncate text-sm text-secondary dark:text-accent">{title}</p>
      <SidebarVideoRenameButton label={renameLabel} onClick={onStartRename} />
    </div>
  );
};

export default SidebarVideoTitleRow;
