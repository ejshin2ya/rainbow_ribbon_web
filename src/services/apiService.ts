import {
  ENDPOINT_COMPANY_AUTH,
  ENDPOINT_COMPANY_LOGIN,
} from '../api/endpoints';
import api from 'src/api/axios';

//로그인 및 회원가입 요청값, 응답값 타입 지정

export interface ApiResponse {
  statusCode: number;
  msg: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userType: string;
    name: string;
    phone: string;
  };
}

export interface LoginReq {
  loginId: string;
  password: string;
}

export interface CompanySignUpReq {
  name: string;
  phone: string;
  email: string;
  password: string;
  businessRegNum: string;
  address: string;
  addressDetail: string;
  postalCode: string;
}

export interface SignUpFormData {
  businessRegCertificateImage: File | null;
  animalBurialPermitImage: File | null;
  companySignUpReq: CompanySignUpReq;
}

export const signUpUser = async (
  formData: SignUpFormData,
): Promise<ApiResponse> => {
  const formDataToSubmit = new FormData();

  formDataToSubmit.append(
    'companySignUpReq',
    JSON.stringify(formData.companySignUpReq),
  );

  if (formData.businessRegCertificateImage) {
    formDataToSubmit.append(
      'businessRegCertificateImage',
      formData.businessRegCertificateImage,
    );
  }

  if (formData.animalBurialPermitImage) {
    formDataToSubmit.append(
      'animalBurialPermitImage',
      formData.animalBurialPermitImage,
    );
  }

  const response = await api.post<ApiResponse>(
    `${ENDPOINT_COMPANY_AUTH}/signup`,
    formDataToSubmit,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const loginUser = async (loginData: LoginReq): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${ENDPOINT_COMPANY_LOGIN}`,
    loginData,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    },
  );
  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    // 백엔드 로그아웃 API 호출
    await api.post(`${ENDPOINT_COMPANY_AUTH}/logout`);

    // 로컬 스토리지의 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};
