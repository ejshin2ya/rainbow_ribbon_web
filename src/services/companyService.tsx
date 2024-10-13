import axios, { AxiosResponse } from 'axios';
import { ENDPOINT_COMPANY_REGISTRATION } from '../api/endpoints';
import { RegistrationData } from '../atoms/registrationDataState';

interface ApiResponse {
  statusCode: number;
  msg: string;
  data: any;
}

export interface CompanyInfo {
  id: string;
  companyName: string;
  contact: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  offDay: [];
  weekdayOpen: string;
  weekdayClose: string;
  weekendOpen: string;
  weekendClose: string;
  parallel: number;
  notification: string;
  logoImage: string;
}

export const registerCompany = async (
  registrationData: RegistrationData,
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    // logoImage 처리
    if (registrationData.logoImage instanceof File) {
      formData.append('logoImage', registrationData.logoImage);
      console.log('logoImage는 파일객체입니다');
    } else {
      console.log('logoImage가 파일객체가 아니므로 null로 전송합니다.');
    }

    // companyInfoEditReq 처리
    formData.append(
      'companyInfoEditReq',
      JSON.stringify(registrationData.companyInfoEditReq),
    );

    // FormData 내용 로깅
    console.log('FormData 내용:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(key, ':', value.name, '(File)');
      } else {
        console.log(key, ':', value);
      }
    }

    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      `${ENDPOINT_COMPANY_REGISTRATION}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      if (error.response) {
        console.error('Axios error response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};

export const fetchCompanyInfo = async (): Promise<CompanyInfo> => {
  try {
    const response = await axios.get(`${ENDPOINT_COMPANY_REGISTRATION}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        Accept: 'application/json;charset=UTF-8',
      },
    });

    // HTTP 상태 코드 확인
    if (response.status === 200) {
      // API 응답 구조 확인
      if (response.data && response.data.data) {
        console.log(response.data.data);
        return response.data.data as CompanyInfo;
      } else {
        throw new Error('Invalid response structure');
      }
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching company info:', error);
    throw error;
  }
};
