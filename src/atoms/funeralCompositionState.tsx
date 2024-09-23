import { atom } from 'recoil';

export interface FuneralInfoUpdateReq {
  funeralDescription: string;
  durationMin: number;
  shroudDescription: string;
  shroudPrice: number;
  hasMemorial: boolean;
  memorialPrice: number;
}

export interface FuneralCompositionState {
  funeralImage: File | null;
  shroudCoffinImage: File | null;
  memorialImage: File[];
  funeralInfoUpdateReq: FuneralInfoUpdateReq;
}

const initialFuneralCompositionState: FuneralCompositionState = {
  funeralImage: null,
  shroudCoffinImage: null,
  memorialImage: [],
  funeralInfoUpdateReq: {
    funeralDescription: '',
    durationMin: 0,
    shroudDescription: '',
    shroudPrice: 0,
    hasMemorial: false,
    memorialPrice: 0,
  },
};

export const funeralCompositionState = atom<FuneralCompositionState>({
  key: 'funeralCompositionState',
  default: initialFuneralCompositionState,
});
