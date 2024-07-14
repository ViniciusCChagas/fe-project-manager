import { useMutation } from '@tanstack/react-query';
import { updateProjectName } from '../../services/projects.service.ts';

export function useUpdateProjectName() {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['update-project-name'],
    mutationFn: (params: { name: string; projectId: string }) =>
      updateProjectName(params.projectId, params.name),
    retry: false,
  });

  return {
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
