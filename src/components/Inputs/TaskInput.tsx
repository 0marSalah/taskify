import React, { useState } from 'react';
import LoadingButton from '../Loading';

type TaskInputType = {
  onAddTask: (task: string) => void;
  loading: boolean;
};

const TaskInput = ({ onAddTask, loading }: TaskInputType) => {
  const [task, setTask] = useState('');

  const handleAddTask = (e: any) => {
    e.preventDefault();
    if (!task) return;
    onAddTask(task);
    setTask('');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBlock: '0.5rem 0',
        maxWidth: '400px'
      }}
    >
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task name"
          style={{
            margin: 0
          }}
        />
      </form>
      <LoadingButton
        loading={loading}
        value="Add Task"
        onClick={handleAddTask}
      />
    </div>
  );
};

export default TaskInput;
