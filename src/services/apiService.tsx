import axios, { AxiosResponse } from "axios";
import { ENDPOINT_COMPANY_AUTH } from "../api/endpoints";

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
}

export interface SignUpFormData {
  businessRegCertificateImage: File | null;
  animalBurialPermitImage: File | null;
  companySignUpReq: CompanySignUpReq;
}

//회원가입 axios 요청
export const signUpUser = async (
  formData: SignUpFormData
): Promise<ApiResponse> => {
  try {
    const formDataToSubmit = new FormData();

    // JSON 문자열로 변환하여 추가
    formDataToSubmit.append(
      "companySignUpReq",
      JSON.stringify(formData.companySignUpReq)
    );

    // 파일이 null이 아닌 경우에만 추가
    if (formData.businessRegCertificateImage) {
      formDataToSubmit.append(
        "businessRegCertificateImage",
        formData.businessRegCertificateImage
      );
    }

    if (formData.animalBurialPermitImage) {
      formDataToSubmit.append(
        "animalBurialPermitImage",
        formData.animalBurialPermitImage
      );
    }

    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      `${ENDPOINT_COMPANY_AUTH}/signup`,
      formDataToSubmit,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("axios error message:", error.message);
      if (error.response) {
        console.error("axios error response data :", error.response.data);
      }
    } else {
      console.error("예상하지 못한 에러:", error);
    }
    throw error; //
  }
};

//로그인 axios 요청
export const loginUser = async (loginData: LoginReq): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      `${ENDPOINT_COMPANY_AUTH}/login`,
      loginData,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      if (error.response) {
        console.error("Axios error response data:", error.response.data);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; //오류를 호출한 쪽으로 전달
  }
};
