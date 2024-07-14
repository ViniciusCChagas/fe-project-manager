import { useMutation } from '@tanstack/react-query';
import {
  createTask,
  ICreateTaskParamsDto,
} from '../../services/tasks.service.ts';

export function useCreateTask() {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['create-new-task'],
    mutationFn: (params: ICreateTaskParamsDto) => createTask(params),
    retry: false,
  });

  return {
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
