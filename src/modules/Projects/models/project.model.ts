import { ITask } from './task.model.ts';

export interface IProject {
  _id: string;
  userId: string;
  name: string;
  tasks: ITask[];
}
