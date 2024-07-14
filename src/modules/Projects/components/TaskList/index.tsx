import { ITask } from '../../models/task.model.ts';
import { TaskItem } from '../TaskItem';

interface ITaskListProps {
  tasks: ITask[];
  type: 'ToDo' | 'Done';
}

export function TaskList({ type, tasks }: ITaskListProps) {
  return (
    <div className={'p-4'}>
      <p className={'text-h4 font-bold'}>{type}</p>
      <ul className={'gap-xs flex flex-col px-1 py-1'}>
        {tasks.map((task) => (
          <TaskItem task={task} key={task._id} />
        ))}

        {tasks.length === 0 && (
          <li className={'text-center text-gray-400'}>
            {type === 'ToDo' ? 'No tasks to do :)' : 'No tasks done yet :('}
          </li>
        )}
      </ul>
    </div>
  );
}
