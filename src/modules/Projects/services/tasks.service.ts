import { ITask } from '../models/task.model.ts';
import { api } from '../../../core/api/api.ts';

export type ICreateTaskParamsDto = Omit<
  ITask,
  '_id' | 'createdAt' | 'finishedAt'
>;

export async function createTask(task: ICreateTaskParamsDto): Promise<ITask> {
  const response = await api.post(`/task`, task);
  return response.data;
}

export async function deleteTask(taskId: string): Promise<void> {
  await api.delete(`/task/${taskId}`);
}

export async function updateTaskDescription(
  taskId: string,
  description: string
): Promise<ITask> {
  const response = await api.patch(`/task/${taskId}`, { description });
  return response.data;
}

export async function markTaskAsCompleted(taskId: string): Promise<ITask> {
  const response = await api.patch(`/task/${taskId}/markAs/completed`);
  return response.data;
}

export async function markTaskAsToDo(taskId: string): Promise<ITask> {
  const response = await api.patch(`/task/${taskId}/markAs/todo`);
  return response.data;
}
