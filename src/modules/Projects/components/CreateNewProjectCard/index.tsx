import { Button } from '../../../../core/components/Button';
import { Input } from '../../../../core/components/Input';
import { useForm } from 'react-hook-form';
import { useCreateProject } from '../../hooks/Projects/useCreateProject.ts';
import queryClient from '../../../../core/api/queryClient.ts';
import { toast } from 'react-toastify';

export function CreateNewProjectCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string }>();

  const { mutateAsync: createProject, isLoading } = useCreateProject();

  async function handleCreateNewProject(data: { name: string }) {
    try {
      const newProject = await createProject(data);
      queryClient.setQueryData(['user-projects'], (oldProjects: any) => {
        return [...oldProjects, newProject];
      });
      toast('Project created successfully', { type: 'success' });
      reset();
    } catch (err) {
      console.error(err);
      toast('An error occurred while creating the project', { type: 'error' });
    }
  }

  return (
    <div
      className={
        'shadow-level-2 flex h-[300px] flex-col self-center rounded-lg bg-white'
      }
    >
      <div
        className={
          'border-b-hairline flex items-center justify-center rounded-t-lg bg-black px-4 py-3 text-white'
        }
      >
        <p className={'text-lg font-medium'}>Create new project</p>
      </div>

      <form
        onSubmit={handleSubmit(handleCreateNewProject)}
        className={
          'gap-lg flex flex-1 flex-col items-center justify-center p-4'
        }
      >
        <p className={'text-h4 text-center'}>
          Give your project a name and start adding tasks to keep everything on
          track.
        </p>
        <Input
          type='text'
          placeholder={'My project name'}
          className={'items-center'}
          {...register('name', {
            required: 'Project name is required',
            minLength: {
              value: 3,
              message: 'Name must have at least 3 characters',
            },
          })}
          disabled={isLoading}
          errorMessage={errors.name && errors.name.message}
        />
        <Button
          type={'submit'}
          className={'w-[80%]'}
          leftIcon={'Add'}
          loading={isLoading}
        >
          Create project
        </Button>
      </form>
    </div>
  );
}
