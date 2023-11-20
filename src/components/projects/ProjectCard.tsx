import { useState } from 'react';

const allStatus = ['TODO', 'IN PROGRESS', 'DONE'];

const ProjectCard = ({ project }: any) => {
  const [status, setStatus] = useState('TODO');
  const [open, setOpen] = useState(false);

  const handleStatusChange = (e: any) => {
    setStatus(e.target.textContent);
    setOpen(false);
  };

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
          {status.toLowerCase()}
          {/* <img src="/icons/arrow-down.png" alt="" /> */}
        </button>
        {open && (
          <div onBlur={() => setOpen(false)} className="status-switch">
            {allStatus.map((s) => (
              <button
                key={s}
                className={
                  'btn-status btn-secondary ' +
                  (s === status || s === project.status ? 'active' : '')
                }
                onClick={handleStatusChange}
              >
                {s.toLowerCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
