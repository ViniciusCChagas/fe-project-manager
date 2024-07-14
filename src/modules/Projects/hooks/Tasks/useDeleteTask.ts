import { useMutation } from '@tanstack/react-query';
import { deleteTask } from '../../services/tasks.service.ts';

export function useDeleteTask() {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['delete-task'],
    mutationFn: (params: { taskId: string }) => deleteTask(params.taskId),
    retry: false,
  });

  return {
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
