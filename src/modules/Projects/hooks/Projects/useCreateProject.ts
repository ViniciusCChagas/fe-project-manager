import { useMutation } from '@tanstack/react-query';
import { createProject } from '../../services/projects.service.ts';

export function useCreateProject() {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ['create-new-project'],
    mutationFn: (params: { name: string }) => createProject(params.name),
    retry: false,
  });

  return {
    mutateAsync,
    isError,
    isSuccess,
    isLoading: isPending,
  };
}
