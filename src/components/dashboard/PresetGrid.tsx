import { PresetItem } from '@/types/dashboard';
import PresetCard from './PresetCard';

interface PresetGridProps {
  presets: PresetItem[];
  selectedPresetId: string | null;
  onSelectPreset: (presetId: string) => void;
}

const PresetGrid = ({ presets, selectedPresetId, onSelectPreset }: PresetGridProps) => {
  return (
    <div className="mx-auto w-full max-w-[980px] columns-3 gap-1.5 sm:columns-4 xl:columns-6">
      {presets.map((preset) => (
        <div key={preset.id} className="mb-1.5 break-inside-avoid">
          <PresetCard preset={preset} selected={selectedPresetId === preset.id} onSelect={onSelectPreset} />
        </div>
      ))}
    </div>
  );
};

export default PresetGrid;
