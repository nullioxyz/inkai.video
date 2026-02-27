interface UploadPreviewLabelProps {
  label: string;
}

const UploadPreviewLabel = ({ label }: UploadPreviewLabelProps) => {
  return <p className="text-tagline-3 text-secondary/70 dark:text-accent/70 px-1">{label}</p>;
};

export default UploadPreviewLabel;
