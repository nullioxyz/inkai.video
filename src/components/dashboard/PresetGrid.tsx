import { PresetItem } from '@/types/dashboard';
import PresetCard from './PresetCard';

interface PresetGridProps {
  presets: PresetItem[];
  selectedPresetId: string | null;
  onSelectPreset: (presetId: string) => void;
}

const PresetGrid = ({ presets, selectedPresetId, onSelectPreset }: PresetGridProps) => {
  return (
    <div className="mx-auto grid w-full max-w-[1040px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {presets.map((preset) => (
        <PresetCard key={preset.id} preset={preset} selected={selectedPresetId === preset.id} onSelect={onSelectPreset} />
      ))}
    </div>
  );
};

export default PresetGrid;
