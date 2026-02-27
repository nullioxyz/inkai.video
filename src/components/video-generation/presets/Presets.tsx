import MosaicGrid from '@/components/common/mosaic/MosaicGrid';
import type { PresetItem as PresetItemType } from '@/types/dashboard';
import PresetItem from './PresetItem';

interface PresetsProps {
  presets: PresetItemType[];
  selectedPresetId: string | null;
  onSelectPreset: (presetId: string) => void;
}

const Presets = ({ presets, selectedPresetId, onSelectPreset }: PresetsProps) => {
  return (
    <MosaicGrid
      items={presets}
      getKey={(preset) => preset.id}
      renderItem={(preset) => (
        <PresetItem preset={preset} selected={selectedPresetId === preset.id} onSelect={onSelectPreset} />
      )}
      className="mx-auto w-full max-w-[980px] columns-3 gap-1.5 sm:columns-4 xl:columns-6"
      itemClassName="mb-1.5 break-inside-avoid"
    />
  );
};

export default Presets;
