interface CreditsOutputLinkProps {
  outputVideoUrl: string | null;
  label: string;
}

const CreditsOutputLink = ({ outputVideoUrl, label }: CreditsOutputLinkProps) => {
  if (!outputVideoUrl) {
    return <>-</>;
  }

  return (
    <a
      href={outputVideoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300">
      {label}
    </a>
  );
};

export default CreditsOutputLink;
