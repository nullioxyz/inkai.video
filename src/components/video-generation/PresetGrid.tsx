import type { PresetItem } from '@/types/dashboard';
import Presets from './presets/Presets';

interface PresetGridProps {
  presets: PresetItem[];
  selectedPresetId: string | null;
  onSelectPreset: (presetId: string) => void;
}

const PresetGrid = ({ presets, selectedPresetId, onSelectPreset }: PresetGridProps) => {
  return <Presets presets={presets} selectedPresetId={selectedPresetId} onSelectPreset={onSelectPreset} />;
};

export default PresetGrid;
