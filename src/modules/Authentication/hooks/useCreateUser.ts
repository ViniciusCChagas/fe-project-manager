import { useMutation } from '@tanstack/react-query';
import { createUser } from '../services/authentication.service.ts';
import { ICreateUserParams } from '../models/CreateUserDtos.ts';

export function useCreateUser() {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['create-new-user'],
    mutationFn: (params: ICreateUserParams) => createUser(params),
    retry: false,
  });

  return {
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
