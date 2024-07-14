import { useMutation } from '@tanstack/react-query';
import { markTaskAsToDo } from '../../services/tasks.service.ts';

export function useMarkTaskAsToDo() {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['mark-task-as-todo'],
    mutationFn: (params: { taskId: string }) => markTaskAsToDo(params.taskId),
    retry: false,
  });

  return {
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
