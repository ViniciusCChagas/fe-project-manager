import { Button } from '../../../../core/components/Button';
import { ProjectCard } from '../../components/ProjectCard';
import { useGetProjects } from '../../hooks/Projects/useGetProjects.ts';
import { CreateNewProjectCard } from '../../components/CreateNewProjectCard';
import { useAuth } from '../../../../core/hooks/useAuth.tsx';

export default function ProjectsPage() {
  window.document.title = 'Home - Project Manager';
  const { user, logout } = useAuth();
  const { data, isLoading } = useGetProjects();

  return (
    <div>
      <header
        className={
          'flex h-[30vh] w-full justify-center bg-yellow-400 px-2 py-6 pb-[10vh]'
        }
      >
        <div className={'flex w-[85vw] items-center justify-between'}>
          <h1 className={'text-[40px] font-bold'}>Projects Manager</h1>
          <div className={'flex flex-col items-end self-start'}>
            <p className={'text-h3 font-medium'}>{user?.name}</p>
            <Button
              leftIcon={'Logout'}
              className={'text-md !p-0'}
              leftIconClassName={'text-md'}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className={'-mt-[10vh] mb-10 flex w-full justify-center'}>
        <div
          className={
            'gap-lg grid w-[85vw] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
          }
        >
          {isLoading && <p className={'w-full'}>Loading projects...</p>}
          {data && (
            <>
              {data.map((project) => (
                <ProjectCard project={project} key={project._id} />
              ))}
              <CreateNewProjectCard />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
