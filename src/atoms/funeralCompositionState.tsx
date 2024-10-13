import { atom } from 'recoil';

export enum FuneralCompositionStep {
  FuneralItem = 1,
  FuneralService,
  MemorialService,
}

export interface FuneralInfoUpdateReq {
  funeralDescription: string;
  durationMin: number;
  shroudDescription: string;
  shroudPrice: number;
  hasMemorial: boolean;
  memorialPrice: number;
}

export interface FuneralCompositionState {
  funeralImage: File | string | null;
  shroudCoffinImage: string | File | null;
  memorialImage: (File | string)[];
  funeralInfoUpdateReq: FuneralInfoUpdateReq;
}

export const initialFuneralCompositionState: FuneralCompositionState = {
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
