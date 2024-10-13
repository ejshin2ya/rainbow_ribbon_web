import axios, { AxiosResponse } from 'axios';
import { ENDPOINT_FUNERAL_COMPOSITION } from '../api/endpoints';
import { FuneralCompositionState } from '../atoms/funeralCompositionState';

interface ApiResponse {
  statusCode: number;
  msg: string;
  data: any;
}

export interface FuneralInfo {
  companyId: string;
  funeralId: string;
  funeralDescription: string;
  funeralImage: string;
  durationMin: number;
  shroudId: string;
  shroudDescription: string;
  shroudImage: string;
  shroudPrice: number;
  memorialId: string;
  memorialImages: (File | string)[];
  hasMemorial: boolean;
  memorialPrice: number;
}

export const registerFuneralComposition = async (
  funeralComposition: FuneralCompositionState,
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    // funeralImage 처리
    if (funeralComposition.funeralImage instanceof File) {
      formData.append('funeralImage', funeralComposition.funeralImage);
      console.log('funeralImage는 파일객체입니다');
    } else {
      console.log('funeralImage가 파일 객체가 아니므로 전송하지 않습니다.');
    }

    // shroudCoffinImage 처리
    if (funeralComposition.shroudCoffinImage instanceof File) {
      formData.append(
        'shroudCoffinImage',
        funeralComposition.shroudCoffinImage,
      );
      console.log('shroudCoffinImage는 파일객체입니다');
    } else {
      console.log(
        'shroudCoffinImage가 파일 객체가 아니므로 전송하지 않습니다.',
      );
    }

    // memorialImage 처리
    if (Array.isArray(funeralComposition.memorialImage)) {
      funeralComposition.memorialImage.forEach((image, index) => {
        if (image instanceof File) {
          formData.append('memorialImage', image, `memorialImage_${index}.jpg`);
          console.log(`memorialImage_${index}는 파일객체입니다`);
        } else if (typeof image === 'string') {
          console.log(
            `memorialImage_${index}는 문자열이므로 전송하지 않습니다.`,
          );
        } else {
          console.log(
            `memorialImage_${index}의 타입이 예상과 다르므로 전송하지 않습니다.`,
          );
        }
      });
    }

    // funeralInfoUpdateReq 처리
    formData.append(
      'funeralInfoUpdateReq',
      JSON.stringify(funeralComposition.funeralInfoUpdateReq),
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
      `${ENDPOINT_FUNERAL_COMPOSITION}`,
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

export const fetchFuneralInfo = async (): Promise<FuneralInfo> => {
  try {
    const response = await axios.get(`${ENDPOINT_FUNERAL_COMPOSITION}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        Accept: 'application/json;charset=UTF-8',
      },
    });

    if (response.status === 200 && response.data && response.data.data) {
      console.log(response.data && response.data.data);
      return response.data.data as FuneralInfo;
    } else {
      throw new Error('Invalid response structure or non-200 status');
    }
  } catch (error) {
    console.error('Error fetching funeral info:', error);
    throw error;
  }
};
