import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from 'src/utilities/fetcher';
import TaskInput from '../Inputs/TaskInput';
import '../../styles/projects/project.scss';
import TaskCard from '../TaskCard';

const allStatus = ['todo', 'in_progress', 'done'];

type ProjectType = {
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  tasks: {
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  }[];
};

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState<ProjectType>();
  const [statusState, setStatus] = React.useState({
    done: 0,
    in_progress: 0,
    todo: 0
  });

  useEffect(() => {
    let obj = {
      done: 0,
      todo: 0,
      in_progress: 0
    };
    if (project && project.tasks.length > 0) {
      project?.tasks.forEach((task: any) => {
        if (task.status.toLowerCase() === 'todo') {
          obj.todo += 1;
        } else if (task.status.toLowerCase() === 'done') {
          obj.done += 1;
        } else {
          obj.in_progress += 1;
        }
      });
      setStatus(obj);
    }
  }, [project]);

  /**
   * - add task to project
   * @param task coming from TaskInput
   */
  const handleAddTask = async (task: string) => {
    const res = await fetcher(`/api/tasks`, 'POST', {
      name: task,
      projectId: id
    });
    console.log(res);
    setProject((prev) => {
      if (prev) {
        const newProject = { ...prev };
        newProject.tasks.push(res.data.name);
        return newProject;
      }
    });
  };

  useEffect(() => {
    const getProject = async () => {
      const res = await fetcher(`/api/projects/${id}`, 'GET', {});
      if (res && res.status === 'success') setProject(res.data);
      else {
        setProject(undefined);
        return;
      }
    };
    getProject();
  }, [id]);

  return (
    <div className="project-wrapper">
      {project ? (
        <div>
          <div className="project-title">
            <h1>{project.name}</h1>
            <p>{project.description}</p>
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
            <TaskInput onAddTask={handleAddTask} />
            {project.tasks.length > 0 && (
              <div className="tasks-parts">
                {allStatus.map((s) => (
                  <div key={s}>
                    <h2>{s.replace('_', ' ')}</h2>
                    <div className="tasks-container">
                      {project.tasks
                        .filter(
                          (task) =>
                            task.status.toLowerCase() === s.toLowerCase()
                        )
                        .map((task) => (
                          <TaskCard task={task} />
                        ))}
                    </div>
                  </div>
                ))}
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
