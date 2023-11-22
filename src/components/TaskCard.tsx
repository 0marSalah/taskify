import React, { useState } from 'react';
import fetcher from 'src/utilities/fetcher';
import StatusUpdate from './StatusUpdate';
import LoadingButton from './Loading';

const allStatus = ['TODO', 'IN_PROGRESS', 'DONE'];

const TaskCard = ({ setProject, task }: any) => {
  const [status, setStatus] = useState(task.status);
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e: any) => {
    setStatus(e.target.textContent);
    const newStatus = e.target.textContent.replace(' ', '_').toUpperCase();
    console.log('Changing status of task with ID:', task.id);
    console.log('New status:', newStatus);
    setOpen(!open);
    setProject((prev: any) => {
      const updatedTasks = prev.tasks.map((t: any) => {
        if (t.id === task.id) {
          console.log('Found task to update', t.id);
          return {
            ...t,
            status: newStatus
          };
        }
        return t;
      });
      return { ...prev, tasks: updatedTasks };
    });
    const res = await fetcher(`/api/tasks/${task.id}`, 'PUT', {
      status: newStatus
    });
    console.log(res);
  };

  const handleUpdateTaskName = async (e: any) => {
    e.preventDefault();
    if (taskName === task.name) return;
    if (!taskName) {
      setTaskName(task.name);
      return;
    }
    const res = await fetcher(`/api/tasks/${task.id}`, 'PUT', {
      name: taskName
    });
    console.log(res);
  };

  const handleDeleteProject = async () => {
    setLoading(true);
    const res = await fetcher(`/api/tasks/${task.id}`, 'DELETE', {});
    console.log(res);
    if (res && res.status === 'success') {
      setProject((prev: any) => {
        const updatedTasks = prev.tasks.filter((t: any) => t.id !== task.id);
        return { ...prev, tasks: updatedTasks };
      });
    }
    setLoading(false);
  };

  return (
    <div className="task-card">
      <form action="" onSubmit={handleUpdateTaskName}>
        <input
          style={{
            width: 'fit-content',
            height: 'fit-content',
            border: 'none'
          }}
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onBlur={handleUpdateTaskName}
        />
      </form>
      <div className="delete-task">
        <StatusUpdate
          {...{ open, setOpen, allStatus, status, handleStatusChange }}
        />
        <LoadingButton
          style={{ padding: '0.5rem', border: 'none', background: 'none' }}
          loading={loading}
          onClick={handleDeleteProject}
        >
          <img
            src="/icons/delete.png"
            alt={'remove ' + task.name}
            onClick={handleDeleteProject}
            className="delete-icon"
          />
        </LoadingButton>
      </div>
    </div>
  );
};

export default TaskCard;
