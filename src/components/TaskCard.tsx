import React, { useState } from 'react';
import fetcher from 'src/utilities/fetcher';
import StatusUpdate from './StatusUpdate';

const allStatus = ['TODO', 'IN PROGRESS', 'DONE'];

const TaskCard = ({ setProject, task }: any) => {
  const [status, setStatus] = useState(task.status);
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

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
      <div className="">
        <StatusUpdate
          {...{ open, setOpen, allStatus, status, handleStatusChange }}
        />
      </div>
    </div>
  );
};

export default TaskCard;
