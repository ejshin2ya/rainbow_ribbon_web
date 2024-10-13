import { atom } from 'recoil';

// enum을 export 합니다
export enum CompanyRegistrationStep {
  CompanyInfo = 1,
  BusinessInfo,
  SalesInfo,
  DetailInfo,
}

export interface CompanyInfoEditReq {
  companyName: string;
  contact: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  offDay: string[];
  weekdayOpen: string;
  weekdayClose: string;
  weekendOpen: string;
  weekendClose: string;
  parallel: number;
  notification: string;
}

export interface RegistrationData {
  logoImage: string | File | null;
  companyInfoEditReq: CompanyInfoEditReq;
}

export const initialRegistrationData: RegistrationData = {
  logoImage: null,
  companyInfoEditReq: {
    companyName: '',
    contact: '',
    postalCode: '',
    address: '',
    addressDetail: '',
    offDay: [],
    weekdayOpen: '',
    weekdayClose: '',
    weekendOpen: '',
    weekendClose: '',
    parallel: 0,
    notification: '',
  },
};

export const registrationDataState = atom<RegistrationData>({
  key: 'registrationDataState',
  default: initialRegistrationData,
});
