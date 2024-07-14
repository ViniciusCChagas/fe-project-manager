import { ITask } from '../../models/task.model.ts';
import { useState } from 'react';
import { Button } from '../../../../core/components/Button';
import { ConfirmDeleteDialog } from '../../../../core/components/ConfirmDeleteDialog';
import { EditModal } from '../../../../core/components/EditInfoModal';
import queryClient from '../../../../core/api/queryClient.ts';
import { IProject } from '../../models/project.model.ts';
import { toast } from 'react-toastify';
import { useDeleteTask } from '../../hooks/Tasks/useDeleteTask.ts';
import { useUpdateTaskDescription } from '../../hooks/Tasks/useUpdateTaskDescription.ts';
import { Input } from '../../../../core/components/Input';
import { useMarkTaskAsCompleted } from '../../hooks/Tasks/useMarkTaskAsCompleted.ts';
import { useMarkTaskAsToDo } from '../../hooks/Tasks/useMarkTaskAsToDo.ts';
import { Icon } from '../../../../core/components/Icon';
import { Tooltip } from 'react-tooltip';

interface ITaskItemProps {
  task: ITask;
}

export function TaskItem({ task }: ITaskItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [checked, setChecked] = useState(!!task.finishedAt);

  const { mutateAsync: deleteTask, isLoading: isDeleting } = useDeleteTask();
  const { mutateAsync: updateTaskDescription, isLoading: isUpdating } =
    useUpdateTaskDescription();

  const { mutateAsync: markAsCompleted, isLoading: isLoadingComplete } =
    useMarkTaskAsCompleted();
  const { mutateAsync: markAsToDo, isLoading: isLoadingTodo } =
    useMarkTaskAsToDo();

  async function confirmDelete() {
    try {
      await deleteTask({ taskId: task._id });

      queryClient.setQueryData(['user-projects'], (oldProjects: IProject[]) => {
        return oldProjects.map((p: IProject) => {
          if (p._id !== task.projectId) return p;

          const newTasks = p.tasks.filter((t) => t._id !== task._id);
          return { ...p, tasks: newTasks };
        });
      });

      toast('Task deleted successfully', { type: 'success' });
    } catch (err) {
      console.error(err);
      toast('An error occurred while deleting the task', { type: 'error' });
    }
  }

  async function handleUpdateTaskDescription(newDescription: string) {
    try {
      await updateTaskDescription({
        taskId: task._id,
        description: newDescription,
      });

      queryClient.setQueryData(['user-projects'], (oldProjects: IProject[]) => {
        return oldProjects.map((p: IProject) => {
          if (p._id !== task.projectId) return p;

          const newTasks = p.tasks.map((t) => {
            if (t._id !== task._id) return t;

            return { ...t, description: newDescription };
          });

          return { ...p, tasks: newTasks };
        });
      });

      toast('Task description updated successfully', { type: 'success' });
    } catch (err) {
      console.error(err);
      toast('An error occurred while updating the task description', {
        type: 'error',
      });
    }
  }

  async function handleOnChangeTask() {
    try {
      const newChecked = !checked;

      if (newChecked) {
        await markAsCompleted({ taskId: task._id });
      } else {
        await markAsToDo({ taskId: task._id });
      }

      queryClient.setQueryData(['user-projects'], (oldProjects: IProject[]) => {
        return oldProjects.map((p: IProject) => {
          if (p._id !== task.projectId) return p;

          const newTasks = p.tasks.map((t) => {
            if (t._id !== task._id) return t;

            return {
              ...t,
              finishedAt: newChecked ? new Date().toISOString() : null,
            };
          });

          return { ...p, tasks: newTasks };
        });
      });
      setChecked(newChecked);
    } catch (err) {}
  }

  return (
    <li
      className={`rounded-sm gap-sm group flex justify-between p-1 px-2 hover:cursor-pointer hover:bg-gray-200 ${checked ? 'text-gray-400' : ''}`}
      onClick={handleOnChangeTask}
      data-tooltip-id={`tooltip-task-${task._id}`}
    >
      <div className={'gap-sm flex w-full items-center'}>
        {isLoadingTodo || isLoadingComplete ? (
          <Icon icon={'progress_activity'} className={'text-md animate-spin'} />
        ) : (
          <Input
            type={'checkbox'}
            id={task._id}
            checked={checked}
            onChange={handleOnChangeTask}
            className={'h-4 w-4 cursor-pointer accent-yellow-400'}
          />
        )}

        <label
          htmlFor={task._id}
          className={`text-md w-full cursor-pointer font-medium ${checked ? 'line-through' : ''}`}
        >
          {task.description}
        </label>
      </div>

      {!checked && (
        <div className={'gap-md hidden items-center group-hover:flex'}>
          <Button
            leftIcon={'Edit'}
            title={'Edit Project'}
            className={'!bg-transparent !p-0'}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditModalOpen(true);
            }}
          />
          <Button
            leftIcon={'Delete'}
            title={'Delete Project'}
            className={'!bg-transparent !p-0'}
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteModalOpen(true);
            }}
          />
        </div>
      )}

      <ConfirmDeleteDialog
        isOpen={isDeleteModalOpen}
        onClose={async (accepted) => {
          if (accepted) {
            await confirmDelete();
          }
          setIsDeleteModalOpen(false);
        }}
        typeName={'Task'}
        isLoading={isDeleting}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={async (newDescription) => {
          if (newDescription) {
            await handleUpdateTaskDescription(newDescription);
          }
          setIsEditModalOpen(false);
        }}
        typeName={'task description'}
        isLoading={isUpdating}
      />

      {task.finishedAt && (
        <Tooltip
          id={`tooltip-task-${task._id}`}
          place={'bottom-end'}
          offset={10}
          style={{
            background: '#fff',
            color: '#000',
          }}
          className={'shadow-level-2'}
        >
          <p>Finished at: {new Date(task.finishedAt).toLocaleString()}</p>
        </Tooltip>
      )}
    </li>
  );
}
