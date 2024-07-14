import { useMutation } from '@tanstack/react-query';
import { markTaskAsCompleted } from '../../services/tasks.service.ts';

export function useMarkTaskAsCompleted() {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['mark-task-as-completed'],
    mutationFn: (params: { taskId: string }) =>
      markTaskAsCompleted(params.taskId),
    retry: false,
  });

  return {
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
