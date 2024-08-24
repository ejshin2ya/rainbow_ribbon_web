import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  signUpUser,
  SignUpFormData,
  ApiResponse,
} from "../services/apiService";

// 회원가입 요청을 처리하는 Hook
export const useSignUpMutation = (): UseMutationResult<
  ApiResponse,
  Error,
  SignUpFormData
> => {
  return useMutation<ApiResponse, Error, SignUpFormData>({
    mutationFn: signUpUser,
  });
};
