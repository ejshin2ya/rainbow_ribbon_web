import axios, { AxiosError } from "axios";
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

export const usePhoneVerification = (): UseMutationResult<
  PhoneVerificationResponse,
  AxiosError,
  string
> => {
  return useMutation<PhoneVerificationResponse, AxiosError, string>({
    mutationFn: requestVerification,
    onSuccess: (data) => {
      console.log("핸드폰 인증 요청 성공", data);
    },
    onError: (error) => {
      console.log("핸드폰 인증 요청 실패", error);
    },
  });
};
