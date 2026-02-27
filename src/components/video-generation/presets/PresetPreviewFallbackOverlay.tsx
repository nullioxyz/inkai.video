interface PresetPreviewFallbackOverlayProps {
  label: string;
}

const PresetPreviewFallbackOverlay = ({ label }: PresetPreviewFallbackOverlayProps) => {
  return (
    <div className="bg-secondary/65 absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
      <span className="text-tagline-3 rounded-[8px] border border-white/40 px-3 py-1 font-medium text-white">{label}</span>
    </div>
  );
};

export default PresetPreviewFallbackOverlay;
