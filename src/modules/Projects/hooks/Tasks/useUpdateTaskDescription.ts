import { useMutation } from '@tanstack/react-query';
import { updateTaskDescription } from '../../services/tasks.service.ts';

export function useUpdateTaskDescription() {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['update-task-description'],
    mutationFn: (params: { description: string; taskId: string }) =>
      updateTaskDescription(params.taskId, params.description),
    retry: false,
  });

  return {
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
