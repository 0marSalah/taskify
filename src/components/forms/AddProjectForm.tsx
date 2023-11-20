import React, { useState } from 'react';
import TaskInput from '../Inputs/TaskInput';
import fetcher from 'src/utilities/fetcher';
import { useAuth } from 'src/hooks/useAuth';

type ProjectDataType = {
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
};

const ProjectForm = ({ setOpenForm }: any) => {
  const [projectData, setProjectData] = useState<ProjectDataType>({
    name: '',
    description: '',
    status: 'TODO',
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setProjects } = useAuth();

  const handleInputChange = (e: any) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  // const handleAddTask = (task: string) => {
  //   setProjectData({ ...projectData, tasks: [...projectData.tasks, task] });
  // };

  const validateFormData = () => {
    if (!projectData.name) {
      setLoading(false);
      setError('Project name is required');
      return false;
    }
    if (projectData.startDate && !projectData.endDate) {
      setLoading(false);
      setError('Please enter end date or remove start date');
      return false;
    }
    if (projectData.endDate && !projectData.startDate) {
      setLoading(false);
      setError('Please enter start date or remove end date');
      return false;
    }
    if (projectData.startDate && projectData.endDate) {
      if (new Date(projectData.startDate) > new Date(projectData.endDate)) {
        setLoading(false);
        setError('Start date cannot be after end date');
        return false;
      } else if (
        new Date(projectData.startDate) === new Date(projectData.endDate)
      ) {
        setLoading(false);
        setError('Start date cannot be same as end date');
        return false;
      } else if (new Date(projectData.startDate) < new Date()) {
        setLoading(false);
        setError('Start date cannot be before today');
        return false;
      } else if (new Date(projectData.endDate) < new Date()) {
        setLoading(false);
        setError('End date cannot be before today');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Project Data:', projectData);
    if (!validateFormData()) return;

    const body = {
      name: projectData.name,
      description:
        projectData.description === '' ? null : projectData.description,
      status: projectData.status === '' ? null : projectData.status,
      startDate:
        projectData.startDate === '' ? null : new Date(projectData.startDate),
      endDate: projectData.endDate === '' ? null : new Date(projectData.endDate)
    };
    const res = await fetcher('/api/projects', 'POST', body);
    console.log('Project Response:', res);
    if (res && res.status === 'success') {
      setLoading(false);
      setOpenForm(false);
      setProjects((prev: any) => [...prev, res.data]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Project Name{' '}
          <span
            style={{
              color: 'var(--color-red)'
            }}
          >
            *
          </span>
        </label>
        <input
          type="text"
          name="name"
          value={projectData.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          id="name"
        />
      </div>
      <div>
        <label htmlFor="desc">Description</label>
        <textarea
          name="description"
          value={projectData.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          id="desc"
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          name="status"
          value={projectData.status}
          onChange={handleInputChange}
          id="status"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
        className="date-inputs"
      >
        <div>
          <label htmlFor="startdate">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={projectData.startDate}
            onChange={handleInputChange}
            id="startdate"
          />
        </div>
        <div>
          <label htmlFor="enddate">End Date</label>
          <input
            type="date"
            name="endDate"
            value={projectData.endDate}
            onChange={handleInputChange}
            id="enddate"
          />
        </div>
      </div>
      {/* <div>
        <label>Tasks:</label>
        {projectData.tasks.map((task, index) => (
          <div key={index}>{task}</div>
        ))}
        <TaskInput onAddTask={handleAddTask} />
      </div> */}
      {!!error && (
        <div
          style={{
            color: 'var(--color-red)',
            marginBlock: '1rem'
          }}
        >
          {error}
        </div>
      )}
      <div className="project-form-action">
        {loading ? (
          'loading...'
        ) : (
          <button className="add-project-btn" type="submit">
            Add Project
          </button>
        )}
        <button
          onClick={() => {
            setOpenForm(false);
          }}
          className="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
