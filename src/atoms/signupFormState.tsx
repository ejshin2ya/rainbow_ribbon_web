import { atom } from "recoil";

//회원가입 요청 타입
export interface CompanySignUpReq {
  name: string;
  phone: string;
  email: string;
  password: string;
  businessRegNum: string;
  address: string;
  addressDetail: string;
}

export interface FormData {
  businessRegCertificateImage: File | null;
  animalBurialPermitImage: File | null;
  companySignUpReq: CompanySignUpReq;
}

//회원가입 요청값 데이터
export const signUpFormState = atom<FormData>({
  key: "signUpFormState",
  default: {
    businessRegCertificateImage: null,
    animalBurialPermitImage: null,
    companySignUpReq: {
      name: "",
      phone: "",
      email: "",
      password: "",
      businessRegNum: "",
      address: "",
      addressDetail: "",
    },
  },
});
