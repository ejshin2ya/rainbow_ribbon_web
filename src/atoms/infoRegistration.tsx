import { atom } from "recoil";

//업체 등록 요청값 데이터
interface RegistrationData {
  businessRegCertificate: File | null;
  animalBurialPermit: File | null;
}

export const registrationDataState = atom<RegistrationData>({
  key: "registrationDataState",
  default: {
    businessRegCertificate: null,
    animalBurialPermit: null,
  },
});
