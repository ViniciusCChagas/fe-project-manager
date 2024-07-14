import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/authentication.service.ts';
import { ILoginParamsDto } from '../models/LoginDtos.ts';

export function useLogin() {
  const { mutateAsync, isError, isSuccess, isPending, data } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: (params: ILoginParamsDto) => loginUser(params),
    retry: false,
  });

  return {
    data,
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
