import {
  FuneralCompositionStep,
  FuneralCompositionState,
} from '../atoms/funeralCompositionState';

export const saveFuneralCompositionProgress = (
  data: FuneralCompositionState,
) => {
  localStorage.setItem('funeralCompositionProgress', JSON.stringify(data));
};

export const loadFuneralCompositionProgress =
  (): FuneralCompositionState | null => {
    const saved = localStorage.getItem('funeralCompositionProgress');
    if (!saved) return null;

    try {
      const parsedData = JSON.parse(saved) as FuneralCompositionState & {
        currentStep: FuneralCompositionStep;
      };
      if (!(parsedData.currentStep in FuneralCompositionStep)) {
        parsedData.currentStep = FuneralCompositionStep.FuneralItem;
      }
      return parsedData;
    } catch (error) {
      console.error('Failed to parse saved funeral composition data:', error);
      return null;
    }
  };

export const clearFuneralCompositionProgress = () => {
  localStorage.removeItem('funeralCompositionProgress');
};
