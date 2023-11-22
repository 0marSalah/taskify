import React, { useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import '../../styles/dashboard/projects.scss';
import { Link } from 'react-router-dom';

const Projects = () => {
  const { projects } = useAuth();
  const [status, setStatus] = React.useState({
    done: 0,
    notDone: 0,
    inProgress: 0
  });

  useEffect(() => {
    let obj = { done: 0, notDone: 0, inProgress: 0 };
    projects?.forEach((project: any) => {
      if (project.status.toLowerCase() === 'todo') {
        obj.notDone += 1;
      } else if (project.status.toLowerCase() === 'done') {
        obj.done += 1;
      } else {
        obj.inProgress += 1;
      }
    });
    setStatus(obj);
  }, [projects]);

  return (
    <Link to="/projects" className="projects">
      <div>
        <div className="project-title">
          <h1>Projects</h1>
          <p>
            <span data-status="todo">Not done </span>
            {status.notDone},{' '}
            <span data-status="in_progress">In progress </span>
            {status.inProgress}, <span data-status="done">Done </span>{' '}
            {status.done}
          </p>
        </div>
        <div className="projects-container">
          {projects
            ? projects.slice(0, 3).map((project: any) => (
                <div key={project._id} className="project-card">
                  <div className="card-title">
                    <h3>{project.name}</h3>
                    <p>
                      {project.description && project.description.length > 100
                        ? project.description.slice(0, 100) + '...'
                        : project.description}
                    </p>
                  </div>
                  <div className="card-info">
                    <p data-status={project.status.toLowerCase()}>
                      {project.status.toLowerCase()}
                    </p>
                  </div>
                </div>
              ))
            : 'Loading...'}
        </div>
      </div>
    </Link>
  );
};

export default Projects;
