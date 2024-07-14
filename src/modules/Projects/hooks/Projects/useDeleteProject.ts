import { useMutation } from '@tanstack/react-query';
import { deleteProject } from '../../services/projects.service.ts';

export function useDeleteProject() {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['delete-project'],
    mutationFn: (params: { projectId: string }) =>
      deleteProject(params.projectId),
    retry: false,
  });

  return {
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
