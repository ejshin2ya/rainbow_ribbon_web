import { atom } from 'recoil';

//업체 등록 요청값 데이터
interface RegistrationData {
  logoImage: File | null;
  companyInfoEditReq: companyInfoEditReq;
}

interface companyInfoEditReq {
  companyName: string;
  contact: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  offDay: string;
  weekdayOpen: string;
  weekdayClose: string;
  weekendOpen: string;
  weekendClose: string;
  parallel: number;
  notification: string;
}

export const registrationDataState = atom<RegistrationData>({
  key: 'registrationDataState',
  default: {
    logoImage: null,
    companyInfoEditReq: {
      companyName: '',
      contact: '',
      postalCode: '',
      address: '',
      addressDetail: '',
      offDay: '',
      weekdayOpen: '',
      weekdayClose: '',
      weekendOpen: '',
      weekendClose: '',
      parallel: 0,
      notification: '',
    },
  },
});
