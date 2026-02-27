'use client';

import { useLocale } from '@/context/LocaleContext';
import type { PresetItem as PresetItemType } from '@/types/dashboard';
import PresetItemButton from './PresetItemButton';
import PresetItemMedia from './PresetItemMedia';
import PresetItemTitle from './PresetItemTitle';
import { resolveLocalizedPresetText } from './resolveLocalizedPresetText';

interface PresetItemProps {
  preset: PresetItemType;
  selected: boolean;
  onSelect: (presetId: string) => void;
}

const PresetItem = ({ preset, selected, onSelect }: PresetItemProps) => {
  const { locale } = useLocale();
  const text = resolveLocalizedPresetText(locale, preset);

  return (
    <PresetItemButton selected={selected} onClick={() => onSelect(preset.id)}>
      <PresetItemMedia preset={preset} alt={text.name} selected={selected} />
      <PresetItemTitle title={text.name} selected={selected} />
    </PresetItemButton>
  );
};

export default PresetItem;
