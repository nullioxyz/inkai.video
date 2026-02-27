interface WorkspaceStatusMessagesProps {
  showLoading: boolean;
  loadingLabel: string;
  errorMessage: string | null;
}

const WorkspaceStatusMessages = ({ showLoading, loadingLabel, errorMessage }: WorkspaceStatusMessagesProps) => {
  return (
    <>
      {showLoading ? <p className="text-tagline-2 text-secondary/70 dark:text-accent/70 text-center">{loadingLabel}</p> : null}
      {errorMessage ? <p className="text-tagline-2 text-ns-red text-center mb-4">{errorMessage}</p> : null}
    </>
  );
};

export default WorkspaceStatusMessages;
