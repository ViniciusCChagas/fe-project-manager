import { Input } from '../../../../core/components/Input';
import { Button } from '../../../../core/components/Button';
import { useCreateTask } from '../../hooks/Tasks/useCreateTask.ts';
import { useState } from 'react';
import { toast } from 'react-toastify';
import queryClient from '../../../../core/api/queryClient.ts';
import { IProject } from '../../models/project.model.ts';

interface INewTaskFormProps {
  projectId: string;
}

export function NewTaskForm({ projectId }: INewTaskFormProps) {
  const [taskDescription, setTaskDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutateAsync: createTask, isLoading } = useCreateTask();

  async function handleCreateTask() {
    if (!taskDescription) {
      setErrorMessage('Please describe your task');
      return;
    }
    try {
      const newTask = await createTask({
        projectId: projectId,
        description: taskDescription,
      });

      queryClient.setQueryData(['user-projects'], (oldProjects: IProject[]) => {
        return oldProjects.map((p: IProject) => {
          if (p._id === projectId) {
            return { ...p, tasks: [...p.tasks, newTask] };
          }

          return p;
        });
      });
      setTaskDescription('')
      setErrorMessage('');
      toast('Task created successfully', { type: 'success' });
    } catch (err) {
      console.log(err);
      toast('An error occurred while creating the task', { type: 'error' });
    }
  }

  return (
    <div className={'gap-md mt-auto flex items-end justify-between p-4'}>
      <Input
        type='text'
        placeholder={'Describe your task'}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        errorMessage={errorMessage}
        className={'flex-col-reverse'}
      />
      <Button
        className={'min-w-[120px]'}
        leftIcon={'Add'}
        onClick={handleCreateTask}
        loading={isLoading}
      >
        Add Task
      </Button>
    </div>
  );
}
