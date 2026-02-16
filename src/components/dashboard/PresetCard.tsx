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
        'arm-01': ['Fine Line Arm', 'Smooth animation to highlight linework flow on arm tattoo concepts.'],
        'arm-02': ['Neo-Trad Arm', 'Stronger contrast to enhance color and volume in neo traditional projects.'],
        'back-01': ['Back Piece Layout', 'Wide framing to preview large back tattoo compositions clearly.'],
        'back-02': ['Blackwork Back', 'Preset focused on solid black fill, texture, and visual impact.'],
        'neck-01': ['Delicate Neck', 'Soft motion for fine-line neck tattoos with contour emphasis.'],
        'neck-02': ['Bold Neck', 'Dramatic shadows for high-impact tattoo concepts in the neck area.'],
        'leg-01': ['Ornamental Leg', 'Preset designed for ornamental compositions with full-leg readability.'],
        'leg-02': ['Realism Leg', 'Depth and contrast tuned for realistic tattoo studies on leg projects.'],
        'forearm-01': ['Fine Line Forearm', 'Clean look for detailed fine-line tattoos on the forearm.'],
        'forearm-02': ['Shaded Forearm', 'Preset with emphasis on shadows and volume for dense tattoo designs.'],
        'chest-01': ['Symmetric Chest', 'Front composition for centered and symmetrical chest tattoo ideas.'],
        'chest-02': ['High Contrast Chest', 'Extra contrast to highlight fill and texture in chest tattoo concepts.'],
      },
      it: {
        'arm-01': ['Braccio Fine Line', 'Animazione morbida per valorizzare il flusso delle linee nel tattoo sul braccio.'],
        'arm-02': ['Braccio Neo Trad', 'Contrasto piu forte per esaltare colore e volume nei progetti neo tradizionali.'],
        'back-01': ['Schiena Back Piece', 'Inquadratura ampia per visualizzare chiaramente composizioni tattoo grandi.'],
        'back-02': ['Schiena Blackwork', 'Preset focalizzato su nero pieno, texture e impatto visivo.'],
        'neck-01': ['Collo Delicato', 'Movimento leggero per tattoo fine-line sul collo con enfasi sui contorni.'],
        'neck-02': ['Collo Bold', 'Ombre drammatiche per concept tattoo ad alto impatto nella zona cervicale.'],
        'leg-01': ['Gamba Ornamentale', 'Preset pensato per composizioni ornamentali con lettura completa sulla gamba.'],
        'leg-02': ['Gamba Realismo', 'Profondita e contrasto calibrati per studi tattoo realistici sulla gamba.'],
        'forearm-01': ['Avambraccio Fine Line', 'Look pulito per tattoo dettagliati a linea fine sull\'avambraccio.'],
        'forearm-02': ['Avambraccio Sfumato', 'Preset con focus su ombre e volume per design tattoo piu densi.'],
        'chest-01': ['Petto Simmetrico', 'Composizione frontale per idee tattoo centrate e simmetriche sul petto.'],
        'chest-02': ['Petto Alto Contrasto', 'Contrasto extra per evidenziare riempimenti e texture nei tattoo al petto.'],
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
