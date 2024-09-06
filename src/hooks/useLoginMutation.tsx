// useLoginMutation.ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { loginUser, LoginReq, ApiResponse } from '../services/apiService';

// 로그인 요청을 처리하는 Hook
export const useLoginMutation = (): UseMutationResult<
  ApiResponse,
  Error,
  LoginReq
> => {
  return useMutation<ApiResponse, Error, LoginReq>({
    mutationFn: loginUser,
  });
};
