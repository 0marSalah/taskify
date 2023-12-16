import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from 'src/utilities/fetcher';
import TaskInput from '../Inputs/TaskInput';
import '../../styles/projects/project.scss';
import TaskCard from '../TaskCard';
import { ProjectType, TaskType } from '../../types';
import StatusUpdate from '../StatusUpdate';

export const allStatus = ['todo', 'in_progress', 'done'];

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState<ProjectType>();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('TODO');

  /**
   * - add task to project
   * @param task coming from TaskInput
   */
  const handleAddTask = async (task: string) => {
    try {
      if (!task) return;
      setLoading(true);
      const res = await fetcher(`/api/tasks`, 'POST', {
        name: task,
        projectId: id
      });
      console.log(res);
      if (res.status === 'success' && res.data) {
        setProject((prev) => {
          if (prev) {
            const newTask = res.data;
            const newTasks = [...prev.tasks, newTask];
            return { ...prev, tasks: newTasks };
          }
        });
      }
      setLoading(false);
    } catch {
      console.log('error adding task');
    }
  };

  useEffect(() => {
    const getProject = async () => {
      const res = await fetcher(`/api/projects/${id}`, 'GET', {});
      if (res && res.status === 'success') setProject(res.data);
      else {
        setProject(undefined);
        return;
      }
      setStatus(res.data.status);
    };
    getProject();
  }, [id]);

  const handleStatusChange = async (e: any) => {
    setStatus(e.target.textContent);
    const newStatus = e.target.textContent.replace(' ', '_').toUpperCase();
    setOpen(!open);
    await fetcher(`/api/projects/${id}`, 'PUT', {
      status: newStatus
    });
  };

  const handleDeketeProject = async () => {
    const res = await fetcher(`/api/projects/${id}`, 'DELETE', {});
    window.location.href = '/projects';
  };

  return (
    <div className="project-wrapper">
      {project ? (
        <div>
          <div className="project-title single-project">
            <div className="info">
              <h1>{project.name}</h1>
              <p>{project.description}</p>
            </div>
            <div className="delete">
              <StatusUpdate
                {...{ open, setOpen, allStatus, status, handleStatusChange }}
              />
              <button onClick={handleDeketeProject} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
          <hr />
          <div className="tasks">
            <h2>Tasks</h2>
            <p>
              You have{' '}
              <span
                style={{
                  color: 'var(--color-primary)',
                  margin: '1rem 0'
                }}
              >
                {project.tasks.length}
              </span>{' '}
              tasks
            </p>
            <TaskInput loading={loading} onAddTask={handleAddTask} />
            {project.tasks.length > 0 && (
              <div className="tasks-parts">
                {allStatus.map((s) => {
                  return renderTask(s, project, setProject);
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default Project;

const renderTask = (
  s: string,
  project: {
    tasks: TaskType[];
  },
  setProject: (prev: any) => void
) => {
  // Filter tasks for the current status
  const tasksForStatus = project.tasks.filter(
    (task: { status: string; id: string }) =>
      task?.status?.toLowerCase() === s?.toLowerCase()
  );

  // Sort tasks by status within the current column
  const sortedTasks = tasksForStatus.sort((a: TaskType, b: TaskType) =>
    a.status.localeCompare(b.status)
  );

  return (
    <div key={s}>
      <h2>{s.replace('_', ' ')}</h2>
      <div className="tasks-container">
        {sortedTasks.map((task: TaskType) => (
          <TaskCard setProject={setProject} task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};
