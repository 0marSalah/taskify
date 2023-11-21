import React, { useState } from 'react';
import fetcher from 'src/utilities/fetcher';

const allStatus = ['TODO', 'IN PROGRESS', 'DONE'];

const TaskCard = ({ task }: any) => {
  console.log('task', task);
  const [status, setStatus] = useState(task.status);
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

  const handleStatusChange = async (e: any) => {
    setStatus(e.target.textContent);
    setOpen(!open);
    const res = await fetcher(`/api/tasks/${task.id}`, 'PUT', {
      status: e.target.textContent.replace(' ', '_').toUpperCase()
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
      <div className="card-actions">
        <button
          data-status={task.status}
          className="btn-toggle"
          onClick={() => setOpen(!open)}
        >
          {status}
          <img src="/icons/arrow-down.png" alt="" />
        </button>
        {open && (
          <div onBlur={() => setOpen(false)} className="status-switch">
            {allStatus.map((s) => (
              <button
                key={s}
                className={
                  'btn-status btn-secondary ' +
                  (s === status || s === task.status ? 'active' : '')
                }
                onClick={handleStatusChange}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
