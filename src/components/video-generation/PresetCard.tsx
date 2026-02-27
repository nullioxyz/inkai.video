import type { PresetItem } from '@/types/dashboard';
import PresetItemComponent from './presets/PresetItem';

interface PresetCardProps {
  preset: PresetItem;
  selected: boolean;
  onSelect: (presetId: string) => void;
}

const PresetCard = ({ preset, selected, onSelect }: PresetCardProps) => {
  return <PresetItemComponent preset={preset} selected={selected} onSelect={onSelect} />;
};

export default PresetCard;
