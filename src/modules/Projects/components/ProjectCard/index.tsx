import { Button } from '../../../../core/components/Button';
import { TaskList } from '../TaskList';
import { IProject } from '../../models/project.model.ts';
import { useState } from 'react';
import { ConfirmDeleteDialog } from '../../../../core/components/ConfirmDeleteDialog';
import { useDeleteProject } from '../../hooks/Projects/useDeleteProject.ts';
import queryClient from '../../../../core/api/queryClient.ts';
import { toast } from 'react-toastify';
import { EditModal } from '../../../../core/components/EditInfoModal';
import { useUpdateProjectName } from '../../hooks/Projects/useUpdateProjectName.ts';
import { NewTaskForm } from '../NewTaskForm';

interface IProjectCardProps {
  project: IProject;
}

export function ProjectCard({ project }: IProjectCardProps) {
  const completedTasks = project.tasks.filter((task) => task.finishedAt);
  const pendingTasks = project.tasks.filter((task) => !task.finishedAt);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutateAsync: deleteProject, isLoading: isDeleting } =
    useDeleteProject();
  const { mutateAsync: updateProjectName, isLoading: isUpdating } =
    useUpdateProjectName();

  async function confirmDelete() {
    try {
      await deleteProject({ projectId: project._id });

      queryClient.setQueryData(['user-projects'], (oldProjects: IProject[]) => {
        return oldProjects.filter((p: IProject) => p._id !== project._id);
      });

      toast('Project deleted successfully', { type: 'success' });
    } catch (err) {
      console.error(err);
      toast('An error occurred while deleting the project', { type: 'error' });
    }
  }

  async function handleUpdateProjectName(newName: string) {
    try {
      await updateProjectName({ projectId: project._id, name: newName });

      queryClient.setQueryData(['user-projects'], (oldProjects: IProject[]) => {
        return oldProjects.map((p: IProject) => {
          if (p._id === project._id) {
            return { ...p, name: newName };
          }

          return p;
        });
      });

      toast('Project name updated successfully', { type: 'success' });
    } catch (err) {
      console.error(err);
      toast('An error occurred while updating the project name', {
        type: 'error',
      });
    }
  }

  return (
    <div
      className={
        'shadow-level-2 flex min-h-[400px] flex-col rounded-lg bg-white'
      }
    >
      <div
        className={
          'border-b-hairline flex items-center justify-between rounded-t-lg bg-black px-4 py-3 text-white'
        }
      >
        <p className={'text-lg font-medium'}>{project.name}</p>
        <div className={'gap-md flex items-center'}>
          <Button
            leftIcon={'Edit'}
            title={'Edit Project'}
            className={'!bg-transparent !p-0'}
            onClick={() => setIsEditModalOpen(true)}
          />
          <Button
            leftIcon={'Delete'}
            title={'Delete Project'}
            className={'!bg-transparent !p-0'}
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </div>
      </div>

      <TaskList type={'ToDo'} tasks={pendingTasks} />

      {completedTasks.length > 0 && (
        <TaskList type={'Done'} tasks={completedTasks} />
      )}

      <NewTaskForm projectId={project._id} />

      <ConfirmDeleteDialog
        isOpen={isDeleteModalOpen}
        onClose={async (accepted) => {
          if (accepted) {
            await confirmDelete();
          }
          setIsDeleteModalOpen(false);
        }}
        typeName={'Project'}
        isLoading={isDeleting}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={async (newName) => {
          if (newName) {
            await handleUpdateProjectName(newName);
          }
          setIsEditModalOpen(false);
        }}
        typeName={'project name'}
        isLoading={isUpdating}
      />
    </div>
  );
}
