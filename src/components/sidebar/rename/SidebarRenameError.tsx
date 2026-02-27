interface SidebarRenameErrorProps {
  error: string | null;
}

const SidebarRenameError = ({ error }: SidebarRenameErrorProps) => {
  if (!error) {
    return null;
  }

  return <p className="text-tagline-3 text-ns-red">{error}</p>;
};

export default SidebarRenameError;
