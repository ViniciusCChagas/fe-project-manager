export interface ITask {
  _id: string;
  projectId: string;
  description: string;
  createdAt: Date;
  finishedAt: Date | null;
}
