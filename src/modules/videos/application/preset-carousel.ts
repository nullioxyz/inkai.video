export interface PresetCarouselScrollState {
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export const resolvePresetCarouselScrollState = (
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number,
): PresetCarouselScrollState => {
  const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);

  return {
    canScrollLeft: scrollLeft > 6,
    canScrollRight: scrollLeft < maxScrollLeft - 6,
  };
};

export const resolvePresetCarouselStep = (clientWidth: number): number => {
  return Math.max(clientWidth * 0.82, 220);
};
