import { useState } from 'react';

const ProjectCard = ({ project }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div key={project._id} className="project-card">
      <div className="card-title">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <div className="card-actions">
        <button
          data-status={project.status.toLowerCase()}
          className="btn-toggle"
          onClick={() => setOpen(!open)}
        >
          {project.status}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
