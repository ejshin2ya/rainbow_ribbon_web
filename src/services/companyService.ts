import axios, { AxiosResponse } from 'axios';
import { ENDPOINT_COMPANY_REGISTRATION } from '../api/endpoints'; // API 엔드포인트 상수를 정의해야 합니다
import { RegistrationData } from '../atoms/registrationDataState';
import api from 'src/api/axios';

interface ApiResponse<T = any> {
  statusCode: number;
  msg: string;
  data: T;
}

export const registerCompany = async (
  registrationData: RegistrationData,
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    // logoImage 처리
    if (registrationData.logoImage) {
      // logoImage가 File 객체인 경우
      if (registrationData.logoImage instanceof File) {
        formData.append('logoImage', registrationData.logoImage);
      }
      // logoImage가 base64 문자열인 경우
      else if (
        typeof registrationData.logoImage === 'string' &&
        registrationData.logoImage.startsWith('data:image')
      ) {
        const byteString = atob(registrationData.logoImage.split(',')[1]);
        const mimeString = registrationData.logoImage
          .split(',')[0]
          .split(':')[1]
          .split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        formData.append('logoImage', blob, 'logo.jpg');
      }
    }

    // companyInfoEditReq 처리
    formData.append(
      'companyInfoEditReq',
      JSON.stringify(registrationData.companyInfoEditReq),
    );

    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      `${ENDPOINT_COMPANY_REGISTRATION}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // 액세스 토큰이 필요한 경우
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

export const getCompanyInfo = async function () {
  return (
    await api.get<
      ApiResponse<{
        id: string;
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
        logoImage: string;
      }>
    >('/api/account/company/info')
  ).data;
};
