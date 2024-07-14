import { api } from '../../../core/api/api.ts';
import { IProject } from '../models/project.model.ts';

export async function getProjects(): Promise<IProject[]> {
  const response = await api.get(`/project/all`);
  return response.data;
}

export async function createProject(name: string): Promise<IProject> {
  const response = await api.post(`/project`, { name });
  return response.data;
}

export async function deleteProject(projectId: string): Promise<void> {
  await api.delete(`/project/${projectId}`);
}

export async function updateProjectName(
  projectId: string,
  name: string
): Promise<IProject> {
  const response = await api.patch(`/project/${projectId}`, { name });
  return response.data;
}
