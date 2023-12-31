import React, { useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';
import ProjectCard from './ProjectCard';
import ProjectForm from '../forms/AddProjectForm';
import '../../styles/dashboard/projects.scss';
import '../../styles/projects/projectForm.scss';
import { Link } from 'react-router-dom';
import LoadingButton from '../Loading';
import { Helmet } from 'react-helmet-async';

const ProjectsPage = () => {
  const [openForm, setOpenForm] = useState(false);

  const { projects } = useAuth();
  return (
    <div className="projects-page">
      <Helmet>
        <title>Projects</title>
        <meta
          name="description"
          content="Projects | Manage projects and know the performance and more"
        />
      </Helmet>
      <div
        className="project-title"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem'
        }}
      >
        <h1 style={{ margin: 0 }}>Projects</h1>

        <button onClick={() => setOpenForm(!openForm)} className="add-btn">
          <img src="/icons/plus1.png" alt="plus" />
        </button>
      </div>
      <div className="projects-container project-page-container">
        {projects
          ? projects.map((project: any) => (
              <Link to={'/projects/' + project.id}>
                <ProjectCard project={project} />
              </Link>
            ))
          : 'Loading...'}
      </div>
      {openForm && (
        <>
          <div className="project-form">
            <div className="project-form-container">
              <ProjectForm setOpenForm={setOpenForm} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
