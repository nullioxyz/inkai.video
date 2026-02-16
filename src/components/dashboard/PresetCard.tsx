'use client';

import { useLocale } from '@/context/LocaleContext';
import { PresetItem } from '@/types/dashboard';
import Image from 'next/image';

interface PresetCardProps {
  preset: PresetItem;
  selected: boolean;
  onSelect: (presetId: string) => void;
}

const PresetCard = ({ preset, selected, onSelect }: PresetCardProps) => {
  const { t, locale } = useLocale();

  const localizedPresetText = () => {
    if (locale === 'pt-BR') {
      return { name: preset.name, description: preset.description };
    }

    const content = {
      en: {
        'arm-01': ['Defined Arm', 'Composition focused on definition and light contrast.'],
        'arm-02': ['Intense Arm', 'Dramatic lighting to highlight muscle volume.'],
        'back-01': ['V-Shape Back', 'Framing designed to emphasize dorsal width.'],
        'back-02': ['Clean Back', 'Cleaner visual style for technical content.'],
        'neck-01': ['Strong Neck', 'Preset with subtle shadows for neck definition.'],
        'neck-02': ['Neck Studio', 'Neutral tone focused on clarity and texture.'],
        'leg-01': ['Power Legs', 'Framing focused on quads and muscle volume.'],
        'leg-02': ['Dynamic Legs', 'Composition prepared for motion video.'],
        'forearm-01': ['Grip Forearm', 'Medium contrast to highlight vascularity.'],
        'forearm-02': ['Clean Forearm', 'Light preset for explanatory recordings.'],
        'chest-01': ['Volume Chest', 'Front light to improve depth and shape.'],
        'chest-02': ['Pro Chest', 'Premium composition for ads and hero footage.'],
      },
      it: {
        'arm-01': ['Braccio Definito', 'Composizione con focus su definizione e contrasto leggero.'],
        'arm-02': ['Braccio Intenso', 'Illuminazione drammatica per evidenziare il volume muscolare.'],
        'back-01': ['Schiena V-Shape', 'Inquadratura per valorizzare l\'ampiezza dorsale.'],
        'back-02': ['Schiena Clean', 'Stile visivo piu pulito per contenuti tecnici.'],
        'neck-01': ['Collo Forte', 'Preset con ombre leggere per la definizione cervicale.'],
        'neck-02': ['Collo Studio', 'Tono neutro con focus su chiarezza e texture.'],
        'leg-01': ['Gambe Potenza', 'Inquadratura con enfasi su quadricipiti e volume.'],
        'leg-02': ['Gambe Dinamiche', 'Composizione pronta per video in movimento.'],
        'forearm-01': ['Avambraccio Grip', 'Contrasto medio per evidenziare la vascolarizzazione.'],
        'forearm-02': ['Avambraccio Clean', 'Preset leggero per registrazioni esplicative.'],
        'chest-01': ['Petto Volume', 'Luce frontale per valorizzare profondita e forma.'],
        'chest-02': ['Petto Pro', 'Composizione premium per annunci e contenuti hero.'],
      },
    } as const;

    const localized = content[locale][preset.id as keyof (typeof content)[typeof locale]];
    if (!localized) {
      return { name: preset.name, description: preset.description };
    }

    return { name: localized[0], description: localized[1] };
  };

  const text = localizedPresetText();

  return (
    <button
      type="button"
      onClick={() => onSelect(preset.id)}
      className={`border-stroke-3 dark:border-stroke-7 group cursor-pointer overflow-hidden rounded-[14px] border text-left transition ${
        selected
          ? 'border-background-7 bg-background-7 shadow-[0_8px_24px_rgba(26,26,28,0.28)] ring-1 ring-secondary/30 dark:border-background-1 dark:bg-background-1 dark:shadow-[0_8px_24px_rgba(252,252,252,0.14)] dark:ring-accent/30'
          : 'bg-transparent hover:border-primary-300 dark:hover:border-primary-400'
      }`}>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={preset.imageSrc}
          alt={text.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="bg-secondary/65 absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <span className="text-tagline-3 rounded-[8px] border border-white/40 px-3 py-1 font-medium text-white">
            {t('preset.preview')}
          </span>
        </div>
        {selected && (
          <div className="absolute inset-0 bg-white/10 dark:bg-secondary/10" />
        )}
      </div>
      <div className="space-y-2 p-4">
        <p className={`text-tagline-1 font-medium ${selected ? 'text-accent dark:text-secondary' : 'text-secondary dark:text-accent'}`}>
          {text.name}
        </p>
        <p className={`text-tagline-2 ${selected ? 'text-accent/75 dark:text-secondary/70' : 'text-secondary/60 dark:text-accent/60'}`}>
          {text.description}
        </p>
      </div>
    </button>
  );
};

export default PresetCard;
