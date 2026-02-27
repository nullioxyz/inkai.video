import type { PresetItem as PresetItemType } from '@/types/dashboard';
import PresetItem from './PresetItem';

interface PresetsProps {
  presets: PresetItemType[];
  selectedPresetId: string | null;
  onSelectPreset: (presetId: string) => void;
}

const Presets = ({ presets, selectedPresetId, onSelectPreset }: PresetsProps) => {
  return (
    <div className="flex w-max gap-2.5">
      {presets.map((preset) => (
        <div key={preset.id} className="w-[154px] shrink-0 snap-start sm:w-[164px] md:w-[174px]">
          <PresetItem preset={preset} selected={selectedPresetId === preset.id} onSelect={onSelectPreset} />
        </div>
      ))}
    </div>
  );
};

export default Presets;
