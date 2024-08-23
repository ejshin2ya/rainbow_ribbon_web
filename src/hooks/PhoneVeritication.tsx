import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ENDPOINT_USER_AUTH } from "../api/endpoints";

// API 요청, 응답 인터페이스
export interface PhoneVerificationRequest {
  phoneNumber: string;
}

export interface PhoneVerificationResponse {
  statusCode: string;
  msg: string;
  data: {
    requestId: string;
    requestTime: string;
    statusCode: string;
    statusName: string;
    smsConfirmCode: string;
  };
}

// 핸드폰번호 인증 API 함수
const requestVerification = async (
  phoneNumber: string
): Promise<PhoneVerificationResponse> => {
  const { data } = await axios.post<PhoneVerificationResponse>(
    `${ENDPOINT_USER_AUTH}/phone/verify`,
    { to: phoneNumber }
  );
  return data;
};

// 핸드폰 인증 API함수를 react-query의 useMutation를 이용하여 데이터를 가져오는 Custom Hook
export const usePhoneVerification = (): UseMutationResult<
  PhoneVerificationResponse,
  Error,
  string
> => {
  return useMutation<PhoneVerificationResponse, Error, string>({
    mutationFn: requestVerification,
  });
};
