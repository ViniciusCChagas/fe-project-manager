import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../services/projects.service.ts';

export function useGetProjects() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['user-projects'],
    queryFn: async () => await getProjects(),
  });

  return {
    data,
    isLoading,
    isError,
  };
}
